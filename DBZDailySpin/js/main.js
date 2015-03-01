/// <reference path="jquery.js" />
// Disables right-clicking
document.oncontextmenu = function () {
    return false;
}
// !!!
// Code segment below was taken here http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
// Allows for multiple types images to be displayed within the canvas 
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // gets the number of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

// Image sources
var sources = {
    fatloot: 'imgs/VegetoJ.png',
    nimbus: 'imgs/Gohan.png',
    scouters: 'imgs/Vegeta.png',
    senzubeans: 'imgs/Goku.png',
    oozaru: 'imgs/GokuR.png',
    nyoibo: 'imgs/Picolo.png',
    capsules: 'imgs/Trunks.png',
    empty: 'imgs/Buu.png',
    qReel: 'imgs/Ball.png',
    timer1: 'imgs/VegetaT1.png',
    timer2: 'imgs/VegetaT2.png'
};
// Code segment above was taken from http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
// !!!

// Draws initial slot machine on the canvas on load
window.onload = function () {
    var theCanvas = document.getElementById('myCanvas');
    var print = theCanvas.getContext('2d');
    var pr = theCanvas.getContext('2d');

    var sPannel = new Image();
    sPannel.src = "imgs/Slots.png";
    sPannel.onload = drawSPannel;
    
    // Draws slot machine pannels and text
    function drawSPannel() {
        print.drawImage(sPannel, 0, 0, 405, 515);
        loadImages(sources, function (images) {
            print.drawImage(images.qReel, 70, 173, 62, 75);
            print.drawImage(images.qReel, 146, 173, 62, 75);
            print.drawImage(images.qReel, 222, 173, 62, 75);
        });
        print.font = "18pt Arial Black";
        print.fillStyle = "green";
        print.fillText(playerMoney, 135, 360);
        print.fillText(jackpot, 165, 106);
        print.font = "15pt Comic Sans MS";
        print.fillStyle = "black";
        print.fillText(playerBet, 318, 228);
        print.fillText(winnings, 208, 467);
        print.fillText(winRatio, 88, 419);
        print.fillText("%", 142, 419);
        print.fillText(turn, 330, 68);
        print.fillText(winNumber, 185, 420);
        print.fillText(lossNumber, 265, 420);
    }

    // Declaration of all number tracking variables 
    var playerMoney = 1000;
    var winnings = 0;
    var jackpot = 5000;
    var turn = 0;
    var playerBet = 0;
    var winNumber = 0;
    var lossNumber = 0;
    var spinResult;
    var ditems = "";
    var winRatio = 0.00;
    var nyoibo = 0;
    var nimbus = 0;
    var capsules = 0;
    var oozaru = 0;
    var scouters = 0;
    var senzubeans = 0;
    var fatloot = 0;
    var emptys = 0;
    var reel1 = 68;
    var reel2 = 145;
    var reel3 = 221;

   
    
    // Utility function to show Player Stats 
    function showPlayerStats() {
        winRatio = winNumber / turn;

        print.drawImage(sPannel, 0, 0, 405, 515);
        print.font = "18pt Arial Black";
        print.fillStyle = "green";
        print.fillText(playerMoney, 135, 360);
        print.fillText(jackpot, 165, 106);
        print.font = "15pt Comic Sans MS";
        print.fillStyle = "black";
        print.fillText(playerBet, 318, 228)
        print.fillText(winnings, 208, 467);
        if (winRatio >= 0) {
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
        }
        else {
            print.fillText(0.00, 88, 419);
        }
        print.fillText("%", 142, 419)
        print.fillText(turn, 330, 68);
        print.fillText(winNumber, 185, 420);
        print.fillText(lossNumber, 265, 420);
    }

    // Utility function to reset all fruit tallies 
    function resetditemTally() {
        nyoibo = 0;
        nimbus = 0;
        capsules = 0;
        oozaru = 0;
        scouters = 0;
        senzubeans = 0;
        fatloot = 0;
        emptys = 0;
    }

    // Utility function to reset the player stats 
    function resetAll() {
        playerMoney = 1000;
        playerBet = 0;
        winnings = 0;
        jackpot = 5000;
        winRatio = 0.00;
        turn = 0;
        playerBet = 0;
        winNumber = 0;
        lossNumber = 0;
    }

    // Check to see if the player won the jackpot 
    function checkJackPot() {
        /* compare two random values */
        var jackPotTry = Math.floor(Math.random() * 51 + 1);
        var jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            alert("You Won the $" + jackpot + " Jackpot!!!");
            playerMoney += jackpot;
            jackpot = 1000;
        }
    }

    // Utility function to show a win message and increase player money
    function showWinMessage() {
        playerMoney += winnings;
        resetditemTally();
        checkJackPot();
    }

    // Utility function to show a loss message and reduce player money 
    function showLossMessage() {
        playerMoney -= playerBet;
        resetditemTally();
    }

    // Utility function to check if a value falls within a range of bounds 
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }

    // Utility function to determines the betLine results (e.g. scouters - capsules - nimbus)
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "empty";
                    emptys++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "nyoibo";
                    nyoibo++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "nimbus";
                    nimbus++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "capsules";
                    capsules++;
                    break;
                case checkRange(outCome[spin], 55, 59): // 7.7% probability
                    betLine[spin] = "oozaru";
                    oozaru++;
                    break;
                case checkRange(outCome[spin], 60, 62): // 4.6% probability
                    betLine[spin] = "scouters";
                    scouters++;
                    break;
                case checkRange(outCome[spin], 63, 64): // 3.1% probability
                    betLine[spin] = "senzubeans";
                    senzubeans++;
                    break;
                case checkRange(outCome[spin], 65, 65): // 1.5% probability
                    betLine[spin] = "fatloot";
                    fatloot++;
                    break;
            }       
        }
        return betLine;
    }

    // Utility function to calculate the player's winnings, if any and plays winning or losing soundeffect
    function determineWinnings() {
        if (emptys == 0) {
            if (nyoibo == 3) {
                winnings = playerBet * 10;
                
            }
            else if (nimbus == 3) {
                winnings = playerBet * 20;
             
            }
            else if (capsules == 3) {
                winnings = playerBet * 30;
            
            }
            else if (oozaru == 3) {
                winnings = playerBet * 40;
                
            }
            else if (scouters == 3) {
                winnings = playerBet * 50;
                
            }
            else if (senzubeans == 3) {
                winnings = playerBet * 75;
                
            }
            else if (fatloot == 3) {
                winnings = playerBet * 100;
                
            }
            else if (nyoibo == 2) {
                winnings = playerBet * 2;
                
            }
            else if (nimbus == 2) {
                winnings = playerBet * 2;
                
            }
            else if (capsules == 2) {
                winnings = playerBet * 3;
                
            }
            else if (oozaru == 2) {
                winnings = playerBet * 4;
                
            }
            else if (scouters == 2) {
                winnings = playerBet * 5;
                
            }
            else if (senzubeans == 2) {
                winnings = playerBet * 10;
                
            }
            else if (fatloot == 2) {
                winnings = playerBet * 20;
                
            }
            else if (fatloot == 1) {
                winnings = playerBet * 5;
                
            }
            else {
                winnings = playerBet * 1;
                
            }
            winNumber++;
            showWinMessage();
        }
        else {
            lossNumber++;
            showLossMessage();
            winnings = 0;
            
        }
    }
    
    // Utility function to assign images to randomly selected real items
    function reelImgs(spin, reel) {
        switch (spin) {
            case "fatloot":
                loadImages(sources, function (images) {
                    print.drawImage(images.fatloot, reel, 173, 62, 75);
                });
                break;
            case "nyoibo":
                loadImages(sources, function (images) {
                    print.drawImage(images.nyoibo, reel, 173, 62, 75);
                });
                break;
            case "nimbus":
                loadImages(sources, function (images) {
                    print.drawImage(images.nimbus, reel, 173, 62, 75);
                });
                break;
            case "capsules":
                loadImages(sources, function (images) {
                    print.drawImage(images.capsules, reel, 173, 62, 75);
                });
                break;
            case "oozaru":
                loadImages(sources, function (images) {
                    print.drawImage(images.oozaru, reel, 173, 62, 75);
                });
                break;
            case "scouters":
                loadImages(sources, function (images) {
                    print.drawImage(images.scouters, reel, 173, 62, 75);
                });
                break;
            case "senzubeans":
                loadImages(sources, function (images) {
                    print.drawImage(images.senzubeans, reel, 173, 62, 75);
                });
                break;
            default:
                loadImages(sources, function (images) {
                    print.drawImage(images.empty, reel, 173, 62, 75);
                });
                break;
        }
    }

    // Utility function to retain the reel images after every spin and during bet change
    function retainReel() {
        if (ditems == "") {
            loadImages(sources, function (images) {
                print.drawImage(images.qReel, 70, 173, 62, 75);
                print.drawImage(images.qReel, 146, 173, 62, 75);
                print.drawImage(images.qReel, 222, 173, 62, 75);

            });
        }
        else {
            reelImgs(spinResult[0], reel1);
            reelImgs(spinResult[1], reel2);
            reelImgs(spinResult[2], reel3);
        }
    }
    
    // Utility function for reel spin animation
    function reelSpin() {
       
        print.drawImage(sPannel, 0, 0, 405, 515);
        print.font = "18pt Arial Black";
        print.fillStyle = "green";
        print.fillText(playerMoney, 135, 360);
        print.fillText(jackpot, 165, 106);
        print.font = "15pt Comic Sans MS";
        print.fillStyle = "black";
        print.fillText(playerBet, 318, 228)
        print.fillText(winnings, 208, 467);
        print.fillText((winRatio * 100).toFixed(2), 88, 419);
        print.fillText("%", 142, 419);
        print.fillText(turn, 330, 68);
        print.fillText(winNumber, 185, 420);
        print.fillText(lossNumber, 265, 420);
        loadImages(sources, function (images) {
            print.drawImage(images.timer1, 70, 173, 62, 75);
            print.drawImage(images.timer1, 146, 173, 62, 75);
            print.drawImage(images.timer1, 222, 173, 62, 75);
        });

        setTimeout(function () {
            print.drawImage(sPannel, 0, 0, 405, 515);
            print.font = "18pt Arial Black";
            print.fillStyle = "green";
            print.fillText(playerMoney, 135, 360);
            print.fillText(jackpot, 165, 106);
            print.font = "15pt Comic Sans MS";
            print.fillStyle = "black";
            print.fillText(playerBet, 318, 228)
            print.fillText(winnings, 208, 467);
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
            print.fillText("%", 142, 419);
            print.fillText(turn, 330, 68);
            print.fillText(winNumber, 185, 420);
            print.fillText(lossNumber, 265, 420);
            loadImages(sources, function (images) {
                print.drawImage(images.timer2, 70, 173, 62, 75);
                print.drawImage(images.timer2, 146, 173, 62, 75);
                print.drawImage(images.timer2, 222, 173, 62, 75);
            });
        }, 200);

        setTimeout(function () {
            print.drawImage(sPannel, 0, 0, 405, 515);
            print.font = "18pt Arial Black";
            print.fillStyle = "green";
            print.fillText(playerMoney, 135, 360);
            print.fillText(jackpot, 165, 106);
            print.font = "15pt Comic Sans MS";
            print.fillStyle = "black";
            print.fillText(playerBet, 318, 228)
            print.fillText(winnings, 208, 467);
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
            print.fillText("%", 142, 419);
            print.fillText(turn, 330, 68);
            print.fillText(winNumber, 185, 420);
            print.fillText(lossNumber, 265, 420);
            loadImages(sources, function (images) {
                print.drawImage(images.timer1, 70, 173, 62, 75);
                print.drawImage(images.timer1, 146, 173, 62, 75);
                print.drawImage(images.timer1, 222, 173, 62, 75);
            });
        }, 400);

        setTimeout(function () {
            print.drawImage(sPannel, 0, 0, 405, 515);
            print.font = "18pt Arial Black";
            print.fillStyle = "green";
            print.fillText(playerMoney, 135, 360);
            print.fillText(jackpot, 165, 106);
            print.font = "15pt Comic Sans MS";
            print.fillStyle = "black";
            print.fillText(playerBet, 318, 228)
            print.fillText(winnings, 208, 467);
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
            print.fillText("%", 142, 419);
            print.fillText(turn, 330, 68);
            print.fillText(winNumber, 185, 420);
            print.fillText(lossNumber, 265, 420);
            loadImages(sources, function (images) {
                print.drawImage(images.timer2, 70, 173, 62, 75);
                print.drawImage(images.timer2, 146, 173, 62, 75);
                print.drawImage(images.timer2, 222, 173, 62, 75);
            });
        }, 600);

        setTimeout(function () {
            print.drawImage(sPannel, 0, 0, 405, 515);
            print.font = "18pt Arial Black";
            print.fillStyle = "green";
            print.fillText(playerMoney, 135, 360);
            print.fillText(jackpot, 165, 106);
            print.font = "15pt Comic Sans MS";
            print.fillStyle = "black";
            print.fillText(playerBet, 318, 228)
            print.fillText(winnings, 208, 467);
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
            print.fillText("%", 142, 419);
            print.fillText(turn, 330, 68);
            print.fillText(winNumber, 185, 420);
            print.fillText(lossNumber, 265, 420);
            loadImages(sources, function (images) {
                print.drawImage(images.timer1, 70, 173, 62, 75);
                print.drawImage(images.timer1, 146, 173, 62, 75);
                print.drawImage(images.timer1, 222, 173, 62, 75);
            });
        }, 800);

        setTimeout(function () {
            print.drawImage(sPannel, 0, 0, 405, 515);
            print.font = "18pt Arial Black";
            print.fillStyle = "green";
            print.fillText(playerMoney, 135, 360);
            print.fillText(jackpot, 165, 106);
            print.font = "15pt Comic Sans MS";
            print.fillStyle = "black";
            print.fillText(playerBet, 318, 228)
            print.fillText(winnings, 208, 467);
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
            print.fillText("%", 142, 419);
            print.fillText(turn, 330, 68);
            print.fillText(winNumber, 185, 420);
            print.fillText(lossNumber, 265, 420);
            loadImages(sources, function (images) {
                print.drawImage(images.timer2, 70, 173, 62, 75);
                print.drawImage(images.timer2, 146, 173, 62, 75);
                print.drawImage(images.timer2, 222, 173, 62, 75);
            });
        }, 1000);

        setTimeout(function () {
            print.drawImage(sPannel, 0, 0, 405, 515);
            print.font = "18pt Arial Black";
            print.fillStyle = "green";
            print.fillText(playerMoney, 135, 360);
            print.fillText(jackpot, 165, 106);
            print.font = "15pt Comic Sans MS";
            print.fillStyle = "black";
            print.fillText(playerBet, 318, 228)
            print.fillText(winnings, 208, 467);
            print.fillText((winRatio * 100).toFixed(2), 88, 419);
            print.fillText("%", 142, 419);
            print.fillText(turn, 330, 68);
            print.fillText(winNumber, 185, 420);
            print.fillText(lossNumber, 265, 420);
            loadImages(sources, function (images) {
                print.drawImage(images.timer1, 70, 173, 62, 75);
                print.drawImage(images.timer1, 146, 173, 62, 75);
                print.drawImage(images.timer1, 222, 173, 62, 75);
            });
        }, 1200);
    }

    // Event handler for when the player clicks the reset button the game resets player stats 
    $("#resetBtn").click(function () {
       
        resetAll();
        retainReel()
        showPlayerStats();
    });
    
    // Event handler for when the player clicks the quit button the game asks for confirmation and then closes
    $("#quitBtn").click(function () {
        
        if (confirm("Are you sure you want to leave the casino?")) {
            
            setTimeout(function () {
                window.close();
            }, 1200);
        }
    });

    // Event handler for when the player clicks the increase bet button the game current bet is increased by 10
    $("#incBetBtn").click(function () {
        if (playerBet < playerMoney) { playerBet += 10;}
        showPlayerStats();
        retainReel()
        
    });

    // Event handler for when the player clicks the decreased bet button the game current bet is decreased by 10
    $("#decBetBtn").click(function () {
        if (playerBet > 0) { playerBet -= 10; }
        showPlayerStats();
        retainReel()
      
    });

    // Event handler for when the player clicks the spin button the game kicks off 
    $("#spinBtn").click(function () {
        
        if (playerBet == 0) {
            
            alert("You must first place a bet in order to spin.");
        }
        else {
        reelSpin()
        //document.getElementById('#spinBtn').invisible = true;
        setTimeout(function () {
            if (playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    resetAll();
                    showPlayerStats();
                }
            }
            
            else if (playerBet <= playerMoney) {
                spinResult = Reels();
                // Pushes each reel result to assing images for display
                reelImgs(spinResult[0], reel1);
                reelImgs(spinResult[1], reel2);
                reelImgs(spinResult[2], reel3);
                ditems = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
              
                determineWinnings();
                turn++;
                showPlayerStats();
            }
            
        }, 1400);
        }
    });
}










