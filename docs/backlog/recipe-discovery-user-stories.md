# Recipe Discovery - User Stories

## "Access Recipe Discovery from Navigation"

**As a** meal planner user  
**I want** to access the recipe discovery page from anywhere in the app  
**So that** I can browse and find recipes whenever I need them

- Acceptance Criteria:
  - [ ] Given: I am anywhere in the application
  - [ ] When: I view the navigation header
  - [ ] Then: I see a "Recipes" tab/link in the navigation
  - [ ] When: I click/tap the Recipes navigation item
  - [ ] Then: I am taken to the Recipe Discovery page
  - [ ] And: The Recipes navigation item is highlighted when I'm on that page

## "Browse All Available Recipes"

**As a** meal planner user  
**I want** to see a list of all available recipes  
**So that** I can discover new meal ideas and see what's available

- Acceptance Criteria:
  - [ ] Given: I am on the Recipe Discovery page
  - [ ] When: I view the page without applying any filters or search
  - [ ] Then: I see a section titled "All Recipes" displayed prominently
  - [ ] And: I see recipe cards displayed in a vertical list
  - [ ] And: Each recipe card shows an image (left), title (bold), and description
  - [ ] And: Recipe cards are properly spaced (12px vertical spacing)
  - [ ] And: Recipe images are square with rounded corners (80px x 80px)
  - [ ] And: Recipes load quickly with optimized images

## "Search Recipes by Name or Ingredient"

**As a** meal planner user  
**I want** to search for recipes by typing keywords  
**So that** I can quickly find specific recipes or recipes containing certain ingredients

- Acceptance Criteria:
  - [ ] Given: I am on the Recipe Discovery page
  - [ ] When: I see the search bar at the top with placeholder text "Search for recipes"
  - [ ] Then: I can type keywords into the search bar
  - [ ] And: Recipe results update dynamically as I type (real-time search) or after I submit
  - [ ] And: Only recipes matching my search terms are displayed
  - [ ] And: The search responds quickly (less than 500ms)
  - [ ] And: I can clear my search to see all recipes again

## "Filter Recipes by Dietary Preferences"

**As a** meal planner user  
**I want** to filter recipes by dietary preferences (e.g., Vegetarian, Gluten-Free, Low Carb)  
**So that** I only see recipes that match my dietary needs

- Acceptance Criteria:
  - [ ] Given: I am on the Recipe Discovery page
  - [ ] When: I view the filter section below the search bar
  - [ ] Then: I see filter buttons for: Quick & Easy, Vegetarian, Gluten-Free, Low Carb, Family-Friendly, Desserts, Breakfast, Lunch, Dinner
  - [ ] And: Filters are displayed horizontally and scroll if needed
  - [ ] And: When I click/tap a filter button, it changes to orange background (#FF8C00) with white text
  - [ ] And: When a filter is selected, only matching recipes are displayed
  - [ ] And: I can select multiple filters at once
  - [ ] And: Selected filters combine to show recipes matching all selected criteria (AND logic)
  - [ ] And: Recipe list updates instantly when I apply or remove filters

## "Filter Recipes by Meal Type"

**As a** meal planner user  
**I want** to filter recipes by meal type (Breakfast, Lunch, Dinner)  
**So that** I can find appropriate recipes for specific meals

- Acceptance Criteria:
  - [ ] Given: I am on the Recipe Discovery page
  - [ ] When: I select a meal type filter (Breakfast, Lunch, or Dinner)
  - [ ] Then: Only recipes tagged for that meal type are displayed
  - [ ] And: I can combine meal type filters with other filters (e.g., Vegetarian + Dinner)
  - [ ] And: The filter button shows orange background when selected
  - [ ] And: Recipe list updates immediately

## "View Recipe Details"

**As a** meal planner user  
**I want** to click on a recipe card to see full recipe details  
**So that** I can read ingredients, instructions, and cooking time before adding it to my meal plan

- Acceptance Criteria:
  - [ ] Given: I am viewing recipe cards on the Recipe Discovery page
  - [ ] When: I click/tap on any recipe card
  - [ ] Then: I am navigated to the detailed recipe page
  - [ ] And: The recipe details page shows full information (ingredients, instructions, cooking time, etc.)
  - [ ] And: I can navigate back to the recipe list

## "Handle No Search Results"

**As a** meal planner user  
**I want** to see a helpful message when my search or filters return no results  
**So that** I know why no recipes are shown and can adjust my criteria

- Acceptance Criteria:
  - [ ] Given: I have applied search terms or filters
  - [ ] When: No recipes match my criteria
  - [ ] Then: I see a clear message: "No recipes found. Try adjusting your filters."
  - [ ] And: The message is displayed prominently where recipes would normally appear
  - [ ] And: I can easily clear filters or modify my search

## "See Recipe Information at a Glance"

**As a** meal planner user  
**I want** to see key information about each recipe in the card  
**So that** I can quickly evaluate recipes without opening each one

- Acceptance Criteria:
  - [ ] Given: I am viewing recipe cards
  - [ ] When: I look at any recipe card
  - [ ] Then: I see the recipe image (square, rounded corners, 80px x 80px)
  - [ ] And: I see the recipe title in bold black text
  - [ ] And: I see a recipe description in gray text
  - [ ] And: If the title or description is too long, it's truncated with "..."
  - [ ] And: All text is readable with sufficient contrast

## "Experience Responsive Recipe Discovery"

**As a** meal planner user  
**I want** the recipe discovery page to work well on both mobile and desktop  
**So that** I can browse recipes comfortably on any device

- Acceptance Criteria:
  - [ ] Given: I am accessing Recipe Discovery on mobile
  - [ ] When: I view the page
  - [ ] Then: Search bar and filters are properly sized and accessible
  - [ ] And: Recipe cards use the full width appropriately
  - [ ] And: Filters scroll horizontally if needed
  - [ ] Given: I am accessing Recipe Discovery on desktop
  - [ ] When: I view the page
  - [ ] Then: Layout adapts to wider screen with appropriate spacing
  - [ ] And: All elements remain accessible and properly sized

## "Handle Loading States"

**As a** meal planner user  
**I want** to see a loading indicator when recipes are being fetched  
**So that** I know the app is working and not frozen

- Acceptance Criteria:
  - [ ] Given: I am on the Recipe Discovery page
  - [ ] When: Recipes are being loaded or filtered
  - [ ] Then: I see a loading indicator or skeleton placeholders
  - [ ] And: The loading state is clear and doesn't confuse me
  - [ ] And: Once recipes load, the loading indicator disappears

## "Handle Missing Recipe Images"

**As a** meal planner user  
**I want** to see a placeholder image when a recipe image fails to load  
**So that** I can still identify and browse recipes even if images are unavailable

- Acceptance Criteria:
  - [ ] Given: A recipe has a missing or broken image
  - [ ] When: I view the recipe card
  - [ ] Then: I see a placeholder icon or default image instead
  - [ ] And: The recipe card still displays properly with title and description
  - [ ] And: The placeholder is clearly distinguishable as a missing image
