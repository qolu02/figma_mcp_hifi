import ClientListCard, { type ClientListCardProps } from '../molecules/ClientListCard';
import {
  ClockIcon,
  CalendarIcon,
  AlertIcon,
  DocumentIcon,
  ChartIcon,
  UserIcon,
} from '../atoms/icons';

/**
 * Client Lists Grid Section Component
 * Figma: Cards at 184-3727 through 184-3732
 *
 * Displays a grid of client list cards with:
 * - Section label "CLIENT LISTS"
 * - 3-column grid (329-331px per card)
 * - 6 predefined client lists
 *
 * Exact Figma specs (at 1440px viewport):
 * - Label position: x=207, y=485.5
 * - Cards start: x=207, y=519
 * - Card dimensions: ~329-331px width, 175px height
 * - Horizontal gaps: 20px between cards
 * - Vertical gaps: 20px between rows
 * - Label margin bottom: 24px (519 - 485.5 - 10 = 23.5)
 */
export default function ClientListsGrid() {
  const clientLists: ClientListCardProps[] = [
    {
      id: 'recent',
      title: 'Recent',
      description: 'Recently viewed clients',
      count: 10,
      icon: <ClockIcon />,
    },
    {
      id: 'upcoming-meetings',
      title: 'Upcoming Meetings',
      description: 'Meetings in the next 14 days',
      count: 35,
      icon: <CalendarIcon />,
    },
    {
      id: 'time-sensitive',
      title: 'Time Sensitive',
      description: 'Upcoming deadlines and overdue actions',
      count: 38,
      icon: <AlertIcon />,
    },
    {
      id: 'pending-review',
      title: 'Pending Review',
      description: 'New recs pending advisor review',
      count: 92,
      icon: <DocumentIcon />,
    },
    {
      id: 'planning-gaps',
      title: 'Planning Gaps',
      description: 'Financial health vulnerabilities',
      count: 41,
      icon: <ChartIcon />,
    },
    {
      id: 'needs-outreach',
      title: 'Needs Outreach',
      description: 'Contact or have client-pending actions',
      count: 23,
      icon: <UserIcon />,
    },
  ];

  return (
    <>
      {/* Section Label */}
      <div
        style={{
          position: 'absolute',
          left: '207px',
          top: '485.5px'
        }}
      >
        <h2
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: 'normal',
            letterSpacing: '1px',
            color: '#7a828d',
            textTransform: 'uppercase',
            margin: 0
          }}
        >
          CLIENT LISTS
        </h2>
      </div>

      {/* Cards Grid - positioned absolutely based on Figma coordinates */}
      <div
        style={{
          position: 'absolute',
          left: '207px',
          top: '519px',
          width: '1029px', // 329 + 20 + 331 + 20 + 329
          display: 'grid',
          gridTemplateColumns: '329px 331px 329px',
          gap: '20px',
          gridTemplateRows: '175px 175px'
        }}
      >
        {clientLists.map((card) => (
          <ClientListCard key={card.id} {...card} />
        ))}
      </div>
    </>
  );
}
