prediction_1 = ""
prediction_2 = ""
//This variables will be used to store the result gets from the modal and the this variables
//will be passed to the system to speak out the results


//CODE for setting the webcam properties, and triggering the webcam.
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera"); //HTML element in which we want to show the live view of the
//webcam and store it inside a variable

Webcam.attach('#camera');//pass the variable camera (which has the HTML div) inside
//Webcam.attach().

      //predefined function of webcam.js used to take images
//from a webcam, this function contains data_uri that can be used to show
//preview of the image which generates after taking a snapshot.

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TpSsLJ_Se/model.json',modelLoaded);
//imageClassifier is a predefined function of ml5.js that is used to
//trigger the ml5.js image classification function
  //At the end of the link add model.json(JavaScript Object Notation)

function modelLoaded() {
    console.log('Model Loaded!');
  }
  

  //This function will help to do text to speech of the results and speak out the results got
//from the model
//SpeechSynthesisUtterance - is the function of an API that will convert text to speech.
//● We are using a new keyword because, for every next result, we want to
//convert that text to speech

function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is " + prediction_1;
  speak_data_2 = "And the second prediction is " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis); //speak() predefined function of API
}



//***************Next in class ******************** *
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "happy")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if(results[0].label == "sad")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if(results[0].label ==  "angry")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128548;";
    }

    if(results[1].label == "happy")
    {
	    document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(results[1].label == "sad")
    {
	    document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    if(results[1].label == "angry")
    {
	    document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
  }
}

