# pull official base image
FROM node:18.14.2-alpine3.17

# set working directory
WORKDIR /reactapp


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add appv
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]