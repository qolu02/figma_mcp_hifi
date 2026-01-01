import { Button } from '@base-ui/react/button';
import { Menu } from '@base-ui/react/menu';
import { HamburgerIcon, PlusIcon, FolderIcon, CaretDownIcon } from '../atoms/icons';

/**
 * Top Navigation Bar Component - Responsive Version
 *
 * Contains:
 * - Hamburger menu button (left)
 * - "Add New Client" button
 * - "All Clients" dropdown menu
 *
 * Responsive layout using flexbox with gap and padding in rem units
 */
export default function TopNavigation() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: '2.5rem',
      }}
    >
      {/* Left side - Hamburger menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button style={{ padding: 0, cursor: 'pointer' }}>
          <HamburgerIcon />
        </Button>
      </div>

      {/* Right side - Action buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {/* Add New Client Button */}
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.625rem',
            height: '2.5rem',
            padding: '0.875rem 1rem',
            borderRadius: '5rem',
            border: '1px solid #7a828d',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <div style={{ width: '1rem', height: '1rem', flexShrink: 0 }}>
            <PlusIcon />
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: '1.2',
              letterSpacing: '-0.01875rem',
              color: '#7a828d',
              whiteSpace: 'nowrap',
            }}
          >
            Add New Client
          </span>
        </Button>

        {/* All Clients Dropdown */}
        <Menu.Root>
          <Menu.Trigger
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.625rem',
              paddingLeft: '0.3125rem',
              paddingRight: '1rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              borderRadius: '5rem',
              backgroundColor: '#2e353d',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {/* Icon container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                padding: '0.625rem 0.875rem',
                borderRadius: '2rem',
                backgroundColor: '#3a424c',
                border: '1px solid #3a424c',
                flexShrink: 0,
              }}
            >
              <div style={{ width: '1rem', height: '1rem' }}>
                <FolderIcon />
              </div>
            </div>

            {/* Text and caret */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01875rem',
                  color: '#aeb4bc',
                  whiteSpace: 'nowrap',
                }}
              >
                All Clients
              </span>
              <div style={{ width: '0.625rem', height: '0.625rem', flexShrink: 0 }}>
                <CaretDownIcon />
              </div>
            </div>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={8}>
              <Menu.Popup
                style={{
                  minWidth: '12.5rem',
                  backgroundColor: '#2e353d',
                  border: '1px solid #30353f',
                  borderRadius: '0.5rem',
                  padding: '0.25rem',
                }}
              >
                <Menu.Item
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    color: '#aeb4bc',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  All Clients
                </Menu.Item>
                <Menu.Item
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    color: '#aeb4bc',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Active Clients
                </Menu.Item>
                <Menu.Item
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    color: '#aeb4bc',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  Archived Clients
                </Menu.Item>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    </nav>
  );
}
