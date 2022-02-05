//variables
var player = 0;
var player_ui = new Array(4);
var player_outcome = [1,1,1,1];
player_color = ["red", "purple", "yellow", "pink", "silver"];

var room = new matrixArray(4, 4);
var ui_update;

var tablet_elem = new matrixArray(4, 4);
var dice = true;

var tablet_design = ["<svg height='16' width='16'><circle cx='8' cy='6' r='8' fill='","' /> <polygon points='0,9 8,24 16,9 ' style='fill:",";' /></svg>"];
//end variables
function u() {
  // body...
  var pp="red";
document.body.innerHTML=tablet_design[0]+"red"+tablet_design[1]+"red"+tablet_design[2];
}

function ui_set() {
  // body...

  for (var i = 0; i < 25; i++) {
    element[i] = document.createElement("DIV");
    document.getElementById("main").appendChild(element[i]);
  }

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      tablet_elem[i][j] = document.createElement("DIV");

      tablet_elem[i][j].classList.add("tablet");
      tablet_elem[i][j].value = [i,
        j];
      tablet_elem[i][j].innerHTML = "<svg height='16' width='16'><circle cx='8' cy='6' r='8' fill='"+player_color[i]+"' /> <polygon points='0,9 8,24 16,9 ' style='fill:"+player_color[i]+";' /></svg>";
      tablet_elem[i][j].style.setProperty('height', '16px');
      tablet_elem[i][j].style.setProperty('width', '16px');
      document.getElementById("main").appendChild(tablet_elem[i][j]);
    }
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
      element[row_column[i]].classList.add("columns");
    }
    for (var j = 0; j < 6; j++) {
      place[i*6+j] = document.createElement("DIV");
      element[row_column[i]].appendChild(place[i*6+j]);
      place[i*6+j].addEventListener("click", tablet_listener);
      place[i*6+j].classList.add("place");
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
      room[i][j].addEventListener("click", tablet_listener);
    }
  }

  for (var i = 0; i < 4; i++) {
    player_ui[i] = document.createElement("DIV");
    player_ui[player].innerHTML ='&#9858';
    ////////////////////////////
    document.getElementById("players").append(player_ui[i]);
    addlistener_player(player_ui[i]);
  }
  setTimeout(function() {
    update();

  }, 0);
}

function tablet_listener() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (this == el(i, j)) {
        if (!dice && i == player) {
  /**/        if (tablet[i][j] == 0 && player_outcome[player] == 6) {
            tablet[i][j] = 1;
            update();
            dice = true;

          } else if (tablet[i][j] > 0) {

            dice = true;
            tablet_forwarding(player, j);
            player = (player+1)%4;
          }
        }
        break;
      }
    }
  }
}

function addlistener_player(object) {
  // body...
  object.addEventListener("click", function() {
    if (this == player_ui[player] && dice) {
  /**/    player_outcome[player]= parseInt(((Math.random(0, 6)*1000)%6)+1);

         player_ui[player].innerHTML ='&#'+ (9855+player_outcome[player])

      for (var i = 0; i < 4; i++) {
        //checking the all 4 tablet of player , tablet no. is in "i"
  /**/      if ((tablet[player][i] == 0 && player_outcome[player] == 6) || (tablet[player][i] > 0 && (tablet[player][i]+parseInt(player_outcome[player]) < 58))) {
          update();

          dice = false;
          break;
        }
      }
      if (dice) {
        player = (player+1)%4;
        update();
      }
    }
  });

}

function tablet_forwarding(player__, tablet__) {
  for (var j = 0; j < player_outcome[player]; j++) {

    setTimeout(function() {
      tablet[player__][tablet__]++;
      update();
    }, 200*j, tablet__, player__);

  }
  setTimeout(cut_tablet, parseInt(player_outcome[player])*200, player__, tablet__);
}

function cut_tablet(player___, tablet__) {
  for (var i = 0; i < 4; i++) {
    if (i != player___) {
      for (var j = 0; j < 4; j++) {
        if (tablet[i][j] > 0 && tablet[i][j] < 51) {
          if (path[((player_path[i]+tablet[i][j])-1)%52] == path[((player_path[player___]+tablet[player___][tablet__])-1)%52]) {

            if ((path[((player_path[i]+tablet[i][j])-1)%52]) != (1 || 9 || 26 || 34 || 38 || 49 || 58 || 69)) {
              tablet[i][j] = 0;
              update();
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
    for (var j = 0; j < 4; j++) {
      tablet[i][j] = 0;
    }
  }
  update();
}

function update() {
  // body...
  for (var i = 0; i < 4; i++) {
    player_ui[i].style.backgroundColor = "";
    
  player_ui[player].innerHTML='';
  }
  player_ui[player].style.backgroundColor = player_color[player];

  player_ui[player].innerHTML='&#'+(9855+player_outcome[player]);

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
 /* error 
 after 
 outcome check at last  to go in win home 
 --error-- more out come 
 */     tablet_elem[i][j].style.top = (((el(i, j).getBoundingClientRect().top+el(i, j).getBoundingClientRect().bottom)/2))-(tablet_elem[i][j].getBoundingClientRect().height/2) +"px";


      tablet_elem[i][j].style.left = (((el(i, j).getBoundingClientRect().left+el(i, j).getBoundingClientRect().right)/2))-(tablet_elem[i][j].getBoundingClientRect().width/2) +"px";



    }
  }
}

function el(i, j) {
  if (tablet[i][j] == 0) {
    return room[i][j];
  } else if (tablet[i][j] < 52) {
    return  place[path[((tablet[i][j]+player_path[i]-1)%52)]];
  } else if (tablet[i][j] == 57) {
    return element[win[i]];
  } else if (tablet[i][j] > 51 && tablet[i][j] < 57) {
    if (i < 2) {
      return  place[(path_[i]+(tablet[i][j]-52))];
    } else {
      return place[(path_[i]-(tablet[i][j]-52))];
    }
  }
}
function matrixArray(x, y) {
  // body...
  var out = new Array(x);
  for (var i = 0; i < x; i++) {
    out[i] = new Array(y);
    for (var j = 0; j < out[i].length; j++) {
      out[i][j] = 0;
    }
  }
  return out;
}