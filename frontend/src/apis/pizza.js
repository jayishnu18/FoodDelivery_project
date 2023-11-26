import axios from 'axios';

export default axios.create({

   
    baseURL: 'https://backend-food-9ewm.onrender.com',

});

//"start": "node ./backend/server.js",
//"start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"