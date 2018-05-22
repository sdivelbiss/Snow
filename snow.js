window.onload = function(){
    let canvas = document.getElementById('sky');
    let ctx = canvas.getContext("2d");

    //set canvas dims to window
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //Generate snowflakes 
    var mf = 500; //max flakes
    var flakes = [];

    for (let i = 0; i < mf; i++) {
       flakes.push({
           x: Math.random()*W,
           y: Math.random()*H,
           r: Math.random()*5+2, //min of 2px and max of 7px
           d: Math.random() + 1 //density of flake
       });
    }

    //draw flakes
    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(let i = 0; i < mf; i++){
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    //animate flakes
    let angle = 0;
    function moveFlakes(){
        angle += 0.01;
        for (let i = 0; i < mf; i++) {
            let f = flakes[i];

            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            if(f.y > H){
                flakes[i] = {
                    x: Math.random() * W,
                    y: 0, 
                    r: f.r, 
                    d: f.d
                    }
            }
            
        }
    }

    setInterval(drawFlakes, 25)
}