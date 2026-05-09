export const DATA = {
  identity: {
    name: "Dheeraj Karwasra",
    model: "Software Engineer",
    title: "M.Sc. CS @ RPTU · Software Engineer",
    tagline: "I build backend systems and AI pipelines with a bias for measurable impact. At Fraunhofer I cut manual processing by 80%. At HighRadius I moved cash-flow forecasting accuracy by 19%.",
    availability: "I'm looking for Software Engineer, Backend, or AI Engineer roles in Germany and the EU. If something here resonates, reach out — I'd like to talk.",
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
    quote: "I'm doing my M.Sc. in Computer Science at RPTU Kaiserslautern. Distributed systems, AI pipeline orchestration, cloud-native architecture — that's where I spend most of my time. I care about building things that are fault-tolerant by design and that you can actually measure working.",
    description: "At Fraunhofer, I designed multi-agent AI systems that automated away hours of manual document work every week. At HighRadius, I built ML models that genuinely changed how finance teams forecast cash flow. That's the pattern I keep chasing — engineering that shifts a number, not just engineering that ships.",
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
      status: "archived",
      role: "Software Developer — AI & Automation",
      date: "Sep 2025 — Feb 2026",
      logs: [
        "I built a multi-agent AI pipeline with CrewAI that handles document classification and routing across three departments — eliminating 80% of the manual review work that previously required human eyes on every file",
        "The orchestration layer is fault-tolerant by default. It detects anomalies mid-run and recovers without intervention, which cut system downtime by 9x under concurrent load",
        "I also built the internal tool that replaced a 6-step approval workflow with a single click — React frontend, FastAPI backend, PostgreSQL underneath. The team went from filling forms to just not having to",
        "I wired up real-time monitoring and structured logging so the team could see pipeline health as it happened, not discover problems after something already broke"
      ],
      tech: ["Python", "CrewAI", "FastAPI", "React", "PostgreSQL", "Docker"]
    },
    {
      company: "HighRadius",
      status: "archived",
      role: "Software Developer Intern — Machine Learning",
      date: "Jan 2022 — Apr 2022",
      logs: [
        "I built an ensemble model — Random Forest combined with XGBoost — to predict when B2B invoices would actually get paid. It hit 89% accuracy on production data",
        "That accuracy translated directly into a 19% improvement in cash-flow forecasting for Fortune 500 finance teams. They could plan working capital with confidence instead of guesswork",
        "Getting there meant preprocessing 500K+ invoice records and building feature engineering pipelines that could handle messy, real-world data — including automated outlier detection"
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
      title: "Nexus",
      subtitle: "Agentic Document Intelligence — Local RAG",
      description: "I built Nexus because I wanted a RAG system where nothing leaves my machine. Every step — embedding, retrieval, generation, evaluation — runs locally via Ollama. The retrieval pipeline has 7 stages: HyDE query expansion, hybrid search combining dense vectors with BM25, RRF score fusion, MMR re-ranking to cut redundant results, agentic routing for complex queries, and a post-generation faithfulness check. No cloud API calls. No data exposure. A system that actually reasons over your documents.",
      date: "Apr 2026 — Present",
      isDark: true,
      diagramType: "nexus",
      metrics: [
        { val: "7", label: "Pipeline Stages" },
        { val: "4", label: "Chunk Strategies" },
        { val: "100%", label: "Local / Private" }
      ],
      tech: "Python, FastAPI, React, ChromaDB, Ollama, SQLite, SSE Streaming",
      links: [
        { label: "GitHub Repository", url: "https://github.com/noob-master-cell/Nexus-Agentic-Document-Intelligence" }
      ]
    },
    {
      title: "Gatekeeper Zero-Trust",
      subtitle: "BeyondCorp-Grade Reverse Proxy Gateway",
      description: "Most API gateways treat authentication as a one-time check at the door. I built Gatekeeper around the opposite idea — every request earns access, nothing is trusted by default. It's a 9-layer middleware pipeline: RS256 JWT validation with automatic JWKS rotation, per-IP and per-key rate limiting, an OPA policy engine running Rego rules, Redis-backed session revocation that takes effect instantly, and OpenTelemetry tracing with Prometheus metrics per route. It handles 3.3k requests per second at 47ms p95 — with full auth on every hop.",
      date: "Jan 2025 — Present",
      isDark: false,
      diagramType: "gatekeeper",
      metrics: [
        { val: "3.3k", label: "Req/sec @ 100 VUs" },
        { val: "47ms", label: "p95 w/ Full Auth" },
        { val: "9", label: "Security Layers" }
      ],
      tech: "Python 3.11, FastAPI, OPA, Redis, PostgreSQL, OpenTelemetry, Prometheus, React 18",
      links: [
        { label: "GitHub Repository", url: "https://github.com/noob-master-cell/Gatekeeper" },
        { label: "Live Dashboard", url: "https://dashboard-production-5a2f.up.railway.app/" }
      ]
    },
    {
      title: "ESN Event Platform",
      subtitle: "Centralized Management for Student Associations",
      description: "ESN Kaiserslautern was managing events through scattered tools and a lot of manual coordination. I built them a unified platform: a decoupled monorepo with a NestJS GraphQL backend and a React 19 frontend. I wrote a custom query complexity guard so no client can slam the database with expensive nested queries. Redis-backed rate limiting is tiered by user role. The result was a 9x reduction in database load and O(1) query performance on the most common operations.",
      date: "Aug 2024 — Nov 2024",
      isDark: true,
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
      title: "LocalMart",
      description: "A community marketplace for buying, selling, and posting lost & found items locally. I built it with React and Firebase — auth, Firestore, and storage all handled without spinning up a separate backend.",
      tech: "React, Vite, Tailwind, Firebase",
      link: "https://github.com/noob-master-cell/LocalMart"
    },
    {
      title: "ByteSphere",
      description: "A full-stack blog platform I built to get hands-on with Node.js and MongoDB. Users can write, manage, and publish posts — I wanted to understand how all the pieces fit together end to end.",
      tech: "JavaScript, Node.js, MongoDB",
      link: "https://github.com/noob-master-cell/ByteSphere"
    },
    {
      title: "Student Predictor",
      description: "An ML model that predicts student exam scores using ensemble methods. I added a Flask web interface so predictions are one form submission away — no notebook required.",
      tech: "Python, scikit-learn, Flask",
      link: "https://github.com/noob-master-cell/StudentPerformancePredictor"
    },
    {
      title: "Path Finder",
      description: "A grid-based visualizer for pathfinding algorithms — Dijkstra, A*, BFS, and DFS. I built it while studying algorithms because watching them run made the differences click in a way reading never did.",
      tech: "JavaScript, React, Algorithms",
      link: "https://github.com/noob-master-cell/Path-Finder"
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
