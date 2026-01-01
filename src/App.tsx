import { useState, useEffect } from 'react'
import Homepage from './routes/homepage'
import HomepageResponsive from './routes/homepage_responsive'

function App() {
  // Get the base path from Vite config (e.g., '/figma_mcp_hifi/')
  const base = import.meta.env.BASE_URL

  // Normalize pathname by removing base path
  const getRoute = () => {
    const path = window.location.pathname
    // Remove base path to get the route
    // e.g., '/figma_mcp_hifi/' -> '/', '/figma_mcp_hifi/homepage' -> '/homepage'
    if (path === base || path === base.replace(/\/$/, '')) {
      return '/'
    }
    return path.startsWith(base) ? path.slice(base.length - 1) : path
  }

  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRoute())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Simple client-side routing
  switch (route) {
    case '/homepage':
      return <Homepage />
    case '/homepage-responsive':
      return <HomepageResponsive />
    case '/':
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#12161b',
          color: '#e6eaf0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '2rem'
        }}>
          <h1 style={{ fontFamily: 'Noto Serif JP, serif', fontSize: '3rem', margin: 0 }}>
            Homepage Demo
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={`${base}homepage`}
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', `${base}homepage`)
                setRoute('/homepage')
              }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#2e353d',
                color: '#aeb4bc',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                border: '1px solid #30353f',
                cursor: 'pointer'
              }}
            >
              Original (Pixel-Perfect)
            </a>
            <a
              href={`${base}homepage-responsive`}
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', `${base}homepage-responsive`)
                setRoute('/homepage-responsive')
              }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#2e353d',
                color: '#aeb4bc',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                border: '1px solid #30353f',
                cursor: 'pointer'
              }}
            >
              Responsive Version
            </a>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7a828d', maxWidth: '600px', textAlign: 'center' }}>
            The original version uses absolute positioning for pixel-perfect Figma matching (1440x1024).
            The responsive version uses flexbox/grid with rem units for responsive design.
          </p>
        </div>
      )
    default:
      // Default to landing page if route doesn't match
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#12161b',
          color: '#e6eaf0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '2rem'
        }}>
          <h1 style={{ fontFamily: 'Noto Serif JP, serif', fontSize: '3rem', margin: 0 }}>
            Homepage Demo
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={`${base}homepage`}
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', `${base}homepage`)
                setRoute('/homepage')
              }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#2e353d',
                color: '#aeb4bc',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                border: '1px solid #30353f',
                cursor: 'pointer'
              }}
            >
              Original (Pixel-Perfect)
            </a>
            <a
              href={`${base}homepage-responsive`}
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState({}, '', `${base}homepage-responsive`)
                setRoute('/homepage-responsive')
              }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#2e353d',
                color: '#aeb4bc',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                border: '1px solid #30353f',
                cursor: 'pointer'
              }}
            >
              Responsive Version
            </a>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', color: '#7a828d', maxWidth: '600px', textAlign: 'center' }}>
            The original version uses absolute positioning for pixel-perfect Figma matching (1440x1024).
            The responsive version uses flexbox/grid with rem units for responsive design.
          </p>
        </div>
      )
  }
}

export default App
