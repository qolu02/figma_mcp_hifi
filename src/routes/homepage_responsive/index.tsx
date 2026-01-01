import TopNavigation from './organisms/TopNavigation';
import HeroSection from './organisms/HeroSection';
import SearchSection from './organisms/SearchSection';
import ClientListsGrid from './organisms/ClientListsGrid';
import Footer from './organisms/Footer';

/**
 * Homepage Responsive Route Component
 *
 * Responsive version of the homepage using conventional layout patterns
 * - Flexbox for main layout
 * - Responsive units (rem, %, etc.)
 * - Mobile-first approach
 * - Max-width container with auto margins for centering
 */
export default function HomepageResponsive() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#12161b',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'linear-gradient(-21.416deg, rgba(45, 49, 60, 0) 52.123%, rgba(45, 49, 60, 0.7) 100%)',
        }}
      />

      {/* Navigation - full width at window edges */}
      <div
        style={{
          width: '100%',
          padding: '1.375rem 1rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <TopNavigation />
      </div>

      {/* Main content container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          flex: 1,
        }}
      >
        <div style={{ marginTop: 'clamp(2rem, 6vw, 4.5rem)' }}>
          <HeroSection userName="Laura" />
        </div>
        <div style={{ marginTop: 'clamp(2rem, 5vw, 4rem)', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
          <SearchSection />
        </div>
        <ClientListsGrid />
      </div>

      {/* Footer - bound to bottom of window */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
