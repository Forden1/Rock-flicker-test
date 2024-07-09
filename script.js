// Selecting elements from the DOM
const resultsDiv = document.querySelector("#results");
const btn1 = document.querySelector("#rock");
const btn2 = document.querySelector("#paper");
const btn3 = document.querySelector("#scissors");
const wholeDiv = document.querySelector("#whole");
const btns = document.querySelector("#btns");
const final = document.createElement('div');

// Dynamically create the image container div
const imageContainer = document.createElement('div');
imageContainer.classList.add('image-container');

// Create images and append to image container
const rockImg = createImage('rock.png', 'rock-img', 'Rock');
const paperImg = createImage('paper.png', 'paper-img', 'Paper');
const scissorsImg = createImage('scissors.png', 'scissors-img', 'Scissors');

imageContainer.appendChild(rockImg);
imageContainer.appendChild(paperImg);
imageContainer.appendChild(scissorsImg);

// Append image container to wholeDiv
wholeDiv.appendChild(final);
wholeDiv.appendChild(imageContainer);


// Function to create an image element
function createImage(src, id, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.id = id;
  img.alt = alt;
  img.style.opacity = 0; // Initially hide images
  return img;
}

// Event listener for buttons to get human choice and start game loop
btn1.addEventListener("click", () => {
     playRound("rock"); // Directly call playRound with human choice
   });
   
   btn2.addEventListener("click", () => {
     playRound("paper"); // Directly call playRound with human choice
   });
   
   btn3.addEventListener("click", () => {
     playRound("scissors"); // Directly call playRound with human choice
   });

// Main game logic function
async function playRound(humanSelection) {
     displayh(humanSelection)
  const computerSelectionPromise = getComputerChoice(); // Get computer's choice with flashing

  // Get computer's choice after flashing effect
  const computerSelection = await computerSelectionPromise;

  // Determine the result based on selections
  let resultMessage;
  if (humanSelection === computerSelection) {
    resultMessage = "Tie!!!";
  } else if (
    (humanSelection === "rock" && computerSelection === "scissors") ||
    (humanSelection === "paper" && computerSelection === "rock") ||
    (humanSelection === "scissors" && computerSelection === "paper")
  ) {
    resultMessage = `You Win! ${humanSelection} beats ${computerSelection}`;
    humanScore+=1
  } else {
    resultMessage = `You Lose! ${computerSelection} beats ${humanSelection}`;
    computerScore+=1
  }
  displayresults(humanSelection,computerSelection,resultMessage)
  // Update scores
  updateScores(resultMessage);

  // Display the results in the results div
  
}

const resdiv =document.createElement("div");
resdiv.classList.add("resdiv")
resultsDiv.appendChild(resdiv);


function displayresults(humanSelection,computerSelection,resultMessage){
     final.innerHTML = `
     <h2>${resultMessage}</h2>

     <p id="res">Score: Human : ${humanScore}   Computer : ${computerScore}</p>

`;resdiv.innerHTML=`<p id="res">Score: Human : ${humanScore}   Computer : ${computerScore}</p>`
 
     ;
     resultsDiv.appendChild(resdiv);
     resultsDiv.appendChild(btns);

}
resultsDiv.appendChild(resdiv);
resultsDiv.appendChild(btns)







// Function to update scores
let humanScore = 0;
let computerScore = 0;


const ODiv = document.querySelector("#results");;
ODiv.innerHTML = `
<div id="onediv">
  <div class="choice">
    <p>Human choice:</p>
    
   
  </div>
  <div class="choice1">
    <p>Computer choice:</p>
   
  </div>
</div>
`;
ODiv.appendChild(btns)
wholeDiv.appendChild(ODiv)
const choice1Div = document.querySelector('.choice1');
choice1Div.appendChild(imageContainer);
// Function to display results
const choice=document.querySelector(".choice")
const choiced = document.createElement('div');
choice.appendChild(choiced)
function displayh(humanSelection, computerSelection, resultMessage) {
  
   choiced.innerHTML=`<img src="${humanSelection}.png">`

}
     


// Function to get computer choice with flashing effect
function getComputerChoice() {
  return new Promise(resolve => {
    // Hide all images initially
    const images = [rockImg, paperImg, scissorsImg];
    images.forEach(img => img.style.opacity = 0);

    // Flash images in random order, one at a time
    const flashOrder = shuffleArray([0, 1, 2]);
    flashImages(images, flashOrder).then(chosenIndex => {
      const chosenImage = images[chosenIndex];
      chosenImage.style.opacity = 1; // Show the chosen image
      resolve(chosenImage.id.replace('-img', '')); // Resolve with the chosen image id (e.g., 'rock', 'paper', 'scissors')
    }).catch(err => console.error(err));
  });
}

// Function to flash images in random order, one at a time
async function flashImages(images, order) {
  let delay = 0;
  const increment = 200; // Speed up increment (milliseconds)

  for (let i = 0; i < order.length; i++) {
    await flashImage(images[order[i]], delay);
    delay += increment;
  }

  return order[order.length - 1]; // Return index of last flashed image
}

// Function to flash a single image
function flashImage(image, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      image.style.opacity = 1; // Show the image
      setTimeout(() => {
        image.style.opacity = 0; // Hide the image after flash
        resolve();
      }, 300); // Adjust flash duration (milliseconds)
    }, delay); // Adjust delay between flashes (milliseconds)
  });
}

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to start the game with a human choice
function startGame(humanChoice) {
  playRound(humanChoice);
}
