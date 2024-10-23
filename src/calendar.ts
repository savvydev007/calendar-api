import { CalendarAPI, CreateEventArgs, UpdateEventArgs, ListEventsArgs, Result } from './types/api';
import { Event, EventID } from './types/event';
import { v4 as uuidv4 } from 'uuid';

export class Calendar implements CalendarAPI {
  private events: Event[] = [];

  private isOverlapping(event1: Event, event2: Event): boolean {
    return event1.duration.start < event2.duration.end && event1.duration.end > event2.duration.start;
  }

  createEvent(args: CreateEventArgs): Result<Event> {
    const newEvent: Event = {
      id: uuidv4(),
      title: args.title,
      duration: {
        start: args.start,
        end: new Date(args.start.getTime() + args.duration)
      }
    };
  
    if (!args.allowOverlap) {
      for (const existingEvent of this.events) {
        if (this.isOverlapping(newEvent, existingEvent)) {
          return { success: false, error: "Event overlaps with an existing event." };
        }
      }
    }
  
    this.events.push(newEvent);
    return { success: true, value: newEvent };
  }

  listEvents(args: ListEventsArgs): Event[] {
    return this.events.filter(event =>
      event.duration.start >= args.from && event.duration.end <= args.to
    );
  }

  updateEvent(args: UpdateEventArgs): Result<Event> {
    const eventIndex = this.events.findIndex(event => event.id === args.id);
    if (eventIndex === -1) {
      return { success: false, error: "Event not found." };
    }

    const existingEvent = this.events[eventIndex];
    const updatedEvent: Event = {
      ...existingEvent,
      title: args.title || existingEvent.title,
      duration: {
        start: args.start || existingEvent.duration.start,
        end: args.start ? new Date(args.start.getTime() +
          (args.duration || (existingEvent.duration.end.getTime() - existingEvent.duration.start.getTime())))
          : existingEvent.duration.end
      }
    };

    if (!args.allowOverlap) {
      for (const event of this.events) {
        if (event.id !== updatedEvent.id && this.isOverlapping(updatedEvent, event)) {
          return { success: false, error: "Updated event overlaps with an existing event." };
        }
      }
    }

    this.events[eventIndex] = updatedEvent;
    return { success: true, value: updatedEvent };
  }

  deleteEvent(id: EventID): boolean {
    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) {
      return false;
    }

    this.events.splice(eventIndex, 1);
    return true;
  }
}