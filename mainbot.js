//Startup
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

//Ready event
client.on("ready", () => {
  console.log("I am ready!");
});

//queryUserList event
client.on("message", (message) => {
  if (message.content.startsWith("queryUserList")) {
    let guild = client.guilds.find("name", "SmashRS");
    guild.members.forEach(function(value, key) {
      //console.log(guild.members.get(key).user.username);
      //console.log(guild.members.get(key).roles);]
      let ac = guild.members.get(key).roles.find("name", "Animal Crossing");
      if(ac!=null){
        if(guild.members.get(key).user.presence.game==null){
          client.channels.get('389933420270321664').send('O user ' + guild.members.get(key).user.toString() + ' tem role de Animal Crossing.');
        }else if(guild.members.get(key).user.presence.game.name=="Dolphin")
          client.channels.get('389933420270321664').send('O user ' + guild.members.get(key).user.toString() + ' tem role de Animal Crossing e está jogando Dolphin.');
      }else{
        client.channels.get('389933420270321664').send('O user ' + guild.members.get(key).user.toString() + ' não tem role de Animal Crossing.');
      }
      console.log(key + " = " + value);
      ac = null;
    }, guild.members)
  }
});

//Main functionality
client.on('presenceUpdate', (oldMember, newMember) => {
  if(newMember.presence.game!=null){
    if(newMember.presence.game.name=="Dolphin"){
        let guild = client.guilds.find("name", "SmashRS");
        guild.members.forEach(function(value, key) {
          //console.log(guild.members.get(key).user.username);
          //console.log(guild.members.get(key).roles);]
          let ac = guild.members.get(key).roles.find("name", "Animal Crossing");
          var currentMember = guild.members.get(key);
          if(currentMember.user.presence.game!=null){
            if(ac!=null && currentMember.user.presence.game.name=="Dolphin" && currentMember.user.username!=newMember.user.username){
              client.channels.get('389933420270321664').send(newMember.user.toString() + ' o ' + currentMember.user.username + ' já está possivelmente jogando Animal Crossing! Cuidado!');
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
