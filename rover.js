class Rover {
   // Write code here!
   constructor(position) {
     this.position = position;
     this.mode = "NORMAL";
     this.generatorWatts = 110;
   }

   receiveMessage(message){
    let response = {};
    response["message"] = message.name;
    response["results"] = [];

    if (message.commands) {
      for (let i = 0; i < message.commands.length; i++){
        let commandObj = {};
        let command = message.commands[i];

        if (command.commandType === "STATUS_CHECK") {
          
          commandObj["completed"] = true;
          commandObj["roverStatus"] = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          };
        } else if (command.commandType === "MODE_CHANGE") {
          this.mode = command.value;
          commandObj["completed"] = true;
        } else if (command.commandType === "MOVE") {
          if (this.mode === "NORMAL") {
            this.position = command.value;
            commandObj["completed"] = true;
          }
          commandObj["completed"] = false;
        }
        response["results"].push(commandObj);
      }
    }
    return response;
   }
}

module.exports = Rover;