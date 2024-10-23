### **README.md**

# Calendar API Library

This is a TypeScript library for managing calendar events. It allows you to create, read, update, and delete events. The library also supports handling overlapping events.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/savvydev007/calendar-api.git
   ```

2. Navigate into the project directory:
   ```bash
   cd calendar-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the package:
   ```bash
   npm run build
   ```

## Usage

### `createEvent`

Function to create a new event with a title, start time, and duration. The `allowOverlap` argument can be used to control if overlapping events are allowed.

#### Example:
```typescript
const eventResult = calendar.createEvent({
  title: 'Team Meeting',
  start: new Date('2024-10-25T10:00:00Z'),
  duration: 3600000,  // 1 hour
  allowOverlap: false
});

if (eventResult.success) {
  console.log('Event created:', eventResult.value);
} else {
  console.error('Error:', eventResult.error);
}
```

### `listEvents`

Function to list all events in a calendar within a specified date range.

#### Example:
```typescript
const events = calendar.listEvents({
  from: new Date('2024-10-25T00:00:00Z'),
  to: new Date('2024-10-26T00:00:00Z')
});

console.log('Events:', events);
```

### `updateEvent`

Function to update an event's title, start time, and duration by `ID`. The `allowOverlap` argument can control whether overlapping events are allowed during the update.

#### Example:
```typescript
const updateResult = calendar.updateEvent({
  id: 'event-id',
  title: 'Updated Meeting',
  start: new Date('2024-10-25T11:00:00Z'),
  duration: 7200000  // 2 hours
});

if (updateResult.success) {
  console.log('Event updated:', updateResult.value);
} else {
  console.error('Error:', updateResult.error);
}
```

### `deleteEvent`

Function to delete an event by its `ID`.

#### Example:
```typescript
const deleteResult = calendar.deleteEvent('event-id');

if (deleteResult) {
  console.log('Event deleted successfully');
} else {
  console.error('Error deleting event');
}
```

## Running Tests

To run the unit tests for the library:

```bash
npm test
```

## License

This project is licensed under the MIT License.