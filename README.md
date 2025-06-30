# 🏁 Flag Guesser - Devine le Drapeau

Un jeu interactif développé en **Nuxt 3** avec **TypeScript** où vous devez deviner le pays correspondant à chaque drapeau affiché.


## 🎯 Fonctionnalités

- **Quiz personnalisable** : Choisissez le nombre de questions (1-20)
- **Interface moderne** : Design responsive avec Bootstrap 5
- **Sauvegarde locale** : Vos scores sont conservés dans le navigateur
- **Progression en temps réel** : Barre de progression et score en direct
- **API REST Countries** : Plus de 200 drapeaux du monde entier

## 🚀 Technologies utilisées

### Exigences du projet ✅

- **Composition API** ✅ - Utilisée dans tous les composants
- **Composant avec v-model, events et props** ✅ - `ChoiceSelector.vue`
- **Appel à une API** ✅ - REST Countries API via `useQuiz` composable
- **Vue Router** ✅ - Navigation entre pages (`/`, `/quiz`, `/result`)
- **Pinia** ✅ - Gestion d'état avec persistance localStorage
- **Nuxt** ✅ - Framework principal
- **Composable** ✅ - `useQuiz()` pour la logique métier
- **TypeScript** ✅ - Typage complet du projet

### Stack technique

- **Framework** : Nuxt 3
- **Language** : TypeScript
- **Styling** : Bootstrap 5
- **State Management** : Pinia avec persistance
- **API** : REST Countries (https://restcountries.com/)
- **Stockage** : localStorage (aucune base de données)

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/x225franc/FlagGuesser
cd FlagGuesser

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build
```

## 🎮 Comment jouer

1. **Page d'accueil** : Sélectionnez le nombre de questions désirées
2. **Quiz** : Observez le drapeau et choisissez parmi 4 pays proposés
3. **Progression** : Suivez votre avancement avec la barre de progression
4. **Résultats** : Découvrez votre score et votre message personnalisé

## 🏗️ Architecture du projet

```
├── components/
│   └── ChoiceSelector.vue          # Composant de sélection (v-model, props, events)
├── composables/
│   └── useQuiz.ts                  # Logique métier et appel API
├── pages/
│   ├── index.vue                   # Page d'accueil
│   ├── quiz.vue                    # Page de jeu
│   └── result.vue                  # Page de résultats
├── plugins/
│   ├── bootstrap.client.ts         # Configuration Bootstrap
│   └── pinia.ts                    # Configuration Pinia avec persistance
├── stores/
│   └── quiz.ts                     # Store Pinia pour l'état du jeu
└── app.vue                         # Layout principal
```

## 🎨 Interface utilisateur

- **Design moderne** avec dégradés et ombres
- **Responsive** - Adapté mobile et desktop
- **Feedback visuel** - Animations et transitions fluides
- **Code couleur** - Vert/Orange/Rouge selon les performances
- **Icons & Emojis** - Interface ludique et engageante

## 📊 Système de scoring

- **Excellent** (90%+) : 🌟 "Excellent !"
- **Très bien** (80-89%) : 👏 "Très bien !"
- **Pas mal** (60-79%) : 👍 "Pas mal !"
- **Peut mieux faire** (40-59%) : 🤔 "Peut mieux faire"
- **À réviser** (<40%) : 📚 "Il faut réviser !"



