# 1. Official Node.js lightweight image use karein
FROM node:18-alpine

# 2. Working directory set karein
WORKDIR /app

# 3. Dependencies ki files copy karein
COPY package*.json ./

# 4. Libraries install karein (Yeh container ke andar install hongi)
RUN npm install

# 5. Baqi saara React ka code container me copy karein
COPY . .

# 6. Vite ka default port expose karein
EXPOSE 5173

# 7. Node.js ke zariye development server start karne ki command
CMD ["npm", "run", "dev"]
