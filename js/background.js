// const images = [
//     "0.jpg",
//     "1.jpg",
//     "2.jpg",
// ]
// const chosenImage = images[Math.floor(Math.random() * images.length)];

// const bgImage = document.createElement("img");
// bgImage.className = "background";
// bgImage.src = `img/${chosenImage}`;
// document.body.appendChild(bgImage);
// bgImage.classList.add('background');

const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.className = "background";
bgImage.src = `img/${chosenImage}`;
bgImage.classList.add('background');
document.querySelector(".background-container").appendChild(bgImage);