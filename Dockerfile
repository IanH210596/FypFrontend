# Section for Compilation of Angular Frontend Project
FROM node:12.7-alpine AS build
# Argument for which configuration to use when building the image (this will determine the environment file used which specifies the different API URLs for staging and prod)
# ARG CONFIG
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# -- --configuration=$CONFIG
# End of Section

# Section for NGINX Image
# The nginx config file and the compiled build (dist folder) for the Angular Frontend on the previous build image are copied
# to the required folders on the NGINX image that will run the Frontend
FROM nginx:1.17.1-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/FypFrontend /usr/share/nginx/html
# End of Section
