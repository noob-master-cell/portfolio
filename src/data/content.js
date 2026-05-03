export const DATA = {
  identity: {
    name: "Dheeraj Karwasra",
    model: "Software Engineer",
    title: "Software Engineer @ Fraunhofer · M.Sc. CS @ RPTU",
    tagline: "I build scalable, fault-tolerant systems — from multi-agent AI pipelines to distributed microservices on AWS.",
    availability: "Currently open to Software Engineer, Backend Engineer, and AI Engineer roles in Germany & the EU. Let's connect — I'd love to discuss how I can contribute to your engineering team.",
    location: "Kaiserslautern, Germany",
    email: "karwasra.dheeraj28@gmail.com",
    phone: "+49 1624138740",
    links: [
      { label: "github", url: "https://github.com/noob-master-cell" },
      { label: "linkedin", url: "https://linkedin.com/in/dkarwasra" },
      { label: "leetcode", url: "https://leetcode.com/u/dheerajkarwasra" }
    ],
    resume: "/Dheeraj_Karwasra_Resume.pdf"
  },
  about: {
    quote: "M.Sc. Computer Science at RPTU Kaiserslautern. I specialize in distributed backend systems, AI pipeline orchestration, and cloud-native architecture — building things that are fault-tolerant by design and measurably impactful.",
    description: "From designing multi-agent AI systems at Fraunhofer to building ML models at HighRadius that improved enterprise cash-flow forecasting by 19% — I focus on engineering that moves business metrics, not just code that compiles.",
    skills: [
      { category: "Languages", items: "Python, TypeScript, JavaScript, C++, SQL, Java" },
      { category: "Backend & Cloud", items: "FastAPI, Node.js, NestJS, GraphQL, AWS, Docker, CI/CD, Git" },
      { category: "Frontend", items: "React 18/19, Redux, Tailwind CSS, HTML/CSS" },
      { category: "Databases", items: "PostgreSQL, MySQL, MongoDB, Redis, Neo4j, Prisma" },
      { category: "AI & ML", items: "LangChain, LangGraph, CrewAI, MCP, scikit-learn, XGBoost" },
      { category: "Core CS", items: "System Design, Distributed Systems, Data Structures, Algorithms, OOP" }
    ]
  },
  experience: [
    {
      company: "Fraunhofer",
      status: "active",
      role: "Software Developer — AI & Automation",
      date: "Sep 2025 — Feb 2026",
      logs: [
        "Architected a multi-agent AI pipeline using CrewAI and Python, automating document classification and routing across 3 departments — eliminating 80% of manual processing effort",
        "Designed a fault-tolerant orchestration layer with built-in anomaly detection, reducing system downtime by 9x under concurrent workloads",
        "Delivered a full-stack internal tool (React + FastAPI + PostgreSQL) replacing a 6-step manual approval workflow with a single-click automated process",
        "Integrated real-time monitoring and logging infrastructure to surface pipeline health metrics, enabling proactive incident response"
      ],
      tech: ["Python", "CrewAI", "FastAPI", "React", "PostgreSQL", "Docker"]
    },
    {
      company: "HighRadius",
      status: "archived",
      role: "Software Developer Intern — Machine Learning",
      date: "Jan 2022 — Apr 2022",
      logs: [
        "Engineered an ensemble ML model (Random Forest + XGBoost) to predict B2B invoice payment dates, achieving 89% accuracy on production data",
        "Directly improved enterprise cash-flow forecasting by 19%, enabling finance teams to optimize working capital for Fortune 500 clients",
        "Built data preprocessing and feature engineering pipelines in Python, processing 500K+ invoice records with automated outlier detection"
      ],
      tech: ["Python", "scikit-learn", "XGBoost", "pandas", "SQL"]
    }
  ],
  coursework: [
    "Distributed Systems", "System Design", "Machine Learning", 
    "Data Structures & Algorithms", "Cloud Computing", 
    "Database Management", "Operating Systems", "Object-Oriented Programming"
  ],
  featuredProjects: [
    {
      title: "Gatekeeper Zero-Trust",
      subtitle: "BeyondCorp-Grade Reverse Proxy Gateway",
      description: "A production-grade security gateway enforcing zero-trust principles at the edge. Engineered a high-performance proxy in Python 3.11 with FastAPI, featuring RS256 JWT validation, priority-ordered RBAC, and a real-time audit engine streaming traffic telemetry to Redis.",
      date: "Jan 2025 — Feb 2025",
      isDark: true,
      diagramType: "gatekeeper",
      metrics: [
        { val: "< 2ms", label: "Auth Latency" },
        { val: "100%", label: "Policy Sync" },
        { val: "2.4k", label: "Blocked Threats" }
      ],
      tech: "Python 3.11, FastAPI, Redis, PostgreSQL, React 18, TypeScript",
      links: [
        { label: "GitHub Repository", url: "https://github.com/noob-master-cell/Gatekeeper" },
        { label: "Architecture Docs", url: "#" }
      ]
    },
    {
      title: "ESN Event Platform",
      subtitle: "Centralized Management for Student Associations",
      description: "A unified architecture for the Erasmus Student Network (ESN) managing full event lifecycles. Engineered a decoupled monorepo with a NestJS GraphQL backend and React frontend, featuring a custom query complexity guard, Prisma-driven relational data, and Redis-backed tiered rate limiting.",
      date: "Aug 2024 — Nov 2024",
      isDark: false,
      diagramType: "performance",
      metrics: [
        { val: "1000", label: "Complexity Limit" },
        { val: "O(1)", label: "Query Pattern" },
        { val: "9x", label: "Lower DB Load" }
      ],
      tech: "NestJS, React 19, GraphQL, Prisma, PostgreSQL, Redis, Auth0",
      links: [
        { label: "GitHub Source", url: "https://github.com/noob-master-cell/esn" },
        { label: "Live Portal", url: "https://esn-kaiserslautern.vercel.app/" }
      ]
    }
  ],
  otherProjects: [
    {
      title: "Nebulous",
      description: "A high-performance distributed key-value store built from scratch with Raft consensus for fault tolerance.",
      tech: "C++, gRPC, Raft Consensus",
      link: "#"
    },
    {
      title: "Kronos",
      description: "Real-time anomaly detection engine for time-series infrastructure metrics with alerting pipelines.",
      tech: "Python, PyTorch, InfluxDB",
      link: "#"
    },
    {
      title: "Aether Terminal",
      description: "Web-based terminal emulator with custom shell scripting support and plugin architecture.",
      tech: "TypeScript, xterm.js, React",
      link: "#"
    },
    {
      title: "Synth-Weave",
      description: "Procedural texture generator for 3D assets using deep learning and real-time WebGL rendering.",
      tech: "Python, TensorFlow, WebGL",
      link: "#"
    }
  ],
  education: [
    {
      degree: "M.Sc. Computer Science",
      focus: "Software Engineering & Intelligent Systems",
      school: "RPTU Kaiserslautern, Germany",
      date: "Apr 2024 — Present"
    },
    {
      degree: "B.E. Computer Science",
      focus: "Computer Science & Engineering",
      school: "Chandigarh University, India",
      date: "Jul 2019 — Jun 2023"
    }
  ],
  certifications: [
    { title: "Microsoft AI & ML Engineering", issuer: "Microsoft / Coursera", date: "2025" },
    { title: "AI Agents and Agentic Workflows", issuer: "IBM / Coursera", date: "2025" }
  ]
};
