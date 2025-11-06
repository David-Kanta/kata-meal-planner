# MealPlanner - Backend API

Backend Express.js pour l'application MealPlanner.

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Configuration de la base de données

**Première fois seulement** (créer les tables et peupler avec des données de test) :

```bash
npm run db:reset
```

Ou séparément :

```bash
npm run migrate  # Créer les tables
npm run seed     # Peupler avec des données de test
```

### Développement

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

### Production

```bash
npm start
```

## 📡 API Endpoints

### Base URL
`http://localhost:3000/api/v1`

### Routes Meals

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/meals/daily` | Récupérer les repas du jour |
| GET | `/meals/weekly` | Récupérer le plan hebdomadaire |
| GET | `/meals/upcoming` | Récupérer les prochains repas |
| POST | `/meals/swap` | Échanger un repas |
| PUT | `/meals/:id/cook` | Marquer un repas comme cuisiné |

### Exemples de requêtes

#### GET /api/v1/meals/daily
```bash
curl http://localhost:3000/api/v1/meals/daily
```

Paramètres optionnels :
- `date` : Date au format YYYY-MM-DD (défaut: aujourd'hui)

#### GET /api/v1/meals/weekly
```bash
curl http://localhost:3000/api/v1/meals/weekly
```

Paramètres optionnels :
- `startDate` : Date de début au format YYYY-MM-DD (défaut: lundi de la semaine actuelle)

#### POST /api/v1/meals/swap
```bash
curl -X POST http://localhost:3000/api/v1/meals/swap \
  -H "Content-Type: application/json" \
  -d '{"mealId": "meal-123"}'
```

## 📁 Structure

```
server/
├── src/
│   ├── routes/           # Définition des routes
│   │   └── mealRoutes.js
│   ├── controllers/      # Contrôleurs (logique HTTP)
│   │   └── mealController.js
│   ├── services/         # Services (logique métier)
│   │   └── mealService.js          ✅ Complet
│   ├── repositories/     # Repositories (accès données)
│   │   ├── mealRepository.js       ⏳ Stub (Tâche 05)
│   │   └── recipeRepository.js     ⏳ Stub (Tâche 05)
│   ├── config/           # Configuration - À venir
│   └── server.js         # Point d'entrée
├── test-api.sh           # Tests endpoints
├── test-service.sh       # Tests service layer
├── package.json
└── README.md
```

## 🔧 Configuration

Créer un fichier `.env` à la racine du dossier server :

```env
NODE_ENV=development
PORT=3000
DATABASE_PATH=../data/mealplanner.db
CORS_ORIGIN=http://localhost:3001
```

## ✅ Statut des Implémentations

- [x] **Tâche 02** - Routes API ✅
- [x] **Tâche 03** - Controller (implémentation complète) ✅
- [x] **Tâche 04** - Service Layer (implémentation complète) ✅
- [x] **Tâche 05** - Repository Layer (SQLite implémenté) ✅

## 🛠️ Technologies

- **Framework**: Express.js 4.18.x
- **Base de données**: SQLite 3
- **CORS**: Configuré pour le frontend (port 3001)
- **Dev Tools**: Nodemon (rechargement automatique)

## 🧪 Tests

### Tests manuels (API)

**Test des endpoints :**
```bash
./test-api.sh
```

**Test du service layer :**
```bash
./test-service.sh
```

Le script `test-service.sh` affiche des logs détaillés montrant :
- Les appels aux repositories (logs `[Mock]` dans le terminal serveur)
- Le formatage des données
- La logique des helper functions (calcul de semaine, etc.)

Tests disponibles :
- GET /daily (avec et sans paramètre date)
- GET /weekly (calcul automatique du lundi)
- GET /upcoming (avec paramètre limit)
- POST /swap (3 étapes : findById, findRandom, update)
- PUT /:id/cook (avec timestamp)

### Tests unitaires

```bash
npm test
```

Tests unitaires disponibles après la tâche 12.
