import { useEffect, useState } from 'react';

const USERNAME = 'noob-master-cell';
const CACHE_KEY = `gh-stats-${USERNAME}`;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Go: '#00ADD8',
  Rust: '#dea584'
};

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // localStorage unavailable, ignore
  }
}

async function loadStats() {
  const cached = readCache();
  if (cached) return cached;

  const headers = { Accept: 'application/vnd.github+json' };

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`, { headers })
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error('GitHub API unavailable');
  }

  const user = await userRes.json();
  const repos = await reposRes.json();
  const events = eventsRes.ok ? await eventsRes.json() : [];

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  const recentCommits = events
    .filter((e) => e.type === 'PushEvent')
    .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);

  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 8);

  const langResults = await Promise.all(
    topRepos.map((r) =>
      fetch(`https://api.github.com/repos/${USERNAME}/${r.name}/languages`, { headers })
        .then((res) => (res.ok ? res.json() : {}))
        .catch(() => ({}))
    )
  );

  const langTotals = {};
  for (const langs of langResults) {
    for (const [name, bytes] of Object.entries(langs)) {
      langTotals[name] = (langTotals[name] || 0) + bytes;
    }
  }

  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(langTotals)
    .map(([name, bytes]) => ({ name, pct: (bytes / totalBytes) * 100 }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6);

  const data = {
    user: {
      login: user.login,
      avatar: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos
    },
    totals: {
      stars: totalStars,
      forks: totalForks,
      recentCommits
    },
    languages
  };

  writeCache(data);
  return data;
}

export default function GitHubStats() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let mounted = true;
    loadStats()
      .then((data) => {
        if (mounted) setState({ status: 'ready', data, error: null });
      })
      .catch((err) => {
        if (mounted) setState({ status: 'error', data: null, error: err.message });
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (state.status === 'error') {
    return (
      <div className="border border-neutral-200 rounded-lg p-5 bg-white">
        <div className="font-mono text-xs text-neutral-500 mb-2">GitHub</div>
        <div className="text-sm text-neutral-600">
          Stats unavailable right now. View the <a className="underline" href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">profile</a>.
        </div>
      </div>
    );
  }

  if (state.status === 'loading') {
    return (
      <div className="border border-neutral-200 rounded-lg p-5 bg-white">
        <div className="font-mono text-xs text-neutral-500 mb-2">GitHub</div>
        <div className="text-sm text-neutral-400">Loading live stats.</div>
      </div>
    );
  }

  const { user, totals, languages } = state.data;

  return (
    <a
      href={`https://github.com/${user.login}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-neutral-200 rounded-lg p-5 bg-white hover:border-neutral-400 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-xs text-neutral-500">GitHub, live</div>
        <span className="font-mono text-xs text-neutral-400">@{user.login}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <div className="text-xl font-semibold text-black">{user.publicRepos}</div>
          <div className="font-mono text-xs text-neutral-500">Repos</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-black">{totals.stars}</div>
          <div className="font-mono text-xs text-neutral-500">Stars</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-black">{totals.recentCommits}</div>
          <div className="font-mono text-xs text-neutral-500">Recent commits</div>
        </div>
      </div>

      {languages.length > 0 && (
        <div>
          <div className="font-mono text-xs text-neutral-500 mb-2">
            Top languages
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden flex bg-neutral-100">
            {languages.map((l) => (
              <span
                key={l.name}
                style={{ width: `${l.pct}%`, background: LANG_COLORS[l.name] || '#9ca3af' }}
                title={`${l.name} ${l.pct.toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center gap-1.5 font-mono text-xs text-neutral-600">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: LANG_COLORS[l.name] || '#9ca3af' }}
                />
                {l.name} {l.pct.toFixed(0)}%
              </div>
            ))}
          </div>
        </div>
      )}
    </a>
  );
}
