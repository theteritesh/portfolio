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
  slug: string;
  description: string;
  image: string;
  prNumber: string;
  status: "Merged" | "Open" | "Draft";
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  tags: string[];
  category: "Java" | "React" | "Spring Boot" | "Full Stack";
  githubUrl: string;
  liveUrl?: string;
  snippet?: string;
  codeSnippet?: {
    addition?: string;
    deletion?: string;
    comment?: string;
  };
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
  github: GitHubActivityData;
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
      id: "school-management",
      title: "School Management System",
      slug: "school-management-system",
      description:
        "Comprehensive student information system featuring RBAC, course registration workflows, fee processing, and automated report card generation.",
      image: "/images/projects/school-management.svg",
      prNumber: "#12",
      status: "Merged",
      stars: 54,
      forks: 22,
      language: "Java",
      languageColor: "#b07219",
      tags: ["Spring Boot", "React", "MySQL", "JWT Auth"],
      category: "Java",
      githubUrl: "https://github.com/alexmorgan-dev/school-management-system",
      liveUrl: "https://school-demo.alexmorgan.dev",
      snippet: "+ registerStudentEnrollment(studentId, courseId)",
      codeSnippet: {
        addition: "+ registerStudentEnrollment(studentId, courseId)",
        comment: "// Enforces prerequisite constraints & audit log",
      },
    },
    {
      id: "crm-dashboard",
      title: "CRM Dashboard & Analytics",
      slug: "crm-dashboard-analytics",
      description:
        "Enterprise analytics hub for sales funnels, pipeline conversions, dynamic customer segmentation, and JWT-authenticated deal management.",
      image: "/images/projects/crm-dashboard.svg",
      prNumber: "#34",
      status: "Open",
      stars: 33,
      forks: 18,
      language: "TypeScript",
      languageColor: "#3178c6",
      tags: ["React", "Spring Boot", "Chart.js", "PostgreSQL"],
      category: "React",
      githubUrl: "https://github.com/alexmorgan-dev/crm-analytics-dashboard",
      liveUrl: "https://crm.alexmorgan.dev",
      snippet: "+ const funnelMetrics = usePipelineMetrics(timeframe)",
      codeSnippet: {
        addition: "+ const funnelMetrics = usePipelineMetrics(timeframe)",
        comment: "// Aggregates deal velocity & stage conversions",
      },
    },
    {
      id: "realtime-chat",
      title: "Real-time Chat with WebSocket",
      slug: "realtime-chat-websocket",
      description:
        "Low-latency message streaming room app featuring real-time presence heartbeats, message delivery acknowledgements, end-to-end pub/sub broadcasting.",
      image: "/images/projects/realtime-chat.svg",
      prNumber: "#77",
      status: "Merged",
      stars: 34,
      forks: 21,
      language: "Java",
      languageColor: "#b07219",
      tags: ["STOMP/WebSocket", "Redis", "Spring Boot", "React"],
      category: "Spring Boot",
      githubUrl: "https://github.com/alexmorgan-dev/realtime-chat-websocket",
      liveUrl: "https://chat.alexmorgan.dev",
      snippet: "+ simpMessagingTemplate.convertAndSend('/topic/room', msg)",
      codeSnippet: {
        addition: "+ simpMessagingTemplate.convertAndSend('/topic/room', msg)",
        comment: "// Low-latency STOMP broker routing",
      },
    },
    {
      id: "inventory-management",
      title: "Inventory Management & Warehousing",
      slug: "inventory-management-warehousing",
      description:
        "Multi-facility warehouse inventory tracking with automated reorder levels, batch SKU scanning, supplier order generation, and real-time ledger audits.",
      image: "/images/projects/inventory-management.svg",
      prNumber: "#42",
      status: "Merged",
      stars: 61,
      forks: 34,
      language: "Java",
      languageColor: "#b07219",
      tags: ["Java", "Spring Boot", "Docker", "PostgreSQL"],
      category: "Java",
      githubUrl: "https://github.com/alexmorgan-dev/inventory-management-system",
      liveUrl: "https://inventory.alexmorgan.dev",
      snippet: "+ adjustStockLevel(sku, warehouseId, quantityDelta)",
      codeSnippet: {
        addition: "+ adjustStockLevel(sku, warehouseId, quantityDelta)",
        comment: "// Optimistic locking prevents race conditions",
      },
    },
    {
      id: "ecommerce-app",
      title: "E-commerce Cloud Store",
      slug: "ecommerce-cloud-store",
      description:
        "Full-stack storefront with Stripe checkout integration, product catalog filtering, real-time inventory checks, and transactional customer invoice delivery.",
      image: "/images/projects/ecommerce-app.svg",
      prNumber: "#99",
      status: "Open",
      stars: 49,
      forks: 28,
      language: "TypeScript",
      languageColor: "#3178c6",
      tags: ["React", "Spring Boot", "Stripe", "Tailwind CSS"],
      category: "Full Stack",
      githubUrl: "https://github.com/alexmorgan-dev/ecommerce-cloud-store",
      liveUrl: "https://store.alexmorgan.dev",
      snippet: "+ stripe.checkout.sessions.create({ line_items, mode: 'payment' })",
      codeSnippet: {
        addition: "+ stripe.checkout.sessions.create({ line_items, mode: 'payment' })",
        comment: "// Webhook idempotency validation enabled",
      },
    },
    {
      id: "excel-importer",
      title: "Excel Import Tool & ETL Parser",
      slug: "excel-import-tool-etl",
      description:
        "Streaming Excel/CSV chunk processing pipeline handling 500,000+ row files with memory-bounded Apache POI SXSSF streaming and database bulk upserts.",
      image: "/images/projects/excel-importer.svg",
      prNumber: "#56",
      status: "Merged",
      stars: 27,
      forks: 9,
      language: "Java",
      languageColor: "#b07219",
      tags: ["Apache POI", "Spring Batch", "MySQL", "Virtual Threads"],
      category: "Spring Boot",
      githubUrl: "https://github.com/alexmorgan-dev/excel-import-etl-parser",
      liveUrl: "https://etl.alexmorgan.dev",
      snippet: "+ SXSSFWorkbook workbook = new SXSSFWorkbook(100);",
      codeSnippet: {
        addition: "+ SXSSFWorkbook workbook = new SXSSFWorkbook(100);",
        comment: "// Flushes row buffer to disk to prevent OOM",
      },
    },
  ],

  github: {
    username: "alexmorgan-dev",
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
        name: "spring-boot-starter-distributed-cache",
        description:
          "Lightweight Spring Boot 3 auto-configuration module providing two-layer L1 caffeine / L2 Redis caching with invalidation pub/sub.",
        language: "Java",
        languageColor: "#b07219",
        stars: 184,
        forks: 42,
        url: "https://github.com/alexmorgan-dev/spring-boot-starter-distributed-cache",
      },
      {
        name: "react-virtual-tree-explorer",
        description:
          "High-performance virtualized file tree component capable of rendering 100,000+ nested directories at 60fps.",
        language: "TypeScript",
        languageColor: "#3178c6",
        stars: 247,
        forks: 38,
        url: "https://github.com/alexmorgan-dev/react-virtual-tree-explorer",
      },
      {
        name: "kafka-event-stream-gateway",
        description:
          "Resilient Kafka consumer group with dynamic dead-letter queuing, backpressure management, and circuit-breaker telemetry.",
        language: "Java",
        languageColor: "#b07219",
        stars: 156,
        forks: 29,
        url: "https://github.com/alexmorgan-dev/kafka-event-stream-gateway",
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
