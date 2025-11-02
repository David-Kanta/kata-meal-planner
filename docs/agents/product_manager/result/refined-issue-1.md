# Home Page - Refined User Story

## User Story: Home Page (Mobile & Desktop)

**As a** meal planner user  
**I want** to view my daily and weekly meal plans on the home page  
**So that** I can quickly see what meals are planned and take actions to manage them

---

### Description

Implement the **Home Page** for the MealPlanner application in both mobile and desktop versions. The mobile version displays a "Daily Digest" showing today's meals (Breakfast, Lunch, Dinner) with quick actions. The desktop version shows "This Week's Meal Plan" with a calendar, weekly meal table, quick actions, and upcoming meals preview.

---

### Mobile Version: Daily Digest

#### Visual Requirements

- **Header**:
  - Logo "MealPrep" with icon on the left
  - Fixed header at top with white/light background
  - Title in black/dark gray, **Title Large** font
  - Notification icon and menu on the right

- **Daily Digest Section**:
  - Date display (e.g., "July 15, Monday") in orange (#FF8C00) under "Daily Digest" title
  - Meal cards for each meal (Breakfast, Lunch, Dinner) with:
    - Meal image (full card width, fixed height)
    - Meal name (e.g., "Oatmeal with Berries")
    - Two action buttons below name:
      - "Swap Meal" - icon + text, transparent background, orange border (#FFD700), orange text (#FF8C00)
      - "Cook Now" - icon + text, orange background (#FF8C00), white text

- **Card Style**:
  - White background with rounded corners and subtle shadow
  - Black/dark gray text for meal names
  - Consistent spacing (12px vertical) between cards

Mobile view reference: <img width="366" height="728" alt="Image" src="https://github.com/user-attachments/assets/2ee82619-62b3-426a-8795-b20f8fe73a2a" />

---

### Desktop Version: This Week's Meal Plan

#### Visual Requirements

- **Header and Navigation**:
  - Logo "MealPrep" on the left
  - Navigation tabs: **Home**, **Recipes**, **Grocery List**, **Settings**
  - Notification icon and profile photo on the right
  - White/light background for navigation bar

- **Monthly Calendar**:
  - Current month display (e.g., "July 2024")
  - Navigation arrows (< >) to change months
  - Abbreviated weekdays (**S**, **M**, **T**, **W**, **T**, **F**, **S**)
  - Day numbers in a grid
  - **Current day highlighted** with orange background (#FF8C00) and white circle for day number
  - Days outside current month grayed out

- **This Week's Meal Plan Section**:
  - Main title: "This Week's Meal Plan" with date range (e.g., "July 15 – July 21")
  - Meal table with columns: **Day**, **Breakfast**, **Lunch**, **Dinner**
  - Rows: Days of the week (Monday, Tuesday, etc.)
  - Meal names in orange (#FF8C00) for each meal
  - White background with light borders separating rows and columns

- **Quick Actions Section**:
  - Three action buttons:
    - **"Add Recipe"** (icon "+")
    - **"Create Meal Plan"** (calendar icon)
    - **"Generate Grocery List"** (list icon)
  - Buttons with transparent background, light orange border (#FFD700), orange text (#FF8C00)

- **Upcoming Meals Section**:
  - List of upcoming meals with:
    - Miniature meal image
    - Meal name and date/time (e.g., "Spaghetti Bolognese, July 22, 7:00 PM")
    - Light colored background for each card (e.g., very light orange)

Desktop view reference: <img width="1600" height="1088" alt="Image" src="https://github.com/user-attachments/assets/be1e397e-28a1-4ce9-8773-ca3b0f1ce806" />

---

### Structural Components

#### Mobile Version

- Fixed header at top
- Full-width container for Daily Digest section
- Vertical list of meal cards
- Buttons aligned horizontally below meal name

#### Desktop Version

- Calendar: 7-column grid (weekdays) with 5-6 rows (weeks)
- Meal table: Table structure with headers and rows
- Quick Actions: Vertically aligned buttons to the left of meal table
- Upcoming Meals: Vertical list of meal cards

---

### Data Requirements

- **Daily meals**: List of planned meals for today (breakfast, lunch, dinner)
- **Meal images**: Images for each planned meal
- **Meal names**: Names of dishes
- **Meal IDs**: Unique identifiers for swap functionality
- **Calendar data**: Current month, year, current day
- **Weekly meals**: List of meals for each day of the week
- **Upcoming meals**: Future meals with dates/times and images

---

### Functionality

#### Mobile Version

- Dynamic display of meals based on selected date
- "Swap Meal" button: Replace current meal with another suggestion
- "Cook Now" button: Navigate to detailed recipe or cooking timer
- Smooth vertical scrolling if meal list exceeds screen height
- Real-time updates when user modifies a meal

#### Desktop Version

- Calendar interaction: Navigate months with arrows (< >)
- Day selection: Click a day to display or modify meals
- Meal table: Display planned meals for each day of the week
- Click meal to modify or view detailed recipe
- Quick Actions:
  - **Add Recipe**: Open form/modal to add recipe to meal plan
  - **Create Meal Plan**: Generate or modify meal plan for the week
  - **Generate Grocery List**: Generate shopping list based on planned meals
- Upcoming Meals: Display future meals with details (name, date, time)
- Click upcoming meal to view recipe or modify

---

### Performance Considerations

- Optimized image loading (caching, appropriate resolution)
- Fast response time for "Swap Meal" and "Cook Now" actions
- Minimize unnecessary rebuilds during scrolling or interactions
- Quick loading of calendar and meal data
- Dynamic updates without page reload

---

### Accessibility Requirements

- Alt text for all meal images
- Sufficient contrast for text and buttons (minimum 4.5:1 ratio)
- Clear labels for action buttons (for screen readers)
- Semantic structure for keyboard navigation
- Keyboard navigation for all interactive elements (calendar, buttons, meals)

---

### Acceptance Criteria

#### Mobile Version

- [ ] Header displays with "MealPrep" title and notification/menu icons
- [ ] Daily Digest section displays current date and planned meals
- [ ] Each meal card contains image, meal name, and two action buttons
- [ ] "Swap Meal" and "Cook Now" buttons are functional and properly styled
- [ ] Meal images load quickly and display correctly
- [ ] Screen adapts to different screen sizes and orientations
- [ ] Scrolling is smooth without jank
- [ ] Button interactions trigger expected actions
- [ ] Missing meal images show placeholder or default icon
- [ ] Handles cases where no meal is planned for a time slot (prompt to add meal)

#### Desktop Version

- [ ] Monthly calendar displays correctly with current day highlighted
- [ ] Meal table displays planned meals for each day of the week
- [ ] Quick Actions buttons are functional and trigger expected actions
- [ ] Upcoming Meals section displays future meals correctly
- [ ] Screen adapts to different screen sizes (responsive design)
- [ ] Interactions (day clicks, buttons, meals) work without errors
- [ ] Handles missing data cases (e.g., unplanned meals)
- [ ] Calendar navigation works correctly

---

### Edge Cases

- Very long meal names (truncate or wrap)
- Missing meal images (placeholder or default icon)
- No meals planned for a time slot (encouragement message to add meal)
- Data unavailable (connection error handling)
- Meal name truncation with "..." if necessary
- Loading indicator during search or filtering

---

### Dependencies

- **Design System**: Colors, fonts, button components, cards, tables
- **Components**: Custom meal cards, calendar component, modals for add/modify recipes
- **API**:
  - Retrieve planned meals
  - Get meal suggestions for swap
  - Add/modify recipes
  - Generate grocery list
- **Navigation System**: Redirect to recipe screens or swap interface

---

### Notes

This is a comprehensive feature that may need to be split if it exceeds 1 day:

- **Option 1**: Implement mobile version first (Day 1), then desktop version (Day 2)
- **Option 2**: Implement basic layout and navigation first (Day 1), then add meal display and interactions (Day 2)
- **Option 3**: Keep as single milestone if both versions can be implemented together efficiently
