# Setup the initial container.
FROM node:14.18.0-slim as dev
RUN apt-get update -y && apt-get upgrade -y

WORKDIR /app/student-net

ENV NODE_ENV=development
ENV PORT=8080

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080


# Starting after 1 minute of this service's life (allowing time
# for starting the dev server) check every 2 minutes if this
# service is working fine (which in this case means if the site
# is being served and whether it is served within 3 seconds).
# If not, try a total of 100 times before calling the service dead.
HEALTHCHECK --interval=2m --timeout=3s --retries=100 --start-period=1m \
	CMD curl -f http://localhost/ || exit 1

CMD ["npm", "run", "dev"]
