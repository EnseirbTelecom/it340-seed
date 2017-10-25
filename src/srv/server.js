import express from 'express';
import axios from 'axios';
import { Dao, Atelier } from './dao.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import MongoClient from 'mongodb';

var apiUrl = process.env.API || 'http://localhost:8080';
var mongodbUrl = process.env.MONGO || 'mongodb://localhost:27017/it340-full';

if (process.env.OPENSHIFT_NODEJS_IP)
  apiUrl = `http://${process.env.OPENSHIFT_NODEJS_IP}:${process.env.OPENSHIFT_NODEJS_PORT}`;
if (process.env.OPENSHIFT_MONGODB_DB_URL)
  mongodbUrl = `${process.env.OPENSHIFT_MONGODB_DB_URL}it340-full`;

const upload = multer();

const requester = axios.create({
  baseURL: apiUrl
});

const dao = new Dao();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./dist/assets'));
app.set('view engine', 'pug');
app.set('views', './dist/views');

// Backend requests

app.get('/api/ateliers', (req, res) => {
  console.log('get /api/ateliers received');
  dao.listAteliers().then((ateliers) => {
    res.send(ateliers);
  }).catch(err => res.status(403).send(err));
});

app.delete('/api/ateliers', (req, res) => {
  console.log('delete /api/ateliers received');
  dao.deleteAteliers().then(count => {
    console.log(count);
    res.sendStatus(200);
  }).catch(err => res.status(403).send(err));
});

app.delete('/api/ateliers/:id', (req, res) => {
  console.log(`delete /api/ateliers/${req.params.id} received`);
  dao.deleteAtelier(req.params.id).then(() => {
    res.sendStatus(200);
  }).catch(err => res.status(403).send(err));
});

app.post('/api/ateliers', upload.array(), (req, res) => {
  console.log('post /api/ateliers received');
  const atelier = {
    titre: req.body.titre,
    domaine: req.body.domaine
  };
  dao.saveAtelier(atelier).then((id) => {
    res.send(id);
  }).catch(err => res.status(403).send(err));
});

// Frontend requests

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/erreur', function (req, res) {
  res.render('erreur', { code: req.query.code, message: req.query.message });
});

app.post('/ateliers',  upload.array(), (req, res) => {
  const atelier = {
    titre: req.body.titre,
    domaine: req.body.domaine
  };
  requester.post('/api/ateliers', atelier).then(() => {
    res.redirect('/ateliers');
  }).catch((remErr) => {
    res.redirect(`/erreur?code=403&message=${encodeURIComponent(remErr.response.data.message)}`);
  });
});

app.get('/ateliers', function (req, res) {
  requester.get('/api/ateliers').then((remRes) => {
    console.log(remRes.data.map(atelier => new Atelier(atelier)));
    res.render('ateliers', { ateliers: remRes.data.map(atelier => new Atelier(atelier)) });
  }).catch((remErr) => {
    res.redirect(`/erreur?code=403&message=${encodeURIComponent(remErr.response.data.message)}`);
  });
});

app.get('/suppr_atelier/:id', function (req, res) {
  requester.delete(`/api/ateliers/${req.params.id}`).then(() => {
    res.redirect('/ateliers');
  }).catch((remErr) => {
    res.redirect(`/erreur?code=403&message=${encodeURIComponent(remErr.response.data.message)}`);
  });
});

MongoClient.connect(mongodbUrl).then((db) => {
  dao.setDb(db);
  app.listen(8080, () => {
    console.log('http server listening on port 8080');
  });
}).catch((err) => console.log(err));
