# Tâche 10 : Composants Complémentaires

**Phase:** 4
**Durée estimée:** 1 jour
**Dépendances:** Tâches 01, 06
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Créer les composants complémentaires nécessaires pour compléter les vues mobile et desktop.

---

## ✅ Actions à réaliser

### 1. DailyDigest (Vue Mobile)

**Fichier:** `client/components/meal/DailyDigest.vue`

- [ ] Créer le composant qui affiche les 3 MealCards
- [ ] Props :
  - `meals: DailyMeals`
  - `loading: boolean`
- [ ] Événements :
  - `swap: [mealId: string]`
  - `cook: [mealId: string]`
- [ ] Afficher :
  - Date du jour en grand (formatée)
  - 3 MealCards (breakfast, lunch, dinner)
  - State de loading si nécessaire

---

### 2. WeeklyMealPlan (Vue Desktop)

**Fichier:** `client/components/meal/WeeklyMealPlan.vue`

- [ ] Créer le composant qui affiche le tableau hebdomadaire
- [ ] Props :
  - `plan: WeeklyMealPlan`
  - `loading: boolean`
- [ ] Afficher :
  - Titre "This Week's Meal Plan"
  - Tableau avec 7 colonnes (jours de la semaine)
  - 3 lignes (breakfast, lunch, dinner)
  - Nom des recettes dans chaque cellule
  - Images miniatures optionnelles

---

### 3. UpcomingMeals (Desktop Sidebar)

**Fichier:** `client/components/meal/UpcomingMeals.vue`

- [ ] Créer le composant sidebar pour les prochains repas
- [ ] Utiliser le composable `useMeals` pour charger les upcoming meals
- [ ] Afficher :
  - Titre "Upcoming Meals"
  - Liste des 5 prochains repas
  - Pour chaque repas : nom, date, type
  - Bouton "View All" en bas

---

### 4. QuickActions (Desktop)

**Fichier:** `client/components/meal/QuickActions.vue`

- [ ] Créer le composant avec des boutons d'action rapide
- [ ] Boutons :
  - "🍽️ Add New Meal"
  - "🔄 Regenerate Week"
  - "📋 View Shopping List"
- [ ] Styles : card blanche avec boutons empilés verticalement

---

### 5. BottomNavigation (Mobile)

**Fichier:** `client/components/common/BottomNavigation.vue`

- [ ] Créer la navigation bottom fixée sur mobile
- [ ] Items :
  - Home (icône maison)
  - Recipes (icône livre)
  - Grocery List (icône panier)
  - Settings (icône engrenage)
- [ ] Styles :
  - Fixé en bas : `fixed bottom-0`
  - Background blanc avec border top
  - 4 items centrés
  - Item actif en couleur primary

---

### 6. DateDisplay (Mobile)

**Fichier:** `client/components/meal/DateDisplay.vue`

- [ ] Créer le composant qui affiche la date formatée
- [ ] Props :
  - `date: string` (format ISO)
- [ ] Afficher :
  - Jour de la semaine en petit
  - Date complète en grand (ex: "November 6, 2025")
  - Couleur primary pour la date

---

## ✓ Critères de validation

- [ ] Tous les composants sont créés dans les bons répertoires
- [ ] Les props et événements sont typés avec TypeScript
- [ ] Les styles Tailwind sont appliqués et cohérents
- [ ] Les composants sont réutilisables et bien découpés
- [ ] Pas d'erreur de compilation TypeScript
- [ ] Les composants s'affichent correctement (même avec données mock)

---

## 💡 Conseils

- Commencer par les composants les plus simples (DateDisplay, QuickActions)
- Tester chaque composant individuellement avec des données mock
- Respecter la structure de dossiers : `common/` et `meal/`
- Utiliser les tokens de design définis dans Tailwind

---

## 📚 Ressources

- [Vue Component Basics](https://vuejs.org/guide/essentials/component-basics.html)
- [Tailwind Layout](https://tailwindcss.com/docs/container)
