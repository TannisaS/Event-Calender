# Event-Calender

A simple and interactive calendar application built with React that allows users to manage events, including adding, viewing, and deleting events. Events are visually represented on the calendar with color-coded dots based on their category.

---

## Features

- **Interactive Calendar:** Navigate through months and select dates.
- **Event Management:** Add, view, and delete events.
- **Color-Coded Categories:**
  - Red dot for Work events
  - Yellow dot for Personal events
  - Light green dot for Other events
- **LocalStorage Integration:** Events persist between sessions.
- **Responsive Design:** Works well on different screen sizes.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/calendar-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd calendar-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5.Open your browser and navigate to http://localhost:3000.

---

## Usage

1. **Navigate the Calendar:**
   - Use the "Previous" and "Next" buttons to switch months.

2. **Add Events:**
   - Click on a date to open the event modal (past dates are disabled).
   - Fill out the event details (name, time, description, category) and save.

3. **View Events:**
   - Hover over colored dots on the calendar to see events for that day.
   - View the event panel for a list of upcoming events.

4. **Delete Events:**
   - Use the "Delete" button in the event list or modal to remove events.## Technologies Used

---

## Usage

- **Frontend:** React
- **CSS Framework:** Tailwind CSS (Optional styling)
- **State Management:** React Hooks (useState, useEffect)
- **Persistence:** LocalStorage

---

## Future Enhancements

- **Event Reminders:** Add notifications for upcoming events.
- **Recurring Events:** Allow events to repeat daily, weekly, or monthly.
- **Authentication:** Implement user accounts for personalized event management.


