//Startup
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Last user
var lastUser;

//Ready event
client.on("ready", () => {
  console.log("I am ready!");
});


//Main functionality
client.on('presenceUpdate', (oldMember, newMember) => {
  if(lastUser == newMember.user.username)
    return;

  if(newMember.presence.game!=null){
    if(newMember.presence.game.name=="Dolphin"){
        let guild = client.guilds.find("name", "SmashRS");
        guild.members.forEach(function(value, key) {
          //console.log(guild.members.get(key).user.username);
          //console.log(guild.members.get(key).roles);]
          let ac = guild.members.get(key).roles.find("name", "villagers");
          let ac2 = newMember.roles.find("name", "villagers");
          var currentMember = guild.members.get(key);
          if(currentMember.user.presence.game!=null){
            if(ac!=null && currentMember.user.presence.game.name=="Dolphin" && currentMember.user.username!=newMember.user.username && ac2!=null){
              client.channels.get('389933420270321664').send(newMember.user.toString() + ' o ' + currentMember.user.username + ' já está possivelmente jogando Animal Crossing! Cuidado!');
              lastUser == newMember.user.username;
            }
          }
          ac = null;
        }, guild.members)
    }
  }
});

//Deprecated old alert
//client.on('presenceUpdate', (oldMember, newMember) => {
//  console.log('old:');
//  console.log(oldMember.presence);
//  console.log('new:');
//  console.log(newMember.presence);
//  console.log(newMember.user.toString());
//  if(newMember.presence.game==null){
//    return;
//  }else if(newMember.presence.game.name=="Dolphin"){
//      client.channels.get('389864059107016726').send('@here O user ' + newMember.user.toString() + ' está possivelmente jogando Animal Crossing.');
//  }
//});


client.login(config.token);
