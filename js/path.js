var place = new Array(72);
//player-4 path-56 for each

var path=[0,1,2,3,4,5,41,40,39,38,37,36,42,48,49,50,51,52,53,6,7,8,9,10,11,23,35,34,33,32,31,30,66,67,68,69,70,71,65,59,58,57,56,55,54,29,28,27,26,25,24,12];//1-51  //0-50

/* path like this , arrange according to place[] element

         # #
         # #
         # #
         # #
# # # # #   # # # # #
# # # # #   # # # # #
         # #
         # #
         # #
         # #
*/

var element = new Array(25);
/*

######   #  #  #   ######
###1##   2  3  4   ##5###
######   #  #  #   ######

## 6 #   7  8  9   # 10 #
# 10 #  11 12 13   # 14 #
# 15 #  16 17 18   # 19 #

######   #  #  #   ######
###20#  21 22 23   ##24##
######   #  #  #   ######





*/


var path_=[13,43,22,64];
/* path_ like this , arrange according to place[] element

         # # #
         # 43#
         # # #
         # # #
         # # #
# # # # #    # # # # #
#13# # ##    # # # 22#
# # # # #    # # # # #
         # # #
         # # #
         # 64#
         # # #
*/


var player_path=[1,14,27,40];//start point of player  in path[]
var tablet = matrixArray(4,4);//

var win = [11,7,13,17]//winner place of players