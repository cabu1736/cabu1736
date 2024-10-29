document.getElementById("colorButton").addEventListener("click", function() {
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
});

document.getElementById("textChange").addEventListener("mouseover", function() {
    this.textContent = "Text changed! Hover away to reset.";
});

document.getElementById("textChange").addEventListener("mouseout", function() {
    this.textContent = "Hover over me to change my text!";
});