import { EventDto } from '@losol/eventuras';
import Link from 'next/link';

import { Card } from '@/components/content'; // Assuming this is the path to your Card.tsx

interface EventCardProps {
  eventinfo: EventDto;
}

const EventCard: React.FC<EventCardProps> = ({ eventinfo }) => {
  const formatDateRange = (start: string, end?: string) => {
    if (!end || start === end) {
      return start;
    }
    return `${start} - ${end}`;
  };

  return (
    <Card>
      {eventinfo.title && (
        <Card.Heading>
          <Link href={`/events/${eventinfo.id}`} className="stretched-link">
            {eventinfo.title}
          </Link>
        </Card.Heading>
      )}
      {eventinfo.description && <Card.Text>{eventinfo.description}</Card.Text>}
      {eventinfo.location && <Card.Text>{eventinfo.location}</Card.Text>}
      <Card.Text>
        {formatDateRange(eventinfo.dateStart as string, eventinfo.dateEnd as string)}
      </Card.Text>
    </Card>
  );
};

export default EventCard;
