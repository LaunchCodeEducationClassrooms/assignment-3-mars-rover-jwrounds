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
    response["results"] = [];

    if (message.commands) {
      let roverMode = this.mode;
      let roverPosition = this.position;
      let roverWatts = this.generatorWatts;

      message.commands.forEach(function(command){
        let commandObj = {};
        
        if (command.commandType === "STATUS_CHECK") {
          commandObj["completed"] = true;
          commandObj["roverStatus"] = {
            mode: roverMode,
            generatorWatts: roverWatts,
            position: roverPosition
          };
        } 
        response["results"].push(commandObj);
      });
    }

    return response;
   }
}

module.exports = Rover;