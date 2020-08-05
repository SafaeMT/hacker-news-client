# Hacker News Client &middot; [![Netlify Status](https://api.netlify.com/api/v1/badges/8a1eadff-74b9-4a51-a98e-4333a5492807/deploy-status)](https://app.netlify.com/sites/safaemt-hacker-news-client/deploys) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

> A build to learn project

Application Web consommant l'API HN Search d'Algolia pour rechercher les Stories Hacker News. Déployée [ici](https://safaemt-hacker-news-client.netlify.app/).

## Developing

### Developed With

- [Bulma](https://bulma.io/)
- [Parcel.js 1.x](https://parceljs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Prerequisites

[npm](https://nodejs.org/).

### Setting up Dev

Cloner le dépot, installer les dépendances et lancer le serveur de développement:

```shell
git clone https://github.com/SafaeMT/hacker-news-client.git
cd hacker-news-client/
npm ci
npm run dev
```

L'application est maintenant accessible depuis http://localhost:1234.

### Building

```shell
npm run build -- --no-source-maps
```

Enlever `--no-source-maps` pour inclure celles-ci.

## Licensing

[MIT licensed](LICENSE).
