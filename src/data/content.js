export const DATA = {
  identity: {
    name: "dheeraj karwasra",
    model: "software engineer",
    title: "software development engineer",
    tagline: "systems that scale. pipelines that think. code that ships.",
    location: "49.4401° N, 7.7491° E",
    email: "karwasra.dheeraj28@gmail.com",
    phone: "+49 176 xxxx xxxx",
    links: [
      { label: "github", url: "https://github.com/noob-master-cell" },
      { label: "linkedin", url: "https://linkedin.com/in/dkarwasra" },
      { label: "leetcode", url: "https://leetcode.com/u/dheerajkarwasra" }
    ]
  },
  about: {
    quote: "M.Sc. Computer Science at RPTU Kaiserslautern. I build scalable, fault-tolerant systems — from multi-agent AI pipelines to distributed microservices on AWS.",
    skills: [
      { category: "languages", items: "python, typescript, javascript, c++, sql, java" },
      { category: "backend & cloud", items: "fastapi, node.js, express.js, graphql, aws, docker, ci/cd, git" },
      { category: "frontend", items: "react.js, redux, tailwind css, html/css" },
      { category: "databases", items: "postgresql, mysql, mongodb, redis, neo4j" },
      { category: "genai/ai", items: "langchain, langgraph, crewai, mcp, scikit-learn, xgboost" },
      { category: "core cs", items: "data structures, algorithms, oop, operating systems, system design" }
    ]
  },
  experience: [
    {
      company: "fraunhofer",
      status: "active",
      role: "software developer — capstone project",
      date: "sep 2025 — feb 2026",
      logs: [
        "built a multi-agent AI pipeline utilizing CrewAI and Python",
        "automated document handling across 3 departments, eliminating 80% of manual effort",
        "designed a fault-tolerant orchestration layer with built-in anomaly detection",
        "reduced downtime by 9x while maintaining strict data integrity",
        "delivered full-stack internal tool replacing 6-step manual workflow with single click"
      ],
      tech: ["react", "fastapi", "postgresql", "crewai", "python"]
    },
    {
      company: "highradius",
      status: "archived",
      role: "software developer intern",
      date: "jan 2022 — apr 2022",
      logs: [
        "engineered and deployed ML model combining random forest and xgboost",
        "predicted B2B invoice payment dates with 89% accuracy",
        "improved cash-flow forecasting capabilities for enterprise customers by 19%"
      ],
      tech: ["python", "scikit-learn", "xgboost", "pandas"]
    }
  ],
  coursework: [
    "data structures", "algorithms", "object-oriented programming", 
    "operating systems", "database management", "distributed systems", 
    "machine learning", "cloud computing", "system design"
  ],
  otherProjects: [
    {
      title: "nebulous",
      description: "a high-performance distributed key-value store built from scratch.",
      tech: "c++, grpc, raft consensus",
      link: "#"
    },
    {
      title: "kronos",
      description: "real-time anomaly detection engine for time-series infrastructure metrics.",
      tech: "python, pytorch, influxdb",
      link: "#"
    },
    {
      title: "aether terminal",
      description: "web-based terminal emulator with custom shell scripting support.",
      tech: "typescript, xterm.js, react",
      link: "#"
    },
    {
      title: "synth-weave",
      description: "procedural texture generator for 3D assets using deep learning.",
      tech: "python, tensorflow, webgl",
      link: "#"
    }
  ],
  education: [
    {
      degree: "M.Sc. Computer Science",
      focus: "software engineering & intelligent systems",
      school: "rptu kaiserslautern, germany",
      date: "apr 2024 — present"
    },
    {
      degree: "B.E. Computer Science",
      focus: "",
      school: "chandigarh university, india",
      date: "jul 2019 — jun 2023"
    }
  ],
  certifications: [
    { title: "microsoft ai & ml engineering", issuer: "microsoft / coursera", date: "" },
    { title: "ai agents and agentic workflows", issuer: "ibm / coursera", date: "2025" }
  ]
};
