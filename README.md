# Circuit Scientifique bordelais

Dépôt de démonstration pour montrer un exemple d'implémentation du site circuit scientifique bordelais en utilisant NodeJS, MongoDB et Jade.

## Installation

L'installation de l'application nécessite `nodejs > 6.0` (sauf dans le cas d'utilisation via `docker`).

```
git clone https://github.com/EnseirbTelecom/it340-seed.git
cd it340-full
npm install
```

## Lancement

### Directement sur le système

Pour lancer l'application sur le système il faut une installation MongoDB fonctionnelle, préfèrentiellement sur la machine `localhost` et le port `27017`.

Il est possible de régler l'url de MongoDB en utilisant la variable d'environnement `MONGO`. Il est possible aussi de régler l'url du serveur en passant par la variable d'environnement `API`.

Pour démarrer l'application il faut lancer la commande `npm start`.

### En utilisant Docker

Il est possible de lancer l'application grâce à `docker`. Pour cela, il faut disposer de `docker` ainsi que `docker-compose`. Pour lancer l'application, il faut lancer la commande `npm run docker`.

## Développement

Voici les différentes commandes du système de build:

* `npm run build`: compile l'application
* `npm test`: lance les tests

Les fichiers compilés sont placés dans le répertoire `dist`.
