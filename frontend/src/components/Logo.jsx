export default function Logo({ size = 'default', showText = true, light = false }) {
  const isSmall = size === 'small'

  return (
    <div className={`brand-logo-group ${isSmall ? 'logo-sm' : ''} ${light ? 'logo-light' : ''}`}>
      <div className="logo-badge-wrapper">
        <svg
          className="logo-icon-svg"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="40" height="40" rx="10" fill={light ? '#18382D' : '#F7F6F2'} stroke="#C5A878" strokeWidth="1.5" />
          {/* Geometric M & P interlocking composition */}
          <path
            d="M11 28V12L18 21L25 12V28"
            stroke={light ? '#C5A878' : '#244B3C'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 14H29C30.6569 14 32 15.3431 32 17C32 18.6569 30.6569 20 29 20H25"
            stroke="#C5A878"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="28" r="1.5" fill="#C5A878" />
        </svg>
      </div>

      {showText && (
        <span className="brand-title-text">
          <span className={`brand-title-main ${light ? 'light' : ''}`}>Member</span>
          <span className={`brand-title-accent ${light ? 'light' : ''}`}>Pass</span>
          <span className={`brand-wellness-tag ${light ? 'light' : ''}`}>MEMBERSHIP PLATFORM</span>
        </span>
      )}
    </div>
  )
}
