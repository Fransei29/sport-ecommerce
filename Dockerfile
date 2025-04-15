# Usamos la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Exponer el puerto 3000
EXPOSE 3000

# Comando de inicio de la aplicación
CMD ["npm", "run", "dev"]
