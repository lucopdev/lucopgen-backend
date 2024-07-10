# Use uma imagem Node.js oficial
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta do aplicativo
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "npm", "start" ]
