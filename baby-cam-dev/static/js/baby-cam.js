var soundImage;
var motionImage;

window.onload = function () {
    soundImage = document.getElementById('sound-icon');
    motionImage = document.getElementById('motion-icon');
}


// Define the image sources to cycle through
var soundIcons = ["../static/no-crying-baby.png", "../static/crying-baby.png"];
var motionIcons = ["../static/no-crawling-baby.png", "../static/crawling-baby.png"];

// Set a counter variable to keep track of which image to show
var soundImageCounter = 0;

// Use setInterval to change the image every 2 seconds
setInterval(function () {
    // Check if the image element exists
    if (soundImage) {
        // Set the src attribute to the next image in the array
        soundImage.src = soundIcons[soundImageCounter];
        // Increment the counter
        soundImageCounter++;
        // If the counter is greater than or equal to the length of the array, reset it to 0
        if (soundImageCounter >= soundIcons.length) {
            soundImageCounter = 0;
        }
    }
}, 500);


// Set a counter variable to keep track of which image to show
var motionImageCounter = 0;

// Use setInterval to change the image every 2 seconds
setInterval(function () {
    // Check if the image element exists
    if (motionImage) {
        // Set the src attribute to the next image in the array
        motionImage.src = motionIcons[motionImageCounter];
        // Increment the counter
        motionImageCounter++;
        // If the counter is greater than or equal to the length of the array, reset it to 0
        if (motionImageCounter >= motionIcons.length) {
            motionImageCounter = 0;
        }
    }
}, 500);