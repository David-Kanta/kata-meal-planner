# Settings - User Stories

![Desktop View](images/issues/issue-2-desktop.png)
![Mobile View](images/issues/issue-2-mobile.png)

## "Access Settings from Navigation"

**As a** meal planner user  
**I want** to access the settings page from anywhere in the app  
**So that** I can customize my preferences whenever I need to

- Acceptance Criteria:
  - [ ] Given: I am anywhere in the application
  - [ ] When: I view the navigation header
  - [ ] Then: I see a "Settings" tab/link in the navigation (desktop) or can access it via menu (mobile)
  - [ ] And: When I click/tap the Settings navigation item, I am taken to the Settings page
  - [ ] And: The Settings page displays with the header showing "Meal Plan Settings" title and subtitle

## "Select My Dietary Preference"

**As a** meal planner user  
**I want** to select my dietary preference (e.g., Vegetarian, Vegan, Keto)  
**So that** the meal planner can suggest recipes that match my dietary needs

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page
  - [ ] When: I view the Dietary Preferences section
  - [ ] Then: I see buttons for all available options (Omnivore, Vegetarian, Vegan, Pescatarian, Keto, Paleo, Low Carb, Mediterranean)
  - [ ] And: When I click/tap a dietary preference button, it changes to orange background with white text
  - [ ] And: Only one dietary preference can be selected at a time
  - [ ] And: At least one dietary preference must be selected (validation prevents saving without selection)
  - [ ] And: My selection is saved and persists when I return to Settings

## "Specify My Allergies"

**As a** meal planner user  
**I want** to specify my food allergies  
**So that** the meal planner can exclude recipes containing ingredients I'm allergic to

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page
  - [ ] When: I interact with the Allergies dropdown
  - [ ] Then: The dropdown opens showing a list of common allergies (e.g., gluten, nuts, dairy)
  - [ ] And: I can select multiple allergies from the list
  - [ ] And: Selected allergies are displayed or indicated in the dropdown
  - [ ] And: I can deselect allergies if I change my mind
  - [ ] And: It's okay to have no allergies selected (empty selection is allowed)
  - [ ] And: My allergy selections are saved and persist

## "Choose Number of Meals Per Day"

**As a** meal planner user  
**I want** to specify how many meals I want to plan per day  
**So that** the meal planner generates meal plans that match my eating schedule

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page
  - [ ] When: I view the Number of Meals Per Day section
  - [ ] Then: I see buttons for options: 2, 3, or 4 meals per day
  - [ ] And: When I click/tap a number button, it changes to orange background with white text
  - [ ] And: Only one option can be selected at a time
  - [ ] And: My selection is saved and affects how meal plans are generated
  - [ ] And: The selection persists when I return to Settings

## "Exclude Specific Ingredients (Desktop)"

**As a** meal planner user on desktop  
**I want** to exclude specific ingredients from my meal plans  
**So that** I can avoid ingredients I dislike or want to avoid for personal reasons

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page on desktop
  - [ ] When: I interact with the Exclude Ingredients dropdown
  - [ ] Then: The dropdown opens showing a list of ingredients I can exclude
  - [ ] And: I can select multiple ingredients to exclude
  - [ ] And: Selected ingredients are displayed or indicated in the dropdown
  - [ ] And: I can deselect ingredients if I change my mind
  - [ ] And: It's okay to have no ingredients excluded (empty selection is allowed)
  - [ ] And: My ingredient exclusions are saved and affect meal plan generation

## "Set Meal Plan Length (Desktop)"

**As a** meal planner user on desktop  
**I want** to specify how long my meal plans should be (e.g., 1 week, 2 weeks)  
**So that** the meal planner generates plans for the duration I prefer

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page on desktop
  - [ ] When: I interact with the Meal Plan Length dropdown
  - [ ] Then: The dropdown opens showing duration options (e.g., 1 week, 2 weeks)
  - [ ] And: I can select one duration option
  - [ ] And: The default value is "1 Week" if no selection has been made
  - [ ] And: My selection is saved and affects meal plan generation
  - [ ] And: The selection persists when I return to Settings

## "Configure Other Preferences (Desktop)"

**As a** meal planner user on desktop  
**I want** to configure additional preferences like including leftovers and auto-generating shopping lists  
**So that** the meal planner works exactly how I want it to

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page on desktop
  - [ ] When: I view the Other Preferences section
  - [ ] Then: I see checkboxes for "Include leftovers in the plan" and "Generate a shopping list automatically"
  - [ ] And: I can check or uncheck each preference independently
  - [ ] And: When checked, the checkbox is visually indicated
  - [ ] And: My preferences are saved and affect meal plan behavior
  - [ ] And: The preferences persist when I return to Settings

## "View My Current Settings"

**As a** meal planner user  
**I want** to see my current settings when I open the Settings page  
**So that** I know what preferences are already configured

- Acceptance Criteria:
  - [ ] Given: I have previously saved settings
  - [ ] When: I navigate to the Settings page
  - [ ] Then: I see all my previously selected preferences displayed correctly
  - [ ] And: Dietary preference button shows orange background
  - [ ] And: Selected allergies are shown in the dropdown
  - [ ] And: Number of meals per day button shows orange background
  - [ ] And: Desktop-only settings (if applicable) also display correctly
  - [ ] And: All settings load quickly without delay

## "Validate Settings Before Saving"

**As a** meal planner user  
**I want** to be prevented from saving invalid settings  
**So that** I don't accidentally create meal plans with incorrect preferences

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page and have not selected a dietary preference
  - [ ] When: I attempt to save or leave the page
  - [ ] Then: I see a validation message indicating that at least one dietary preference must be selected
  - [ ] And: The save operation is prevented until I select a dietary preference
  - [ ] And: The validation message is clear and helpful

## "Handle Settings Save Errors"

**As a** meal planner user  
**I want** to be informed if my settings fail to save  
**So that** I know to try again or check my connection

- Acceptance Criteria:
  - [ ] Given: I am on the Settings page and have made changes
  - [ ] When: I save my settings but there's a network error or server issue
  - [ ] Then: I see an error message explaining that the settings could not be saved
  - [ ] And: I am given an option to retry saving
  - [ ] And: My changes are not lost (can retry without re-entering)
  - [ ] And: The error message is clear and user-friendly
