// Step 1: Declare an array of image filenames
const imageFilenames = [
    'pic1.jpg',
    'pic2.jpg',
    'pic3.jpg',
    'pic4.jpg',
    'pic5.jpg'
];

// Step 2: Declare an object listing the alt texts for each image
const imageAltTexts = {
    'pic1.jpg': 'Closeup of a blue human eye',
    'pic2.jpg': 'A person holding a smartphone',
    'pic3.jpg': 'A beautiful sunset over the ocean',
    'pic4.jpg': 'A forest path during autumn',
    'pic5.jpg': 'Snow-covered mountains in the winter'
};

// Step 3: Get references to elements in the HTML
const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.displayed-img');
const button = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Step 4: Loop through the image filenames array to add thumbnail images
imageFilenames.forEach((filename) => {
    const newImg = document.createElement('img');
    
    // Set src and alt attributes for each new thumbnail image
    newImg.src = `images/${filename}`;
    newImg.alt = imageAltTexts[filename];
    
    // Append the new thumbnail image to the thumb-bar
    thumbBar.appendChild(newImg);
    
    // Step 5: Add click event listener to each thumbnail
    newImg.addEventListener('click', function () {
        displayedImg.src = this.src;  // Change the large image to match the clicked thumbnail
        displayedImg.alt = this.alt;  // Update the alt text of the large image
    });
});

// Step 6: Add click event listener to the button to toggle the darken/lighten effect
button.addEventListener('click', function () {
    if (button.classList.contains('dark')) {
        // If the button is dark, apply the darken effect
        button.textContent = 'Lighten';
        button.classList.remove('dark');
        button.classList.add('light');
        overlay.
