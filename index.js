const server = require("./app");
const PORT = process.env.PORT 

server.listen(PORT,(err)=>{
  if(err){
    console.log(err);
  }
  console.log(`Server Started. Server listening to port ${PORT}`);
});
