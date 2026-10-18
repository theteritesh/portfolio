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

export interface SkillItem {
  name: string;
  level: number;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  badge: string;
  description: string;
  skills: SkillItem[];
  tags: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  branch: string;
  commitHash: string;
  description: string[];
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  prNumber: string;
  status: "Merged" | "Open" | "Draft";
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  snippet?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    handle: string;
    domain: string;
    title: string;
    subtitle: string;
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
  contact: {
    email: string;
    github: string;
    githubUser: string;
    linkedin: string;
    linkedinUser: string;
    twitter: string;
    twitterUser: string;
    location: string;
    timezone: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Alex Morgan",
    handle: "@alexmorgan",
    domain: "alexmorgan.dev",
    title: "Full Stack Software Developer",
    subtitle: "I build scalable web apps with Java, Spring Boot and React",
    roles: [
      "I build scalable web apps with Java, Spring Boot and React",
      "Architecting fault-tolerant distributed microservices",
      "Engineering high-throughput event-driven systems",
      "Crafting reactive, type-safe full-stack experiences",
    ],
    bio: "Passionate software craftsperson focused on distributed architectures, high-throughput microservices, and reactive frontend ecosystems. Architecting resilient web infrastructure with clean Git provenance.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcV-E1eITp2yUj4_p89kYLb4G8A7vYacaccppfpyg44Mkq7mCTLYf5hukoSNFpEY_vNi56X2WVzbNqyoyI26iCiCIiJ6T1mvKgGiiqJQOkxb9DtFUIBNkXCsQH5FRhLd6RcsGEbLkeIv-ObMqLkFf7HwTIY-hTOEDb7jI82t2onZRQ7YGnbIwtf35qi466XuHvpc27vWIcb8WRfdymNeChoROvWp3_zRlO9KLMnQ-YqABjN6Djphp-",
    location: "San Francisco, CA (Remote Ready)",
    timezone: "PST (UTC-8)",
    education: "Master of Computer Applications (MCA)",
    degreeSpecialization: "MCA Graduate • Full Stack",
    status: {
      label: "Open to work",
      online: true,
      branch: "origin/main",
      version: "v2.4.0",
    },
    badges: [
      { label: "AWS Certified", icon: "workspace_premium" },
      { label: "100% On-Time Delivery", icon: "verified" },
    ],
    resumeUrl: "#resume",
  },

  metrics: [
    {
      label: "Repositories",
      value: "45",
      subtext: "+8 this yr",
      icon: "inventory_2",
      color: "text-tertiary",
    },
    {
      label: "Contributions",
      value: "1,248",
      subtext: "pts",
      icon: "grain",
      color: "text-primary",
    },
    {
      label: "Network",
      value: "120",
      subtext: "followers",
      icon: "group",
      color: "text-secondary",
    },
  ],

  terminal: {
    user: "alex",
    hostname: "devbox",
    workdir: "~/projects/portfolio",
    branch: "main",
    commands: [
      {
        command: "git checkout -b feature/launch-2025",
        output: ["Switched to a new branch 'feature/launch-2025'"],
        type: "git",
      },
      {
        command: "mvn spring-boot:run --quiet & npm run dev",
        output: [
          "[INFO] Tomcat started on port 8080 (http) with context path ''",
          "[VITE] ready in 241 ms → Local: http://localhost:5173/",
          "[AUTH] AWS IAM Role: arn:aws:iam::01928491:role/AlexPortfolioApp",
        ],
        type: "build",
      },
      {
        command: "git status --short",
        output: [
          "M  src/main/java/com/alex/service/MicroservicesEngine.java",
          "M  frontend/src/components/GitInteractiveGraph.tsx",
          "A  docs/ARCHITECTURE_DECISION_RECORDS.md",
          "?? tests/e2e/cypress/integration/portfolio.spec.ts",
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
      label: "GitHub Activity",
      href: "#github-activity",
      icon: "grid_view",
    },
    { id: "blog", label: "Blog", href: "#blog", icon: "description" },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
      icon: "alternate_email",
    },
  ],

  skills: [
    {
      title: "Backend Ecosystem",
      badge: "JDK21 / Spring",
      description:
        "Deep mastery of Java virtual machine internals, reactive multithreading, Spring Boot starter compositions, Hibernate/JPA caching, and bidirectional STOMP WebSockets.",
      skills: [
        { name: "Java & Spring Boot", level: 95, featured: true },
        { name: "REST APIs & WebSockets", level: 90, featured: true },
        { name: "Hibernate / JPA", level: 88 },
        { name: "Microservices Architecture", level: 92 },
      ],
      tags: ["Java 21", "Spring Boot", "Hibernate", "Virtual Threads", "Kafka"],
    },
    {
      title: "Frontend Systems",
      badge: "ESNext",
      description:
        "High-performance single page applications with React 19, strict TypeScript contracts, Tailwind utility workflows, client state management, and real-time socket ingestion.",
      skills: [
        { name: "React & TypeScript", level: 92, featured: true },
        { name: "Modern Tailwind / CSS", level: 88, featured: true },
        { name: "Next.js App Router", level: 90 },
        { name: "State Stores (Zustand/Redux)", level: 85 },
      ],
      tags: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Zustand"],
    },
    {
      title: "Data Stores & ACID",
      badge: "Refactored",
      description:
        "Complex schema normalization, index performance tuning, connection-pooling with HikariCP, stored procedures, and distributed transaction isolation levels.",
      skills: [
        { name: "PostgreSQL & MySQL", level: 90, featured: true },
        { name: "Redis In-Memory Caching", level: 86 },
        { name: "Database Schema Migrations", level: 88 },
      ],
      tags: ["PostgreSQL", "MySQL", "HikariCP", "Redis", "Flyway"],
    },
    {
      title: "Cloud & DevOps",
      badge: "AWS Certified",
      description:
        "Continuous deployment using GitHub Actions, container orchestration via Docker Compose & AWS ECS, infrastructure provisioning, and production logging.",
      skills: [
        { name: "Docker & AWS Deployment", level: 85, featured: true },
        { name: "CI/CD GitHub Actions", level: 90, featured: true },
        { name: "Linux Server Administration", level: 88 },
      ],
      tags: ["Docker", "AWS", "GitHub Actions", "Linux", "Nginx"],
    },
  ],

  experience: [
    {
      role: "Java Full Stack Developer",
      company: "Nexus Enterprise Systems",
      location: "San Francisco, CA (Hybrid)",
      period: "Jan 2023 - Present",
      isCurrent: true,
      branch: "commit e04af21",
      commitHash: "e04af21",
      description: [
        "Architecting distributed microservices with Redis L2 caching, dropping median API response latency by 42% under 15,000 req/sec load.",
        "Built modular React 19 administrative dashboard with dynamic permission trees, WebSocket event streams, and real-time telemetry graphs.",
        "Integrated zero-downtime blue/green deployment workflows to AWS ECS via GitHub Actions, running complete JUnit and integration suites.",
      ],
      tags: ["Java 21", "Spring Boot", "React 19", "AWS ECS", "Redis", "Kafka"],
    },
    {
      role: "Software Engineer Intern",
      company: "FinTech Analytics Lab",
      location: "San Francisco, CA",
      period: "May 2022 - Dec 2022",
      isCurrent: false,
      branch: "commit 71201dd",
      commitHash: "71201dd",
      description: [
        "Optimized 16 complex PostgreSQL analytical queries and multi-table joins, yielding a 65% reduction in CPU lock waits on heavy transactional tables.",
        "Developed 12 robust REST endpoints using Java Spring MVC with OpenAPI v3 specs, automated DTO validation, and centralized exception handling.",
        "Authored unit and regression test suites using JUnit 5, Mockito, and AssertJ, expanding test coverage across core payments domain from 45% to 89%.",
      ],
      tags: ["Java", "Spring MVC", "PostgreSQL", "JUnit 5", "Mockito", "Docker"],
    },
  ],

  projects: [
    {
      id: "cloud-flow-orchestrator",
      title: "cloud-flow-orchestrator",
      description:
        "Distributed task orchestration engine built on Java 21 Virtual Threads and Spring Boot. Handles millions of delayed event queues with zero thread pool saturation.",
      prNumber: "#42",
      status: "Merged",
      stars: 142,
      forks: 44,
      language: "Java",
      languageColor: "#b07219",
      tags: ["Java 21", "Spring Boot", "Virtual Threads", "Kafka"],
      githubUrl: "https://github.com/alexmorgan-dev/cloud-flow-orchestrator",
      liveUrl: "https://cloud-flow.alexmorgan.dev",
      snippet: "+ ExecutorService taskPool = Executors.newVirtualThreadPerTaskExecutor();",
    },
    {
      id: "pulsar-realtime-analytics",
      title: "pulsar-realtime-analytics",
      description:
        "High-throughput financial dashboard in React and WebSocket with OpenAPI v3 specs, bidirectional order book depth matrices.",
      prNumber: "#18",
      status: "Open",
      stars: 89,
      forks: 21,
      language: "TypeScript",
      languageColor: "#3178c6",
      tags: ["React 19", "TypeScript", "WebSockets", "Tailwind"],
      githubUrl: "https://github.com/alexmorgan-dev/pulsar-realtime-analytics",
      liveUrl: "https://pulsar.alexmorgan.dev",
      snippet: "+ const orderBookStream$ = useOrderBookSocket(symbol);",
    },
    {
      id: "nexus-vault-security",
      title: "nexus-vault-security",
      description:
        "OAuth2 / OIDC authorization server with role-based fine-grained access control, JWT cryptographic signing, and automated token revocation via Redis.",
      prNumber: "#34",
      status: "Merged",
      stars: 212,
      forks: 56,
      language: "Java",
      languageColor: "#b07219",
      tags: ["Spring Security", "Redis", "JWT Auth", "AWS IAM"],
      githubUrl: "https://github.com/alexmorgan-dev/nexus-vault-security",
      snippet: "+ @PreAuthorize(\"hasAuthority('SCOPE_project:write')\")",
    },
    {
      id: "sql-optimizer-inspector",
      title: "sql-optimizer-inspector",
      description:
        "Automated database explain-plan visualizer parsing PostgreSQL and MySQL AST query trees to recommend composite index layouts and detect sequential scans.",
      prNumber: "#11",
      status: "Merged",
      stars: 388,
      forks: 37,
      language: "PostgreSQL",
      languageColor: "#336791",
      tags: ["PostgreSQL", "Java", "Tailwind"],
      githubUrl: "https://github.com/alexmorgan-dev/sql-optimizer-inspector",
      snippet: "+ analyzeExecutionPlanTree(queryExecutionPlan);",
    },
    {
      id: "docker-cluster-deployer",
      title: "docker-cluster-deployer",
      description:
        "Lightweight container provisioning utility with swarm health checks, automated TLS provisioning with Let's Encrypt, and zero-downtime rollback hooks.",
      prNumber: "#05",
      status: "Merged",
      stars: 104,
      forks: 32,
      language: "Shell",
      languageColor: "#89e051",
      tags: ["Docker", "AWS ECS", "Bash", "GitHub Actions"],
      githubUrl: "https://github.com/alexmorgan-dev/docker-cluster-deployer",
      snippet: "+ docker compose up -d --scale worker=8",
    },
    {
      id: "react-kanban-gitflow",
      title: "react-kanban-gitflow",
      description:
        "Full-featured agile kanban board with drag-and-drop state syncing to Git branches, PR timeline visualizers, and offline optimistic updates.",
      prNumber: "#27",
      status: "Open",
      stars: 304,
      forks: 19,
      language: "TypeScript",
      languageColor: "#3178c6",
      tags: ["React 19", "GraphQL", "Zustand", "Tailwind"],
      githubUrl: "https://github.com/alexmorgan-dev/react-kanban-gitflow",
      snippet: "+ optimisticUpdateCard(boardId, cardId);",
    },
  ],

  contact: {
    email: "alex.morgan.dev@gmail.com",
    github: "https://github.com/alexmorgan-dev",
    githubUser: "alexmorgan-dev",
    linkedin: "https://linkedin.com/in/alexmorgan-dev",
    linkedinUser: "alexmorgan-dev",
    twitter: "https://twitter.com/alexmorgan_dev",
    twitterUser: "@alexmorgan_dev",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
  },
};
