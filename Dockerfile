FROM node:15

WORKDIR /app  
# create a dir and cd to it , by defualt will have all copied files and commands will run from it

# we copy packages.json alone for optmization purposes, ie, docker will not reinstall all packages in every build if package.json did not change 
COPY package.json ./ 

ARG NODE_ENV
RUN  if [ "$NODE_ENV" = "development" ]; \
     then npm install; \
     else npm install --only=production; \
     fi 

COPY . .  

ENV PORT 3000
# the port which container should listen to
EXPOSE $PORT  


# this will run in container runtime
CMD npm run dev 


