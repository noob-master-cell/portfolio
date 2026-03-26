import { useState, useEffect, useRef } from 'react';
import { DATA } from '../../data/content';

const GatekeeperAscii = () => (
  <pre className="text-[#ff5722] text-[10px] sm:text-[12px] leading-tight my-4 overflow-x-auto font-mono">
    {` [CLIENT]
    │
    ▼
┌─────────────┐     ┌─────────────┐
│  API GW     │────▶│ MICROSVC A  │
└─────────────┘     └─────────────┘
    │   │
    │   └──▶ [REDIS SESSION]
    ▼
┌─────────────┐
│ AUTH / RBAC │
└─────────────┘`}
  </pre>
);

const MatrixRain = () => {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count > 15) { clearInterval(interval); return; }
      setLines(prev => [...prev, Array(50).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')]);
      count++;
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <pre className="text-[#0f0] text-[10px] sm:text-[12px] leading-tight my-2 overflow-hidden font-mono opacity-80">
      {lines.join('\\n')}
    </pre>
  );
};

const VALID_COMMANDS = [
  'dk help', 'dk projects', 'dk gatekeeper', 'dk skills', 'dk stats', 'dk resume',
  'dk contact', 'dk source', 'dk whoami', 'dk neofetch', 'dk experience', 'dk ls',
  'dk ping', 'dk matrix', 'dk coffee', 'clear', 'sudo'
];

export default function EmbeddedTerminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  // Command History State
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const bootStarted = useRef(false);
 
  // Boot Sequence
  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;
 
    const bootLines = [
      'INIT: version 2.0.4 booting',
      'Loading kernel modules... OK',
      'Mounting file systems... OK',
      'Starting network interface... eth0 UP',
      'Initializing graphics... [WARNING] fallback mode',
      'dheerajOS loaded successfully.',
      'Type "dk help" for available commands.'
    ];
 
    let delay = 0;
    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'output', content: line }]);
        if (i === bootLines.length - 1) setIsBooting(false);
      }, delay);
      delay += Math.random() * 300 + 100;
    });
  }, []);

  useEffect(() => {
    // Only scroll into view if not booting or if the terminal is already mostly visible
    // to prevent the initial boot sequence from hijacking the page scroll on load.
    if (!isBooting) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isBooting]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
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
      const match = VALID_COMMANDS.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const handleCommand = async () => {
    const fullCmd = input.trim().toLowerCase();
    setInput('');
    if (!fullCmd) return;

    setCmdHistory(prev => [...prev, fullCmd]);
    setHistoryIndex(-1);
    setHistory(prev => [...prev, { type: 'input', content: `guest@dkarwasra:~$ ${fullCmd}` }]);

    if (fullCmd === 'clear') { setHistory([]); return; }
    if (fullCmd === 'sudo') { setHistory(prev => [...prev, { type: 'output', content: 'nice try. this incident will be reported.' }]); return; }

    if (!fullCmd.startsWith('dk ')) {
      setHistory(prev => [...prev, { type: 'output', content: `command not found: ${fullCmd}. Type "dk help".` }]);
      return;
    }

    const cmd = fullCmd.replace('dk ', '').trim();

    switch (cmd) {
      case 'help':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="flex flex-col gap-1 my-2">
              <div className="text-[#888] mb-1">available commands:</div>
              {[
                ['dk projects', 'list core projects'],
                ['dk gatekeeper', 'gatekeeper architecture'],
                ['dk skills', 'technical capabilities'],
                ['dk experience', 'work history'],
                ['dk stats', 'live github stats'],
                ['dk neofetch', 'system info summary'],
                ['dk ls', 'list directory contents'],
                ['dk ping', 'network latency test'],
                ['dk whoami', 'identity print'],
                ['dk resume', 'download pdf format'],
                ['dk contact', 'transmission channels'],
                ['dk source', "view site source"],
                ['clear', 'clear terminal'],
              ].map(([c, desc]) => (
                <div key={c}><span className="text-[#ff5722] inline-block w-32">{c}</span> — {desc}</div>
              ))}
            </div>
          )
        }]);
        break;

      case 'projects':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="my-2">
              <div>1. <span className="text-[#e8e6e1]">gatekeeper</span> - zero-trust reverse proxy gateway</div>
              <div>2. <span className="text-[#e8e6e1]">esn event platform</span> - real-time management at scale</div>
            </div>
          )
        }]);
        break;

      case 'gatekeeper':
        setHistory(prev => [...prev, { type: 'output', content: <GatekeeperAscii /> }]);
        break;

      case 'skills':
        setHistory(prev => [...prev, { type: 'output', content: 'python, typescript, c++, react, fastapi, postgresql, aws, docker' }]);
        break;

      case 'experience':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="flex flex-col gap-2 my-2 border-l-2 border-[#555] pl-4">
              {DATA.experience.map((job, i) => (
                <div key={i}>
                  <div className="text-[#e8e6e1]">{job.company} — <span className="text-[#888]">{job.role}</span></div>
                  <div className="text-[#ff5722] text-[10px]">{job.date}</div>
                </div>
              ))}
            </div>
          )
        }]);
        break;

      case 'whoami':
        setHistory(prev => [...prev, { type: 'output', content: `${DATA.identity.name} (${DATA.identity.model}) - ${DATA.identity.title}` }]);
        break;

      case 'neofetch':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="flex gap-6 my-4">
              <pre className="text-[#ff5722] font-mono leading-none hidden sm:block">
{`
   .---.
  /     \\
  \\.dhee./
   /   \\
   '---'
`}
            </pre>
              <div className="flex flex-col gap-1">
                <div><span className="text-[#ff5722] font-bold">host</span>: {DATA.identity.name}</div>
                <div><span className="text-[#ff5722] font-bold">os</span>: dheerajOS v2.0.4</div>
                <div><span className="text-[#ff5722] font-bold">uptime</span>: ∞</div>
                <div><span className="text-[#ff5722] font-bold">packages</span>: 998 (npm), 143 (pip)</div>
                <div><span className="text-[#ff5722] font-bold">shell</span>: zsh 5.9</div>
                <div><span className="text-[#ff5722] font-bold">location</span>: {DATA.identity.location}</div>
              </div>
            </div>
          )
        }]);
        break;

      case 'ls':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="flex gap-4 my-2 text-[#888]">
              <span className="text-[#42a5f5]">src/</span>
              <span className="text-[#42a5f5]">public/</span>
              <span>package.json</span>
              <span>README.md</span>
              <span className="text-[#4CAF50] cursor-pointer" onClick={() => window.open('#', '_blank')}>resume.pdf</span>
            </div>
          )
        }]);
        break;

      case 'ping':
        setHistory(prev => [...prev, { type: 'output', content: 'PING 8.8.8.8 (8.8.8.8): 56 data bytes\\n64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=12.4 ms\\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=11.1 ms\\n64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=13.0 ms\\n--- 8.8.8.8 ping statistics ---\\n3 packets transmitted, 3 packets received, 0.0% packet loss' }]);
        break;

      case 'matrix':
        setHistory(prev => [...prev, { type: 'output', content: <MatrixRain /> }]);
        break;

      case 'coffee':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <pre className="text-[#8d6e63] my-2">
{`
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----\\´
`}
            </pre>
          )
        }]);
        break;

      case 'stats':
        setIsFetching(true);
        setHistory(prev => [...prev, { type: 'output', content: 'fetching live stats via API...', id: 'loading-stats' }]);
        try {
          const res = await fetch('https://api.github.com/users/noob-master-cell');
          const data = await res.json();
          setHistory(prev => {
            const cleaned = prev.filter(item => item.id !== 'loading-stats');
            return [...cleaned, {
              type: 'output', content: (
                <div className="flex flex-col gap-1 my-2 border-l-2 border-[#ff5722] pl-4">
                  <div><span className="text-[#888] inline-block w-36">github repos:</span> {data.public_repos || 24}</div>
                  <div><span className="text-[#888] inline-block w-36">github followers:</span> {data.followers || 12}</div>
                  <div><span className="text-[#888] inline-block w-36">leetcode solved:</span> 450+ (top 5%)</div>
                  <div><span className="text-[#888] inline-block w-36">system status:</span> operational</div>
                </div>
              )
            }];
          });
        } catch {
          setHistory(prev => {
            const cleaned = prev.filter(item => item.id !== 'loading-stats');
            return [...cleaned, { type: 'output', content: 'error fetching live stats. fallback to local cache.' }];
          });
        }
        setIsFetching(false);
        break;

      case 'resume':
        setHistory(prev => [...prev, { type: 'output', content: 'generating pdf... [download will start automatically]' }]);
        setTimeout(() => { window.open('#', '_blank'); }, 1000);
        break;

      case 'contact':
        setHistory(prev => [...prev, { type: 'output', content: `email: ${DATA.identity.email} | location: ${DATA.identity.location}` }]);
        break;

      case 'source':
        setHistory(prev => [...prev, { type: 'output', content: 'redirecting to github repository...' }]);
        setTimeout(() => { window.open(DATA.identity.links[0].url, '_blank'); }, 800);
        break;

      default:
        setHistory(prev => [...prev, { type: 'output', content: `command not found: ${cmd}. Type "dk help".` }]);
    }
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-[#111] border border-[#333] flex flex-col font-mono text-[12px] md:text-[13px] text-[#e8e6e1] relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow hover:shadow-[0_0_30px_rgba(255,87,34,0.1)]">
      {/* Terminal Header */}
      <div className="h-8 border-b border-[#333] bg-[#0d0d0d] flex items-center justify-between px-4 shrink-0 selection:bg-transparent">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-[#888] uppercase tracking-widest">sys.term // active</div>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 p-4 md:p-6 overflow-y-auto interactive-hover cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-col gap-1 pb-4">
          {history.map((line, i) => (
            <div key={i} className={`${line.type === 'input' ? 'text-[#e8e6e1] mt-2' : 'text-[#888]'} whitespace-pre-wrap`}>
              {line.content}
            </div>
          ))}
          {!isBooting && (
            <div className="flex gap-2 mt-2 items-center">
              <span className="text-[#ff5722] shrink-0 font-bold">guest@dkarwasra:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isFetching || isBooting}
                className="flex-1 bg-transparent border-none outline-none text-[#e8e6e1] caret-[#ff5722] w-full min-w-0 placeholder-[#333]"
                placeholder="type 'dk help' (use Tab for autocomplete, ↑/↓ for history)"
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          )}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
    </div>
  );
}

