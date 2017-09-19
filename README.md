# Palette Man
Palette man is a MERN app that provides you with a list of colors from a database, as well as creates shades and tints based on those colors.


## Getting Started

1. start by creating a .env file in the root directory
```js
MONGO_URI=mongodb:<youruri>
production = false //change this to true when testing/deploying your production build
PORT=9001 //defaults to 3001 if unspecifed make sure to change your 'proxy' field in your package.json to match, then allows the webpack-dev-server to access your apis
```
2. commands 
```js
npm install
npm run dev
npm run seed (optional) //this will seed your database with the X11 color set, plus additional 
//random hex colors, with an end result of 4096 unique colors. If you prefer to use your own set,
// seed the data however you see fit. Just make sure to follow the schema in server/models
npm run build (builds production client)
npm start (runs production, run build first)
```

## Curent Mood  

ᕦ( ̿ ﹏ ̿ )ᕤ
