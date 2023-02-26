const video = document.getElementById("webcam");
const featureExtractor = ml5.featureExtractor('MobileNet', {numLabels: 3}, modelLoaded)
const label = document.getElementById("label");
let classifier 
let isModelReady = false;

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const saveBtn = document.querySelector("#save");

// on clicks for buttons
labelOneBtn.addEventListener("click", () => addSpoon());
labelTwoBtn.addEventListener("click", () => addFork());
labelThreeBtn.addEventListener("click", () => addKnife());

// onclick for train button
trainbtn.addEventListener("click", () => train());

// onclick for save button
// saveBtn.addEventListener("click", () => saveModel());

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

// load model
function modelLoaded(){
    console.log("The mobileNet model is loaded!")
    classifier = featureExtractor.classification(video, videoReady)
    isModelReady = true;
}


// functions for adding image
function addSpoon(){
    classifier.addImage(video, "It's a spoon", addedImage)
}

function addFork() {
    classifier.addImage(video, "It's a fork", addedImage)
}


function addKnife() {
    classifier.addImage(video, "It's a knife", addedImage)
}

function addedImage(){
    console.log("added image to network")
}


function videoReady(){
    console.log(classifier)
}

function saveModel() {
    featureExtractor.save("model")
}

// Train model
function train(){
    console.log("start training...")
    classifier.train((lossValue) => {
        console.log(lossValue)
        if(lossValue == null){
            startClassifying()
        }
        saveModel();
    })
}

// classify
function startClassifying(){
    setInterval(()=>{
        classifier.classify(video, (err, result)=>{
            if(err) console.log(err)
            console.log(result)
            label.innerHTML = result[0].label
        })
    }, 1000)
}


label.innerText = "Ready when you are!";
