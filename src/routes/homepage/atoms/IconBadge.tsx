interface IconBadgeProps {
  icon: React.ReactNode;
}

/**
 * Circular badge container for icons (used in Client List cards)
 * Figma: 6px padding, 32px border-radius, #2e353d background
 */
export default function IconBadge({ icon }: IconBadgeProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
        borderRadius: '32px',
        backgroundColor: '#2e353d',
        flexShrink: 0,
      }}
    >
      <div style={{ width: '16px', height: '16px', color: '#aeb4bc' }}>
        {icon}
      </div>
    </div>
  );
}
