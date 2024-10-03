let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-button");
let newGameBtn = document.querySelector(".new-Game-Btn");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector(".msg");

let turnO = true;

// patterns used to win
const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide"); // adding class list hide to remove button and text
};

boxes.forEach((box) => {
  /// for each loop for accesing all the boxes
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; // disabling button if we can click once only

    checkWinner(); // calling check winner to check everytime it plays move
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
// winner
const showWinner = (winner) => {
  message.innerText = `Congratulations, Winner is ${winner}`; // showing winner
  msgContainer.classList.remove("hide"); // hiding the hide class from the container
  disableBoxes(); // for disabling the boxes
};

// draw

const draw = () => {
  message.innerText = `Match is Draw`; // Set the draw message text
  msgContainer.classList.remove("hide"); // Display the message container
  disableBoxes(); // Disable all boxes since the match is over
};

// disable boxes after the winner

const checkWinner = () => {
  let filledBoxes = 0; // Keep track of filled boxes

  // Check all patterns for a winner
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Check if the three positions are the same and not empty
    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // If pattern matches, show the winner
        return; // Exit the function if there's a winner
      }
    }
  }

  // Count how many boxes are filled
  boxes.forEach((box) => {
    if (box.innerText !== "") filledBoxes++;
  });

  // Check for a draw condition (all boxes are filled and no winner)
  if (filledBoxes === 9) {
    draw(); // Call draw function when all boxes are filled
  }
};

// reset game or new game
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
