
blueprint
=========

### Motivation

  NodeJS is awesome. However; there are not a lot of good resources to get you rolling FAST.
  So I wanted to write a lightweight blueprint for a startup. There are certain requirements 
  that all startups / web based apps have:

  * middleware
  * security: authentication and authorization
  * /public, we all have assets
  * an easy (read MVC) way to organize and manage our app

### Inspirations: Monk (ruby), Sinatra, Rails

### Setup & Usage

```bash
$ [sudo] npm install -g blueprint
$ blueprint yournewapp
$ cd yournewapp
$ npm install
$ node app.js
```

### This is the layout of a blueprint directory

```
-- app.js
-- package.json
  --- /config/
    -------- main.json (mongodb string)
  --- /controllers/
    -------- some-route.js
    -------- some-other-route.js
  --- /models/
    -------- some-mongoose-model.js
    -------- some-other-mongoose-model.js
  --- /views/
    -------- index.ejs (we use ejs for rendering views)
```

### Here is a basic blueprint's app.js file

```javascript
// load dependencies
var nconf = require("nconf");
var mongoose = require("mongoose");
var blueprint = require("blueprint");

blueprint.createServer();

// load and use config file
nconf.use("file", { file: "./config/main.json" });

// connect to mongodb via mongoose
mongoose.connect(nconf.get("mongodb"));

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

### The big difference, is that we're autoloading all of our /models, mapping our /controllers to routes with authorization with on/off with a simpel bit flip, and setting up our /views

  Here's an example controller:

```javascript

/*
  
  blog

*/

module.exports = {
  mapping:{
    "index":{
      "URL":"/",
      "method":"GET",
      "auth":false  
    },
    "posts":{
      "URL":"/posts",
      "method":"GET",
      "auth":false
    }
  },
  index : function(request, response) {
    Post.getLatestPosts(function(error, posts) {
      response.render("index", {
        locals : {
          title : "blueprint",
          posts : posts
        }
      });
    });
  },
  posts : function (request, response) {
    Post.find().sort("date_updated", "descending").find({}, function(error, posts) {
      if (error) {
        throw new Error(error);
      } else {
       response.send(posts); 
      }
    });
  }
};

/* EOF */
```