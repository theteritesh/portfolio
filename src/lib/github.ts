import "server-only";
import {
  portfolioData,
  GitHubActivityData,
  HeatmapDay,
  LanguageStat,
  PinnedRepo,
} from "@/data/portfolio";

export interface GitHubStats {
  repositories: number;
  contributions: number;
  followers: number;
}

export interface GitHubDataResult {
  username: string;
  userUrl: string;
  stats: GitHubStats;
  activity: GitHubActivityData;
  lastUpdated: string;
  isLive: boolean;
  repoStats?: Record<string, { stars: number; forks: number }>;
}

interface GraphQLRepoNode {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  url: string;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
}

interface GraphQLLanguageEdge {
  size: number;
  node: {
    name: string;
    color: string | null;
  };
}

interface GraphQLTopRepoNode extends GraphQLRepoNode {
  languages?: {
    edges?: GraphQLLanguageEdge[];
  };
}

interface GraphQLUserResponse {
  name?: string;
  login?: string;
  url?: string;
  repositories?: {
    totalCount?: number;
  };
  followers?: {
    totalCount?: number;
  };
  contributionsCollection?: {
    contributionCalendar?: {
      totalContributions?: number;
      weeks?: {
        contributionDays?: {
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }[];
      }[];
    };
  };
  pinnedItems?: {
    nodes?: GraphQLRepoNode[];
  };
  topRepositories?: {
    nodes?: GraphQLTopRepoNode[];
  };
}

// GitHub GraphQL contribution levels mapping to 0 | 1 | 2 | 3 | 4
function mapContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    case "NONE":
    default:
      return 0;
  }
}

const GITHUB_GRAPHQL_QUERY = `
  query getUserGitHubData($login: String!) {
    user(login: $login) {
      name
      login
      url
      repositories(privacy: PUBLIC) {
        totalCount
      }
      followers {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            forkCount
            url
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      topRepositories: repositories(
        first: 50
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          stargazerCount
          forkCount
          url
          primaryLanguage {
            name
            color
          }
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

function formatStableDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getFallbackData(username: string): GitHubDataResult {
  const repoCount =
    parseInt(portfolioData.metrics[0]?.value.replace(/[^0-9]/g, "") || "45", 10) || 45;
  const followerCount =
    parseInt(portfolioData.metrics[2]?.value.replace(/[^0-9]/g, "") || "120", 10) || 120;

  const lastWeek = portfolioData.github.weeks[portfolioData.github.weeks.length - 1];
  const lastDay = lastWeek?.days[lastWeek.days.length - 1]?.date || "2026-10-18";

  return {
    username,
    userUrl: `https://github.com/${username}`,
    stats: {
      repositories: repoCount,
      contributions: portfolioData.github.totalContributions,
      followers: followerCount,
    },
    activity: {
      ...portfolioData.github,
      username,
    },
    lastUpdated: formatStableDate(lastDay),
    isLive: false,
    repoStats: {},
  };
}

export async function getGitHubData(): Promise<GitHubDataResult> {
  const username = process.env.GITHUB_USERNAME || "theteritesh";
  const token = process.env.GITHUB_TOKEN;

  // Fallback immediately if token is not configured
  if (!token || !token.trim()) {
    console.warn(
      `[GitHub API] GITHUB_TOKEN is not configured in environment. Using demo portfolio data for user "${username}".`
    );
    return getFallbackData(username);
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-fetcher",
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { login: username },
      }),
      next: {
        revalidate: 3600, // Cache on server for 1 hour
      },
    });

    if (!response.ok) {
      console.warn(
        `[GitHub API] Request failed with HTTP status ${response.status}. Using fallback portfolio data.`
      );
      return getFallbackData(username);
    }

    const json = await response.json();

    if (json.errors && json.errors.length > 0) {
      console.warn(
        `[GitHub API] GraphQL returned errors: ${json.errors[0]?.message || "Unknown error"}. Using fallback portfolio data.`
      );
      return getFallbackData(username);
    }

    const user: GraphQLUserResponse | undefined = json.data?.user;
    if (!user) {
      console.warn(
        `[GitHub API] User "${username}" not found on GitHub. Using fallback portfolio data.`
      );
      return getFallbackData(username);
    }

    // 1. Stats extraction
    const repoCount: number = user.repositories?.totalCount ?? 0;
    const followersCount: number = user.followers?.totalCount ?? 0;
    const calendar = user.contributionsCollection?.contributionCalendar;
    const totalContributions: number = calendar?.totalContributions ?? 0;

    // 2. Heatmap Weeks & Days mapping
    const calendarWeeks = calendar?.weeks || [];
    const weeks: { days: HeatmapDay[] }[] = [];
    const flatDays: HeatmapDay[] = [];

    for (const week of calendarWeeks) {
      const days: HeatmapDay[] = [];
      for (const day of week.contributionDays || []) {
        const heatmapDay: HeatmapDay = {
          date: day.date,
          count: day.contributionCount || 0,
          level: mapContributionLevel(day.contributionLevel),
        };
        days.push(heatmapDay);
        flatDays.push(heatmapDay);
      }
      weeks.push({ days });
    }

    // 3. Year range computation
    let yearRange = portfolioData.github.yearRange;
    if (flatDays.length > 0) {
      const startYear = new Date(flatDays[0].date).getFullYear();
      const endYear = new Date(flatDays[flatDays.length - 1].date).getFullYear();
      yearRange = startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;
    }

    // 4. Streaks computation
    let currentStreak = 0;
    let longestStreak = 0;
    let streakCount = 0;

    for (const d of flatDays) {
      if (d.count > 0) {
        streakCount++;
        if (streakCount > longestStreak) {
          longestStreak = streakCount;
        }
      } else {
        streakCount = 0;
      }
    }

    // Current active streak: walk backwards from the end
    let backIdx = flatDays.length - 1;
    // Allow today to be 0 if earlier hours, start from yesterday if needed
    if (backIdx >= 0 && flatDays[backIdx].count === 0 && backIdx > 0 && flatDays[backIdx - 1].count > 0) {
      backIdx--;
    }
    while (backIdx >= 0 && flatDays[backIdx].count > 0) {
      currentStreak++;
      backIdx--;
    }

    // 5. Pinned Repositories extraction
    let pinnedRepos: PinnedRepo[] = (user.pinnedItems?.nodes || [])
      .filter((node): node is GraphQLRepoNode => Boolean(node && node.name))
      .map((node) => ({
        name: node.name,
        description: node.description || "Public repository on GitHub.",
        language: node.primaryLanguage?.name || "Code",
        languageColor: node.primaryLanguage?.color || "#7bdb80",
        stars: node.stargazerCount || 0,
        forks: node.forkCount || 0,
        url: node.url,
      }));

    // If no pinned items exist on the profile, use top recent public repositories
    if (pinnedRepos.length === 0 && user.topRepositories?.nodes) {
      pinnedRepos = user.topRepositories.nodes
        .filter((node): node is GraphQLTopRepoNode => Boolean(node && node.name))
        .slice(0, 3)
        .map((node) => ({
          name: node.name,
          description: node.description || "Public repository on GitHub.",
          language: node.primaryLanguage?.name || "Code",
          languageColor: node.primaryLanguage?.color || "#7bdb80",
          stars: node.stargazerCount || 0,
          forks: node.forkCount || 0,
          url: node.url,
        }));
    }

    // 6. Top Languages calculation across non-fork public repositories
    const languageMap = new Map<string, { size: number; color: string }>();

    for (const repo of user.topRepositories?.nodes || []) {
      for (const edge of repo.languages?.edges || []) {
        const name: string = edge.node?.name;
        const color: string = edge.node?.color || "#899485";
        const size: number = edge.size || 0;
        if (name) {
          const existing = languageMap.get(name);
          if (existing) {
            existing.size += size;
          } else {
            languageMap.set(name, { size, color });
          }
        }
      }
    }

    const totalBytes = Array.from(languageMap.values()).reduce(
      (sum, item) => sum + item.size,
      0
    );

    let languages: LanguageStat[] = [];
    if (totalBytes > 0) {
      languages = Array.from(languageMap.entries())
        .map(([name, item]) => ({
          name,
          percentage: (item.size / totalBytes) * 100,
          color: item.color,
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);
    } else {
      languages = portfolioData.github.languages;
    }

    const latestDateStr =
      flatDays.length > 0 ? flatDays[flatDays.length - 1].date : "2026-10-18";
    const lastUpdated = formatStableDate(latestDateStr);

    const repoStats: Record<string, { stars: number; forks: number }> = {};
    for (const repo of user.topRepositories?.nodes || []) {
      if (repo && repo.name) {
        repoStats[repo.name.toLowerCase()] = {
          stars: repo.stargazerCount || 0,
          forks: repo.forkCount || 0,
        };
      }
    }

    return {
      username: user.login || username,
      userUrl: user.url || `https://github.com/${username}`,
      stats: {
        repositories: repoCount,
        contributions: totalContributions,
        followers: followersCount,
      },
      activity: {
        username: user.login || username,
        totalContributions,
        yearRange,
        currentStreak,
        longestStreak,
        languages,
        pinnedRepos,
        weeks: weeks.length > 0 ? weeks : portfolioData.github.weeks,
      },
      lastUpdated,
      isLive: true,
      repoStats,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Network error";
    console.warn(`[GitHub API] Failed to fetch data: ${message}. Using fallback portfolio data.`);
    return getFallbackData(username);
  }
}
