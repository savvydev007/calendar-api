export type EventID = string;

export interface Duration {
  start: Date;
  end: Date;
}

export interface Event {
  id: EventID;
  title: string;
  duration: Duration;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly';
  count?: number;
  until?: Date;
}

export interface RecurringEvent extends Event {
  recurrenceRule?: RecurrenceRule;
}