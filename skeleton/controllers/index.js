
module.exports = {
  mapping: {
    "index" : {
      "URL":"/",
      "method":"GET",
      "auth":false  
    }
  },
  index : function(request, response) {
    response.render("index", {
      locals : {
        title : "yourappname"
      }
    });
  }
};

/* EOF */