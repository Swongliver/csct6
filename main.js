Song1="";
Song2="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";
leftWristScore="";
RightWristscore="";
Song1_status="";
Song2_status="";
function preload(){
Song1=loadSound("Never Have I Ever.mp3");
Song2=loadSound("Phenomena.mp3");
}
function setup(){  
    video=createCapture(VIDEO)
canvas = createCanvas(500,400);
canvas.position(390,200);

poseNet=ml5.poseNet(video, modelLoaded)
poseNet.on("pose", gotPoses)

video.hide();

}
function modelLoaded(){
    console.log("Model Loaded")
}
function draw(){
    image(video,0,0,500,400)
    fill("#FF0000")
    stroke("#FF0000")
    Song1_status=Song1.isPlaying()
    Song2_status=Song2.isPlaying()
    if (RightWristscore>0.2) {
        circle(rightwristx,rightwristy,20)
        Song1.stop()        
        
        if (Song2_status==false) {
            Song2.play()
            document.getElementById("song").innerHTML="Song=Phenomena"
        }
    }
    if (leftWristScore>0.2) {
        circle(leftwristx,leftwristy,20)
        Song2.stop()
       
        if (Song1_status==false) {
            Song1.play()
            document.getElementById("song").innerHTML="Song=Never Have I Ever"            
        }
    }}
   
   
    
   

function gotPoses(results){
    if (results.length > 0) {
        console.log(results)
       leftwristx=results[0].pose.leftWrist.x
       leftwristy=results[0].pose.leftWrist.y
       rightwristx=results[0].pose.rightWrist.x
       rightwristy=results[0].pose.rightWrist.y
       
       leftWristScore=results[0].pose.keypoints[9].score
       RightWristscore=results[0].pose.keypoints[10].score
     } else {
        console.log("error")
    }
}

