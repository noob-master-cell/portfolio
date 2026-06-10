export const DATA = {
  identity: {
    name: "Dheeraj Karwasra",
    role: "Software Engineer",
    title: "Software Engineer, M.Sc. CS at RPTU",
    tagline: "I build backend systems and AI pipelines. I focus on clean code, good measurements, and shipping things that work in production.",
    availability: "I am looking for Software Engineer, Backend Engineer, or AI Engineer roles in Germany and the EU. If you think we could be a good fit, send me a message.",
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
    quote: "I am doing my M.Sc. in Computer Science at RPTU Kaiserslautern. My focus is distributed systems, AI pipelines, and cloud native architecture.",
    description: "At Fraunhofer I built multi agent AI systems that removed hours of manual work each week. At HighRadius I built ML models that improved how finance teams forecast cash flow. I like engineering that moves a number, not just code that runs.",
    skills: [
      { category: "Languages", items: "Python, TypeScript, JavaScript, C++, SQL, Java" },
      { category: "Backend and Cloud", items: "FastAPI, Node.js, NestJS, GraphQL, AWS, Docker, CI/CD, Git" },
      { category: "Frontend", items: "React 18/19, Redux, Tailwind CSS, HTML, CSS" },
      { category: "Databases", items: "PostgreSQL, MySQL, MongoDB, Redis, Neo4j, Prisma" },
      { category: "AI and ML", items: "LangChain, LangGraph, CrewAI, MCP, scikit-learn, XGBoost" },
      { category: "Core CS", items: "System Design, Distributed Systems, Data Structures, Algorithms, OOP" }
    ]
  },
  experience: [
    {
      company: "Fraunhofer",
      status: "archived",
      role: "Software Developer, AI and Automation",
      date: "Sep 2025 to Feb 2026",
      logs: [
        "Built a multi agent AI pipeline with CrewAI that classified and routed documents across three departments. It removed 80 percent of the manual review work the team used to do by hand.",
        "Made the orchestration layer fault tolerant. It picks up anomalies during a run and recovers on its own. Downtime under concurrent load dropped by 9x.",
        "Built the internal tool that replaced a 6 step approval workflow with a single click. React on the front, FastAPI on the back, PostgreSQL underneath.",
        "Added real time monitoring and structured logging so the team could see pipeline health as it happened, not after something broke."
      ],
      tech: ["Python", "CrewAI", "FastAPI", "React", "PostgreSQL", "Docker"]
    },
    {
      company: "HighRadius",
      status: "archived",
      role: "Software Developer Intern, Machine Learning",
      date: "Jan 2022 to Apr 2022",
      logs: [
        "Built an ensemble model using Random Forest and XGBoost to predict when B2B invoices would be paid. It hit 89 percent accuracy on production data.",
        "That accuracy translated to a 19 percent improvement in cash flow forecasting for Fortune 500 finance teams.",
        "Preprocessed 500K plus invoice records and built feature engineering pipelines that handled messy real world data, including automated outlier detection."
      ],
      tech: ["Python", "scikit-learn", "XGBoost", "pandas", "SQL"]
    }
  ],
  coursework: [
    "Distributed Systems", "System Design", "Machine Learning",
    "Data Structures and Algorithms", "Cloud Computing",
    "Database Management", "Operating Systems", "Object Oriented Programming"
  ],
  featuredProjects: [
    {
      slug: "nexus",
      title: "Nexus",
      subtitle: "Local RAG with agentic routing",
      description: "Nexus is a RAG system where nothing leaves your machine. Every step runs locally through Ollama. The retrieval pipeline has 7 stages including HyDE query expansion, hybrid search that combines dense vectors with BM25, RRF score fusion, MMR re ranking, agentic routing for complex queries, and a faithfulness check at the end. No cloud calls. No data exposure.",
      date: "Apr 2026 to Present",
      isDark: true,
      diagramType: "nexus",
      metrics: [
        { val: "7", label: "Pipeline Stages" },
        { val: "4", label: "Chunk Strategies" },
        { val: "100%", label: "Local and Private" }
      ],
      tech: "Python, FastAPI, React, ChromaDB, Ollama, SQLite, SSE Streaming",
      links: [
        { label: "GitHub Repository", url: "https://github.com/noob-master-cell/Nexus-Agentic-Document-Intelligence" }
      ],
      caseStudy: {
        problem: "Most RAG systems push your data to a cloud LLM and call it private. I wanted one that runs entirely on a laptop, retrieves with the quality of a hosted system, and gives an honest answer about whether it is making things up.",
        approach: "I split the pipeline into 7 explicit stages so I could test each one in isolation. HyDE generates a synthetic answer first to widen the search window. Dense vectors handle semantics, BM25 handles exact terms, and Reciprocal Rank Fusion merges both lists. MMR then trims passages that say the same thing in slightly different words. An agentic router decides whether a query needs the full pipeline or a fast path. A faithfulness check at the end flags answers that drifted from the source.",
        decisions: [
          { title: "Local first", body: "ChromaDB and Ollama only. No outbound network calls. Trade off: I lose access to the strongest hosted models, but users get full privacy and no per token cost." },
          { title: "Hybrid retrieval", body: "Pure vector search missed exact identifiers like part numbers. Adding BM25 with RRF fusion fixed that without hurting semantic recall." },
          { title: "Faithfulness as a gate", body: "Instead of trusting the LLM output, I score it against the retrieved passages. Low scores get a warning so the user knows when to double check." }
        ],
        outcomes: [
          "7 stage pipeline with sub second p95 retrieval on a 50k chunk corpus.",
          "Faithfulness score averaged 0.95 on the eval set.",
          "Runs on a single laptop with no GPU. Ollama handles inference, ChromaDB persists vectors."
        ],
        learnings: "The biggest unlock was treating retrieval as a system, not a one shot embedding lookup. Each stage is small and replaceable. If I built this again I would add a query cache and let users tune the MMR lambda from the UI."
      }
    },
    {
      slug: "gatekeeper",
      title: "Gatekeeper",
      subtitle: "Zero trust reverse proxy gateway",
      description: "Most API gateways check authentication once at the door. Gatekeeper checks every request. It is a 9 layer middleware pipeline with RS256 JWT validation, automatic JWKS rotation, per IP and per key rate limiting, an OPA policy engine that runs Rego rules, Redis backed session revocation, and OpenTelemetry tracing with Prometheus metrics per route. It handles 3.3k requests per second at 47ms p95 with full auth on every hop.",
      date: "Jan 2025 to Present",
      isDark: false,
      diagramType: "gatekeeper",
      metrics: [
        { val: "3.3k", label: "Req per Sec at 100 VUs" },
        { val: "47ms", label: "p95 with Full Auth" },
        { val: "9", label: "Security Layers" }
      ],
      tech: "Python 3.11, FastAPI, OPA, Redis, PostgreSQL, OpenTelemetry, Prometheus, React 18",
      links: [
        { label: "GitHub Repository", url: "https://github.com/noob-master-cell/Gatekeeper" },
        { label: "Live Dashboard", url: "https://dashboard-production-5a2f.up.railway.app/" }
      ],
      caseStudy: {
        problem: "Standard API gateways trust a session once it is signed in. That breaks the moment a token leaks, a session is revoked, or a policy changes mid request. I wanted a gateway that re verifies every request without falling off a performance cliff.",
        approach: "I built a 9 layer middleware pipeline in FastAPI. Each layer is a small, ordered async step. JWT validation pulls JWKS from a rotating cache. Rate limiting runs against a per IP and per key Redis bucket. OPA evaluates Rego policies on the request context. A revocation index checks Redis for invalidated sessions. OpenTelemetry traces every hop, and Prometheus exports per route latency.",
        decisions: [
          { title: "FastAPI over a Go gateway", body: "I wanted to iterate fast on the policy and observability layers. Python plus uvloop gave enough throughput for the workload, and the async middleware model is easy to reason about." },
          { title: "OPA for policy", body: "Encoding access rules in Rego kept the auth logic out of the application code. Operators can update policies without redeploying the gateway." },
          { title: "Redis for revocation", body: "An in memory revocation index keeps token invalidation under a millisecond. Worth the extra dependency for the security guarantee." }
        ],
        outcomes: [
          "3.3k requests per second at 100 virtual users with full auth on every request.",
          "47ms p95 end to end with all 9 layers active.",
          "Token revocation propagates in under 1ms across all replicas through Redis pub sub."
        ],
        learnings: "Most of the optimization came from caching the JWKS keys and pooling the Redis client. The Rego evaluation was never the bottleneck. Next iteration I would move the rate limiter to a sliding window log so burst behavior is smoother."
      }
    },
    {
      slug: "esn-platform",
      title: "ESN Event Platform",
      subtitle: "Central management for student associations",
      description: "ESN Kaiserslautern was managing events with scattered tools. I built them a single platform. The stack is a decoupled monorepo with a NestJS GraphQL backend and a React 19 frontend. A custom query complexity guard stops clients from sending expensive nested queries. Redis rate limiting is tiered by user role. The result was a 9x drop in database load and O(1) query performance on the most common operations.",
      date: "Aug 2024 to Nov 2024",
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
      ],
      caseStudy: {
        problem: "ESN Kaiserslautern was coordinating events across spreadsheets, group chats, and three different tools. Volunteers spent more time syncing data than running events. They needed a single platform but also needed it to stay cheap and fast under bursty student traffic.",
        approach: "I picked NestJS GraphQL because the data model has heavy relationships and the team needed flexible queries. Prisma generates the SQL. I wrote a custom query complexity guard that scores each incoming query and rejects anything past the budget. Redis caches hot queries by hash, and rate limits are tiered per user role.",
        decisions: [
          { title: "Custom complexity guard", body: "Off the shelf depth limiters were too blunt. I scored each field, totaled the score per query, and rejected the request if it exceeded the budget. Stopped expensive nested fetches without rejecting legitimate queries." },
          { title: "Cache by query hash", body: "Most reads are the same event list and roster. Caching by hashed query plus variables gave a 9x drop in database load with a 5 minute TTL." },
          { title: "Auth0 for identity", body: "The team did not need custom auth and Auth0 took identity off my plate. Worth the dependency for a volunteer maintained app." }
        ],
        outcomes: [
          "9x reduction in database load measured against the previous spreadsheet driven flow.",
          "Common reads hit cache and return in under 5ms.",
          "Query complexity budget caught 100 percent of intentionally expensive test queries without false positives."
        ],
        learnings: "If I built this again I would skip GraphQL. The flexibility was worth less than I thought and tRPC would have shipped faster with the same safety. The complexity guard is the part I am most proud of and the one I would keep."
      }
    }
  ],
  otherProjects: [
    {
      title: "LocalMart",
      description: "A community marketplace for buying, selling, and posting lost and found items. Built with React and Firebase. Auth, Firestore, and storage handled without a separate backend.",
      tech: "React, Vite, Tailwind, Firebase",
      link: "https://github.com/noob-master-cell/LocalMart"
    },
    {
      title: "ByteSphere",
      description: "A full stack blog platform I built to get hands on with Node.js and MongoDB. Users can write, manage, and publish posts.",
      tech: "JavaScript, Node.js, MongoDB",
      link: "https://github.com/noob-master-cell/ByteSphere"
    },
    {
      title: "Student Predictor",
      description: "An ML model that predicts student exam scores using ensemble methods. I added a Flask interface so predictions are one form submission away.",
      tech: "Python, scikit-learn, Flask",
      link: "https://github.com/noob-master-cell/StudentPerformancePredictor"
    },
    {
      title: "Path Finder",
      description: "A grid based visualizer for pathfinding algorithms. It covers Dijkstra, A*, BFS, and DFS. Watching them run made the differences click.",
      tech: "JavaScript, React, Algorithms",
      link: "https://github.com/noob-master-cell/Path-Finder"
    }
  ],
  education: [
    {
      degree: "M.Sc. Computer Science",
      focus: "Software Engineering and Intelligent Systems",
      school: "RPTU Kaiserslautern, Germany",
      date: "Apr 2024 to Present"
    },
    {
      degree: "B.E. Computer Science",
      focus: "Computer Science and Engineering",
      school: "Chandigarh University, India",
      date: "Jul 2019 to Jun 2023"
    }
  ],
  certifications: [
    { title: "Microsoft AI and ML Engineering", issuer: "Microsoft, Coursera", date: "2025" },
    { title: "AI Agents and Agentic Workflows", issuer: "IBM, Coursera", date: "2025" }
  ]
};
