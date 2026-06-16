export const DATA = {
  identity: {
    name: "Dheeraj Karwasra",
    role: "Software Engineer",
    title: "Software Engineer, M.Sc. CS at RPTU",
    tagline: "I build backend systems and AI pipelines. I care about clean code, real numbers, and shipping things that work in production.",
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
    quote: "I am doing my M.Sc. in Computer Science at RPTU Kaiserslautern. Most of my work is in distributed systems, AI pipelines, and building things that run in the cloud.",
    description: "At Fraunhofer I built AI systems that took hours of manual work off the team every week. At HighRadius I built models that helped finance teams forecast cash flow more accurately. I like work that moves a real number, not just code that runs.",
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
        "Built an AI pipeline with CrewAI that sorted and routed documents across three departments. It cut the manual review work by 80 percent.",
        "Made the pipeline recover on its own when a step fails. It catches problems while running and keeps going instead of crashing. Downtime under heavy load dropped 9x.",
        "Built an internal tool that turned a six step approval process into a single click. React on the front, FastAPI on the back, PostgreSQL underneath.",
        "Added live monitoring and logging so the team could watch the pipeline's health as it ran, instead of finding out after something broke."
      ],
      tech: ["Python", "CrewAI", "FastAPI", "React", "PostgreSQL", "Docker"]
    },
    {
      company: "HighRadius",
      status: "archived",
      role: "Software Developer Intern, Machine Learning",
      date: "Jan 2022 to Apr 2022",
      logs: [
        "Built a model that combined Random Forest and XGBoost to predict when B2B invoices would get paid. It reached 89 percent accuracy on real production data.",
        "That helped Fortune 500 finance teams forecast their cash flow 19 percent more accurately.",
        "Cleaned and prepared more than 500,000 invoice records, including spotting outliers on its own, so the model could learn from messy real world data."
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
      subtitle: "A private RAG system that runs fully on your machine",
      description: "Nexus is a RAG system where nothing leaves your machine. Every step runs locally through Ollama. It answers a question in seven steps: it writes a draft answer to widen the search (HyDE), runs both keyword search (BM25) and meaning based search, merges the two result lists, drops passages that repeat the same point, sends harder questions down a longer path, and checks the final answer against the sources before showing it. No cloud calls. No data leaving your laptop.",
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
        problem: "Most RAG systems send your data to a cloud model and still call it private. I wanted one that runs fully on a laptop, finds answers as well as a hosted system, and is honest about when it might be making things up.",
        approach: "I split the work into seven separate steps so I could test each one on its own. First it writes a draft answer (HyDE) to widen the search. Keyword search handles exact terms, meaning based search handles the rest, and the two lists get merged into one. It then removes passages that repeat the same point. A router checks whether a question needs the full pipeline or a quick path. At the end, it compares the answer against the sources it used and flags anything that drifted away from them.",
        decisions: [
          { title: "Local first", body: "ChromaDB and Ollama only, with nothing going out to the internet. The trade off: I give up the strongest hosted models, but users get full privacy and pay nothing per question." },
          { title: "Two kinds of search", body: "Meaning based search on its own missed exact things like part numbers. Adding keyword search and merging the two lists fixed that without hurting the rest." },
          { title: "Check before trusting", body: "Instead of trusting whatever the model says, I score the answer against the passages it used. A low score shows a warning so the reader knows when to double check." }
        ],
        outcomes: [
          "Seven step pipeline with under a second retrieval (p95) on a 50,000 chunk set.",
          "The honesty score averaged 0.95 on the test set.",
          "Runs on a single laptop with no GPU. Ollama does the thinking, ChromaDB stores the data."
        ],
        learnings: "The biggest win was treating retrieval as a full system, not a single lookup. Each step is small and easy to swap out. If I built it again I would add a cache for repeated questions and let users adjust the duplicate filter right from the screen."
      }
    },
    {
      slug: "gatekeeper",
      title: "Gatekeeper",
      subtitle: "An API gateway that checks every single request",
      description: "Most API gateways check who you are once, when you log in. Gatekeeper checks every request. Each one passes through nine steps in order: it verifies the signed token, rotates the keys on its own, limits how often each IP and key can call, runs access rules through OPA, checks whether the session has been cancelled in Redis, and records timing and traces for every route. It handles 3,300 requests per second at 47ms (p95) with full checks on every hop.",
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
        problem: "Most gateways trust a session once it signs in. That falls apart the moment a token leaks, a session is cancelled, or a rule changes in the middle of a request. I wanted a gateway that re checks every request without becoming slow.",
        approach: "I built a pipeline of nine small steps in FastAPI, each one running in order. It checks the signed token against keys it keeps fresh in a cache. It limits how often each IP and key can call, using counters in Redis. OPA decides whether the request is allowed. A quick Redis lookup catches cancelled sessions. Every step is timed and traced so I can see exactly where the time goes.",
        decisions: [
          { title: "FastAPI over a Go gateway", body: "I wanted to move fast on the rules and the monitoring. Python with uvloop was fast enough for this load, and the step by step async model is easy to follow." },
          { title: "OPA for the rules", body: "Writing access rules in OPA kept them out of the app code. Operators can change a rule without redeploying the gateway." },
          { title: "Redis for cancelled sessions", body: "An in memory list keeps session cancellation under a millisecond. Worth the extra moving part for the security it buys." }
        ],
        outcomes: [
          "3,300 requests per second at 100 users, with full checks on every request.",
          "47ms p95 from end to end with all nine steps running.",
          "A cancelled token takes effect in under 1ms across every copy of the service, through Redis."
        ],
        learnings: "Most of the speed came from caching the keys and reusing the Redis connection. The rule engine was never the slow part. Next time I would smooth out how it handles sudden bursts of traffic."
      }
    },
    {
      slug: "esn-platform",
      title: "ESN Event Platform",
      subtitle: "One place to manage events for a student group",
      description: "ESN Kaiserslautern was running events out of a pile of separate tools. I built them one platform instead. It has a NestJS GraphQL backend and a React 19 frontend. A custom check stops clients from sending heavy, deeply nested queries that would slow everything down. Redis caching and rate limits change based on the user's role. Database load dropped 9x and the most common requests now return in constant time.",
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
        problem: "ESN Kaiserslautern was running events across spreadsheets, group chats, and three different tools. Volunteers spent more time copying data between them than actually running events. They needed one platform, and it had to stay cheap and fast when student traffic spiked.",
        approach: "I chose NestJS with GraphQL because the data has a lot of connections and the team needed to query it in flexible ways. Prisma writes the SQL. I added a custom check that scores each incoming query and turns away anything too expensive. Redis caches the popular queries, and rate limits depend on the user's role.",
        decisions: [
          { title: "Custom complexity check", body: "Ready made limiters were too blunt. I gave each field a score, added them up per query, and rejected the query if it went over budget. That blocked the expensive nested requests without blocking normal ones." },
          { title: "Cache by query", body: "Most reads are the same event list and member list. Caching them with a five minute refresh cut database load 9x." },
          { title: "Auth0 for login", body: "The team did not need custom login, so Auth0 handled it. Worth the dependency for an app run by volunteers." }
        ],
        outcomes: [
          "9x less database load than the old spreadsheet based way of working.",
          "Common reads come back from cache in under 5ms.",
          "The query budget caught every expensive test query without ever blocking a real one."
        ],
        learnings: "If I built this again I would skip GraphQL. The flexibility mattered less than I expected, and tRPC would have been faster to build with the same safety. The complexity check is the part I am most proud of and the one I would keep."
      }
    }
  ],
  otherProjects: [
    {
      title: "LocalMart",
      description: "A community marketplace for buying, selling, and posting lost and found items. Built with React and Firebase, so login, the database, and file storage all work without a separate backend.",
      tech: "React, Vite, Tailwind, Firebase",
      link: "https://github.com/noob-master-cell/LocalMart"
    },
    {
      title: "ByteSphere",
      description: "A full stack blog I built to get hands on with Node.js and MongoDB. People can write, edit, and publish posts.",
      tech: "JavaScript, Node.js, MongoDB",
      link: "https://github.com/noob-master-cell/ByteSphere"
    },
    {
      title: "Student Predictor",
      description: "A model that predicts student exam scores. I wrapped it in a small Flask page so a prediction is one form away.",
      tech: "Python, scikit-learn, Flask",
      link: "https://github.com/noob-master-cell/StudentPerformancePredictor"
    },
    {
      title: "Path Finder",
      description: "A grid based tool that shows how pathfinding algorithms work, including Dijkstra, A*, BFS, and DFS. Watching them run side by side made the differences click.",
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
