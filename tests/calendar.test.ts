import { Calendar } from '../src/calendar';
import { CreateEventArgs } from '../src/types/api';

describe('Calendar API', () => {
  let calendar: Calendar;

  beforeEach(() => {
    calendar = new Calendar();
  });

  test('should create an event successfully', () => {
    const eventArgs: CreateEventArgs = {
      title: 'Meeting',
      start: new Date('2024-10-24T10:00:00Z'),
      duration: 3600000
    };

    const result = calendar.createEvent(eventArgs);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toHaveProperty('title', 'Meeting');
      expect(result.value.duration.start).toEqual(new Date('2024-10-24T10:00:00Z'));
    }
  });

  test('should fail to create overlapping event', () => {
    const eventArgs1: CreateEventArgs = {
      title: 'First Meeting',
      start: new Date('2024-10-24T10:00:00Z'),
      duration: 3600000
    };
  
    const eventArgs2: CreateEventArgs = {
      title: 'Overlapping Meeting',
      start: new Date('2024-10-24T10:30:00Z'),
      duration: 3600000
    };
  
    calendar.createEvent(eventArgs1);
    const result = calendar.createEvent(eventArgs2);
  
    if (result.success === false) {
      expect(result.error).toBe('Event overlaps with an existing event.');
    } else {
      throw new Error("Expected the event creation to fail due to overlap, but it succeeded");
    }
  });  

  test('should list events within date range', () => {
    const eventArgs: CreateEventArgs = {
      title: 'Meeting',
      start: new Date('2024-10-24T10:00:00Z'),
      duration: 3600000
    };

    calendar.createEvent(eventArgs);
    const events = calendar.listEvents({ from: new Date('2024-10-24T00:00:00Z'), to: new Date('2024-10-25T00:00:00Z') });

    expect(events.length).toBe(1);
    expect(events[0].title).toBe('Meeting');
  });

  test('should update an event successfully', () => {
    const eventArgs: CreateEventArgs = {
      title: 'Initial Meeting',
      start: new Date('2024-10-24T10:00:00Z'),
      duration: 3600000
    };

    const createResult = calendar.createEvent(eventArgs);

    expect(createResult.success).toBe(true);
    if (createResult.success) {
      const updateResult = calendar.updateEvent({
        id: createResult.value.id,
        title: 'Updated Meeting',
        start: new Date('2024-10-24T11:00:00Z'),
        duration: 3600000
      });

      expect(updateResult.success).toBe(true);
      if (updateResult.success) {
        expect(updateResult.value.title).toBe('Updated Meeting');
        expect(updateResult.value.duration.start).toEqual(new Date('2024-10-24T11:00:00Z'));
      }
    }
  });

  test('should delete an event successfully', () => {
    const eventArgs: CreateEventArgs = {
      title: 'Meeting',
      start: new Date('2024-10-24T10:00:00Z'),
      duration: 3600000
    };

    const createResult = calendar.createEvent(eventArgs);

    expect(createResult.success).toBe(true);
    if (createResult.success) {
      const deleteResult = calendar.deleteEvent(createResult.value.id);

      expect(deleteResult).toBe(true);
      const events = calendar.listEvents({ from: new Date('2024-10-24T00:00:00Z'), to: new Date('2024-10-25T00:00:00Z') });
      expect(events.length).toBe(0);
    }
  });
});