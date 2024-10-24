# backend/Dockerfile
FROM node:16

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty plików aplikacji
COPY . .

# Eksponowanie portu
EXPOSE 3001

# Uruchomienie aplikacji
CMD ["npm", "run", "dev"]
