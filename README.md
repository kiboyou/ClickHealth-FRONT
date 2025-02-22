# Projet de Gestion des consultations médicales : ClickHealth

## Resumer du projet
Le projet est une plateforme web de gestion des consultations médicales, de la prise de rendez-vous, de la file d'attente, et de la gestion des spécialistes. Les patients peuvent réserver des créneaux en fonction des disponibilités des médecins, 
s'enregistrer à l'accueil, et être dirigés vers un spécialiste.

## Fonctionnalités principales
- Prise de rendez-vous en ligne
- Gestion des disponibilités des médecins
- Envoi de rappels automatisés
- Consultation des dossiers médicaux
- Interface intuitive pour patients et médecins

## Technologies utilisées
- **Frontend :** React JS (JavaScript)
- **Outils de développement :** Visual Studio Code, Git, GitHub

# Comment installer le projet
1. Cloner le projet
2. Installer les dépendances
3. Configurer l'API
4. Lancer le serveur
5. Accéder à l'application

## Cloner le projet
```
    git clone -b develop git@github.com:kiboyou/ClickHealth-FRONT.git
```
## Installer les dépendances
```
    npm install --froce 
```
## Configurer l'API
```
    1. Dans le API/ cliquer sur le fichier api.js
    2. Modifier la ligne 1 avec l'adresse IP du serveur backend: 
        exemple : 
            - baseURL: 'http://localhost:8400/api/', // Remplacez par l'URL de base de votre backend
```
## Lancer le serveur
```
    npm start
```

## Accéder à l'application
```
    http://localhost:3000
```

## tester l'application
```
    1. Prendre un rendez-vous
    2. Consulter les rendez-vous
    3. Consulter les spécialistes
    4. Consulter les patients
    5. Consulter les consultations
    6. Consulter les files d'attente
    7. Consulter les créneaux
    8. Consulter les horaires, etc...
```