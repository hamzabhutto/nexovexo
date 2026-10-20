type IconProps = {
  name: string;
  className?: string;
};

// Minimal line-icon set keyed by the `icon` field stored on services.
const paths: Record<string, React.ReactNode> = {
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
  cloud: (
    <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 15.3" />
  ),
  spark: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m6 6 2.5 2.5" />
      <path d="m15.5 15.5 2.5 2.5" />
      <path d="m18 6-2.5 2.5" />
      <path d="m8.5 15.5-2.5 2.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  design: (
    <>
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="12" r="2.5" />
      <circle cx="15" cy="17" r="2.5" />
      <path d="M11.5 7.5 8 10.5m2.5 5L13 15" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  // DevSecOps: shield with a scan/lock accent
  "shield-scan": (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="M9 11h6" />
      <path d="M12 8v6" />
    </>
  ),
  // AI-assisted operations: activity pulse
  pulse: (
    <>
      <path d="M3 12h4l2 6 4-14 2 8h6" />
    </>
  ),
  // Secure AI-agent operations: hexagon agent
  agent: (
    <>
      <path d="M12 2 20 6.5v9L12 20l-8-4.5v-9L12 2Z" />
      <circle cx="12" cy="11" r="2.5" />
      <path d="M12 13.5V16" />
    </>
  ),
  // Microservices: connected nodes
  layers: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </>
  ),
  // Chatbot / assistant
  chat: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" />
      <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" />
    </>
  ),
  // AI integration / RAG: brain-circuit
  brain: (
    <>
      <path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V17a3 3 0 0 0 4 2 3 3 0 0 0 4-2v-3.2A3 3 0 0 0 15 8a3 3 0 0 0-3-3Z" />
      <path d="M12 5v14" />
    </>
  ),
  // Low-code / no-code: building blocks
  blocks: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <path d="M15 7h4a2 2 0 0 1 2 2v4" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
      <path d="M3 15v4a2 2 0 0 0 2 2h4" />
    </>
  ),
  // Platform engineering / cloud infra: server stack
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  // MCP / integrations: plug connector
  plug: (
    <>
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v2a6 6 0 0 1-12 0V8Z" />
      <path d="M12 16v6" />
    </>
  ),
};

export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.code}
    </svg>
  );
}
