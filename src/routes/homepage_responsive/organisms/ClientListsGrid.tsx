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
 * Client Lists Grid Section Component - Responsive Version
 *
 * Displays a responsive grid of client list cards with:
 * - Section label "CLIENT LISTS"
 * - Responsive grid (1-3 columns based on viewport)
 * - 6 predefined client lists
 *
 * Responsive grid layout:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      {/* Section Label */}
      <h2
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: 'normal',
          letterSpacing: '0.0625rem',
          color: '#7a828d',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        CLIENT LISTS
      </h2>

      {/* Responsive Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
          width: '100%',
        }}
      >
        {clientLists.map((card) => (
          <ClientListCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
