var Hapi = require('hapi');
var mongoose = require('mongoose');

mongoose.connect('mongodb://jaknapn:2tunacan@ds157631.mlab.com:57631/mentalapi',{useMongoClient: true});
var db = mongoose.connection;

var taskSchema = mongoose.Schema({
        index: Number,
        name: String
});

//Singular form of collection name
var Task = mongoose.model('hn', taskSchema);
var Military = mongoose.model('military', taskSchema);
var Numeracy = mongoose.model('numeracy', taskSchema);
var PhysicalWorld = mongoose.model('physicalworld', taskSchema);
var Bio = mongoose.model('bio', taskSchema);
var HumanNature = mongoose.model('humannature', taskSchema);
var System = mongoose.model('system', taskSchema);
var Mes = mongoose.model('mestrategy', taskSchema);

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.route([

  {
    method: 'GET',
    path: '/api/v1/mm/military',
    handler: function(request, reply) {
        var result = Military.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, militarys) {
               reply(militarys);
        })
    }
  },

  {
    method: 'GET',
    path: '/api/v1/mm/numeracy',
    handler: function(request, reply) {
        var result = Numeracy.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, numeracy) {
               reply(numeracy);
        })
    }
  },

  {
    method: 'GET',
    path: '/api/v1/mm/pw',
    handler: function(request, reply) {
        var result = PhysicalWorld.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, physicalworld) {
               reply(physicalworld);
        })
    }
  },

  {
    method: 'GET',
    path: '/api/v1/mm/bio',
    handler: function(request, reply) {
        var result = Bio.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, bio) {
               reply(bio);
        })
    }
  },

  {
    method: 'GET',
    path: '/api/v1/mm/humannature',
    handler: function(request, reply) {
        var result = HumanNature.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, humannature) {
               reply(humannature);
        })
    }
  },

  {
    method: 'GET',
    path: '/api/v1/mm/system',
    handler: function(request, reply) {
        var result = System.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, system) {
               reply(system);
        })
    }
  },

  {
    method: 'GET',
    path: '/api/v1/mm/mes',
    handler: function(request, reply) {
        var result = Mes.find().sort({'index': -1}).limit(10);
        //console.log(result);
        result.exec(function(err, mes) {
               reply(mes);
        })
    }
  },
  {
    method: 'POST',
    path: '/api/v1/todolist',
    handler: function(request, reply) {
       var latest_task = Task.find().sort({'index': -1}).limit(1);
       latest_task.exec(function(err, hns) {
         new_index = hns[0]["index"] + 1;
         newTask = new Task({ "index":new_index,
                              "name":request.payload.name});

         newTask.save(function(err, newTask) {
           reply(newTask).code(201);
         });
    })
    }
  },

  // Get single task
  {
    method: 'GET',
    path: '/api/v1/todolist/{index}',
    handler: function(request, reply) {
      var result = Task.findOne({"index":request.params.index});
      result.exec(function(err, hns) {
          if (hns) {
            reply(hns);
          } else {
            reply().code(404);
          }
      })
    }
  },
  // Update single task
  {
    method: 'PUT',
    path: '/api/v1/todolist/{index}',
    handler: function(request, reply) {
       var updateData = {  "index":request.params.index,
                            "name":request.payload.name};
       
       Task.findOneAndUpdate({'index':request.params.index}, 
                              updateData, 
                              {new:true}, 
                              function(err, doc){
          return reply(doc);
       });
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/todolist/{index}',
    handler: function(request, reply) {
      Task.findOneAndRemove({index:request.params.index}, function (err,response){
        reply().code(204);
      });
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply('Hello world from hapi');
    }
  }
]);

server.start(function(err) {
  console.log('Hapi is listening to http://localhost:8080');
});
