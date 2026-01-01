interface HeroSectionProps {
  userName?: string;
}

/**
 * Hero Section Component
 * Figma node: 184-3663
 *
 * Large welcome heading with user name
 * Exact Figma specs (at 1440px viewport):
 * - Position: x=207, y=127
 * - Dimensions: width=1067, height=41
 * - Font: Noto Serif JP, 56px
 * - Line height: 1.1
 * - Letter spacing: -2px
 * - Color: #e6eaf0 (text-bright)
 */
export default function HeroSection({ userName = 'Laura' }: HeroSectionProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: '207px',
        top: '127px',
        width: '1067px',
        height: '41px'
      }}
    >
      <h1
        style={{
          fontFamily: 'Noto Serif JP, serif',
          fontWeight: 400,
          fontSize: '56px',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          color: '#e6eaf0',
          margin: 0
        }}
      >
        Welcome back, {userName}
      </h1>
    </div>
  );
}
