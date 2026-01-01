import { Button } from '@base-ui/react/button';
import IconBadge from '../atoms/IconBadge';

export interface ClientListCardProps {
  id: string;
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

/**
 * Client List Card Component
 * Figma node: 184-3727
 *
 * Interactive card displaying client list summary with:
 * - Title and description
 * - Client count
 * - Icon badge
 * - Hover scale animation (1.02)
 *
 * Uses exact Figma values for pixel-perfect implementation
 */
export default function ClientListCard({ title, description, count, icon }: ClientListCardProps) {
  return (
    <Button
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'space-between',
        padding: '24px',
        borderRadius: '20px',
        position: 'relative',
        width: '100%',
        backgroundImage: 'linear-gradient(-64.099deg, rgba(26, 30, 36, 1) 69.652%, rgba(40, 45, 54, 1) 91.117%)',
        textAlign: 'left',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* Card Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'start', width: '100%', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h3
            style={{
              flex: '1 0 0',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              color: '#e6eaf0',
            }}
          >
            {title}
          </h3>
          <IconBadge icon={icon} />
        </div>
        <p
          style={{
            fontFamily: 'GT Walsheim Trial, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1.2',
            letterSpacing: '-0.3px',
            color: '#7a828d',
            maxWidth: '240px',
          }}
        >
          {description}
        </p>
      </div>

      {/* Card Footer */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1.2',
              letterSpacing: '-0.3px',
              color: '#aeb4bc',
            }}
          >
            {count}
          </span>
          <span
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: 'normal',
              letterSpacing: '1px',
              color: '#7a828d',
              textTransform: 'uppercase',
            }}
          >
            Clients
          </span>
        </div>
        {/* Placeholder element from Figma design - can be used for progress indicators or other visualizations */}
        <div style={{ height: '14px', flexShrink: 0, width: '128px' }} />
      </div>
    </Button>
  );
}
