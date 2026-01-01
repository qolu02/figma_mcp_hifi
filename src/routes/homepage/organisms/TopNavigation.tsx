import { Button } from '@base-ui/react/button';
import { Menu } from '@base-ui/react/menu';
import { HamburgerIcon, PlusIcon, FolderIcon, CaretDownIcon } from '../atoms/icons';

/**
 * Top Navigation Bar Component
 * Figma node: 184-3734
 *
 * Contains:
 * - Hamburger menu button (left)
 * - "Add New Client" button
 * - "All Clients" dropdown menu
 *
 * Exact Figma specs (at 1440px viewport):
 * - Position: x=32, y=22
 * - Dimensions: width=1376, height=40
 * - Left side: Hamburger icon (24x24px) with 16px right padding
 * - Right side: Width=701px, gap=16px between buttons
 * - "Add New Client": 40px height, 16px horizontal padding, 14px vertical, 10px gap, pill shape
 * - "All Clients": 5px left padding, 16px right, 4px vertical, 10px gap, pill shape
 */
export default function TopNavigation() {
  return (
    <nav
      style={{
        position: 'absolute',
        left: '32px',
        top: '22px',
        width: '1376px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Left side - Hamburger menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0
        }}
      >
        <div style={{ paddingRight: '16px' }}>
          <Button style={{ padding: 0, cursor: 'pointer' }}>
            <HamburgerIcon />
          </Button>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '16px',
          width: '701px',
          flexShrink: 0
        }}
      >
        {/* Add New Client Button */}
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            height: '40px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '14px',
            paddingBottom: '14px',
            borderRadius: '80px',
            border: '1px solid #7a828d',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <div style={{ width: '16px', height: '16px', flexShrink: 0 }}>
            <PlusIcon />
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '1.2',
              letterSpacing: '-0.3px',
              color: '#7a828d',
              whiteSpace: 'nowrap'
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
              gap: '10px',
              paddingLeft: '5px',
              paddingRight: '16px',
              paddingTop: '4px',
              paddingBottom: '4px',
              borderRadius: '80px',
              backgroundColor: '#2e353d',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {/* Icon container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                paddingLeft: '14px',
                paddingRight: '14px',
                paddingTop: '10px',
                paddingBottom: '10px',
                borderRadius: '32px',
                backgroundColor: '#3a424c',
                border: '1px solid #3a424c',
                flexShrink: 0
              }}
            >
              <div style={{ width: '16px', height: '16px' }}>
                <FolderIcon />
              </div>
            </div>

            {/* Text and caret */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.3px',
                  color: '#aeb4bc',
                  whiteSpace: 'nowrap'
                }}
              >
                All Clients
              </span>
              <div style={{ width: '10px', height: '10px', flexShrink: 0 }}>
                <CaretDownIcon />
              </div>
            </div>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner sideOffset={8}>
              <Menu.Popup
                style={{
                  minWidth: '200px',
                  backgroundColor: '#2e353d',
                  border: '1px solid #30353f',
                  borderRadius: '8px',
                  padding: '4px'
                }}
              >
                <Menu.Item
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: '#aeb4bc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  All Clients
                </Menu.Item>
                <Menu.Item
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: '#aeb4bc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Active Clients
                </Menu.Item>
                <Menu.Item
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    color: '#aeb4bc',
                    borderRadius: '4px',
                    cursor: 'pointer'
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
