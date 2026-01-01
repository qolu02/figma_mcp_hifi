import SearchPlusIcon from '../atoms/icons/SearchPlusIcon';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

/**
 * Search Bar Component
 * Figma node: 184-3721
 *
 * Search input with gradient background and action button
 * Exact Figma specs:
 * - Padding: 16px
 * - Gap: 16px between input and icon
 * - Border radius: 24px
 * - Border: 1px solid #30353f
 * - Background: Layered gradient
 * - Input: GT Walsheim Light, 18px, #aeb4bc
 * - Icon button: 40x40px with 12px padding, 32px inner size
 */
export default function SearchBar({ placeholder = 'Search by client name or characteristics', onSearch }: SearchBarProps) {
  return (
    <div
      style={{
        padding: '1px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(222, 155, 133, 0.4) 0%, rgba(95, 115, 155, 0.6) 15%, #30353F 30%, #30353F 70%, rgba(95, 115, 155, 0.6) 85%, rgba(222, 155, 133, 0.4) 100%)',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          borderRadius: '24px',
          width: '100%',
          backgroundImage:
            'linear-gradient(-83.08deg, rgba(46, 48, 60, 0) 23.672%, rgba(46, 48, 60, 0.8) 98.225%), linear-gradient(90deg, rgba(46, 53, 61, 1) 0%, rgba(46, 53, 61, 1) 100%)',
        }}
      >
      <input
        type="text"
        placeholder={placeholder}
        style={{
          flex: '1 0 0',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '18px',
          lineHeight: 'normal',
          color: '#aeb4bc',
          minWidth: 0,
        }}
        className="search-input"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            onSearch(e.currentTarget.value);
          }
        }}
      />
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          padding: '2px',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>('input[type="text"]');
          if (input && onSearch) {
            onSearch(input.value);
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '32px',
          }}
        >
          <SearchPlusIcon />
        </div>
      </button>
      </div>
    </div>
  );
}
