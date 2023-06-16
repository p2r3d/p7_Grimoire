const express = require('express');
const app = express();
const mongoose = require('mongoose');
// import du router
const booksRoutes = require('./routes/books');

mongoose.connect('mongodb+srv://pac:jddMupNpRnnVFKVK@cluster0.xfinhde.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.static('public'));
// middleware général(sans route spécifiée) appliqué partout
app.use((req, res, next) => {
  // accès à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Origin', '*');
 // ajout headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //envoi requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:;");
  next();
});

// on enregistre le router
app.use('api/books', booksRoutes);

module.exports = app;