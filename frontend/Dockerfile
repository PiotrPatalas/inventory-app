# frontend/Dockerfile
FROM node:16

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie package.json i package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty plików aplikacji
COPY . .

# Budowanie aplikacji produkcyjnej
RUN npm run build

# Instalacja serwera do serwowania statycznych plików
RUN npm install -g serve

# Eksponowanie portu
EXPOSE 3000

# Uruchomienie serwera
CMD ["serve", "-s", "build", "-l", "3000"]
