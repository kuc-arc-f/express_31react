# express_31react

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2024/01/25

 update : 2024/02/01 

***

vite + express, React SPA sample

* vercel deploy

***
### Setup

* .env sample

```
VITE_POSTGRES_DATABASE="postgres"
VITE_POSTGRES_USER=""
VITE_POSTGRES_PASSWORD=""
VITE_POSTGRES_HOST=""
VITE_POSTGRES_PORT=6543
```

***
### react-build

```
npx esbuild --bundle ./src/client.tsx --format=esm --minify --outfile=./public/static/client.js

#watch
npx esbuild --bundle ./src/client.tsx --format=esm --minify --outfile=./public/static/client.js --watch
```

***
* dev-start
```
yarn dev
```

* build
```
yarn build

#or
npx vite build

```
***
### tailwindcss

```
npx tailwindcss -i ./src/main.css -o ./public/static/main.css

#watch
npx tailwindcss -i ./src/main.css -o ./public/static/main.css --watch
```

***
### blog

https://zenn.dev/knaka0209/scraps/44a812684ddbf4

***

