const express = require('express');
const routes = require('./routes');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false }).then(() => {
    console.log('Database synced!');
  }).catch((error)=>{
    console.error('Error connecting to the database: ', error);
  }
  );
});
