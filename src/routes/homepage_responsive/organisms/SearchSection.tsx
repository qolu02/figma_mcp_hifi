import SearchBar from '../molecules/SearchBar';
import FilterChip from '../molecules/FilterChip';

/**
 * Search Section Component - Responsive Version
 *
 * Contains:
 * - Search bar with AI-powered search
 * - AI filter suggestion chips
 *
 * Responsive layout with flexible wrapping chips
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
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        width: '100%',
        maxWidth: '852px',
        margin: '0 auto',
      }}
    >
      {/* Search Bar */}
      <SearchBar />

      {/* AI Filter Chips - left justified to match search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {filterSuggestions.map((suggestion) => (
          <FilterChip key={suggestion} label={suggestion} />
        ))}
      </div>
    </div>
  );
}
