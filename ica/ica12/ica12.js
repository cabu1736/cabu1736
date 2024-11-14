
console.log("Script is loaded!");


const button = document.getElementById('getJokeBtn');
const quoteParagraph = document.getElementById('quote');


const apiEndpoint = 'https://official-joke-api.appspot.com/random_joke'; 

button.addEventListener('click', getJoke);


function getJoke() {
    console.log("Button clicked!");
    
    
    fetch(apiEndpoint)
        .then(response => {
            console.log("API Response:", response); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Joke fetched successfully:", data.setup + " " + data.punchline); 
            displayRes(data.setup + " " + data.punchline); 
        })
        .catch(error => {
            console.error('Error fetching joke:', error); 
            alert('Failed to fetch joke: ' + error.message); 
        });
}


function displayRes(joke) {
    quoteParagraph.textContent = joke; 
}

window.onload = () => {
    quoteParagraph.textContent = 'Click the button to get a random joke!';
};
