import { Button } from '@base-ui/react/button';

interface FilterChipProps {
  label: string;
  onClick?: () => void;
}

/**
 * AI Filter Chip Component
 * Figma nodes: 184-3723, 184-3724, 184-3725
 *
 * Pill-shaped button for filtering/search suggestions with gradient border
 * Exact Figma specs:
 * - Padding: 16px horizontal, 14px vertical
 * - Border radius: 80px (pill shape)
 * - Background: #22272e (surface-level-2)
 * - Border: Gradient highlight border (Fancy card stroke)
 * - Font: Plus Jakarta Sans Regular, 14px, -0.3px letter spacing
 * - Line height: 1.2
 * - Color: #aeb4bc (text-subtle)
 */
export default function FilterChip({ label, onClick }: FilterChipProps) {
  return (
    <div
      style={{
        position: 'relative',
        padding: '1px',
        borderRadius: '80px',
        background: 'linear-gradient(135deg, rgba(174, 180, 188, 0.3) 0%, rgba(174, 180, 188, 0.05) 50%, rgba(174, 180, 188, 0.3) 100%)',
        flexShrink: 0,
      }}
    >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '14px',
          paddingBottom: '14px',
          borderRadius: '80px',
          backgroundColor: '#22272e',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
        onClick={onClick}
      >
        <span
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '1.2',
            letterSpacing: '-0.3px',
            color: '#aeb4bc',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      </Button>
    </div>
  );
}
