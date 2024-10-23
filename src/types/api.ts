import { Event, EventID, RecurringEvent } from './event';

export interface CreateEventArgs {
  title: string;
  start: Date;
  duration: number;
  allowOverlap?: boolean;
}

export interface UpdateEventArgs {
  id: EventID;
  title?: string;
  start?: Date;
  duration?: number;
  allowOverlap?: boolean;
}

export interface ListEventsArgs {
  from: Date;
  to: Date;
}

export type Result<T> = { success: true; value: T } | { success: false; error: string };

export interface CalendarAPI {
  createEvent(args: CreateEventArgs): Result<Event | RecurringEvent>;
  listEvents(args: ListEventsArgs): Event[];
  updateEvent(args: UpdateEventArgs): Result<Event | RecurringEvent>;
  deleteEvent(id: EventID): boolean;
}