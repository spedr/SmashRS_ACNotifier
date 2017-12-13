var Dropbox = require('dropbox');
const config = require("./config.json");
var dbx = new Dropbox({ accessToken: config.accessToken });


//dbx.filesListFolder({path: '/dolphin'})
//  .then(function(response) {
//    console.log(response);
//  })
//  .catch(function(error) {
//    console.log(error);
//  });



//var date = new Date();
//console.log(date.toString());

//900000

dbx.filesGetMetadata({path: '/dolphin/acmemorycard.usa.raw'})
    .then(function(response) {
      //console.log(response);
      var date = new Date(response.server_modified);
      var string1 = date.toString().split("GMT");
      var stringdate = date.toString().split("GMT")[0];
      //console.log(string1[0]);
      console.log(stringdate);
      console.log(date.toString());
      dbx.usersGetAccount({account_id: response.sharing_info.modified_by})
        .then(function(response2){
          else console.log(response2.name.given_name);
        })
    })
    .catch(function(error) {
      console.log(error);
    });

//dbx.usersGetAccount({account_id: 'dbid:AADIY3BFs-sy52mx2q0edRLxAsGhowynOvw'})
//        .then(function(response) {
//          console.log(response);
//        })
//        .catch(function(error) {
//          console.log(error);
//        });
