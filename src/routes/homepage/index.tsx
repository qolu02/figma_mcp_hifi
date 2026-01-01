import TopNavigation from './organisms/TopNavigation';
import HeroSection from './organisms/HeroSection';
import SearchSection from './organisms/SearchSection';
import ClientListsGrid from './organisms/ClientListsGrid';
import Footer from './organisms/Footer';

/**
 * Homepage Route Component
 * Figma node: 184-3661 (1440x1024 frame)
 *
 * Financial advisor dashboard with client management features
 * Figma: https://www.figma.com/design/MAzIbPSnkgSyZELRWCAuqM/Agate--WS-Design-System-?node-id=184-3661
 *
 * Architecture:
 * - Organisms: TopNavigation, HeroSection, SearchSection, ClientListsGrid, Footer
 * - Molecules: ClientListCard, FilterChip, SearchBar
 * - Atoms: Icons, IconBadge
 *
 * Layout: All child components use absolute positioning matching exact Figma coordinates
 * Background: Dark theme with gradient overlay (Figma node: 184-3662)
 */
export default function Homepage() {
  return (
    <div
      style={{
        position: 'relative',
        width: '1440px',
        height: '1024px',
        backgroundColor: '#12161b',
        margin: '0 auto'
      }}
    >
      {/* Background gradient overlay (Figma node: 184-3662) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(-21.416deg, rgba(45, 49, 60, 0) 52.123%, rgba(45, 49, 60, 0.7) 100%)',
        }}
      />

      {/* All organisms positioned absolutely to match Figma */}
      <TopNavigation />
      <HeroSection userName="Laura" />
      <SearchSection />
      <ClientListsGrid />
      <Footer />
    </div>
  );
}
