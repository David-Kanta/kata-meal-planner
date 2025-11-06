import type { DailyMeals, WeeklyMealPlan, Meal } from '~/types/meal'

export const useMeals = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const dailyMeals = ref<DailyMeals | null>(null)
  const weeklyPlan = ref<WeeklyMealPlan | null>(null)
  const upcomingMeals = ref<Meal[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDailyMeals = async (date?: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<{ success: boolean, data: DailyMeals }>(`${apiBase}/meals/daily`, {
        params: { date }
      })
      dailyMeals.value = response.data
    } catch (e) {
      error.value = 'Erreur lors du chargement des repas'
      console.error('fetchDailyMeals error:', e)
    } finally {
      loading.value = false
    }
  }

  const fetchWeeklyMeals = async (startDate?: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<{ success: boolean, data: WeeklyMealPlan }>(`${apiBase}/meals/weekly`, {
        params: { startDate }
      })
      weeklyPlan.value = response.data
    } catch (e) {
      error.value = 'Erreur lors du chargement du plan hebdomadaire'
      console.error('fetchWeeklyMeals error:', e)
    } finally {
      loading.value = false
    }
  }

  const fetchUpcomingMeals = async (limit = 5) => {
    try {
      const response = await $fetch<{ success: boolean, data: Meal[] }>(`${apiBase}/meals/upcoming`, {
        params: { limit }
      })
      upcomingMeals.value = response.data
    } catch (e) {
      console.error('fetchUpcomingMeals error:', e)
    }
  }

  const swapMeal = async (mealId: string) => {
    try {
      const response = await $fetch<{ success: boolean, data: Meal }>(`${apiBase}/meals/swap`, {
        method: 'POST',
        body: { mealId }
      })

      // Rafraîchir les données
      await fetchDailyMeals()

      return response.data
    } catch (e) {
      error.value = 'Erreur lors du changement de repas'
      console.error('swapMeal error:', e)
      throw e
    }
  }

  const markAsCooked = async (mealId: string) => {
    try {
      await $fetch(`${apiBase}/meals/${mealId}/cook`, {
        method: 'PUT'
      })

      // Rafraîchir les données
      await fetchDailyMeals()
    } catch (e) {
      error.value = 'Erreur lors du marquage du repas'
      console.error('markAsCooked error:', e)
      throw e
    }
  }

  return {
    dailyMeals,
    weeklyPlan,
    upcomingMeals,
    loading,
    error,
    fetchDailyMeals,
    fetchWeeklyMeals,
    fetchUpcomingMeals,
    swapMeal,
    markAsCooked
  }
}
