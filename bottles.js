img=" ";
status=" ";
objects=[];
function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocoSSD',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}
function modelLoaded() {
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(img1,gotResult);
}
function gotResult(error,results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function preload() {
    img2=loadImage('bottles.jpg');
}
function draw() {
    image(img2,0,0,640,420);
    if(status!= "") {
        objectDetector.detect(img2,gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: object detected";
            document.getElementById("objects").innerHTML="How many objects are there in the image out of which how many are detected: "+objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}