// Ensure the script is loaded
console.log("Script is loaded!");

// Define the button and the paragraph element
const button = document.getElementById('getJokeBtn');
const quoteParagraph = document.getElementById('quote');

// Define the API endpoint for random kid-friendly jokes
const apiEndpoint = 'https://official-joke-api.appspot.com/random_joke'; // API for kid-friendly jokes

// Event listener to check if the button is clicked
button.addEventListener('click', getJoke);

// The getJoke function to make the API call
function getJoke() {
    console.log("Button clicked!"); // Log when the button is clicked
    
    // Fetch data from the API endpoint
    fetch(apiEndpoint)
        .then(response => {
            console.log("API Response:", response); // Log the response object
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Joke fetched successfully:", data.setup + " " + data.punchline); // Log the fetched joke
            displayRes(data.setup + " " + data.punchline); // Call displayRes to show the joke in the paragraph
        })
        .catch(error => {
            console.error('Error fetching joke:', error); // Log the error if the fetch fails
            alert('Failed to fetch joke: ' + error.message); // Show an alert with the error message
        });
}

// Function to display the fetched joke in the paragraph
function displayRes(joke) {
    quoteParagraph.textContent = joke; // Update the paragraph with the joke
}

// Optional: Display a default message on page load
window.onload = () => {
    quoteParagraph.textContent = 'Click the button to get a random joke!';
};
