(function() {
    var currentPlayer = "player1";
    var victory = $(".victory");
    var playerturn = $(".playerturn");
    var blur = $("#blur2");

    $(".column").on("click", function(e) {
        var col = $(e.currentTarget);
        var slotsInColumn = col.find(".slot");
        var i;
        var reload = $(".reload");
        var reset = $(".reset");
        var win = $(".winbanner");
        var audio1 = new Audio("Pong1.wav");
        var audio2 = new Audio("Pong2.wav");

        for (i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                break;
            }
        }

        if (currentPlayer == "player 1") {
            audio1.play();
        } else if (currentPlayer == "player2") {
            audio2.play();
        }

        slotsInColumn.eq(i).addClass(currentPlayer);
        // Check for victory functions

        //

        if (checkForVictory(slotsInColumn)) {
            victory.css("visibility", "visible");
            if (currentPlayer == "player1") {
                victory.text("Player 1 Wins!!");

                result.Player1 = Number(result.Player1) + 1;
                localStorage.setItem("result", JSON.stringify(result));
                $(".player1-result").html(result.Player1);
            }
            if (currentPlayer == "player2") {
                victory.text("Player 2 Wins!!");
                result.Player2 = Number(result.Player2) + 1;
                localStorage.setItem("result", JSON.stringify(result));
                $(".player1-result").html(result.Player2);
            }
            console.log("Vertical Victory");
            blur.css("visibility", "visible");
            win.css("visibility", "visible");
            // reset.css("visibility", "visible");
            banner.css("visibility", "hidden");
            reload.css("visibility", "visible");
            reload.on("click", function() {
                location.reload();
            });
            return;
        }

        var slotsInRow = $(".row" + i);
        if (checkForVictory(slotsInRow)) {
            victory.css("visibility", "visible");
            if (currentPlayer == "player1") {
                victory.text("Player 1 Wins!!");
                result.Player1 = Number(result.Player1) + 1;
                localStorage.setItem("result", JSON.stringify(result));
                $(".player1-result").html(result.Player1);
            }
            if (currentPlayer == "player2") {
                victory.text("Player 2 Wins!!");
                result.Player2 = Number(result.Player2) + 1;
                localStorage.setItem("result", JSON.stringify(result));
                $(".player1-result").html(result.Player2);
            }
            console.log("Horizontal Victory");
            $(".column").off("click");
            win.css("visibility", "visible");
            // reset.css("visibility", "visible");
            reload.css("visibility", "visible");
            reload.on("click", function() {
                location.reload();
            });
            return true;
        }

        for (var b = 0; b < 41; b++) {
            var currSlot = $(".slot").eq(b);
            // initialize objects for going up and down with current slot
            var slotsDown = currSlot;
            var slotsUp = currSlot;
            // adding three more slots to each object in steps of 5 (down) and 7 (up)
            for (var c = 1; c < 4; c++) {
                var nextDownSlot = $(".slot").eq(b + 5 * c);
                var nextUpSlot = $(".slot").eq(b + 7 * c);
                // check if the next slot is in the neighbouring column
                //parent is current column
                if (
                    currSlot.parent().index() + c ==
                    nextDownSlot.parent().index()
                ) {
                    slotsDown = slotsDown.add(nextDownSlot);
                }
                if (
                    currSlot.parent().index() + c ==
                    nextUpSlot.parent().index()
                ) {
                    slotsUp = slotsUp.add(nextUpSlot);
                }
            }
            checkForVictory(slotsDown);
            checkForVictory(slotsUp);

            if (checkForVictory(slotsDown)) {
                victory.css("visibility", "visible");
                if (currentPlayer == "player1") {
                    victory.text("Player 1 Wins!!");
                    result.Player1 = Number(result.Player1) + 1;
                    localStorage.setItem("result", JSON.stringify(result));
                    $(".player1-result").html(result.Player1);
                }
                if (currentPlayer == "player2") {
                    victory.text("Player 2 Wins!!");
                    result.Player2 = Number(result.Player2) + 1;
                    localStorage.setItem("result", JSON.stringify(result));
                    $(".player1-result").html(result.Player2);
                }
                console.log("Diagonal victory");
                $(".column").off("click");
                win.css("visibility", "visible");
                // reset.css("visibility", "visible");
                reload.css("visibility", "visible");
                reload.on("click", function() {
                    location.reload();
                });
                return true;
            }
            if (checkForVictory(slotsUp)) {
                victory.css("visibility", "visible");
                if (currentPlayer == "player1") {
                    victory.text("Player 1 Wins!!");
                }
                if (currentPlayer == "player2") {
                    victory.text("Player 2 Wins!!");
                }
                console.log("Diagonal victory");
                $(".column").off("click");
                // reset.css("visibility", "visible");
                reload.css("visibility", "visible");
                reload.on("click", function() {
                    location.reload();
                });
                return true;
            }
        }

        // Reload button
        if (checkForVictory == true) {
            var reload = $(".reload");

            reload.css("visibility", "visible");

            reload.on("click", function() {
                location.reload();
            });
        }

        // Calling Switch player functiion
        switchPlayers();

        if (currentPlayer == "player1") {
            playerturn.text("Player 1's turn");
            playerturn.css("background-image", "url('tetrisred.jpg')");
        }
        if (currentPlayer == "player2") {
            playerturn.text("Player 2's turn");
            playerturn.css("background-image", "url('tetrisyellow.jpg')");
        }
    });

    // Declaration of switch player function
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
    // Check for horizontal and vertical Victory function

    function checkForVictory(slots) {
        var str = "";

        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                str += "v";
            } else {
                str += "x";
            }
        }

        if (str.indexOf("vvvv") > -1) {
            console.log("four in a row");
            $(".column").off("click");
            return true;
        }
    }

    try {
        var result = localStorage.getItem("result");
        if (result) {
            result = JSON.parse(result);
        } else {
            result = {
                Player1: 0,
                Player2: 0
            };
        }
    } catch (e) {
        console.log(e);
    }

    $(".player1-result").html(result.Player1);
    $(".player2-result").html(result.Player2);

    //

    //when you press on the reset button
    $(".reset").on("click", function() {
        loading.css("visibility", "visible");
        setTimeout(function() {
            banner.hide();
        }, 7000);
        setTimeout(function() {
            audio.remove();
        }, 7000);
        setTimeout(function() {
            bannerblur.hide();
        }, 7000);
        result = {
            Player1: 0,
            Player2: 0
        };
        setTimeout(function() {
            localStorage.setItem("result", JSON.stringify(result));
            $(".player1-result").html(result.Player1);
            $(".player2-result").html(result.Player2);
        }, 7000);
        setTimeout(function() {
            location.reload();
        }, 7000);
    });

    var start = $("#newgame");
    var banner = $("#startbanner");
    var bannerblur = $("#blur");
    var loading = $("#loading");
    var audio = $(".themeaudio");

    start.on("mousedown", function() {
        loading.css("visibility", "visible");
        setTimeout(function() {
            banner.hide();
        }, 7000);
        setTimeout(function() {
            audio.remove();
        }, 7000);
        setTimeout(function() {
            bannerblur.hide();
        }, 7000);
    });

    var pause = $("#pause");
    var pausebanner = $(".pausebanner");
    var resume = $(".resume");

    pause.on("click", function() {
        pausebanner.show();
    });

    resume.on("click", function() {
        pausebanner.hide();
    });

    // Arrows on mouseover appear
    // $(".column").on("mouseover", function(e) {
    //     var target = $(e.currentTarget);
    //     var column = $(".column");
    //     var arrow = $(".arrow");
    //
    //     if (target) {
    //         for (var i = 0; i < column.length; i++) {
    //             // arrow.eq(i).css("visibility", "visible");
    //             // console.log(arrow.eq(i));
    //             arrow[i].css("visibility", "visible");
    //         }
    //     }
    // });
})();

// // Hardcoded winning arrays for diagonal victory
// var victories = [
//     [2, 9, 16, 23],
//     [1, 8, 15, 22, 29],
//     [0, 7, 14, 21, 28, 35],
//     [6, 13, 20, 27, 34, 41],
//     [12, 19, 26, 33, 40],
//     [18, 25, 32, 39],
//
//     [3, 8, 13, 18],
//     [4, 9, 14, 19, 24],
//     [5, 10, 15, 20, 25, 30],
//     [11, 16, 21, 26, 31, 36],
//     [17, 22, 27, 32, 37],
//     [23, 28, 33, 38],
//
//     [18, 13, 8, 3],
//     [24, 19, 14, 9, 4],
//     [30, 25, 20, 15, 10, 5],
//     [36, 31, 26, 21, 16, 11],
//     [37, 32, 27, 22, 17],
//     [38, 33, 28, 23],
//
//     [23, 16, 9, 2],
//     [29, 22, 15, 8, 1],
//     [35, 28, 21, 14, 7, 0],
//     [41, 34, 27, 20, 13, 6],
//     [40, 33, 26, 19, 12],
//     [39, 32, 25, 18]
// ];

// Option 2 Diagonal Victory function

// if (diagonalVictory(slotsInDiagonal)) {
//     console.log("Diagonal Victory");
// }
// IFFE for diagonal victory condition
// (function diagonalVictory() {
//     var innerArray = "";
//     for (var a = 0; a < victories.length; a++) {
//         for (var j = 0; j < victories[a].length; j++) {
//             if (
//                 $(".slot")
//                     .eq(victories[a][j])
//                     .hasClass(currentPlayer)
//             ) {
//                 innerArray += "v";
//             } else {
//                 innerArray += "x";
//             }
//         }
//     }
//     // }
//     console.log(innerArray);
// if (innerArray.indexOf("vvvv") > -1) {
//     victory.css("visibility", "visible");
//     if (currentPlayer == "player1") {
//         victory.text("Player 1 Wins!!");
//     }
//     if (currentPlayer == "player2") {
//         victory.text("Player 2 Wins!!");
//     }
//     console.log("Diagonal victory");
//     $(".column").off("click");
//     reload.css("visibility", "visible");
//     reload.on("click", function() {
//         location.reload();
//     });
//     return true;
// }
// })();
