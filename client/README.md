# TestSsr

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Scripts Angular side
start: ng serve  
→ Lance l’application en mode développement (SPA/SSR selon configuration).

build: ng build  
→ Build de la version client (SPA).

build:production: ng build --configuration production  
→ Build production (same as build if defaultConfiguration on angular.json is 'production')

serve:ssr: node dist/thatsme-angular/server/server.mjs  
→ Lance l’application en mode SSR (production) sur le port 80.

## Scripts Nest side
start: nest start
→ Lance le serveur NestJS en mode développement (sans watch).

start:dev: nest start --watch
→ Lance le serveur NestJS en mode développement avec rechargement automatique.

build: nest build
→ Compile le projet NestJS en production dans le dossier dist/.

start:prod: node dist/main.js
→ Lance le serveur NestJS compilé (mode production).
