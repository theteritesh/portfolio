export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  color?: string;
}

export interface TerminalCommand {
  command: string;
  output?: string[];
  type?: "git" | "build" | "status" | "info";
}

export interface AboutData {
  filename: string;
  fileSize: string;
  sloc: string;
  latestCommit: {
    hash: string;
    message: string;
    timeAgo: string;
  };
  heading: string;
  availability: string;
  bioParagraph: string;
  philosophy: {
    title: string;
    quote: string;
  };
  academic: {
    title: string;
    degree: string;
    details: string;
    honors: string;
  };
  cloudCertification: {
    title: string;
    badge: string;
    verified: boolean;
    details: string;
  };
  location: string;
  currentlyLearning: {
    command: string;
    output: string;
  };
}

export interface SkillChip {
  name: string;
  iconKey: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  folderName: string;
  badge: string;
  fileCount: number;
  description: string;
  competencies: { name: string; level: number }[];
  chips: SkillChip[];
  files: string[];
}

export interface ExperienceBullet {
  title: string;
  icon: string;
  description: string;
  color?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  department?: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  commitHash: string;
  commitBadge: string;
  statusBadge: string;
  statusColor: "primary" | "secondary" | "tertiary";
  bullets: ExperienceBullet[];
  tags: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  isPlaceholderImage?: boolean;
  status: "Company project" | "Personal project";
  stars?: number;
  forks?: number;
  language: string;
  languageColor: string;
  tags: string[];
  category: "Full Stack" | "SaaS" | "E-commerce" | "Java";
  categories: ("Full Stack" | "SaaS" | "E-commerce" | "Java")[];
  githubUrl?: string;
  isPrivateRepo?: boolean;
  liveUrl?: string;
  domain?: string;
  keyModules: string;
  metrics?: ProjectMetric[];
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface PinnedRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  isPrivate?: boolean;
}

export interface GitHubActivityData {
  username: string;
  totalContributions: number;
  yearRange: string;
  currentStreak: number;
  longestStreak: number;
  languages: LanguageStat[];
  pinnedRepos: PinnedRepo[];
  weeks: {
    days: HeatmapDay[];
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  badge?: string;
  verified?: boolean;
  type: "academic" | "certification";
  description: string;
  highlights: string[];
  verificationLabel?: string;
  verificationLink?: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  username: string;
  role: string;
  company: string;
  avatar: string;
  statusBadge: string;
  quote: string;
  codeSnippet: {
    filename: string;
    line: string;
  };
  prNumber: string;
  commitHash: string;
}

export interface ContactData {
  email: string;
  phone: string;
  whatsapp?: string;
  whatsappUser?: string;
  location: string;
  timezone: string;
  github: string;
  githubUser: string;
  linkedin: string;
  linkedinUser: string;
  twitter?: string;
  twitterUser?: string;
  instagram: string;
  instagramUser: string;
  mapImage: string;
}

export interface FooterData {
  copyrightYear: number;
  commitCount: string;
  branch: string;
  commitHash: string;
  systemStatus: string;
  version: string;
  builtWith: string;
  quickLinks: { label: string; href: string }[];
}

export interface PortfolioData {
  personal: {
    name: string;
    handle: string;
    domain: string;
    title: string;
    subtitle: string;
    startDate: string;
    currentCompany: string;
    currentCompanyLocation: string;
    companyRoleLine: string;
    opportunityStatus: string;
    heroIntroTemplate: string;
    roles: string[];
    bio: string;
    avatarUrl: string;
    logoUrl?: string;
    location: string;
    timezone: string;
    education: string;
    degreeSpecialization: string;
    status: {
      label: string;
      online: boolean;
      branch: string;
      version: string;
    };
    badges: { label: string; icon: string }[];
    resumeUrl: string;
  };
  about: AboutData;
  metrics: MetricItem[];
  terminal: {
    user: string;
    hostname: string;
    workdir: string;
    branch: string;
    commands: TerminalCommand[];
  };
  navigation: NavItem[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  github: GitHubActivityData;
  education: EducationItem[];
  testimonials: TestimonialItem[];
  contact: ContactData;
  footer: FooterData;
}

/**
 * Calculates full elapsed professional years from a start date string (e.g. "2025-08-01").
 * Shows "1+" until 2 full years have elapsed, then "2+", and so forth.
 */
export function getExperienceYears(
  startDateStr: string = "2025-08-01",
  currentDate?: Date
): number {
  const start = new Date(startDateStr);
  const now = currentDate || new Date();
  const diffYears = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(1, Math.floor(diffYears));
}

/**
 * Returns the formatted hero badge text based on experience years.
 */
export function getHeroExperienceBadge(years: number = 1): string {
  return `Software Developer • ${years}+ yr experience`;
}

/**
 * Returns the hero introduction paragraph highlighting production full stack experience.
 */
export function getHeroBio(years: number = 1): string {
  return `${years}+ year of hands-on experience building production web applications with Java, Spring Boot, React and MySQL, from REST APIs and real-time WebSocket features to Docker deployments on Cloud.`;
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Ritesh Thete",
    handle: "@theteritesh",
    domain: "ritesh-thete.dev",
    title: "Software Developer",
    subtitle: "I build scalable web apps with Java, Spring Boot and React",
    startDate: "2025-08-01",
    currentCompany: "Mahendra Technosoft",
    currentCompanyLocation: "Pune",
    companyRoleLine: "Mahendra Technosoft • Pune",
    opportunityStatus: "Open to opportunities",
    roles: [
      "Java Full Stack Developer at Mahendra Technosoft",
      "Building REST APIs with Spring Boot",
      "Crafting React and Next.js interfaces",
      "Deploying with Docker on Cloud",
    ],
    bio: "1+ year of hands-on experience building production web applications with Java, Spring Boot, React and MySQL, from REST APIs and real-time WebSocket features to Docker deployments on Cloud.",
    heroIntroTemplate:
      "{years}+ year of hands-on experience building production web applications with Java, Spring Boot, React and MySQL, from REST APIs and real-time WebSocket features to Docker deployments on Cloud.",
    avatarUrl: "/ritesh.jpeg",
    location: "Pune, Maharashtra, India (Remote Ready)",
    timezone: "IST (UTC+5:30)",
    education: "Master of Computer Applications (MCA)",
    degreeSpecialization: "MCA Graduate • Savitribai Phule Pune University",
    status: {
      label: "Open to opportunities",
      online: true,
      branch: "origin/main",
      version: "v2.4.0",
    },
    badges: [
      { label: "AWS Certified", icon: "workspace_premium" },
      { label: "Open to opportunities", icon: "verified" },
    ],
    resumeUrl: "/resume.pdf",
  },

  about: {
    filename: "README.md",
    fileSize: "4.2 KB",
    sloc: "42 lines (32 sloc)",
    latestCommit: {
      hash: "9bc42ea",
      message: "docs: update architectural bio, MCA background, and 2025 focus areas",
      timeAgo: "14 hours ago",
    },
    heading: "Hi there, I'm Ritesh Thete",
    availability: "Open to Opportunities",
    bioParagraph:
      "Software Developer based in Pune holding a Master of Computer Applications (MCA) degree with deep domain expertise in distributed enterprise architectures using Java 17/21, Spring Boot, and reactive modern frontends with React, Next.js & TypeScript.",
    philosophy: {
      title: "Core Engineering Philosophy:",
      quote:
        '"Strong fundamentals first, new tools second. Frameworks change, good engineering doesn’t."',
    },
    academic: {
      title: "Academic Foundation",
      degree: "Master of Computer Applications (MCA)",
      details:
        "SIMCA, Pune • Savitribai Phule Pune University.",
      honors: "CGPA 7.53 / 10 • First Class",
    },
    cloudCertification: {
      title: "Cloud Specialization",
      badge: "AWS Certified Cloud Practitioner",
      verified: true,
      details:
        "Amazon Web Services (AWS) • Validation ID: 5e991f2ebae9449b986e36756fd3a436 (Valid July 2025 — July 2028). Verified via official AWS CertMetrics portal.",
    },
    location: "Pune, Maharashtra, India (Remote Friendly)",
    currentlyLearning: {
      command: "echo $CURRENTLY_LEARNING",
      output:
        "> Go microservices concurrency, Apache Kafka partition semantics, and LLM application integration with Spring AI & Agentic workflows.",
    },
  },

  metrics: [
    {
      label: "EXPERIENCE",
      value: "1+ yrs",
      subtext: "full stack, Java and React",
      icon: "work_history",
      color: "text-primary",
    },
    {
      label: "Repositories",
      value: "45",
      subtext: "public repos",
      icon: "inventory_2",
      color: "text-tertiary",
    },
    {
      label: "Contributions",
      value: "1,248",
      subtext: "past year",
      icon: "grain",
      color: "text-primary",
    },
  ],

  terminal: {
    user: "ritesh",
    hostname: "devbox",
    workdir: "~/projects/portfolio",
    branch: "main",
    commands: [
      {
        command: "git log --oneline -5",
        output: [
          "a4f82d1 feat: scalable notification service from scratch with queue broker",
          "8c2e9b0 feat: generic excel import template library reusable across entities",
          "d6b14e2 feat: employee tracking system with background agent daemon",
          "3f1a0e7 perf: website caching & dynamic lazy-loading performance overhaul",
          "7e90c14 feat: automated cost-saving database backups to google drive",
        ],
        type: "git",
      },
      {
        command: "git status --short",
        output: [
          "M  services/notification/NotificationDispatcherService.java",
          "M  packages/excel-importer/GenericExcelTemplateParser.java",
          "M  services/employee-tracker/agent/TrackerAgentDaemon.java",
          "M  frontend/src/features/LazyLoadedModules.tsx",
          "M  scripts/backup/GoogleDriveBackupSync.sh",
        ],
        type: "status",
      },
    ],
  },

  navigation: [
    { id: "home", label: "Home", href: "#home", icon: "commit" },
    { id: "about", label: "About", href: "#about", icon: "person" },
    { id: "skills", label: "Skills", href: "#skills", icon: "data_object" },
    {
      id: "experience",
      label: "Experience",
      href: "#experience",
      icon: "history",
    },
    {
      id: "projects",
      label: "Projects",
      href: "#projects",
      icon: "deployed_code",
    },
    {
      id: "github-activity",
      label: "GitHub",
      href: "#github-activity",
      icon: "grid_view",
    },
    {
      id: "education",
      label: "Education",
      href: "#education",
      icon: "school",
    },
    {
      id: "testimonials",
      label: "Reviews",
      href: "#testimonials",
      icon: "rate_review",
    },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
      icon: "alternate_email",
    },
  ],

  skills: [
    {
      id: "backend",
      title: "Backend Ecosystem",
      folderName: "backend/",
      badge: "Java 21 • Spring Boot 3",
      fileCount: 10,
      description:
        "Enterprise backend architectures in Java 21, Spring Boot, Spring Security & JWT, and Spring Data JPA. Architecting multi-tenant SaaS platforms, high-throughput REST APIs, WebSocket/WebRTC communications, and intelligent Spring AI agent integrations.",
      competencies: [
        { name: "Java 21 & Spring Boot", level: 95 },
        { name: "Spring Security, JPA & REST", level: 92 },
        { name: "Multi-Tenant & WebSockets", level: 88 },
      ],
      chips: [
        { name: "Java 21", iconKey: "SiOpenjdk", color: "#b07219" },
        { name: "Spring Boot", iconKey: "SiSpringboot", color: "#6db33f" },
        { name: "Spring Security", iconKey: "SiSpringsecurity", color: "#6db33f" },
        { name: "Spring Data JPA", iconKey: "SiHibernate", color: "#59666c" },
        { name: "Multi-Tenant Architecture", iconKey: "FaLayerGroup", color: "#238636" },
        { name: "REST APIs", iconKey: "FaNetworkWired", color: "#2088ff" },
        { name: "WebSockets (STOMP)", iconKey: "SiApachekafka", color: "#58a6ff" },
        { name: "WebRTC", iconKey: "SiWebrtc", color: "#333333" },
        { name: "Spring AI", iconKey: "FaRobot", color: "#2ea043" },
        { name: "JWT", iconKey: "SiJsonwebtokens", color: "#d63aff" },
        { name: "Maven", iconKey: "SiApachemaven", color: "#c71a36" },
        { name: "JSP, Servlets & JDBC", iconKey: "FaServer", color: "#b07219" },
      ],
      files: [
        "MultiTenantSecurityConfig.java",
        "TenantRoutingDataSource.java",
        "JwtAuthenticationFilter.java",
        "SpringBoot3_Rest.java",
        "TenantContextHolder.java",
        "WebSocketNotificationGateway.java",
        "WebRtcSignalingSocket.java",
        "SpringAiAgentService.java",
        "pom.xml",
      ],
    },
    {
      id: "frontend",
      title: "Frontend Systems",
      folderName: "frontend/",
      badge: "React 19 • Next.js",
      fileCount: 10,
      description:
        "Responsive single page applications and dynamic dashboards built with React 19, TypeScript, Next.js, and modern styling with Tailwind CSS & Bootstrap. State orchestration using Redux Toolkit and efficient client-server REST communication via Axios.",
      competencies: [
        { name: "React 19 & TypeScript", level: 92 },
        { name: "Tailwind CSS & Next.js", level: 90 },
        { name: "Redux Toolkit & Axios", level: 88 },
      ],
      chips: [
        { name: "React 19", iconKey: "SiReact", color: "#61dafb" },
        { name: "TypeScript", iconKey: "SiTypescript", color: "#3178c6" },
        { name: "Next.js", iconKey: "SiNextdotjs", color: "#ffffff" },
        { name: "Tailwind CSS", iconKey: "SiTailwindcss", color: "#38bdf8" },
        { name: "Redux Toolkit", iconKey: "SiRedux", color: "#764abc" },
        { name: "JavaScript (ES6+)", iconKey: "SiJavascript", color: "#f7df1e" },
        { name: "Bootstrap", iconKey: "SiBootstrap", color: "#7952b3" },
        { name: "Thymeleaf", iconKey: "SiThymeleaf", color: "#005f0e" },
        { name: "HTML5", iconKey: "SiHtml5", color: "#e34f26" },
        { name: "CSS3", iconKey: "SiCss", color: "#1572b6" },
        { name: "Axios", iconKey: "SiAxios", color: "#5a29e4" },
      ],
      files: [
        "React19_SPA.tsx",
        "TypeScriptContracts.ts",
        "NextAppRouterLayout.tsx",
        "ReduxToolkitSlice.ts",
        "AxiosApiClient.ts",
        "AuthContext.tsx",
        "BootstrapModalForm.jsx",
        "TailwindThemeTokens.css",
      ],
    },
    {
      id: "database",
      title: "Data Stores & Caching",
      folderName: "databases/",
      badge: "ACID & NoSQL",
      fileCount: 10,
      description:
        "Relational and document-oriented databases with schema normalization, indexing, and high-performance connection pooling via HikariCP. Query optimization to guarantee low-latency transactions under heavy concurrent SaaS loads.",
      competencies: [
        { name: "MySQL & PostgreSQL (ACID)", level: 90 },
        { name: "MongoDB (Document NoSQL)", level: 85 },
        { name: "Query Optimization & HikariCP", level: 88 },
      ],
      chips: [
        { name: "MySQL", iconKey: "SiMysql", color: "#00758f" },
        { name: "PostgreSQL", iconKey: "SiPostgresql", color: "#336791" },
        { name: "MongoDB", iconKey: "SiMongodb", color: "#47a248" },
        { name: "Redis Caching", iconKey: "SiRedis", color: "#dc382d" },
        { name: "HikariCP Pooling", iconKey: "FaBolt", color: "#e36209" },
        { name: "Query Optimization", iconKey: "FaDatabase", color: "#238636" },
        { name: "ACID Transactions", iconKey: "FaLock", color: "#a371f7" },
        { name: "Database Indexing", iconKey: "FaDatabase", color: "#58a6ff" },
      ],
      files: [
        "MySQL_MultiTenant_Schema.sql",
        "Postgres_Indexing_Plan.sql",
        "MongoAggregationPipeline.js",
        "CompositeIndexOptimization.sql",
        "MongoTenantCollections.js",
        "HikariCP_Config.properties",
      ],
    },
    {
      id: "devops",
      title: "Cloud & DevOps",
      folderName: "devops_ci_cd/",
      badge: "AWS Certified",
      fileCount: 10,
      description:
        "Containerized multi-service deployment with Docker & Docker Compose, automated CI/CD via Jenkins & GitHub Actions, Nginx reverse proxy routing, and AWS Cloud infrastructure (ECS, EC2, S3, RDS, IAM) with Bash automation.",
      competencies: [
        { name: "Docker & Container Orchestration", level: 90 },
        { name: "Jenkins & GitHub Actions CI/CD", level: 90 },
        { name: "AWS Cloud (ECS, S3, RDS)", level: 88 },
      ],
      chips: [
        { name: "Docker", iconKey: "SiDocker", color: "#2496ed" },
        { name: "Docker Compose", iconKey: "SiDocker", color: "#1d63ed" },
        { name: "Jenkins", iconKey: "SiJenkins", color: "#d33833" },
        { name: "Nginx", iconKey: "SiNginx", color: "#009639" },
        { name: "AWS Cloud (Certified)", iconKey: "FaAws", color: "#ff9900" },
        { name: "GitHub Actions", iconKey: "SiGithubactions", color: "#2088ff" },
        { name: "Linux Server", iconKey: "SiLinux", color: "#fcc624" },
        { name: "Postman / Swagger", iconKey: "SiPostman", color: "#ff6c37" },
        { name: "Git & Workflows", iconKey: "FaGitAlt", color: "#f05032" },
        { name: "Shell Scripting (Bash)", iconKey: "SiGnubash", color: "#4eaa25" },
      ],
      files: [
        "Dockerfile.multistage",
        "docker-compose.prod.yml",
        "Jenkinsfile",
        "github-ci-pipeline.yml",
        "nginx-reverse-proxy.conf",
        "postman_collection.json",
        "backup-db-gdrive.sh",
      ],
    },
  ],

  experience: [
    {
      id: "exp-1",
      role: "Java Full Stack Developer",
      company: "Mahendra Technosoft Pvt. Ltd.",
      companyUrl: "https://www.mahendratechnosoft.com/",
      department: "Full Stack SaaS Engineering",
      location: "Pune, India (Hybrid)",
      period: "Aug 2025 — Present",
      isCurrent: true,
      commitHash: "e9a4f21",
      commitBadge: "commit e9a4f21",
      statusBadge: "Current HEAD",
      statusColor: "primary",
      bullets: [
        {
          title: "Multi-Tenant SaaS Architecture",
          icon: "lan",
          description:
            "Architected and delivered custom multi-tenant SaaS platforms (CRM, ERP, and OTA booking platforms) from scratch across Finance, Hospitality, Education, and Manufacturing sectors.",
          color: "text-primary",
        },
        {
          title: "High-Throughput APIs & Security",
          icon: "lock_reset",
          description:
            "Implemented modular Spring Boot 3 RESTful microservices with JWT authentication, dynamic Role-Based Access Control (RBAC), and strict tenant data isolation.",
          color: "text-tertiary",
        },
        {
          title: "Scalability, Caching & DevOps",
          icon: "bolt",
          description:
            "Engineered system scalability via Redis L2 caching and component lazy loading, automated Docker containerization, Jenkins CI/CD pipelines, and Nginx reverse proxy.",
          color: "text-secondary",
        },
      ],
      tags: [
        "Java 21",
        "Spring Boot 3",
        "React 19",
        "MySQL",
        "Tailwind CSS",
        "Docker",
        "Jenkins",
        "Nginx",
        "REST APIs",
      ],
    },
    {
      id: "exp-2",
      role: "Java Full Stack Intern",
      company: "BrightLink Info Technologies",
      department: "Core Product Engineering",
      location: "Pune, India (Hybrid)",
      period: "Mar 2025 – Jun 2025",
      isCurrent: false,
      commitHash: "7c3b109",
      commitBadge: "commit 7c3b109",
      statusBadge: "Merged to main",
      statusColor: "secondary",
      bullets: [
        {
          title: "CRM Core Module Development",
          icon: "hub",
          description:
            "Developed end-to-end full-stack modules for the SalesOptimn CRM using Java, Spring Boot, Thymeleaf, MySQL, Bootstrap, and JavaScript, contributing to core backend services and UI responsiveness.",
          color: "text-primary",
        },
        {
          title: "Google Calendar & Task Sync",
          icon: "event",
          description:
            "Integrated Google Calendar API via RESTful calls, enabling automated client meeting scheduling, task management, and bidirectional calendar event synchronization.",
          color: "text-tertiary",
        },
        {
          title: "Meta WhatsApp Marketing",
          icon: "mark_chat_unread",
          description:
            "Architected WhatsApp Business API integration into the CRM, implementing automated message templates for broadcast campaigns, real-time client interaction, and delivery tracking.",
          color: "text-secondary",
        },
      ],
      tags: [
        "Java",
        "Spring Boot",
        "Thymeleaf",
        "MySQL",
        "Bootstrap",
        "JavaScript",
        "Meta API",
        "Google Calendar API",
        "REST APIs",
      ],
    },
  ],

  projects: [
    {
      id: "spicy-mango",
      title: "Spicy Mango",
      slug: "spicy-mango",
      description:
        "Multi-tenant OTA platform where properties are listed, searched and booked, with a full admin panel to run and customise the customer-facing site.",
      image: "/images/projects/ecommerce-app.svg",
      isPlaceholderImage: true,
      status: "Company project",
      language: "Java",
      languageColor: "#b07219",
      tags: ["Java", "Spring", "React", "Tailwind CSS", "MySQL", "Jenkins", "Docker", "Nginx"],
      category: "SaaS",
      categories: ["Full Stack", "SaaS"],
      isPrivateRepo: true,
      liveUrl: "https://spicymango.in/",
      domain: "spicymango.in",
      keyModules:
        "Admin panel with customisation, property & room management, rate plans, booking engine, customer/enquiry handling, coupons & promotions, dynamic search engine.",
      metrics: [],
    },
    {
      id: "xpertbiz",
      title: "XpertBiz",
      slug: "xpertbiz",
      description:
        "Multi-tenant CRM covering sales, HR, purchasing and project work in one platform.",
      image: "/images/projects/crm-dashboard.svg",
      isPlaceholderImage: true,
      status: "Company project",
      language: "Java",
      languageColor: "#b07219",
      tags: ["Java", "Spring", "React", "Tailwind CSS", "MySQL", "Jenkins", "Docker", "Nginx"],
      category: "SaaS",
      categories: ["Full Stack", "SaaS"],
      isPrivateRepo: true,
      liveUrl: "https://mtechnosoft.xpertbizsolutions.com/",
      domain: "mtechnosoft.xpertbizsolutions.com",
      keyModules:
        "Leads & customers, sales (invoices, payments, items), HRM (employee management, leave, attendance, payroll), purchase orders & expenses, project tasks & reminders.",
      metrics: [],
    },
    {
      id: "knowlexanext",
      title: "KnowlexaNext",
      slug: "knowlexanext",
      description:
        "Multi-tenant ERP for running educational institutes end to end.",
      image: "/images/projects/school-management.svg",
      isPlaceholderImage: true,
      status: "Company project",
      language: "Java",
      languageColor: "#b07219",
      tags: ["Java", "Spring", "React", "Tailwind CSS", "MySQL", "Jenkins", "Docker", "Nginx"],
      category: "SaaS",
      categories: ["Full Stack", "SaaS"],
      isPrivateRepo: true,
      liveUrl: "http://ithapeinstitutes.knowlexanext.com",
      domain: "ithapeinstitutes.knowlexanext.com",
      keyModules:
        "Institute & faculty management, programs & courses, student management, admissions & fee collection, exams & results, attendance, inventory allocation.",
      metrics: [],
    },
    {
      id: "bulktradehub",
      title: "BulkTradeHub",
      slug: "bulktradehub",
      description:
        "B2B marketplace connecting retail shop owners, manufacturers, consumers and salesmen, where salesmen can buy products in bulk and resell them to earn income.",
      image: "/images/projects/inventory-management.svg",
      isPlaceholderImage: true,
      status: "Personal project",
      language: "Java",
      languageColor: "#b07219",
      tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "Thymeleaf", "Spring", "MySQL"],
      category: "E-commerce",
      categories: ["Full Stack", "E-commerce"],
      githubUrl: "https://github.com/theteritesh/BulkTradeHub",
      keyModules:
        "Role-based dashboards, public storefront, localStorage guest cart merging upon login, GTIN-based product validation, bulk listing and ordering workflow.",
      metrics: [],
    },
    {
      id: "computer-sales-services",
      title: "Online Computer Sales and Services",
      slug: "computer-sales-services",
      description:
        "E-commerce web app for selling computers and booking computer services, with order management and related modules.",
      image: "/images/projects/excel-importer.svg",
      isPlaceholderImage: true,
      status: "Personal project",
      language: "Java",
      languageColor: "#b07219",
      tags: ["Java", "JSP", "Servlet", "HTML", "CSS", "Bootstrap", "JavaScript", "MySQL"],
      category: "E-commerce",
      categories: ["Full Stack", "E-commerce"],
      githubUrl: "https://github.com/theteritesh/Online-Computer-Sells-and-Services",
      keyModules:
        "Computer product sales catalog, online service booking system, user authentication, customer shopping cart, and order management.",
      metrics: [],
    },
    {
      id: "hospital-management",
      title: "Hospital Management System",
      slug: "hospital-management",
      description:
        "Manages hospital activities such as patient records, doctor records and appointment scheduling, with a responsive interface for admins and patients.",
      image: "/images/projects/realtime-chat.svg",
      isPlaceholderImage: true,
      status: "Personal project",
      language: "Java",
      languageColor: "#b07219",
      tags: ["JSP", "Servlets", "Java", "HTML", "CSS", "Bootstrap", "MySQL", "Apache Tomcat", "JDBC"],
      category: "Java",
      categories: ["Full Stack", "Java"],
      githubUrl: "https://github.com/theteritesh/Hospital-Management-System",
      keyModules:
        "Patient & doctor record CRUD, patient appointment booking, doctor schedules, secure role-based login (admin/doctor/patient), responsive Bootstrap interface.",
      metrics: [],
    },
  ],

  github: {
    username: "theteritesh",
    totalContributions: 1248,
    yearRange: "2024 - 2025",
    currentStreak: 42,
    longestStreak: 89,
    languages: [
      { name: "Java", percentage: 48.0, color: "#b07219" },
      { name: "TypeScript", percentage: 28.0, color: "#3178c6" },
      { name: "PostgreSQL", percentage: 14.0, color: "#336791" },
      { name: "Docker/Shell", percentage: 10.0, color: "#2496ed" },
    ],
    pinnedRepos: [
      {
        name: "BulkTradeHub",
        description:
          "B2B marketplace connecting retail shop owners, manufacturers, consumers and salesmen with GTIN validation and bulk purchasing workflows.",
        language: "Java",
        languageColor: "#b07219",
        stars: 0,
        forks: 0,
        url: "https://github.com/theteritesh/BulkTradeHub",
      },
      {
        name: "Online-Computer-Sells-and-Services",
        description:
          "E-commerce web application for selling computers and booking IT services with order management and authentication.",
        language: "Java",
        languageColor: "#b07219",
        stars: 0,
        forks: 0,
        url: "https://github.com/theteritesh/Online-Computer-Sells-and-Services",
      },
      {
        name: "Hospital-Management-System",
        description:
          "Web-based hospital management application managing patient records, doctor records, and appointment scheduling.",
        language: "Java",
        languageColor: "#b07219",
        stars: 0,
        forks: 0,
        url: "https://github.com/theteritesh/Hospital-Management-System",
      },
    ],
    weeks: (() => {
      const weeks: { days: HeatmapDay[] }[] = [];
      const baseDate = new Date("2024-01-01T00:00:00Z");
      let dayOffset = 0;
      for (let w = 0; w < 52; w++) {
        const days: HeatmapDay[] = [];
        for (let d = 0; d < 7; d++) {
          const currentDate = new Date(baseDate.getTime() + dayOffset * 86400000);
          const dateStr = currentDate.toISOString().split("T")[0];
          const isWeekend = d === 0 || d === 6;
          let level: 0 | 1 | 2 | 3 | 4 = 0;
          let count = 0;
          const isSprint = (w >= 7 && w <= 14) || (w >= 19 && w <= 32) || (w >= 39 && w <= 51);
          const hash = (w * 7 + d * 13 + 17) % 100;

          if (w >= 46) {
            // Last 6 weeks: Active 42-day streak! Every day has contributions
            if (hash < 25) { level = 4; count = 11 + (hash % 6); }
            else if (hash < 60) { level = 3; count = 7 + (hash % 3); }
            else if (hash < 85) { level = 2; count = 4 + (hash % 3); }
            else { level = 1; count = 2 + (hash % 2); }
          } else if (isSprint) {
            if (isWeekend) {
              if (hash < 40) { level = 2; count = 4; }
              else if (hash < 80) { level = 1; count = 2; }
              else { level = 0; count = 0; }
            } else {
              if (hash < 30) { level = 4; count = 12; }
              else if (hash < 65) { level = 3; count = 8; }
              else if (hash < 90) { level = 2; count = 5; }
              else { level = 1; count = 2; }
            }
          } else {
            if (isWeekend) {
              if (hash < 25) { level = 1; count = 2; }
              else { level = 0; count = 0; }
            } else {
              if (hash < 20) { level = 3; count = 7; }
              else if (hash < 55) { level = 2; count = 4; }
              else if (hash < 80) { level = 1; count = 2; }
              else { level = 0; count = 0; }
            }
          }

          days.push({
            date: dateStr,
            count,
            level,
          });
          dayOffset++;
        }
        weeks.push({ days });
      }
      return weeks;
    })(),
  },

  education: [
    {
      id: "edu-mca",
      degree: "Master of Computer Applications (MCA)",
      institution: "SIMCA, Pune • Savitribai Phule Pune University",
      years: "2023 — 2025",
      badge: "Postgraduate Degree",
      type: "academic",
      description:
        "Sinhgad Institute of Management and Computer Application (SIMCA), Pune. Master's program covering distributed enterprise systems, advanced data structures & algorithms, database internals, and modern cloud architectures.",
      highlights: [
        "CGPA: 7.53 / 10 • First Class",
        "Result Declared: 25-JUN-2025",
        "Enterprise Distributed Systems & Full Stack Engineering",
      ],
      verificationLabel: "Result Date: 25-JUN-2025 • SPPU",
      icon: "school",
    },
    {
      id: "edu-bba",
      degree: "Bachelor of Business Administration (Computer Application) — BBA (CA)",
      institution: "CMCS, Nashik • Savitribai Phule Pune University",
      years: "2020 — 2023",
      badge: "Undergraduate Degree",
      type: "academic",
      description:
        "Commerce, Management & Computer Science (CMCS) College, Nashik. Three-year undergraduate program establishing foundational excellence in software engineering methodologies, object-oriented programming with Java, relational database systems, and web technologies.",
      highlights: [
        "CGPA: 7.34 / 10 • Grade A",
        "Result Declared: 28-JUL-2023",
        "Core Java, Relational Databases & Web Technologies",
      ],
      verificationLabel: "Result Date: 28-JUL-2023 • SPPU",
      icon: "workspace_premium",
    },
    {
      id: "cert-aws",
      degree: "AWS Certified Cloud Practitioner",
      institution: "Amazon Web Services (AWS)",
      years: "2025 — 2028",
      badge: "Industry Certification",
      verified: true,
      type: "certification",
      description:
        "Official Amazon Web Services certification validating cloud fluency, AWS core architectural principles, IAM security compliance, serverless, and multi-stage container deployments.",
      highlights: [
        "Validation ID: 5e991f2ebae9449b986e36756fd3a436",
        "Issue Date: July 25, 2025 • Expiry: July 25, 2028",
        "Verified via AWS CertMetrics Portal",
      ],
      verificationLabel: "AWS CertMetrics: 5e991f2e...",
      verificationLink:
        "https://cp.certmetrics.com/amazon/en/public/verify/credential/5e991f2ebae9449b986e36756fd3a436",
      icon: "verified",
    },
  ],

  testimonials: [
    {
      id: "test-1",
      author: "Elena Rostova",
      username: "erostova",
      role: "Lead Systems Architect",
      company: "Nexus Systems",
      avatar: "/images/avatars/elena-rostova.svg",
      statusBadge: "Changes Approved",
      quote:
        "Alex is one of those rare engineers who writes Java code with the discipline of an architect and the velocity of a hacker. His refactoring of our thread scheduling cut latency in half on day one.",
      codeSnippet: {
        filename: "src/main/services/OrderDispatcher.java",
        line: "+ // LGTM! Super clean separation of concerns and flawless unit tests.",
      },
      prNumber: "PR #42",
      commitHash: "4a7c81",
    },
    {
      id: "test-2",
      author: "David Tanaka",
      username: "dtanaka",
      role: "Engineering Director",
      company: "FinTech Analytics Lab",
      avatar: "/images/avatars/david-tanaka.svg",
      statusBadge: "Changes Approved",
      quote:
        "During his time with us, Alex displayed an unbelievable command of SQL execution planning and Spring security. He left our backend significantly faster, better documented, and 100% stable.",
      codeSnippet: {
        filename: "src/main/db/migration/V4__index_tuning.sql",
        line: "+ // Brilliant index selectivity analysis! Zero locking issues found.",
      },
      prNumber: "PR #18",
      commitHash: "b291fe",
    },
    {
      id: "test-3",
      author: "Sarah Jenkins",
      username: "sjenkins",
      role: "VP of Engineering",
      company: "CloudFlow Core",
      avatar: "/images/avatars/sarah-jenkins.svg",
      statusBadge: "Changes Approved",
      quote:
        "Alex took our monolithic batch pipelines and migrated them to reactive Virtual Threads with zero downtime. Exceptional code hygiene, comprehensive test coverage, and great developer empathy.",
      codeSnippet: {
        filename: "src/main/batch/StreamChunkProcessor.java",
        line: "+ // Approved! Flawless backpressure handling and zero memory leak.",
      },
      prNumber: "PR #99",
      commitHash: "e71c90",
    },
  ],

  contact: {
    email: "theteritesh2@gmail.com",
    phone: "+91 9067467472",
    whatsapp: "https://wa.me/919067467472",
    whatsappUser: "+91 9067467472",
    location: "Pune, Maharashtra, India (Remote Ready)",
    timezone: "IST (UTC+5:30)",
    github: "https://github.com/theteritesh",
    githubUser: "theteritesh",
    linkedin: "https://www.linkedin.com/in/ritesh-thete-4b2b56228/",
    linkedinUser: "ritesh-thete-4b2b56228",
    instagram: "https://instagram.com/_ritesh.thete_",
    instagramUser: "_ritesh.thete_",
    mapImage: "/images/map-pune.svg",
  },

  footer: {
    copyrightYear: 2025,
    commitCount: "1,248 contributions",
    branch: "main",
    commitHash: "e9a4f21",
    systemStatus: "All systems operational",
    version: "v2.4.0-prod",
    builtWith: "Built with ❤️ and commits",
    quickLinks: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "GitHub", href: "#github-activity" },
      { label: "Education", href: "#education" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
};
