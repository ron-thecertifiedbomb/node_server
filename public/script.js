
document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript file loaded!");
  const title = document.querySelector(".title");
  if (title) {
    title.style.color = "red";
  }
});


const changeColor = () => {
  const title = document.querySelector(".title");
  if (title) {
    // Check the current color and toggle
    if (title.style.color === "black") {
      title.style.color = "red";
    } else {
      title.style.color = "black";
    }
  }
};

// Attach function to button click
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#colorButton");
  if (button) {
    button.addEventListener("click", changeColor);
  }
});


// Attach function to button click
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#colorButton");
  if (button) {
    button.addEventListener("click", changeColor);
  }
});


