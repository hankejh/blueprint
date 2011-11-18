
blueprint
=========
  
### Setup & Usage

```bash
$ [sudo] npm install -g blueprint
$ blueprint yournewapp
$ cd yournewapp
$ npm install
$ node app.js
```

### This is the layout of a blueprint app

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

### Here is a basic blueprint app, looks a lot like express, right?

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

### The big difference, is that we're autoloading all of our /models, mapping our /controllers to routes, and setting up our /views

  Here's an example controller:

```javascript

/*

  Index

*/

module.exports = {
  mapping:{
    "index":{
      "URL":"/",
      "method":"GET",
      "auth":false  
    } 
  },
  index : function(request, response) {
    Post.getLatestPosts(function(error, posts) {
      response.render("index", {
        locals : {
          layout : true,
          title : "blueprint",
          posts : posts
        }
      });
    });
  }
};

/* EOF */
```