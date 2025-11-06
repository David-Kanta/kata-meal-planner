# Tâche 14 : Intégration Finale & Validation

**Phase:** 6
**Durée estimée:** 0.5 jour
**Dépendances:** Toutes les tâches précédentes
**Issue:** #1 - Home Page

---

## 📋 Objectifs

Vérifier que tout fonctionne ensemble, corriger les bugs, et valider les critères d'acceptation de l'issue #1.

---

## ✅ Actions à réaliser

### 1. Intégration & Tests End-to-End

- [ ] Démarrer le backend : `cd server && npm run dev`
- [ ] Démarrer le frontend : `cd client && npm run dev`
- [ ] Vérifier que la communication client-serveur fonctionne

#### Test Manuel - Vue Mobile

- [ ] Ouvrir l'app sur mobile (ou DevTools responsive mode < 768px)
- [ ] Vérifier que le header s'affiche sans navigation
- [ ] Vérifier que la date du jour est affichée en orange
- [ ] Vérifier que les 3 cartes de repas apparaissent
- [ ] Tester le bouton "Swap Meal" → le repas change
- [ ] Tester le bouton "Cook Now" → confirmation visuelle
- [ ] Vérifier le scroll fluide
- [ ] Vérifier la bottom navigation fixée en bas

#### Test Manuel - Vue Desktop

- [ ] Ouvrir l'app sur desktop (> 768px)
- [ ] Vérifier que le header affiche la navigation complète
- [ ] Vérifier que le calendrier s'affiche avec le jour actuel surligné
- [ ] Naviguer entre les mois avec < et >
- [ ] Vérifier que le tableau hebdomadaire affiche 7 jours
- [ ] Vérifier que les recettes sont affichées dans le tableau
- [ ] Vérifier que "Quick Actions" s'affiche sous le calendrier
- [ ] Vérifier que "Upcoming Meals" s'affiche dans la sidebar droite

#### Test Responsive

- [ ] Redimensionner le navigateur progressivement
- [ ] Vérifier que le passage mobile ↔ desktop est fluide
- [ ] Vérifier qu'il n'y a pas de glitch ou de contenu cassé
- [ ] Tester sur différents navigateurs (Chrome, Firefox, Safari)

---

### 2. Validation des Critères d'Acceptation (Issue #1)

#### Mobile (Daily Digest)

- [ ] L'en-tête affiche le logo et les icônes ✅
- [ ] La date du jour est affichée en orange ✅
- [ ] Les 3 cartes de repas (Breakfast, Lunch, Dinner) sont visibles ✅
- [ ] Les images des plats se chargent correctement ✅
- [ ] Les boutons "Swap Meal" et "Cook Now" sont fonctionnels ✅
- [ ] Le défilement est fluide ✅
- [ ] Les placeholders s'affichent si pas de repas planifié ✅

#### Desktop (Weekly Plan)

- [ ] Le calendrier mensuel s'affiche avec le jour actuel en surbrillance ✅
- [ ] Le tableau hebdomadaire affiche les repas de la semaine ✅
- [ ] Les boutons "Quick Actions" sont présents et stylisés ✅
- [ ] La section "Upcoming Meals" affiche les prochains repas ✅
- [ ] Navigation entre les mois fonctionnelle ✅
- [ ] Responsive: adapte layout selon taille écran ✅

#### API

- [ ] `GET /api/v1/meals/daily` retourne les repas du jour ✅
- [ ] `GET /api/v1/meals/weekly` retourne le plan hebdomadaire ✅
- [ ] `POST /api/v1/meals/swap` échange un repas avec succès ✅
- [ ] `PUT /api/v1/meals/:id/cook` marque le repas comme cuisiné ✅
- [ ] Gestion d'erreur si date invalide ou repas inexistant ✅

---

### 3. Performance & Optimisation

- [ ] Vérifier le temps de chargement de la page (< 500ms idéal)
- [ ] Vérifier que les images se chargent rapidement
- [ ] Tester avec un throttling réseau (Slow 3G)
- [ ] Vérifier qu'il n'y a pas de requêtes API en double
- [ ] Vérifier la console : pas d'erreur JavaScript
- [ ] Vérifier les Core Web Vitals :
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

---

### 4. Accessibilité

- [ ] Tester la navigation au clavier (Tab, Enter, Espace)
- [ ] Vérifier le focus visible sur tous les éléments interactifs
- [ ] Vérifier les textes alternatifs sur les images (`alt`)
- [ ] Vérifier le contraste des couleurs (WCAG AA minimum)
- [ ] Tester avec un lecteur d'écran (VoiceOver, NVDA)
- [ ] Vérifier les labels ARIA sur les boutons sans texte

---

### 5. Correction des Bugs

- [ ] Lister tous les bugs trouvés lors des tests
- [ ] Prioriser les bugs critiques
- [ ] Corriger les bugs un par un
- [ ] Re-tester après chaque correction

---

### 6. Documentation

- [ ] Mettre à jour le README avec :
  - Instructions de lancement (backend + frontend)
  - Variables d'environnement nécessaires
  - Commandes de test
- [ ] Ajouter des commentaires dans le code si nécessaire
- [ ] Documenter les endpoints API (optionnel : Swagger/OpenAPI)

---

### 7. Checklist Finale

- [ ] Le code est propre et bien formaté
- [ ] Pas de `console.log` oublié
- [ ] Pas de code commenté inutile
- [ ] Les tests passent tous (backend + frontend)
- [ ] Le linter ne retourne aucune erreur
- [ ] La base de données de test contient des données réalistes
- [ ] Les variables d'environnement sont documentées
- [ ] Le .gitignore est correct (pas de fichiers sensibles)

---

## ✓ Critères de validation

- [ ] Tous les critères d'acceptation de l'issue #1 sont validés
- [ ] L'application fonctionne parfaitement en mobile ET desktop
- [ ] Aucun bug bloquant
- [ ] Les performances sont bonnes
- [ ] L'accessibilité est respectée
- [ ] Le code est testé et maintenable
- [ ] La documentation est à jour

---

## 🎉 Félicitations !

Si tous les critères sont validés, la tâche est terminée et l'issue #1 peut être fermée !

---

## 📚 Ressources

- [Lighthouse CI](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
