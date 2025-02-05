    function controller(event){

        if(event.key == "Enter") {
            if(runWorker == 0){
            run();
            runSound.play();
            scoreUpdate();
            backgroundMove();
            flameMarginLeft.forEach(createFlame);
            }
        }

        if(event.key == " "){
            if(JumpWarker == 0){
                if(runWorker != 0){
                    clearInterval(runWorker);
               runSound.pause();
               jump();
               jumpSound.play();
               }

            }

        }
    }

    var runImage = 1;
    var runWorker = 0;
    runSound = new Audio("run.mp3");
    runSound.loop = true;
    function run(){

      runWorker = setInterval( ()=>{
          runImage = runImage + 1;

        if(runImage == 9){
          runImage = 1;
        }

        document.getElementById("boy").src = "run" + runImage + ".png";
       },120);

    }

    var jumpImage = 1;
    var JumpWarker = 0;
    var JumpMarginTop = 275
    var jumpSound = new Audio("jump.mp3");

    function jump(){

        JumpWarker = setInterval( ()=>{

            jumpImage = jumpImage + 1;

            if(jumpImage < 8){
                JumpMarginTop = JumpMarginTop - 10;
                document.getElementById("boy").style.marginTop = JumpMarginTop +"px";
            }
            if(jumpImage > 7){
                JumpMarginTop = JumpMarginTop + 10;
                document.getElementById("boy").style.marginTop = JumpMarginTop +"px";
            }

    if(jumpImage == 13){
        jumpImage = 1;
        clearInterval(JumpWarker);
        run();
        runSound.play();
        JumpWarker = 0;
        }
        
    document.getElementById("boy").src = "jump" + jumpImage + ".png";
        },150);

    }

    var score = 0;
    var scoreWorker = 0;

    function scoreUpdate(){

        scoreWorker = setInterval(()=>{
        score = score + 10;

            if(score == 5000){
                alert("You Won!!! Press OK to Restart");
                window.location.reload();
            }

      document.getElementById("score").innerHTML = score;
        },120);
    }
    var backgroundX = 0;
    var backgroundWorker = 0;
    function backgroundMove(){

            backgroundWorker = setInterval( ()=>{                
            backgroundX = backgroundX - 10;
            document.getElementById("background").style.backgroundPositionX = backgroundX + "px";
        
        },100);
    }

    var deadImage = 1;
    var deadWorker = 0;
    var deadSound = new Audio("dead.mp3")

    function dead(){

        deadWorker = setInterval(()=>{

            deadImage = deadImage + 1;

            if(deadImage == 11){
                deadImage = 1;
                clearInterval(deadWorker);
                alert("Game Over!!!");
                window.location.reload();
            }
            document.getElementById("boy").src = "dead"+ deadImage + ".png";

        },150);
    }

    var flameMarginLeft = [500,1000,1500,2000,2500,2700,3000,3200,3500,4000,4500,4700,4900,5100,5300,5400];
    var flameWorker = 0;

    function createFlame(x){
        var f = document.createElement("img");      // f = <img/>
        f.src = "flame.gif";                        // f = <img src="flame.gif"/>
        f.className = "flame";                      // f = <img src="flame.gif" class="flame"/>
        f.style.marginLeft = x + "px";
        document.getElementById("background").appendChild(f);

        flameWorker = setInterval(()=>{

            if(flameWorker != 0){
                x = x - 10;
            f.style.marginLeft = x + "px";
            }

            
            if(x == 140){
                if(JumpWarker == 0){
                    clearInterval(runWorker);
                    clearInterval(scoreWorker);
                    clearInterval(backgroundWorker);
                    clearInterval(flameWorker);
                    flameWorker = 0;

                    runSound.pause();
                    dead();
                    deadSound.play();
                }

            }


        },100);
}