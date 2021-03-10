class Rover {
   // Write code here!
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }

   receiveMessage(message){
    let response = {};
    response["message"] = message.name;
  
    return response;
   }
}

module.exports = Rover;