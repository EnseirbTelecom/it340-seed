import { ObjectID } from 'mongodb';

export class Dao {
  constructor() {
    this.db = undefined;
    this.collection = undefined;
  }

  setDb(db) {
    this.db = db;
    this.collection = this.db.collection('ateliers');
  }

  listAteliers(filters = {}) {
    return this.collection.find(filters).toArray();
  }

  deleteAteliers(filters = {}) {
    return this.collection.deleteMany(filters);
  }

  deleteAtelier(id) {
    return this.collection.deleteOne({_id: new ObjectID(id)});
  }

  saveAtelier(atelier) {
    return this.collection.insertOne(atelier);
  }
}

export class Atelier {
  getId() {
    return this.id;
  }

  getDomaine() {
    return this.domaine;
  }

  getTitre() {
    return this.titre;
  }

  constructor(settings) {
    this.id = settings._id;
    this.titre = settings.titre;
    this.domaine = settings.domaine;
  }
}
