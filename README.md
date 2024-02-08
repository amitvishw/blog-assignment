# Project Title

## Steps to start the application

### #1 Start docker containers for Redis and Postgresql

Run the following command in the root directory

`docker-compose up`

### #2 Start the backend application

`cd blog-ui`

`pnpm i` or `npm install`

`pnpm dev` or `npm run dev`

### #3 Start the frontend application

`cd blog-api`

`pnpm i` or `npm install`

`pnpm dev` or `npm run dev`

If none the above commands throws error then the frontend application should be up and running on `http://localhost:5173/`
