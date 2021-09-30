FROM student-net:latest as build

WORKDIR /app

ENV NODE_ENV production
RUN npm run build

FROM node:alpine as server
WORKDIR /app

ENV NODE_ENV production

RUN  addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
