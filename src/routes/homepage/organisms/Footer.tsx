import { Button } from '@base-ui/react/button';
import GearIcon from '../atoms/icons/GearIcon';

/**
 * Footer Component
 * Figma node: 184-3717
 *
 * Contains the "Customize" button for layout customization
 * Exact Figma specs (at 1440px viewport):
 * - Position: x=667.5, y=974
 * - Dimensions: width=105, height=24
 * - Centered horizontally in viewport
 * - Button gap: 8px between icon and text
 */
export default function Footer() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '667.5px',
        top: '974px',
        width: '105px',
        height: '24px'
      }}
    >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#7a828d',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#aeb4bc')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#7a828d')}
      >
        <GearIcon />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1.2',
            letterSpacing: '-0.3px'
          }}
        >
          Customize
        </span>
      </Button>
    </div>
  );
}
