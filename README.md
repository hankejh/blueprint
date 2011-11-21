
blueprint
=========

### Motivation

  NodeJS is awesome. However; there are not a lot of good resources to get you rolling FAST.
  So I wanted to write a lightweight blueprint for a startup. There are certain requirements 
  that all startups / web based apps have:

### Inspirations: Monk (ruby), Sinatra, Rails

### Setup & Usage

```bash
$ git clone git@github.com:ingklabs/blueprinted.git
$ cd blueprinted
$ npm install
$ node app.js
```

### This is the layout of a blueprint directory

```
-- app.js
-- package.json
  - /controllers/
      - some-route.js
      - some-other-route.js
  - /models/
      - some-mongoose-model.js
      - some-other-mongoose-model.js
  - /views/
      - index.ejs (we use ejs for rendering views)
```

### Here is a basic blueprint's app.js file

```javascript

// load dependencies
var mongoose = require("mongoose");
var blueprint = require("blueprint");

// http.createServer()
blueprint.createServer();

// load package.json
blueprint.conf.use();

// connect to mongodb via mongoose
mongoose.connect(blueprint.conf.get("mongodb"));

// listen for a mongodb error
mongoose.connection.on("error", function(error) {
  throw new Error(error);
});

// wait for mongodb state to be ready, then boot
mongoose.connection.on("open", function() {
  blueprint.boot();
});

/* EOF */
```

### We autoload all of our /models, map our /controllers to routes with authorization on/off with a simple bit flip, and setup our /views
