interface HeroSectionProps {
  userName?: string;
}

/**
 * Hero Section Component - Responsive Version
 *
 * Large welcome heading with user name
 * - Responsive font sizing using clamp()
 * - Fluid typography that scales with viewport
 */
export default function HeroSection({ userName = 'Laura' }: HeroSectionProps) {
  return (
    <div>
      <h1
        style={{
          fontFamily: 'Noto Serif JP, serif',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          lineHeight: '1.1',
          letterSpacing: '-0.125rem',
          color: '#e6eaf0',
          margin: 0,
        }}
      >
        Welcome back, {userName}
      </h1>
    </div>
  );
}
