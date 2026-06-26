# M-Motors - Frontend

Interface React pour la plateforme de vente et location de véhicules M-Motors.Celle- ci permet au user de consulter le catalogue de véhicules, de créer son compte, de déposer un dossier d'achat ou de contrat de location longue durée et de suivre son traitement. 

Le frontend communique avec une API REST FLASK qui traite les requêtes et interagit avec PostgreSQL

## Stack technique

- React
- Vite
- Bootstrap


## Actuel
✅ React router
✅Login/register
✅ LocalStorage 
✅Communication Fecth API

## Architecture globale

Frontend React
↓
API Flask
↓
PostgreSQL

## Installation

```bash
git clone https://github.com/ANA1512/m-motors-react-frontend.git
cd m-motors-react-frontend
npm install
npm run dev
```

L'application tourne sur `http://localhost:5173`

## Fonctionnalités réalisées

#vehicules
- Affichage de la liste des véhicules
- Recherche par nom en temps reel
- Affichade du détail d'un vehicule

#dossier
- Création dossier achat  ou location
- Modification d'un dossier 
- Suppression d'un dossier 
- Consultation du statut d'une demande

#documents
- Depôt de plusieurs doc
- Consultation des doc déposés
- Affichage de l'état des doc

#Navigation
- Navigation avec React router 
- Redirection des users selon leur état de connexion
- Navigation protégéé pour les espaces privés 

#Authentification 
- Inscription d'un user
- Connexion
- Déconnexion depuis son espace
- Stokage du token JWT dans le localStorage
- Vérification de l'user connecté via la route /me

#Tableau de bord Admin
- Consultation ensemble des dossiers
- Consultation des doc transmis
- Validation ou refus d'ue demande
- Modification d'un statut d'un dossier
- Suppression d'un dossier 
  
## Communication avec le backend 

Le frontend utilise FETCH API pour communiquer avec API FLASK. 

Les opérations => 

- GET : récupérer les données
- POST : création de nouvelles ressources
- PUT : modification des données
- DELETE : suppression des données

Routes protégées utilise token JWT envoyé dans l'en-tête Authorization. 

## Config

Le frontend nécessite une API FLASK accessible 


- En developpement : `http://localhost:5001`
- En production  : l'app utilise url du backend déployé sur RENDER grâce aux variables d'environnement


## Tests 

Playwright End to end

Les principaux parcours users testés :

- Inscription 
- Connexion
- Consultation des véhicules 
- Creation d'un dossier
- Dépôt doc
- Suivi d'un dossier 
- Parcours admin

## Déploiement

FrontEnd. = Netlify
Backend = RENDER et communique avec la bd PostgreSQL

Changement des url de l'API et variable d'environnement pour bon fonctionnement entre developpement et production 

## Difficultés 

- Communication entre REACT et API FLASK
- Gestion des routes protégées
- Gestion du token JWT 
- Configuration des appels FETCH entre env.local et prod
- Résolution des problèmes liés au CORS
- MAJ des URLs lors du déploiement 

