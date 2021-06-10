//variables
var player = 0;
var player_ui = new Array(4);
player_color = ["red", "purple", "yellow", "pink", "silver"];

var room = new matrixArray(4, 4);
var ui_update;
var yy = false;
//end variables


function onload() {
  setTimeout(restart, 0);

}

function ui_set() {
  // body...

  for (var i = 0; i < 25; i++) {
    element[i] = document.createElement("DIV");
    //  element[i].innerHTML=i;
    document.getElementById("main").appendChild(element[i]);
  }

  var row_column = [5,
    9,
    10,
    14,
    15,
    19,
    1,
    2,
    3,
    21,
    22,
    23];
  for (var i = 0; i < 12; i++) {
    if (i < 6) {
      element[row_column[i]].classList.add("columns")
    }
    for (var j = 0; j < 6; j++) {
      place[i*6+j] = document.createElement("DIV");
      //  place[i*6+j].innerHTML = i*6+j;
      element[row_column[i]].appendChild(place[i*6+j]);
      addlistener_path(place[i*6+j]);
    }
  }

  var house = [0,
    4,
    24,
    20]
  for (var i = 0; i < 4; i++) {
    element[house[i]].classList.add("house");
    for (var j = 0; j < 4; j++) {
      room[i][j] = document.createElement("DIV");
      element[house[i]].appendChild(room[i][j]);
      addlistener_room(room[i][j]);
    }
  }

  for (var i = 0; i < 4; i++) {
    player_ui[i] = document.createElement("DIV");
    document.getElementById("players").append(player_ui[i]);
    addlistener_player(player_ui[i]);
  }

}

function addlistener_player(object) {
  // body...
  object.addEventListener("click", function() {
    if (this == player_ui[player]&&!yy) {
      player_ui[player].innerHTML = parseInt(((Math.random(0, 6)*1000)%6)+1);
      
      for (var l = 0; l < 4; l++) {
          //checking the all 4 tablet of player , tablet no. is in "l"
                if((tablet[player][l]==0&&player_ui[player].innerHTML==6)||(tablet[player][l] > 0&&(tablet[player][l]+parseInt(player_ui[player].innerHTML)<58))){
                    
                    yy=true;
                    break;
                    
                  }
                }
      if(!yy){
          player = (player+1)%4;
      }
    }
  });

}

function addlistener_path(object) {
  // body...
  object.addEventListener("click",
    function() {

      if (yy) {

        for (var i = 0; i < 4; i++) {
          //checking the all 4 tablet of player , tablet no. is in "i"
          
          if (tablet[player][i] > 0 && tablet[player][i] < 52) {

            if (place[path[((player_path[player]+tablet[player][i])-1)%52]] == this) {

              tablet_forwarding(i);
              break;
            };
          } else if (tablet[player][i] > 51 && tablet[player][i] < 57) {

            if ((place[path_[player]+(tablet[player][i]-52)] == this) || (place[path_[player]-(tablet[player][i]-52)] == this)) {

//              console.log(player_ui[player].innerHTML+tablet[player][i]);

              if (parseInt(player_ui[player].innerHTML)+tablet[player][i] < 58) {
                tablet_forwarding(i);
                break;
              }

            }
          }
        }
      }
    });
}

function tablet_forwarding(i) {
                for (var j = 0; j < player_ui[player].innerHTML; j++) {

                  setTimeout(function() {
                    tablet[player__][i]++;
                  }, 200*j, i, player__ = player);

                }
                setTimeout(cut_tablet,parseInt(player_ui[player].innerHTML)*200,player___=player,k=i);
                
                
                player = (player+1)%4;
                yy = false;
}



function cut_tablet(player___,k) {
  for (var i = 0; i < 4; i++) {
    if (i!=player___) {
      for (var j = 0; j < 4; j++) {
        if (tablet[i][j]>0&&tablet[i][j]<51) {
          if(path[((player_path[i]+tablet[i][j])-1)%52]==path[((player_path[player___]+tablet[player___][k])-1)%52]){
            
          if((path[((player_path[i]+tablet[i][j])-1)%52])!=(1||9||26||34||38||49||58||69)){
          
            console.log(i+"   "+j);
            tablet[i][j]=0;
            
            
          }
            
          }
          
        }
      }
    }
  }
  
}

function restart() {
  // body...
  for (var i = 0; i < 4; i++) {
    element[win[i]].style.backgroundColor = "orange";
    for (var j = 0; j < 4; j++) {
      tablet[i][j] = 0;
    }
  }
  ui_update = setInterval(update, 200);
}

function stop() {
  // body...
  clearInterval(ui_update);
}




function matrixArray(x, y) {
  // body...
  var out = new Array(x);
  for (var i = 0; i < x; i++) {
    out[i] = new Array(y);
  }
  return out;
}
function addlistener_room (object) {
  // body...
  object.addEventListener("click",
    function() {
      for (var i = 0; i < 4; i++) {
        if ((tablet[player][i] == 0)  &&(room[player][i] == this)) {
          
              if (player_ui[player].innerHTML == 6&& yy) {

                tablet[player][i] = 1;
                yy = false;
              }
            
            break;
          }
        
      }
    });
}
function update() {
  // body...
  for (var i = 0; i < place.length; i++) {
    place[i].style.backgroundColor = "green";
  }


  for (var i = 0; i < 4; i++) {
    if (i == player) {

      player_ui[i].style.backgroundColor = player_color[i];
    } else {
      player_ui[i].style.backgroundColor = "";

    }


    for (var j = 0; j < 4; j++) {
      if (tablet[i][j] == 0) {
        room[i][j].style.backgroundColor = player_color[i];
      } else {
        room[i][j].style.backgroundColor = "green";

      }
      if ((tablet[i][j] < 52) && (tablet[i][j] != 0)) {
        place[path[((tablet[i][j]+player_path[i]-1)%52)]].style.backgroundColor = player_color[i];
      } else if (tablet[i][j] == 57) {
        element[win[i]].style.backgroundColor = player_color[i];
      } else if (tablet[i][j] < 57 && tablet[i][j] > 51) {
        if (i < 2) {
          place[(path_[i]  +(tablet[i][j]-52))].style.backgroundColor = player_color[i];
        } else {
          place[(path_[i]  -(tablet[i][j]-52))].style.backgroundColor = player_color[i];
        }

      }

    }
  }
}