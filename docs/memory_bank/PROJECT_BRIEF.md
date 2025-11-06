# Project Brief - MealPlanner / MealPrep

## Vue d'ensemble du projet

**MealPlanner** (aussi appeléé **MealPrep**) est une application de planification de repas destinée à aider les utilisateurs à organiser leurs repas quotidiens et hebdomadaires, à gérer leurs listes de courses et à découvrir de nouvelles recettes adaptées à leurs besoins alimentaires.

## Objectifs principaux

1. **Simplifier la planification alimentaire** : Permettre aux utilisateurs de visualiser et organiser leurs repas pour la journée et la semaine
2. **Personnalisation** : Adapter les suggestions de repas selon les pr�f�rences alimentaires, allergies et contraintes de chaque utilisateur
3. **Automatisation** : Générer automatiquement des listes de courses basées sur les repas planifiés
4. **Découverte** : Faciliter la recherche et la découverte de nouvelles recettes

## Fonctionnalités principales

### 1. Page d'Accueil (Home) - Issue #1
**"Daily Digest"** - Vue journalière des repas

#### Version Mobile
- Affichage des repas du jour (Breakfast, Lunch, Dinner)
- Chaque repas présente :
  - Une image du plat
  - Le nom de la recette
  - Deux actions : **"Swap Meal"** (échanger) et **"Cook Now"** (cuisiner maintenant)
- En-tête avec logo MealPrep
- Navigation inférieure (bottom nav)

#### Version Desktop
**"This Week's Meal Plan"** - Vue hebdomadaire

- Calendrier mensuel interactif avec jour actuel mis en évidence (orange)
- Tableau hebdomadaire des repas avec :
  - Colonnes : Day, Breakfast, Lunch, Dinner
  - Lignes : Chaque jour de la semaine
- Section **"Quick Actions"** :
  - Add Recipe
  - Create Meal Plan
  - Generate Grocery List
- Section **"Upcoming Meals"** : Prévisualisation des prochains repas avec images

### 2. Param�tres (Settings) - Issue #2
Configuration personnalisée du plan de repas

#### Version Mobile
- **Dietary Preferences** : Choix du régime alimentaire
  - Options : Omnivore, Vegetarian, Vegan, Pescatarian, Keto, Paleo, Low Carb, Mediterranean
- **Allergies** : Sélection via menu déroulant
- **Number of Meals Per Day** : 2, 3 ou 4 repas

#### Version Desktop (fonctionnalités additionnelles)
- **Exclude Ingredients** : Liste d'ingrédients à exclure
- **Meal Plan Length** : Durée du plan (1 semaine, 2 semaines, etc.)
- **Other Preferences** :
  - Inclure les restes dans le plan
  - Générer automatiquement la liste de courses

### 3. Liste de Courses (Shopping List) - Issue #3
Gestion interactive de la liste de courses

#### Fonctionnalités
- Organisation par catégories : **Produce**, **Dairy**, **Meat**, **Pantry**
- Cases à cocher interactives pour chaque article
- Affichage des quantités (ex: "1 head Lettuce", "2 lbs Apples")
- Actions :
  - **Add Item** : Ajouter manuellement un article
  - **Print** : Imprimer la liste
- Synchronisation automatique avec le plan de repas

#### Disponible en version mobile et desktop

### 4. Découverte de Recettes (Recipe Discovery) - Issue #4
Recherche et filtrage de recettes

#### Interface
- **Barre de recherche** : Recherche par mots-clés
- **Filtres multiples** :
  - Quick & Easy
  - Vegetarian
  - Gluten-Free
  - Low Carb
  - Family-Friendly
  - Desserts
  - Breakfast, Lunch, Dinner
- **Liste de recettes** : Cartes affichant :
  - Image du plat
  - Titre de la recette
  - Description courte
- Filtrage en temps réel
- Disponible sur mobile et desktop

## Design System

### Couleurs principales
- **Orange principal** : #FF8C00 (actions, éléments actifs, boutons)
- **Orange clair** : #FFD700 (bordures, boutons secondaires)
- **Fond** : Blanc ou très clair
- **Texte** : Noir (#000000) ou gris foncé (#424242, #616161)
- **Bordures** : Gris clair (#E0E0E0)

### Principes de design
- Interface épurée et intuitive
- Cartes avec bordures arrondies et ombres légères
- Boutons avec bordures arrondies (rayon 20px)
- Icônes orange pour l'identité visuelle
- Espacement cohérent entre les éléments

## Architecture technique

### Frontend
- Application responsive (mobile + desktop)
- Navigation avec onglets : Home, Recipes, Meal Plans, Grocery List, Settings
- Mise à jour en temps réel des données
- Lazy loading pour les images

### Backend (à implémenter)
- API REST pour :
  - Gestion des repas planifiés
  - Récupération et filtrage des recettes
  - Gestion des préférences utilisateur
  - Génération de la liste de courses
- Base de données pour stocker :
  - Recettes (images, ingrédients, instructions)
  - Plans de repas utilisateurs
  - Préférences et profils utilisateurs
  - Listes de courses

## Exigences transversales

### Performance
- Temps de chargement < 500ms pour les interactions
- Optimisation des images (cache, résolutions adaptées)
- R�ponse instantan�e pour les actions utilisateur

### Accessibilité
- Texte alternatif pour toutes les images
- Contraste minimum 4.5:1 pour le texte
- Navigation au clavier complète
- Labels ARIA pour les lecteurs d'écran
- Structure sémantique HTML

### Responsive Design
- Adaptation aux tailles d'�cran mobile et desktop
- Layout fluide et adaptatif
- Touch-friendly sur mobile

## �tat du projet

- **Repository** : kata-meal-planner (https://github.com/Conrardy/kata-meal-planner)
- **Branche principale** : main
- **Issues ouvertes** : 4 (toutes en statut OPEN)
  - Issue #1 : Home Page (enhancement)
  - Issue #2 : Settings (enhancement)
  - Issue #3 : Shopping List (enhancement)
  - Issue #4 : Recipe discovery (enhancement)
- **Dernière mise à jour** : 2025-11-06

## Prochaines étapes suggérées

1. Définir et implémenter l'architecture technique (stack technologique)
2. Créer le design system et les composants réutilisables
3. Développer les écrans par ordre de priorité :
   - Home Page (base de l'application)
   - Settings (configuration utilisateur)
   - Recipe Discovery (contenu)
   - Shopping List (fonctionnalité dérivée)
4. Impl�menter l'API backend
5. Tests et optimisation des performances
