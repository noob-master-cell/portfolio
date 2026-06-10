import { useState, useEffect, useRef } from 'react';
import { DATA } from '../../data/content';

// --- ASCII sub-components ---

const NexusAscii = () => (
  <pre className="text-[#6366f1] text-[10px] sm:text-[11px] leading-tight my-3 overflow-x-auto">
{`  [Query Input]
       │
       ├──▶ HyDE Expansion (hypothetical docs)
       │
       ▼
  Dense Vector ──┐
  Retrieval      ├──▶ RRF Fusion ──▶ MMR Re-ranking
  BM25 Keyword ──┘
                              │
                              ▼
                    Agentic Query Router
                              │
                              ▼
                   Ollama LLM (100% local)
                              │
                              ▼
                   Faithfulness Evaluator
                              │
                              ▼
                        [Final Answer]`}
  </pre>
);

const GatekeeperAscii = () => (
  <pre className="text-[#6366f1] text-[10px] sm:text-[11px] leading-tight my-3 overflow-x-auto">
{`  [Client] ──▶ API Gateway
                   │
                   ├──▶ RS256 JWT Validation ──▶ [401 Unauthorized]
                   │
                   ├──▶ RBAC Engine (priority-ordered) ──▶ [403 Forbidden]
                   │
                   ├──▶ Rate Limiter (Redis token bucket, <2ms)
                   │
                   ├──▶ Audit Engine ──▶ Redis Stream (real-time)
                   │
                   ▼
            [Upstream Microservice]`}
  </pre>
);

const MatrixRain = () => {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      if (count >= 12) { clearInterval(id); return; }
      setLines(p => [...p, Array(48).fill(0)
        .map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')]);
      count++;
    }, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <pre className="text-[#0f0] text-[11px] leading-tight my-2 overflow-hidden opacity-80">
      {lines.join('\n')}
    </pre>
  );
};

// All tab-completable commands
const VALID_COMMANDS = [
  'help', 'clear', 'date', 'pwd', 'history', 'echo ',
  'dk help', 'dk whoami', 'dk neofetch', 'dk ls',
  'dk projects', 'dk nexus', 'dk gatekeeper',
  'dk experience', 'dk skills', 'dk education', 'dk certs',
  'dk contact', 'dk resume', 'dk availability', 'dk source',
  'dk open home', 'dk open about', 'dk open experience',
  'dk open skills', 'dk open projects', 'dk open contact',
  'dk stats', 'dk ping', 'dk matrix', 'dk coffee',
  'sudo', 'vim', 'nano',
];

const NAV_SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

export default function EmbeddedTerminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const bootStarted = useRef(false);

  const push = (content, type = 'output') =>
    setHistory(p => [...p, { type, content }]);

  // Boot sequence
  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;

    const ts = new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC';
    const bootLines = [
      `dheerajOS v3.0.0 — ${ts}`,
      'Loading portfolio modules...        [OK]',
      'Mounting project filesystem...      [OK]',
      'Initializing network interface...   [OK]',
      'Verifying portfolio integrity...    [OK]',
      'All systems operational.',
      '',
      'Type "help" for commands. Tab to autocomplete, ↑↓ for history.',
    ];

    let delay = 0;
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setHistory(p => [...p, { type: 'output', content: line }]);
        if (i === bootLines.length - 1) setIsBooting(false);
      }, delay);
      delay += Math.random() * 180 + 70;
    });
  }, []);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: isBooting ? 'auto' : 'smooth' });
  }, [history, isBooting]);

  // Auto-focus input after boot
  useEffect(() => {
    if (!isBooting) inputRef.current?.focus();
  }, [isBooting]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.toLowerCase();
      if (!trimmed) return;
      const matches = VALID_COMMANDS.filter(c => c.startsWith(trimmed));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        push(
          <div className="flex flex-wrap gap-x-6 gap-y-0.5 my-1">
            {matches.map(m => <span key={m} className="text-[#6366f1]">{m}</span>)}
          </div>
        );
      }
    }
  };

  const processCommand = async () => {
    const raw = input.trim();
    setInput('');
    if (!raw) return;

    const fullCmd = raw.toLowerCase();
    setCmdHistory(p => [...p, raw]);
    setHistoryIndex(-1);
    push(`guest@dkarwasra:~$ ${raw}`, 'input');

    // --- Global commands ---
    if (fullCmd === 'clear') { setHistory([]); return; }

    if (fullCmd === 'help' || fullCmd === 'dk help') {
      push(
        <div className="my-2 flex flex-col gap-3 text-[11px]">
          {[
            {
              group: 'portfolio',
              cmds: [
                ['dk whoami', 'identity & overview'],
                ['dk neofetch', 'system info card'],
                ['dk ls', 'list portfolio sections'],
                ['dk experience', 'full work history with details'],
                ['dk skills', 'technical stack by category'],
                ['dk projects', 'all featured projects'],
                ['dk nexus', 'nexus rag pipeline details + diagram'],
                ['dk gatekeeper', 'gatekeeper architecture diagram'],
                ['dk education', 'academic background'],
                ['dk certs', 'certifications'],
              ],
            },
            {
              group: 'connect',
              cmds: [
                ['dk contact', 'all contact channels'],
                ['dk resume', 'open resume pdf'],
                ['dk availability', 'current job search status'],
                ['dk open <section>', 'navigate: ' + NAV_SECTIONS.join(' · ')],
                ['dk source', 'view portfolio on github'],
              ],
            },
            {
              group: 'tools',
              cmds: [
                ['dk stats', 'live github profile stats'],
                ['dk ping', 'network latency test'],
                ['date', 'current date & time'],
                ['pwd', 'print working directory'],
                ['history', 'command history'],
                ['echo <text>', 'echo text to terminal'],
                ['clear', 'clear terminal output'],
              ],
            },
            {
              group: 'extras',
              cmds: [
                ['dk matrix', 'matrix rain effect'],
                ['dk coffee', '☕  essential fuel'],
                ['sudo', 'nice try'],
              ],
            },
          ].map(({ group, cmds }) => (
            <div key={group}>
              <div className="text-[#333] uppercase tracking-widest text-[10px] mb-1.5">// {group}</div>
              {cmds.map(([c, desc]) => (
                <div key={c} className="flex gap-2">
                  <span className="text-[#6366f1] shrink-0 w-44">{c}</span>
                  <span className="text-[#666]">{desc}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
      return;
    }

    if (fullCmd === 'date') {
      push(new Date().toUTCString());
      return;
    }

    if (fullCmd === 'pwd') {
      push('/home/guest/dheeraj-karwasra/portfolio');
      return;
    }

    if (fullCmd === 'history') {
      if (cmdHistory.length === 0) {
        push('no commands in history.');
      } else {
        push(
          <div className="my-1 flex flex-col gap-0.5 text-[11px]">
            {cmdHistory.map((c, i) => (
              <div key={i}>
                <span className="text-[#333] mr-3 select-none">{String(i + 1).padStart(3, ' ')}</span>
                {c}
              </div>
            ))}
          </div>
        );
      }
      return;
    }

    if (fullCmd.startsWith('echo ')) {
      push(raw.slice(5));
      return;
    }

    if (fullCmd === 'sudo') {
      push('sudo: nice try. this incident has been logged. (just kidding — hi recruiter!)');
      return;
    }

    if (fullCmd === 'vim' || fullCmd === 'nano') {
      push(`${fullCmd}: terminal editors not available in this shell.\nhint: i use VS Code like a normal person.`);
      return;
    }

    if (!fullCmd.startsWith('dk ')) {
      push(`${raw}: command not found. type "help" for available commands.`);
      return;
    }

    // --- dk subcommands ---
    const sub = fullCmd.slice(3).trim();
    const parts = sub.split(' ');
    const baseCmd = parts[0];
    const args = parts.slice(1).join(' ').trim();

    switch (baseCmd) {

      case 'whoami':
        push(
          <div className="my-2 flex flex-col gap-1.5 text-[11px]">
            <div><span className="text-[#6366f1] w-12 inline-block">name</span>{DATA.identity.name}</div>
            <div><span className="text-[#6366f1] w-12 inline-block">role</span>{DATA.identity.role}</div>
            <div><span className="text-[#6366f1] w-12 inline-block">title</span>{DATA.identity.title}</div>
            <div><span className="text-[#6366f1] w-12 inline-block">loc</span>{DATA.identity.location}</div>
            <div className="mt-2 text-[#777] max-w-xl leading-relaxed">{DATA.about.description}</div>
          </div>
        );
        break;

      case 'neofetch':
        push(
          <div className="flex gap-6 my-3">
            <pre className="text-[#6366f1] leading-none hidden sm:block text-[11px] shrink-0">
{`  ██████╗ ██╗  ██╗
  ██╔══██╗██║ ██╔╝
  ██║  ██║█████╔╝
  ██║  ██║██╔═██╗
  ██████╔╝██║  ██╗
  ╚═════╝ ╚═╝  ╚═╝`}
            </pre>
            <div className="flex flex-col gap-1 text-[11px]">
              <div><span className="text-[#6366f1] font-bold">guest</span>@<span className="text-[#6366f1] font-bold">dkarwasra</span></div>
              <div className="text-[#2a2a2a]">──────────────────────</div>
              <div><span className="text-[#6366f1]">os       </span> dheerajOS v3.0.0</div>
              <div><span className="text-[#6366f1]">shell    </span> dk-shell 1.0</div>
              <div><span className="text-[#6366f1]">role     </span> {DATA.identity.role}</div>
              <div><span className="text-[#6366f1]">degree   </span> M.Sc. CS @ RPTU Kaiserslautern</div>
              <div><span className="text-[#6366f1]">focus    </span> Distributed Systems · AI Pipelines</div>
              <div><span className="text-[#6366f1]">location </span> {DATA.identity.location}</div>
              <div><span className="text-[#6366f1]">email    </span> {DATA.identity.email}</div>
              <div><span className="text-[#6366f1]">status   </span> <span className="text-[#22c55e]">open to work · EU</span></div>
            </div>
          </div>
        );
        break;

      case 'ls':
        push(
          <div className="my-2">
            <div className="flex flex-wrap gap-x-6 gap-y-1 mb-2">
              {NAV_SECTIONS.map(s => (
                <span key={s} className="text-[#42a5f5]">{s}/</span>
              ))}
            </div>
            <div className="flex gap-6">
              <span className="text-[#e8e6e1]">resume.pdf</span>
              <span className="text-[#e8e6e1]">README.md</span>
            </div>
            <div className="text-[#333] text-[10px] mt-1">use "dk open &lt;section&gt;" to navigate</div>
          </div>
        );
        break;

      case 'experience':
        push(
          <div className="flex flex-col gap-5 my-2 text-[11px]">
            {DATA.experience.map((job, i) => (
              <div key={i} className="border-l border-[#2a2a2a] pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold">{job.company}</span>
                  <span className="text-[#333]">·</span>
                  <span className="text-[#666]">{job.role}</span>
                </div>
                <div className="text-[#6366f1] mb-2">{job.date}</div>
                <div className="flex flex-col gap-1">
                  {job.logs.map((l, j) => (
                    <div key={j} className="flex gap-2 text-[#777]">
                      <span className="text-[#6366f1] shrink-0">▹</span>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.tech.map(t => (
                    <span key={t} className="px-1.5 py-0.5 border border-[#6366f1]/20 text-[#6366f1]/70 text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        push(
          <div className="flex flex-col gap-1.5 my-2 text-[11px]">
            {DATA.about.skills.map(({ category, items }) => (
              <div key={category} className="flex gap-3">
                <span className="text-[#6366f1] w-28 shrink-0">{category}</span>
                <span className="text-[#777]">→ {items}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        push(
          <div className="flex flex-col gap-2 my-2 text-[11px]">
            <div className="text-[#333] text-[10px] mb-1">// featured</div>
            {DATA.featuredProjects.map((p, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#333] shrink-0">{i + 1}.</span>
                <span className="text-white w-28 shrink-0">{p.title}</span>
                <span className="text-[#666]">{p.subtitle}</span>
              </div>
            ))}
            <div className="text-[#333] text-[10px] mt-2 mb-1">// other</div>
            {DATA.otherProjects.map((p, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#333] shrink-0">{DATA.featuredProjects.length + i + 1}.</span>
                <span className="text-[#888] w-28 shrink-0">{p.title}</span>
                <span className="text-[#555]">{p.tech}</span>
              </div>
            ))}
            <div className="text-[#333] text-[10px] mt-2">run "dk nexus" or "dk gatekeeper" for architecture diagrams</div>
          </div>
        );
        break;

      case 'nexus':
        push(
          <div className="my-1 text-[11px]">
            <div className="text-white font-bold mb-1">Nexus — Agentic Document Intelligence</div>
            <div className="text-[#666] mb-3 max-w-xl leading-relaxed">{DATA.featuredProjects[0].description}</div>
            <div className="text-[#333] text-[10px] mb-1">// 7-stage retrieval pipeline</div>
            <NexusAscii />
            <div className="flex gap-6 text-[11px] mt-1">
              {DATA.featuredProjects[0].metrics.map(m => (
                <div key={m.label}>
                  <span className="text-[#6366f1] font-bold">{m.val}</span>
                  <span className="text-[#555] ml-1">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <a href={DATA.featuredProjects[0].links[0].url} target="_blank" rel="noopener noreferrer"
                className="text-[#6366f1] hover:text-white transition-colors text-[11px]">
                → {DATA.featuredProjects[0].links[0].url}
              </a>
            </div>
          </div>
        );
        break;

      case 'gatekeeper':
        push(
          <div className="my-1 text-[11px]">
            <div className="text-white font-bold mb-1">Gatekeeper — Zero-Trust Reverse Proxy</div>
            <div className="text-[#666] mb-3 max-w-xl leading-relaxed">{DATA.featuredProjects[1].description}</div>
            <div className="text-[#333] text-[10px] mb-1">// request flow</div>
            <GatekeeperAscii />
            <div className="flex gap-6 text-[11px] mt-1">
              {DATA.featuredProjects[1].metrics.map(m => (
                <div key={m.label}>
                  <span className="text-[#6366f1] font-bold">{m.val}</span>
                  <span className="text-[#555] ml-1">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-4">
              {DATA.featuredProjects[1].links.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="text-[#6366f1] hover:text-white transition-colors">
                  → {l.label}
                </a>
              ))}
            </div>
          </div>
        );
        break;

      case 'education':
        push(
          <div className="flex flex-col gap-4 my-2 text-[11px]">
            {DATA.education.map((edu, i) => (
              <div key={i} className="border-l border-[#2a2a2a] pl-4">
                <div className="text-white font-bold">{edu.degree}</div>
                <div className="text-[#666]">{edu.focus}</div>
                <div className="text-[#6366f1]">{edu.school}</div>
                <div className="text-[#444]">{edu.date}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        push(
          <div className="flex flex-col gap-2 my-2 text-[11px]">
            {DATA.certifications.map((cert, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[#6366f1] shrink-0 mt-0.5">·</span>
                <div>
                  <div className="text-white">{cert.title}</div>
                  <div className="text-[#555]">{cert.issuer} · {cert.date}</div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        push(
          <div className="flex flex-col gap-1.5 my-2 text-[11px]">
            {[
              ['email', DATA.identity.email, `mailto:${DATA.identity.email}`],
              ['phone', DATA.identity.phone, `tel:${DATA.identity.phone}`],
              ['linkedin', 'linkedin.com/in/dkarwasra', DATA.identity.links.find(l => l.label === 'linkedin')?.url],
              ['github', 'github.com/noob-master-cell', DATA.identity.links.find(l => l.label === 'github')?.url],
              ['leetcode', 'leetcode.com/u/dheerajkarwasra', DATA.identity.links.find(l => l.label === 'leetcode')?.url],
            ].map(([label, value, url]) => (
              <div key={label} className="flex gap-3">
                <span className="text-[#6366f1] w-14 shrink-0">{label}</span>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  className="text-[#777] hover:text-white transition-colors">
                  {value}
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case 'resume':
        push('fetching Dheeraj_Karwasra_Resume.pdf...');
        setTimeout(() => {
          push('download started. ↓');
          window.open(DATA.identity.resume, '_blank');
        }, 600);
        break;

      case 'availability':
        push(
          <div className="flex flex-col gap-1.5 my-2 border-l-2 border-[#22c55e] pl-4 text-[11px]">
            <div><span className="text-[#22c55e] font-bold">STATUS</span><span className="text-[#666] ml-2">actively seeking opportunities</span></div>
            <div><span className="text-[#555] w-20 inline-block">roles</span>Software Engineer · Backend Engineer · AI Engineer</div>
            <div><span className="text-[#555] w-20 inline-block">location</span>Germany & EU (work authorization: valid)</div>
            <div><span className="text-[#555] w-20 inline-block">notice</span>immediately available</div>
            <div><span className="text-[#555] w-20 inline-block">contact</span>
              <a href={`mailto:${DATA.identity.email}`} className="text-[#6366f1] hover:text-white transition-colors">
                {DATA.identity.email}
              </a>
            </div>
          </div>
        );
        break;

      case 'open': {
        if (!args) {
          push(`usage: dk open <section>   available: ${NAV_SECTIONS.join(' · ')}`);
        } else if (NAV_SECTIONS.includes(args)) {
          push(`navigating to #${args}...`);
          window.dispatchEvent(new CustomEvent('terminal-navigate', { detail: { section: args } }));
        } else {
          push(`unknown section: "${args}"\navailable: ${NAV_SECTIONS.join(' · ')}`);
        }
        break;
      }

      case 'stats':
        setIsFetching(true);
        push('fetching github.com/noob-master-cell...');
        try {
          const res = await fetch('https://api.github.com/users/noob-master-cell');
          const data = await res.json();
          if (data.message) throw new Error(data.message);
          push(
            <div className="flex flex-col gap-1 my-2 border-l-2 border-[#6366f1] pl-4 text-[11px]">
              <div><span className="text-[#555] w-28 inline-block">public repos</span>{data.public_repos}</div>
              <div><span className="text-[#555] w-28 inline-block">followers</span>{data.followers}</div>
              <div><span className="text-[#555] w-28 inline-block">following</span>{data.following}</div>
              <div><span className="text-[#555] w-28 inline-block">member since</span>{data.created_at?.split('T')[0]}</div>
              <div><span className="text-[#555] w-28 inline-block">profile</span>
                <a href={data.html_url} target="_blank" rel="noopener noreferrer"
                  className="text-[#6366f1] hover:text-white transition-colors">
                  {data.html_url}
                </a>
              </div>
            </div>
          );
        } catch (err) {
          push(`error: ${err.message || 'could not reach api.github.com'}`);
        }
        setIsFetching(false);
        break;

      case 'ping': {
        push('PING dheerajkarwasra.com — 56 bytes of data.');
        const delays = [
          +(11 + Math.random() * 4).toFixed(1),
          +(10 + Math.random() * 5).toFixed(1),
          +(12 + Math.random() * 3).toFixed(1),
        ];
        const avg = (delays.reduce((a, b) => a + b) / delays.length).toFixed(1);
        push(
          <div className="flex flex-col gap-0.5 my-1 text-[11px]">
            {delays.map((d, i) => (
              <div key={i}>
                64 bytes: icmp_seq={i} ttl=118 time=<span className="text-[#6366f1]">{d} ms</span>
              </div>
            ))}
            <div className="mt-1 text-[#555]">
              3 packets transmitted, 3 received, 0% loss — avg {avg} ms
            </div>
          </div>
        );
        break;
      }

      case 'source':
        push('opening portfolio source on github...');
        setTimeout(() => window.open(DATA.identity.links[0].url, '_blank'), 500);
        break;

      case 'matrix':
        push(<MatrixRain />);
        break;

      case 'coffee':
        push(
          <pre className="text-[#8d6e63] my-2 text-[12px]">
{`    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----\``}
          </pre>
        );
        break;

      default:
        push(`dk: "${sub}" is not a valid command. type "help" to see all commands.`);
    }
  };

  return (
    <div
      className="w-full h-[420px] md:h-[540px] bg-[#0a0a0a] flex flex-col font-mono text-[12px] md:text-[13px] text-[#e8e6e1] relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 p-4 md:p-5 overflow-y-auto cursor-text custom-scrollbar">
        <div className="flex flex-col gap-0.5 pb-4">
          {history.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-relaxed ${line.type === 'input' ? 'text-[#e8e6e1] mt-2' : 'text-[#777]'}`}
            >
              {line.content}
            </div>
          ))}

          {!isBooting && (
            <div className="flex gap-2 mt-2 items-center">
              <span className="text-[#6366f1] shrink-0 font-bold select-none">guest@dkarwasra:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isFetching}
                className="flex-1 bg-transparent border-none outline-none text-[#e8e6e1] caret-[#6366f1] w-full min-w-0 cursor-text"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          )}
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>
    </div>
  );
}
