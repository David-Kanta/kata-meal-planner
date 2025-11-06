import { defineStore } from 'pinia'
import type { DailyMeals, WeeklyMealPlan } from '~/types/meal'

export const useMealStore = defineStore('meal', {
  state: () => ({
    currentDate: new Date().toISOString().split('T')[0],
    currentWeekStart: null as string | null,
    dailyMeals: null as DailyMeals | null,
    weeklyPlan: null as WeeklyMealPlan | null,
  }),

  getters: {
    hasMealsForToday: (state) => {
      return !!(state.dailyMeals?.breakfast ||
                state.dailyMeals?.lunch ||
                state.dailyMeals?.dinner)
    },

    todaysMealCount: (state) => {
      let count = 0
      if (state.dailyMeals?.breakfast) count++
      if (state.dailyMeals?.lunch) count++
      if (state.dailyMeals?.dinner) count++
      return count
    }
  },

  actions: {
    setCurrentDate(date: string) {
      this.currentDate = date
    },

    setCurrentWeekStart(date: string) {
      this.currentWeekStart = date
    },

    setDailyMeals(meals: DailyMeals) {
      this.dailyMeals = meals
    },

    setWeeklyPlan(plan: WeeklyMealPlan) {
      this.weeklyPlan = plan
    }
  }
})
