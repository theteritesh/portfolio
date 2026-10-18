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

  about: {
    filename: "README.md",
    fileSize: "4.2 KB",
    sloc: "42 lines (32 sloc)",
    latestCommit: {
      hash: "9bc42ea",
      message: "docs: update architectural bio, MCA background, and 2025 focus areas",
      timeAgo: "14 hours ago",
    },
    heading: "Hi there, I'm Alex Morgan",
    availability: "Available Q2/Q3 2025",
    bioParagraph:
      "Full Stack Software Developer holding a Master of Computer Applications (MCA) degree with deep domain expertise in distributed enterprise architectures using Java 17/21, Spring Boot, and reactive modern frontends with React & TypeScript.",
    philosophy: {
      title: "Core Engineering Philosophy:",
      quote:
        '"Write testable code with deterministic side-effects. Treat infrastructure as code, design for horizontal scale, and prioritize zero-friction developer ergonomics."',
    },
    academic: {
      title: "Academic Foundation",
      degree: "Master of Computer Applications (MCA)",
      details:
        "Comprehensive specializations in Distributed Computing, Advanced Data Structures & Algorithms, Database Internals, and Computer Networks. Graduated with Honors.",
      honors: "First Class with Distinction",
    },
    cloudCertification: {
      title: "Cloud Specialization",
      badge: "AWS Certified Cloud Practitioner",
      verified: true,
      details:
        "Experienced deploying production clusters using Amazon ECS, RDS PostgreSQL, S3 lifecycle policies, and multi-stage container builds with GitHub Actions CI/CD pipelines.",
    },
    location: "San Francisco, CA (Remote Friendly)",
    currentlyLearning: {
      command: "echo $CURRENTLY_LEARNING",
      output:
        "> Go microservices concurrency, Kubernetes operators, Apache Kafka partition semantics.",
    },
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
      id: "backend",
      title: "Backend Ecosystem",
      folderName: "backend/",
      badge: "v21.0-LTS",
      fileCount: 5,
      description:
        "Deep mastery of Java virtual machine internals, reactive multithreading, Spring Boot starter compositions, Hibernate/JPA caching, and bidirectional STOMP WebSockets.",
      competencies: [
        { name: "Java & Spring Boot", level: 95 },
        { name: "REST APIs & WebSockets", level: 90 },
      ],
      chips: [
        { name: "Java 21", iconKey: "SiOpenjdk", color: "#b07219" },
        { name: "Spring Boot", iconKey: "SiSpringboot", color: "#6db33f" },
        { name: "Hibernate", iconKey: "SiHibernate", color: "#59666c" },
        { name: "Kafka", iconKey: "SiApachekafka", color: "#231f20" },
      ],
      files: [
        "JavaSE_21.java",
        "SpringBoot3_Rest.java",
        "Hibernate_JPA.java",
        "WebSocketGateway.java",
        "KafkaEventConsumer.java",
      ],
    },
    {
      id: "frontend",
      title: "Frontend Systems",
      folderName: "frontend/",
      badge: "ESNext",
      fileCount: 4,
      description:
        "High-performance single page applications with React 19, strict TypeScript contracts, Tailwind utility workflows, client state management, and real-time socket ingestion.",
      competencies: [
        { name: "React & TypeScript", level: 92 },
        { name: "Modern Tailwind / CSS", level: 88 },
      ],
      chips: [
        { name: "React 19", iconKey: "SiReact", color: "#61dafb" },
        { name: "TypeScript", iconKey: "SiTypescript", color: "#3178c6" },
        { name: "Next.js", iconKey: "SiNextdotjs", color: "#ffffff" },
        { name: "Tailwind CSS", iconKey: "SiTailwindcss", color: "#38bdf8" },
        { name: "Vite", iconKey: "SiVite", color: "#646cff" },
        { name: "Redux / Zustand", iconKey: "SiRedux", color: "#764abc" },
      ],
      files: [
        "React19_SPA.tsx",
        "TypeScript_ES6.ts",
        "TailwindTokens.css",
        "ZustandStore.ts",
      ],
    },
    {
      id: "database",
      title: "Data Stores & ACID",
      folderName: "databases/",
      badge: "Relational",
      fileCount: 3,
      description:
        "Complex schema normalization, index performance tuning, connection pooling with HikariCP, stored procedures, and distributed transaction isolation levels.",
      competencies: [
        { name: "PostgreSQL & MySQL", level: 88 },
        { name: "Redis In-Memory Caching", level: 86 },
      ],
      chips: [
        { name: "PostgreSQL", iconKey: "SiPostgresql", color: "#336791" },
        { name: "MySQL", iconKey: "SiMysql", color: "#00758f" },
        { name: "Redis", iconKey: "SiRedis", color: "#dc382d" },
      ],
      files: [
        "PostgreSQL_ACID.sql",
        "MySQL_Cluster.sql",
        "Redis_Cache.conf",
      ],
    },
    {
      id: "devops",
      title: "Cloud & DevOps",
      folderName: "devops_ci_cd/",
      badge: "AWS Certified",
      fileCount: 4,
      description:
        "Continuous deployment using GitHub Actions, container orchestration via Docker Compose & AWS ECS, infrastructure provisioning, and production logging.",
      competencies: [
        { name: "Docker & AWS Deployment", level: 85 },
        { name: "CI/CD GitHub Actions", level: 90 },
      ],
      chips: [
        { name: "Docker", iconKey: "SiDocker", color: "#2496ed" },
        { name: "AWS ECS", iconKey: "FaAws", color: "#ff9900" },
        { name: "GitHub Actions", iconKey: "SiGithubactions", color: "#2088ff" },
        { name: "Linux Server", iconKey: "SiLinux", color: "#fcc624" },
        { name: "Kubernetes", iconKey: "SiKubernetes", color: "#326ce5" },
        { name: "Nginx", iconKey: "SiNginx", color: "#009639" },
      ],
      files: [
        "Dockerfile.multi",
        "aws-infra-cdk.yml",
        "github-actions.yml",
        "nginx.conf",
      ],
    },
  ],

  experience: [
    {
      id: "exp-1",
      role: "Java Full Stack Developer",
      company: "NexaTech Solutions • Distributed Cloud Team",
      department: "Distributed Cloud Team",
      location: "San Francisco, CA (Hybrid)",
      period: "2025 — Present",
      isCurrent: true,
      commitHash: "e9a4f21",
      commitBadge: "commit e9a4f21",
      statusBadge: "Current HEAD",
      statusColor: "primary",
      bullets: [
        {
          title: "Latency Optimization",
          icon: "bolt",
          description:
            "Architected Spring Boot 3 microservices with Redis L2 caching, dropping median API response latency by 42% under 15,000 req/sec load.",
          color: "text-primary",
        },
        {
          title: "Reactive SPA Frontends",
          icon: "dashboard",
          description:
            "Built modular React 18 administrative dashboards with dynamic permission trees, WebSocket event streams, and real-time telemetry graphs.",
          color: "text-tertiary",
        },
        {
          title: "Automated Pipelines",
          icon: "cloud_sync",
          description:
            "Integrated zero-downtime blue/green deployment workflows to AWS ECS via GitHub Actions, running complete JUnit and integration suites.",
          color: "text-secondary",
        },
      ],
      tags: ["Java 21", "Spring Boot 3", "React 19", "AWS ECS", "Redis", "Kafka"],
    },
    {
      id: "exp-2",
      role: "Java Full Stack Developer Intern",
      company: "CodeCraft Labs • Core Infrastructure",
      department: "Core Infrastructure",
      location: "San Francisco, CA",
      period: "2025",
      isCurrent: false,
      commitHash: "7c3b109",
      commitBadge: "commit 7c3b109",
      statusBadge: "Merged to main",
      statusColor: "secondary",
      bullets: [
        {
          title: "SQL Indexing Overhaul",
          icon: "database",
          description:
            "Optimized 18 complex PostgreSQL analytical queries and multi-table joins, yielding a 65% reduction in CPU lock waits on heavy transactional tables.",
          color: "text-primary",
        },
        {
          title: "RESTful Gateway",
          icon: "api",
          description:
            "Developed 12 robust REST endpoints using Java Spring MVC with OpenAPI v3 specs, automated DTO validation, and centralized exception handling.",
          color: "text-tertiary",
        },
        {
          title: "Test Coverage",
          icon: "bug_report",
          description:
            "Authored unit and regression test suites using JUnit 5, Mockito, and AssertJ, expanding test coverage across core payments domain from 45% to 88%.",
          color: "text-secondary",
        },
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
