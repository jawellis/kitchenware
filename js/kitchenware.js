// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('./trainedModel/model.json', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');

//   let img = document.getElementById('image')
//   console.log(img)

//   // Make a prediction with a selected image
//   classifier.classify(img, (err, results) => {
//     console.log(results);
//   });
}

const fileInput = document.getElementById('file');
const img = document.getElementById('image');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    img.src = reader.result;
    classifier.classify(img, (err, results) => {
      console.log(results);
    });
  };
});