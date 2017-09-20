/**
 * All nodes with possble directions.
 *
 * Example: when on node 2 you can only go east, it will
 *          change the node to 3.
 */
var Nodes = {
     0: {"n": 3},
     1: {"w": 3},
     2: {"e": 3},
     3: {"n": 4, "e": 1, "s": 0, "w": 2},
     4: {"n": 11, "s": 3},
     5: {"e": 6, "w": 11},
     6: {"e": 7, "w": 5},
     7: {"e": 8, "w": 6},
     8: {"e": 9, "w": 7},
     9: {"e": 10, "w": 8},
    10: {"w": 9},
    11: {"e": 5, "s": 4, "n": 26},
    12: {"e": 11, "w": 13},
    13: {"e": 12, "w": 14},
    14: {"e": 13, "n": 15},
    15: {"n": 16, "s": 14},
    16: {"n": 17, "s": 15},
    17: {"n": 18, "s": 16},
    18: {"e": 19, "s": 17},
    19: {"e": 18, "w": 20},
    20: {"e": 19, "w": 21},
    21: {"e": 22, "s": 24, "w": 20},
    22: {"s": 23, "w": 21},
    23: {"n": 22, "s": 25, "w": 24},
    24: {"n": 21, "e": 23},
    25: {"n": 23},
    26: {"s": 11},
    27: {"e": 11},
    28: {"e": 27, "w": 29},
    29: {"e": 28, "w": 30},
    30: {"e": 29, "w": 31},
    31: {"n": 33, "e": 30, "s": 32},
    32: {"n": 31},
    33: {"n": 34, "s": 31},
    34: {"n": 35, "s": 33},
    35: {"s": 34},
};

//Possible directions in letters
var Dirs = ['n','e','s','w'];

//Current looking direction
var cDir = 0;

//Current node possition
var cPos = 0;

//onLoad function
$(document).ready(function(){
    //Call updateNode function to create the start position
    updateNode();

    //On-screen arrow keys onclick functions
    $("#forwardBtn").click(function(){ Move('f'); });
    $("#leftBtn").click(function(){ Turn('l'); });
    $("#rightBtn").click(function(){ Turn('r'); });
});

//Keyboard click handler
$(document).keydown(function(e){
    if (e.keyCode == 37) { //Left arrow
       Turn('l');
    } else if (e.keyCode == 39) { //Right arrow
       Turn('r');
    } else if (e.keyCode == 38) { //Up arrow
       Move('f');
    } else if (e.keyCode == 40) { //Down arrow
       Move('b');
    }
});


/**
 * Turn function *
 *
 * Arguments:
 * s = Side (l or r) left or right
 */
var Turn = function(s) {
    if (s == 'l') {
        if (cDir < 1) {
            cDir = Dirs.length - 1;
        } else {
            cDir -= 1;
        }
    } else if (s == 'r') {
        if (cDir > Dirs.length - 2) {
            cDir = 0;
        } else {
            cDir++;
        }
    }
    updateNode();
}

/**
 * Move function, checks of node is on the forward position from POV
 * Arguments:
 * d = Direction (f or b) forward or backward.
 */
var Move = function(d) {
    if (d == 'f') {
        if(typeof Nodes[cPos][Dirs[cDir]] != 'undefined') {
            cPos = Nodes[cPos][Dirs[cDir]];
        }
    } else if (d == 'b') {
        if (cDir > 1) {
            if(typeof Nodes[cPos][Dirs[cDir - 2]] != 'undefined') {
                cPos = Nodes[cPos][Dirs[cDir - 2]];
            }
        } else {
            if(typeof Nodes[cPos][Dirs[cDir + 2]] != 'undefined') {
                cPos = Nodes[cPos][Dirs[cDir + 2]];
            }
        }
    }
    updateNode();
}

var updateNode = function() {
    console.log({'Current Direction': Dirs[cDir], 'Current Node': cPos});
    if(typeof Nodes[cPos][Dirs[cDir]] != 'undefined') {
        $("#forwardBtn").show();
    } else {
        $("#forwardBtn").hide();
    }

    $('#viewNode').css("background-image", "url(images/tour/" + cPos + Dirs[cDir]  +".jpg)");
}
