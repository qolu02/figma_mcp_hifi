import SearchBar from '../molecules/SearchBar';
import FilterChip from '../molecules/FilterChip';

/**
 * Search Section Component
 * Figma node: 184-3720
 *
 * Contains:
 * - Search bar with AI-powered search
 * - AI filter suggestion chips
 *
 * Exact Figma specs (at 1440px viewport):
 * - Position: x=294, y=276
 * - Dimensions: width=852, height=130
 * - Gap between search and chips: 20px
 * - Chips gap: 8px
 */
export default function SearchSection() {
  const filterSuggestions = [
    'Clients with estate planning gaps',
    'New Parents without a 529 established',
    'Clients above 2M net worth',
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: '294px',
        top: '276px',
        width: '852px',
        height: '130px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', height: '100%' }}>
        {/* Search Bar */}
        <SearchBar />

        {/* AI Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
          {filterSuggestions.map((suggestion) => (
            <FilterChip key={suggestion} label={suggestion} />
          ))}
        </div>
      </div>
    </div>
  );
}
