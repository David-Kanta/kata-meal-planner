# Settings - Refined User Story

## User Story: Meal Plan Settings (Mobile & Desktop)

**As a** meal planner user  
**I want** to customize my dietary preferences, allergies, and meal planning settings  
**So that** the meal planner can generate personalized meal plans that fit my needs and restrictions

---

### Description

Implement the **Meal Plan Settings** screen for both mobile and desktop versions of the MealPlanner application. This screen allows users to personalize their dietary preferences, allergies, number of meals per day, and other meal planning parameters. The desktop version includes additional features like ingredient exclusions, meal plan length, and other preferences.

---

### Mobile Version: Meal Plan Settings

#### Visual Requirements

- **Header**:
  - Logo "MealPlanner" (orange fork and knife icon)
  - Title "Meal Plan Settings" in black, **Title Large** font
  - Subtitle: *"Customize your meal plan to fit your dietary needs and preferences."* in light gray
  - White background for header

- **Dietary Preferences Section**:
  - Selection buttons arranged in a grid (two rows)
  - Rectangular buttons with rounded corners
  - Light gray background for unselected options, orange (#FF8C00) for selected
  - Black text for unselected, white text for selected
  - Options: Omnivore, Vegetarian, Vegan, Pescatarian, Keto, Paleo, Low Carb, Mediterranean

- **Allergies Section**:
  - Dropdown menu
  - Text: *"Select Allergies"* in dark gray
  - White background, light gray border
  - Down arrow icon indicating dropdown

- **Number of Meals Per Day Section**:
  - Selection buttons aligned horizontally
  - Same button style as Dietary Preferences
  - Options: 2, 3, 4

Mobile view reference: <img width="292" height="588" alt="Image" src="https://github.com/user-attachments/assets/2264c956-a5c5-4355-8fd5-70c49bd4f9b1" />

---

### Desktop Version: Meal Plan Settings

#### Visual Requirements

- **Header and Navigation**:
  - Logo "MealPlanner" (orange fork and knife icon)
  - Navigation tabs: **Home**, **Recipes**, **Meal Plans**, **Grocery List**
  - Notification icon and profile photo on the right
  - White background for navigation bar

- **Dietary Preferences Section**:
  - Same as mobile version with same options and styling

- **Allergies Section**:
  - Same as mobile version

- **Number of Meals Per Day Section**:
  - Same as mobile version

- **Exclude Ingredients Section** (Desktop only):
  - Dropdown menu
  - Text: *"Select Ingredients"* in dark gray
  - White background, light gray border
  - Down arrow icon

- **Meal Plan Length Section** (Desktop only):
  - Dropdown menu
  - Text: *"1 Week"* in dark gray (default)
  - White background, light gray border
  - Down arrow icon

- **Other Preferences Section** (Desktop only):
  - Checkboxes
  - Black text, white background
  - Options:
    - *"Include leftovers in the plan"*
    - *"Generate a shopping list automatically"*

Desktop view reference: <img width="1600" height="1282" alt="Image" src="https://github.com/user-attachments/assets/554e8add-592c-4588-9dbe-5ec2514a0c1f" />

---

### Structural Components

#### Mobile Version
- Header positioned at top
- Logo and title centered horizontally
- Subtitle centered below title
- Sections arranged vertically:
  1. Dietary Preferences (grid of buttons)
  2. Allergies (dropdown)
  3. Number of Meals Per Day (horizontal buttons)

#### Desktop Version
- Header and navigation at top
- Logo and navigation tabs aligned horizontally
- Settings sections clearly separated by titles and spacing
- Sections arranged vertically with consistent alignment:
  1. Dietary Preferences
  2. Allergies
  3. Number of Meals Per Day
  4. Exclude Ingredients (desktop only)
  5. Meal Plan Length (desktop only)
  6. Other Preferences (desktop only)

---

### Data Requirements

- **Dietary Preferences**: List of available dietary options with selection state
- **Allergies**: List of common allergies (e.g., gluten, nuts, dairy) with user selections
- **Number of Meals Per Day**: Options (2, 3, 4) with selected value
- **Exclude Ingredients** (Desktop): List of ingredients to exclude with user selections
- **Meal Plan Length** (Desktop): Options for plan duration (e.g., 1 week, 2 weeks)
- **Other Preferences** (Desktop): Checkbox states for leftovers and auto grocery list

---

### Functionality

#### Mobile Version
- **Dietary Preference Selection**: User clicks button to select dietary preference; button changes color to indicate selection
- **Allergy Selection**: User opens dropdown and selects one or more allergies; selections are saved
- **Meals Per Day Selection**: User chooses between 2, 3, or 4 meals per day; selected button changes color

#### Desktop Version
- **Dietary Preference Selection**: Same as mobile
- **Allergy Selection**: Same as mobile
- **Meals Per Day Selection**: Same as mobile
- **Exclude Ingredients**: User opens dropdown and selects ingredients to exclude
- **Meal Plan Length**: User selects duration from dropdown
- **Other Preferences**: User checks/unchecks boxes for leftovers and auto grocery list

#### Common Functionality
- Settings are saved and persist across sessions
- Settings affect meal plan generation
- Form validation ensures at least one dietary preference is selected
- Clear visual feedback for all selections

---

### Performance Considerations

- Quick loading of preference and allergy options
- Immediate response when selecting buttons and checkboxes
- Fast dropdown menu opening/closing
- Efficient saving of settings (optimistic updates if possible)

---

### Accessibility Requirements

- Alt text for icons
- Sufficient contrast for text and buttons (minimum 4.5:1 ratio)
- Keyboard navigation for dropdowns and buttons
- Clear labels for all interactive elements (for screen readers)
- Semantic HTML structure

---

### Acceptance Criteria

#### Mobile Version
- [ ] Header displays with logo, title, and subtitle
- [ ] Dietary Preferences buttons are clickable and change color on selection
- [ ] Allergies dropdown opens and allows selection of multiple allergies
- [ ] Number of Meals Per Day buttons are clickable and change color on selection
- [ ] Selected data is saved and displayed correctly
- [ ] Settings persist after page refresh

#### Desktop Version
- [ ] Header and navigation bar display correctly
- [ ] All mobile version criteria are met
- [ ] Exclude Ingredients dropdown is functional
- [ ] Meal Plan Length dropdown is functional
- [ ] Other Preferences checkboxes are functional
- [ ] All settings save correctly

#### Common Criteria
- [ ] At least one dietary preference must be selected (validation)
- [ ] Settings affect meal plan generation
- [ ] Form can be reset to defaults
- [ ] Error handling for save failures

---

### Edge Cases

- No allergies selected (allow empty selection)
- No dietary preference selected initially (validation prevents)
- No ingredients excluded (allow empty selection)
- Network error during save (show error message, allow retry)
- Invalid data from API (graceful degradation)

---

### Dependencies

- **Design System**: Colors, fonts, button components, dropdowns, checkboxes
- **API**: Save user preferences endpoint
- **State Management**: Store and retrieve user settings
- **Validation**: Form validation logic

---

### Notes

This feature may need to be split if it exceeds 1 day:
- **Option 1**: Implement mobile version first (Day 1), then desktop-specific features (Day 2)
- **Option 2**: Implement core settings (dietary preferences, allergies, meals per day) first (Day 1), then advanced settings (exclusions, plan length, other preferences) (Day 2)
- **Option 3**: Keep as single milestone if both versions can be implemented together efficiently
