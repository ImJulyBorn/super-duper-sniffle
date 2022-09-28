status1 = "";
objects = [];
function preload(){}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting";
    object_name = document.getElementById("input1").value;
}
function modelLoaded(){
    console.log("model loaded");
    status1 = true;
}
function draw(){
    image(video, 0, 0, 400, 400);
    if(status1 != ""){
        for(i=0; i<objects.length; i++){
            percent = floor(objects[i].confidence * 100);
            label = objects[i].label;
            Xposition = objects[i].x;
            Yposition = objects[i].y;
            rect(Xposition, Yposition, objects[i].width, objects[i].y);
        }
        if(objects[i].label == object_name){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = "object found";
            synth = window.speechSynthesis;
            utterThis = SpeechSynthesisUtterance(object_name);
            synth.speak(utterThis);
        }
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}