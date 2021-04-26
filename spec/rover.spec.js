const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(913830);
    expect(rover.position).toEqual(913830);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function(){
    let rover = new Rover(538743);
    let commands = [new Command("MOVE", 120), new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Two command message", commands);
    let receivedMessage = rover.receiveMessage(message);

    expect(receivedMessage.message).toEqual("Two command message");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let rover = new Rover(53321743);
    let commands = [new Command("MOVE", 120), new Command("STATUS_CHECK")];
    let message = new Message("Two command message", commands);
    let receivedMessage = rover.receiveMessage(message);

    expect(receivedMessage.results.length).toBe(2);
  });

  it("responds correctly to status check command", function() {
    let rover = new Rover(53321743);
    let commands = [new Command("MOVE", 0), new Command("STATUS_CHECK")];
    let message = new Message("Two command message", commands);
    let receivedMessage = rover.receiveMessage(message);
    let status = receivedMessage.results[1]["roverStatus"];

    expect(Object.keys(status)).toEqual(["mode", "generatorWatts", "position"]);
    expect(status.mode).toEqual("NORMAL");
    expect(status.generatorWatts).toEqual(110);
  });

  it("responds correctly to mode change command", function(){
    let rover = new Rover(53321743);
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    let message = new Message("Two command message", commands);
    let receivedMessage = rover.receiveMessage(message);
    let status = receivedMessage.results[0]["completed"];
    let mode = rover.mode;

    expect(status).toBeTrue();
    expect(mode).toEqual("LOW_POWER");
  });

  it("responds with false completed value when trying to move in LOW_POWER mode", function(){
    let rover = new Rover(53321743);
    rover.receiveMessage(new Message("Reduce power", [new Command("MODE_CHANGE", "LOW_POWER")]));

    let commands = [new Command("MOVE", 120), new Command("STATUS_CHECK")];
    let message = new Message("Two command message", commands);
    let receivedMessage = rover.receiveMessage(message);
    let status = receivedMessage.results[0]["completed"];

    expect(status).toBeFalse();
    expect(rover.position).toEqual(53321743);
  });

  it("responds with position for MOVE command", function(){
    let rover = new Rover(53321743);
    let commands = [new Command("MOVE", 10), new Command("STATUS_CHECK")];
    let message = new Message("Two command message", commands);
    rover.receiveMessage(message);

    expect(rover.position).toEqual(10);
  });
});
