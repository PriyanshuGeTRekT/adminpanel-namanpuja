# Admin panel (react-admin + Vite) — dev container for `docker compose`.
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

# --host makes the Vite dev server reachable from the host.
CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]
