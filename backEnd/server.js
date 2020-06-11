
const express = require('express');
const data  = require('./data');
const cors = require('cors');

const dotenv = require('dotenv');
const config = require('./config').config;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes').userRoutes;
const productRoutes = require('./routes/productRoutes').productRoutes;


const app = express();
app.use(bodyParser.json())
dotenv.config();

mongoose.connect(config.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex : true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  console.log("Connection superbe")
});


app.use(cors());

app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)


/*
app.get('/api/products', function (req, res) {
  res.send(data)
});

app.get('/api/products/:id', function (req, res) {
  const id = req.params.id;

  const product = data.data.find(obj => obj._id === id);

  if (product){res.send(product)}

  res.status(400).send({message: "Produit Non Trouvé"});
});

*/

const PORT = 5000;
app.listen(PORT, function () {
  console.log(`Serveur écoute sous le port ${PORT}`);
});
