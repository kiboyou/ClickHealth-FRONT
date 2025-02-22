# Étape 1: Construire l'application React
FROM node:20 AS build

WORKDIR /usr/src/app

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider
	
RUN npm install --force
RUN npm run build

# Étape 2: Configurer nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape 1
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copier la configuration nginx dans le conteneur
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers de build dans le répertoire nginx
#COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
