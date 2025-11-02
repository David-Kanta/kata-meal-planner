# Home Page - User Stories

## "View Today's Meal Plan (Mobile)"

**As a** meal planner user  
**I want** to see today's planned meals (Breakfast, Lunch, Dinner) on my mobile device  
**So that** I can quickly know what I'm eating today without scrolling or navigating

- Acceptance Criteria:
  - [ ] Given: I am a logged-in user with meals planned for today
  - [ ] When: I open the app on my mobile device
  - [ ] Then: I see a "Daily Digest" section showing today's date (e.g., "July 15, Monday") in orange
  - [ ] And: I see meal cards for Breakfast, Lunch, and Dinner, each with an image, meal name, and action buttons
  - [ ] And: Each meal card displays correctly with white background, rounded corners, and proper spacing
  - [ ] And: If a meal is not planned for a time slot, I see a prompt to add a meal

## "Swap a Planned Meal (Mobile)"

**As a** meal planner user  
**I want** to replace a planned meal with another suggestion  
**So that** I can adapt my meal plan when my preferences change or I want variety

- Acceptance Criteria:
  - [ ] Given: I am viewing today's meal plan on mobile
  - [ ] When: I tap the "Swap Meal" button on any meal card
  - [ ] Then: I am shown alternative meal suggestions matching my dietary preferences
  - [ ] And: I can select a new meal to replace the current one
  - [ ] And: The meal plan updates immediately to show the new meal
  - [ ] And: The swap action is saved and persists

## "Start Cooking a Meal (Mobile)"

**As a** meal planner user  
**I want** to quickly access cooking instructions for a planned meal  
**So that** I can start preparing the meal without searching for the recipe

- Acceptance Criteria:
  - [ ] Given: I am viewing today's meal plan on mobile
  - [ ] When: I tap the "Cook Now" button on any meal card
  - [ ] Then: I am navigated to the detailed recipe page with cooking instructions
  - [ ] And: The recipe page includes ingredients, steps, and cooking timer if available

## "View Weekly Meal Plan (Desktop)"

**As a** meal planner user  
**I want** to see my planned meals for the entire week on desktop  
**So that** I can get an overview of my meal planning and make adjustments efficiently

- Acceptance Criteria:
  - [ ] Given: I am a logged-in user viewing the homepage on desktop
  - [ ] When: I land on the homepage
  - [ ] Then: I see a monthly calendar with the current day highlighted in orange
  - [ ] And: I see a "This Week's Meal Plan" table showing Breakfast, Lunch, and Dinner for each day of the week
  - [ ] And: Meal names are displayed in orange (#FF8C00) and organized by day
  - [ ] And: I can click on any day in the calendar to view or modify meals for that day
  - [ ] And: I can click on any meal in the table to view its recipe details

## "Navigate Between Months (Desktop)"

**As a** meal planner user  
**I want** to navigate between different months in the calendar  
**So that** I can view and plan meals for future weeks

- Acceptance Criteria:
  - [ ] Given: I am viewing the homepage calendar on desktop
  - [ ] When: I click the left arrow (<) or right arrow (>) next to the month name
  - [ ] Then: The calendar updates to show the previous or next month
  - [ ] And: Days outside the current month are grayed out
  - [ ] And: The current day remains highlighted when visible
  - [ ] And: The weekly meal plan table updates to show meals for the selected week

## "Quick Actions from Homepage (Desktop)"

**As a** meal planner user  
**I want** to perform common actions directly from the homepage  
**So that** I can efficiently manage my meal planning without navigating to multiple screens

- Acceptance Criteria:
  - [ ] Given: I am viewing the homepage on desktop
  - [ ] When: I click the "Add Recipe" button
  - [ ] Then: A form or modal opens allowing me to add a recipe to my meal plan
  - [ ] And: When I click "Create Meal Plan", I can generate or modify a meal plan for the week
  - [ ] And: When I click "Generate Grocery List", a shopping list is created based on my planned meals
  - [ ] And: All quick action buttons are clearly visible and properly styled with orange borders

## "View Upcoming Meals Preview (Desktop)"

**As a** meal planner user  
**I want** to see a preview of my upcoming meals  
**So that** I can prepare in advance and know what's coming next

- Acceptance Criteria:
  - [ ] Given: I have meals planned beyond the current week
  - [ ] When: I view the homepage on desktop
  - [ ] Then: I see an "Upcoming Meals" section displaying future meals
  - [ ] And: Each upcoming meal shows a miniature image, meal name, and date/time
  - [ ] And: I can click on any upcoming meal to view its recipe or modify it
  - [ ] And: Upcoming meals are displayed in cards with light colored backgrounds

## "Handle Empty Meal Plan State"

**As a** meal planner user  
**I want** to see helpful guidance when I haven't planned any meals yet  
**So that** I know how to get started with meal planning

- Acceptance Criteria:
  - [ ] Given: I am a new user or have no meals planned
  - [ ] When: I view the homepage (mobile or desktop)
  - [ ] Then: I see a friendly message encouraging me to create a meal plan
  - [ ] And: I see a clear call-to-action button to start planning (e.g., "Create Your First Meal Plan")
  - [ ] And: The empty state message explains the benefits of meal planning

## "Access Navigation from Homepage"

**As a** meal planner user  
**I want** to navigate to other sections of the app from the homepage  
**So that** I can access recipes, shopping lists, and settings easily

- Acceptance Criteria:
  - [ ] Given: I am viewing the homepage
  - [ ] When: I view the header/navigation bar
  - [ ] Then: I see navigation tabs/links for Home, Recipes, Grocery List, and Settings (desktop) or menu icon (mobile)
  - [ ] And: The current section (Home) is highlighted or indicated as active
  - [ ] And: I can click/tap navigation items to navigate to other sections
  - [ ] And: Navigation works smoothly without page reload
