export interface Recipe {
  id: string
  name: string
  description: string
  imageUrl: string
  prepTimeMinutes: number
  cookTimeMinutes: number
}

export interface Meal {
  id: string
  date: string
  mealType: 'breakfast' | 'lunch' | 'dinner'
  recipe: Recipe
}

export interface DailyMeals {
  date: string
  breakfast: Meal | null
  lunch: Meal | null
  dinner: Meal | null
}

export interface WeeklyMealPlan {
  startDate: string
  endDate: string
  days: Array<{
    day: string
    date: string
    meals: DailyMeals
  }>
}
