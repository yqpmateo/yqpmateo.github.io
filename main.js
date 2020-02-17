

$(document).ready( function () {
$("h1").mouseover()
var arrGamePattern = [];
var arrUserClickedPattern = [];
var arrButtonColours = ["red","blue","green","yellow"];
var randomChosenColour = "";
var gameStarted = false;
var gameLevel = -1;
var gameOver = false;
        
$(".btn").click( function () {
        var userChosenColour =  this.id;
        playSound(userChosenColour);
        animatePress(userChosenColour);
        if (gameStarted == true) {
                arrUserClickedPattern.push(userChosenColour);
                checkAnswer(gameLevel);
        }
}
);

    function checkAnswer (currentLevel) { 
                var i = arrUserClickedPattern.length;
                for(var x=0; x <  i; x++) {
                        
                        if (arrUserClickedPattern[x] != arrGamePattern[x]) {
                               gameOver = true;
                        }
                        
                } 
                
                if (gameOver == false) {               
                        if ( (i-1)  == currentLevel) {

                                arrUserClickedPattern = [];
                                setTimeout (function () {
                                        var ns = nextSequence ();
                                        gamePattern(ns); 
                                },1000
                                );
                             
                        }   

                }
                else {
                        $("body").addClass("game-over");
                        setTimeout (function () {
                                   $("body").removeClass("game-over");
                        },500
                        );
                        $("#level-title").text ("Game Over, Press Any Key to Restart");
                } 
               

    }
    
    function animatePress(currentColor) {
            $("#"+currentColor).addClass("pressed");
            setTimeout (function () {
                    $("#"+currentColor).removeClass("pressed");
            },100
            );
    }
    function nextSequence() {
        gameLevel++;
        $("#level-title").text ("Level "+gameLevel);
        return Math.floor(Math.random() * 4);
    };
    
    function playSound(color) {
        var audioPlayFile = "sounds/"
        switch (color) 
        {
            case "red":
                    audioPlayFile += "red.mp3";
            break;

            case "blue":
                    audioPlayFile += "blue.mp3";
            break;

            case "green":
                    audioPlayFile += "green.mp3";
            break;

            case "yellow":
                    audioPlayFile += "yellow.mp3";
            break;
        }
        var audio = new Audio(audioPlayFile);
        audio.play();
    }

    function gamePattern (rn) {
        switch (rn) 
            {
                    case 0: 
                            randomChosenColour = "red";
                    break;
                    case 1:
                            randomChosenColour = "blue"; 
                            
                    break;
                    case 2:
                            randomChosenColour = "green";
                            
                    break;
                    case 3:
                            randomChosenColour = "yellow";
                            
                    break;
            }             
        arrGamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }
    $(document).on("keypress", function() {
        if (gameStarted == false) 
            {
                gameStarted = true;
                var randomNumber = nextSequence();
                gamePattern(randomNumber);                 
            } 
        else if (gameOver == true ) {
                arrGamePattern = [];
                arrUserClickedPattern = [];     
                gameOver = false;
                gameLevel = -1;
                gameStarted = true;
                var randomNumber = nextSequence();
                gamePattern(randomNumber);                 
            } 

        }    

    ); 

}
)
