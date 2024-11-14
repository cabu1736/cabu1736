// Declare an array of image filenames
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Declare an object for alt texts
const altTexts = {
  pic1: "camping",
  pic2: "A sunset over the ocean",
  pic3: "A mountain range in the distance",
  pic4: "A forest during autumn",
  pic5: "A closeup of a flower in bloom"
};

// Select the thumb-bar and displayed-img elements
const thumbBar = document.querySelector('.thumb-bar');
const displayedImage = document.querySelector('.displayed-img');

// Loop through the image filenames and add them to the thumb-bar
imageFilenames.forEach((filename, index) => {
  const newImage = document.createElement('img');
  newImage.src = `images/${filename}`; // Path to images
  newImage.alt = altTexts[`pic${index + 1}`]; // Alt text for image
  thumbBar.appendChild(newImage);

  // Add click event listener to each thumbnail image
  newImage.addEventListener('click', () => {
    // Update the displayed image's src and alt when a thumbnail is clicked
    displayedImage.src = newImage.src;
    displayedImage.alt = newImage.alt;
  });
});

// Select the darken/lighten button and overlay div
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Add click event listener to the button
btn.addEventListener('click', () => {
  if (btn.getAttribute('class') === 'dark') {
    // Change to 'light' mode
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)'; // Darken overlay
  } else {
    // Change to 'dark' mode
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)'; // Remove overlay effect
  }
});