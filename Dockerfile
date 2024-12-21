# Usa una imagen base de Node.js

FROM node:18

# Crea un directorio de trabajo

WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)

COPY package*.json ./

# Instala las dependencias

RUN npm install

# Reconstruir bcrypt para el entorno Docker

RUN npm rebuild bcrypt --build-from-source

# Copia el resto del código de la aplicación

COPY . .

# Expon el puerto en el que escucha la aplicación

EXPOSE 8080

# Define el comando para ejecutar la aplicación

CMD ["npm", "start"]