# Deploying on Heroku and Mlab

To deploy your app on the cloud you need a (free) [Heroku](https://www.heroku.com) and [Mlab](https://mlab.com/) account.

On Mlab, you simply have to create one database and one user, and gather the connection url to your base.

Then you have to configure an heroku application using Heroku CLI.

```
heroku login
heroku create
```

You also need to add a `Procfile` to configure a web runner.

```
web: npm start
```

To ensure installing the build tools for nodejs you have to unset the production mode, you must also set envionment variables to configure the mlab and server urls.

```
heroku config NPM_CONFIG_PRODUCTION=false
heroku config MONGO=<url>
heroku config API=<url>
```

After deployment you can run your application like this: `heroku ps:scale web=1`.
