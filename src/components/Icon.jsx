const paths = {
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  system: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 17.5h7M17.5 14v7" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.2c2.8.2 5 2.6 5 5.8" />
    </>
  ),
  print: (
    <>
      <path d="M6 9V3h12v6" />
      <rect x="3" y="9" width="18" height="8" rx="1.5" />
      <path d="M6 14h12v7H6z" />
    </>
  ),
  pen: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4M9 11h7M9 15h7M9 19h4" />
    </>
  ),
  client: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M5.5 16.5c.6-1.8 2-2.8 3.5-2.8s2.9 1 3.5 2.8M15 10h3.5M15 13.5h3.5" />
    </>
  ),
  progress: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V11l4-3 4 3v10" />
      <path d="M13 21V6l3-2 3 2v15" />
      <path d="M8 14h2M8 17h2M15.5 10h1M15.5 13h1M15.5 16h1" />
    </>
  ),
  yen: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 7l3.5 5 3.5-5M12 12v6M9 13h6M9 15.5h6" />
    </>
  ),
  excel: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18M3 14h18M9 4v16M15 4v16" />
    </>
  ),
  custom: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1" />
    </>
  ),
  chat: (
    <path d="M4 5h16v11H9l-5 4z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </>
  ),
  phone: (
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  map: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17z" />
      <path d="M7 17h2M12 17h2M17 17h1" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10.5 21v-3h3v3" />
    </>
  ),
  helmet: (
    <>
      <path d="M3 17h18" />
      <path d="M5 17v-3a7 7 0 0 1 14 0v3" />
      <path d="M10 7.5V11M14 7.5V11" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.5 }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
