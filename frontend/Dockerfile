FROM node:20-alpine AS builder

# Layer 2: Telling Docker to create a directory called `app` in the container and set it as the working directory.
WORKDIR /app

# Layer 3: Setting Up the Hot Module Reloading (HMR)
# Install nginx-proxy and docker-gen
# RUN apt update -y && apt install -y nginx-proxy docker-gen

# Layer 4: Copying the package.json file from the root of the project to the `app` directory in the container.
COPY package.json .

# Layer 5: Installing the dependencies listed in the package.json file.
RUN npm install


# Layer 6: Copying all the files from the root of the project to the `app` directory in the container.
COPY . .

# RUN cd forager2 & npm run clean & npm run dev & cd ..

# RUN npm i ./forager2


# Layer 7: Telling Docker that the container will listen on port 3000.
EXPOSE 3000

# Layer 8: Telling Docker to run the `npm start` command when the container is started.
CMD ["npm", "start"]
# Run with HMR
# CMD ["nginx", "-g", "daemon off;", "docker-gen", "-wait", "5s", "-watch", "-notify-sighup", "nginx", "-p", "/tmp/docker-gen/"] & npm run start