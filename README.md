# 🍽️ MealPlanner - Kata

Application de planification de repas hebdomadaire.

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js**: v20.14.0
- **npm**: v10.7.0

### Installation & Lancement

#### Frontend (Port 3001)

```bash
cd client
npm install
npm run dev
```

Ouvrez votre navigateur sur **http://localhost:3001**

#### Backend (Port 3000)

```bash
cd server
npm install
npm run db:reset  # Première fois : créer et peupler la base de données
npm run dev
```

## 📁 Structure du Projet

```
kata-meal-planner/
├── client/              # Frontend Nuxt.js 3
│   ├── assets/          # CSS, images
│   ├── components/      # Composants Vue
│   ├── pages/           # Pages de l'application
│   ├── types/           # Types TypeScript
│   └── ...
├── server/              # Backend Express.js
│   ├── src/
│   │   ├── routes/      # Routes API
│   │   ├── controllers/ # Contrôleurs
│   │   ├── services/    # Logique métier
│   │   ├── repositories/# Accès données
│   │   ├── config/      # Configuration DB
│   │   └── migrations/  # Migrations SQL
│   └── ...
├── data/                # Base de données SQLite
│   └── mealplanner.db
├── docs/                # Documentation
│   ├── tasks/           # Tâches de développement
│   ├── memory_bank/     # Spécifications techniques
│   └── issues/          # Issues GitHub
└── README.md
```

## 📚 Documentation

- [Tâches de développement](docs/tasks/README.md)
- [Architecture](docs/memory_bank/ARCHITECTURE.md)
- [Base de données](docs/memory_bank/DATABASE.md)
- [Stack technique](docs/memory_bank/STACK.md)

## ✅ Statut des Tâches

### Phase 1 : Setup & Design
- [x] **Tâche 01** - Setup Initial & Design System ✅

### Phase 2 : Backend API
- [x] **Tâche 02** - Routes API ✅
- [x] **Tâche 03** - Controller ✅
- [x] **Tâche 04** - Service Layer ✅
- [x] **Tâche 05** - Repository Layer (SQLite) ✅

### Phase 3 : State Management
- [x] **Tâche 06** - Composables & State Management ✅

### Phase 4 : Composants
- [ ] **Tâche 07** - Composant AppHeader
- [ ] **Tâche 08** - Composant MealCard
- [ ] **Tâche 09** - Composant MonthCalendar
- [ ] **Tâche 10** - Composants Complémentaires

### Phase 5 : Pages
- [ ] **Tâche 11** - Page Index (Responsive)

### Phase 6 : Tests & Validation
- [ ] **Tâche 12** - Tests Backend
- [ ] **Tâche 13** - Tests Frontend
- [ ] **Tâche 14** - Intégration Finale & Validation

## 🎨 Design System

### Couleurs
- **Primary**: `#FF8C00` (Orange)
- **Primary Light**: `#FFD700` (Jaune doré)
- **Neutral**: De `#FAFAFA` à `#000000`

### Utilisation Tailwind
```vue
<!-- Exemples -->
<button class="bg-primary text-white rounded-button px-4 py-2">
  Action
</button>

<div class="bg-white rounded-card shadow-card p-6">
  Card content
</div>
```

## 📝 Issues

Voir le dossier [docs/issues/](docs/issues/) pour les maquettes et spécifications.

## 🛠️ Technologies

- **Frontend**: Nuxt.js 3, Vue 3, Tailwind CSS, Pinia, TypeScript
- **Backend**: Node.js, Express, SQLite (à venir)

## 👥 Développement

Ce projet suit une architecture multi-agent documentée dans [docs/memory_bank/AGENTS.md](docs/memory_bank/AGENTS.md).
