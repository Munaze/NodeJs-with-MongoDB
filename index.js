const express = require("express");
const app = express();
const mongoose = require("mongoose")

var port  = 8000

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pokiapi",{useNewUrlParser:true},()=>{
  console.log("MongoDb server connected");
})

const PokemonSchema =new mongoose.Schema({
  name:String,
  type:String,
  imgUrl:String
})



const PokimonModel = new mongoose.model('pokemons',PokemonSchema);
app.get("/pokemons",async (req,res)=>{

  let data  =await PokimonModel.find();

  res.send(data);


})

app.get("/pokemon/type/:type",async (req,res)=>{

  let type=req.params.type;
  let pokemon=await PokimonModel.find({type:type});
  res.send(pokemon);
})

app.delete("/pokemon/:id",(req,res)=>{
  let id = req.params.id;
  PokimonModel.deleteOne({_id:id},(err,data)=>{
    if(err===null){
      res.send("data deleted")
    }
  })
})

app.post("/pokemon",(req,res)=>{
  let pokemon = req.body;
  let pokimonobj = new PokimonModel(pokemon);
  pokimonobj.save((err,data)=>{
    if(err===null){
    res.send("data saved successfully")
    }
  })

})

app.get("/pokemon/:id",async (req,res)=>{

  let id=req.params.id;
  let pokemon=await PokimonModel.find({_id:id});
  res.send(pokemon);
})


app.put("/pokemon/:id",(req,res)=>{

  let id=req.params.id;
  let pokemon=req.body;

  PokimonModel.updateOne({_id:id},pokemon,(err,data)=>{

      if(err===null)
      {
          res.send("Pokemon Updated");
      }

  })

})


//asssignment 1

app.get("/Test",(req,res)=>{

  res.send("You Are in test End point")

})

app.get("/Hello",(req,res)=>{

  res.send({message :"hello "})

})

app.get("/Hello/:name",(req,res)=>{

  let name = req.params.name
  let hello = "hello " +name
  res.send({message :hello})

})

app.post("/creat",(req,res)=>{
  var body =  req.body;
  console.log(req.body);
  res.send(req.body);
})


app.listen(port,()=>{
  console.log("server is running at " + port)
})
