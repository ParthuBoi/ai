song = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scorelw = 0;
scorerw = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
	canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modeloaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video,0,0,500,500);
    fill("red");
    stroke("red");

	if(scorelw > 0.2){

		circle(leftWristX,leftWristY,20);
        y = Number(leftWristY);
        remove_decimal = floor(y);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if(scorerw > 0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }   

}

function play(){
    song.setVolume(1);
    song.rate(1);
    song.play();
}

function modeloaded(){
    console.log("Model is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

		scorelw = results[0].pose.keypoints[9].score;
        scorerw = results[0].pose.keypoints[10].score;
        console.log("scorelw = " + scorelw);
        console.log("scorerw = " + scorerw);

}

}
