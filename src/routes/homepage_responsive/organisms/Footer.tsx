import { Button } from '@base-ui/react/button';
import GearIcon from '../atoms/icons/GearIcon';

/**
 * Footer Component - Responsive Version
 *
 * Contains the "Customize" button for layout customization
 * - Centered horizontally
 * - Responsive spacing
 */
export default function Footer() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#7a828d',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#aeb4bc')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#7a828d')}
      >
        <GearIcon />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.2',
            letterSpacing: '-0.01875rem',
          }}
        >
          Customize
        </span>
      </Button>
    </div>
  );
}
