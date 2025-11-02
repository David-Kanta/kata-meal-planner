# Shopping List - User Stories

![Desktop View](images/issues/issue-3-desktop.png)
![Mobile View](images/issues/issue-3-mobile.png)

## "View My Shopping List Organized by Category"

**As a** meal planner user  
**I want** to see my shopping list organized by categories (Produce, Dairy, Meat, Pantry)  
**So that** I can shop efficiently by navigating store sections in logical order

- Acceptance Criteria:
  - [ ] Given: I have a meal plan with planned recipes
  - [ ] When: I navigate to the Shopping List page
  - [ ] Then: I see ingredients organized into category sections (Produce, Dairy, Meat, Pantry)
  - [ ] And: Each category section has a clear title in bold
  - [ ] And: Category sections are separated by light gray divider lines
  - [ ] And: Items within each category are displayed as a vertical list
  - [ ] And: Each item shows its quantity and name (e.g., "1 head Lettuce", "2 lbs Apples")

## "Check Off Items While Shopping"

**As a** meal planner user  
**I want** to check off items as I put them in my shopping cart  
**So that** I can track my progress and know what I still need to buy

- Acceptance Criteria:
  - [ ] Given: I am viewing my shopping list
  - [ ] When: I click/tap the checkbox next to an item
  - [ ] Then: The checkbox turns orange to indicate it's checked
  - [ ] And: The item's visual state changes to show it's completed
  - [ ] And: I can uncheck the item if I change my mind
  - [ ] And: The checked state persists when I return to the shopping list

## "Add Manual Items to Shopping List"

**As a** meal planner user  
**I want** to add items manually to my shopping list  
**So that** I can include items not related to planned meals (e.g., household items, personal preferences)

- Acceptance Criteria:
  - [ ] Given: I am viewing my shopping list
  - [ ] When: I click/tap the "Add Item" button
  - [ ] Then: A form or input field appears allowing me to enter item name, quantity, and category
  - [ ] And: I can select from predefined categories (Produce, Dairy, Meat, Pantry)
  - [ ] And: After submitting, the new item appears in the appropriate category section
  - [ ] And: The item is saved and persists in my shopping list

## "Generate Shopping List from Meal Plan"

**As a** meal planner user  
**I want** my shopping list to automatically update when I modify my meal plan  
**So that** I don't have to manually track ingredients from all my planned recipes

- Acceptance Criteria:
  - [ ] Given: I have recipes planned in my meal plan
  - [ ] When: I navigate to the Shopping List page
  - [ ] Then: I see all ingredients from my planned recipes automatically included
  - [ ] And: When I add a new recipe to my meal plan, its ingredients appear in the shopping list
  - [ ] And: When I remove a recipe from my meal plan, its ingredients are removed from the shopping list
  - [ ] And: Ingredient quantities are calculated correctly (merging duplicates when applicable)

## "Print My Shopping List"

**As a** meal planner user  
**I want** to print my shopping list  
**So that** I can take a physical copy to the store or share it with someone else

- Acceptance Criteria:
  - [ ] Given: I am viewing my shopping list
  - [ ] When: I click/tap the "Print" button
  - [ ] Then: A print-friendly version of my shopping list is generated
  - [ ] And: The printed list maintains category organization
  - [ ] And: Item quantities and names are clearly readable
  - [ ] And: The print format is optimized for standard paper sizes
  - [ ] And: Checked items are clearly indicated (strikethrough or separate section)

## "Handle Empty Shopping List"

**As a** meal planner user  
**I want** to see a helpful message when my shopping list is empty  
**So that** I understand why there are no items and know how to populate it

- Acceptance Criteria:
  - [ ] Given: I have no meals planned or my planned meals have no ingredients
  - [ ] When: I navigate to the Shopping List page
  - [ ] Then: I see a friendly message explaining that the list is empty
  - [ ] And: I see guidance on how to populate it (e.g., "Add recipes to your meal plan to generate a shopping list")
  - [ ] And: I can still use the "Add Item" button to manually add items

## "Access Shopping List from Navigation"

**As a** meal planner user  
**I want** to easily access my shopping list from anywhere in the app  
**So that** I can quickly check or update my list when needed

- Acceptance Criteria:
  - [ ] Given: I am anywhere in the application
  - [ ] When: I view the navigation header
  - [ ] Then: I see a "Shopping List" tab/link in the navigation
  - [ ] And: When I click/tap the "Shopping List" navigation item, I am taken to the shopping list page
  - [ ] And: The "Shopping List" navigation item is highlighted when I'm on that page

## "Manage Items Without Quantities"

**As a** meal planner user  
**I want** the shopping list to handle items that don't have specific quantities  
**So that** I can include items like "Jelly" alongside specific quantities like "1 jar Jelly"

- Acceptance Criteria:
  - [ ] Given: I am adding an item manually or viewing items from recipes
  - [ ] When: An item doesn't have a specific quantity
  - [ ] Then: The item is displayed with just its name (e.g., "Jelly")
  - [ ] And: Items with quantities are displayed normally (e.g., "1 jar Jelly")
  - [ ] And: Both types of items can be checked off normally
