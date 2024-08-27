const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorGuess");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton");
const easyButton = document.getElementById("easyButton");
const hardButton = document.getElementById("hardButton");

const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    })
}

const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`;
}

const generateRandomColors = (num) => {
    let output = [];
    for (let i = 0; i < num; i++){
        output.push(generateRandomColor())
    }
    return output
}

let numSquares = 6;
let colors = generateRandomColors(numSquares);

//randomized winning color
let pickedColor = pickColor();

//update the rbg title
colorDisplay.textContent = pickedColor;

//squares set up
for (let i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];

    //event listeners for square click
    squares[i].addEventListener("click", function(){
        //get color of the clicked square
        const clickedColor = this.style.backgroundColor;
        //compare clicked color to pickedColor
        if (clickedColor === pickedColor){
            message.textContent = "Correct!";
            changeColors(pickedColor);
            title.style.backgroundColor = pickedColor;
            resetButton.textContent = "Play Again?";
        }

        else {
            this.style.backgroundColor = "#0D1B2A";
            message.textContent = "Try Again!";

        }
    })
}

//reset colors button
resetButton.addEventListener("click", function() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    title.style.backgroundColor = "#778DA9";
    message.textContent = "";
    this.textContent = "New Colors"
    for (let i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
})

//easy button
easyButton.addEventListener("click", function() {
    this.classList.add("selected");
    hardButton.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++){
        if (colors[i]){
            squares[i].style.backgroundColor = colors[i]
        }
        else {
            squares[i].style.backgroundColor = "#0D1B2A";
        }
    }
})

//hard button
hardButton.addEventListener("click", function() {
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
})