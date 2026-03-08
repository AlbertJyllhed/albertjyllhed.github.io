const gordonElement = document.querySelector(".gordon");
const steveElement = document.querySelector(".steve");
const overlayElements = document.querySelectorAll(".overlay");
const videoElement = document.querySelector("video");
const audioElement = document.querySelector("audio");

const keyCombination = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
    "Enter",
];

gordonElement.addEventListener("click", () => {
    overlayElements[0].style.display = "block";
    videoElement.play();
});

videoElement.addEventListener("ended", () => {
    overlayElements[0].style.display = "none";
});

const makeKeySequenceListener = (keySequence, callback) => {
    let index = 0;

    return (e) => {
        // Keystroke matches the target one for our current position
        if (e.key === keySequence[index]) {
            // Success! Invoke the callback.
            if (index === keySequence.length - 1) {
                callback();
            }
            // Move up, wrapping as needed
            index = (index + 1) % keySequence.length;
        } else {
            // Key didn't match; start over
            index = 0;
        }
    };
};

document.addEventListener(
    "keydown",
    makeKeySequenceListener(keyCombination, triggerEasterEgg),
);

function triggerEasterEgg() {
    console.log("easter egg triggered");
    overlayElements[1].style.display = "block";
    audioElement.play();
}

steveElement.addEventListener("animationend", () => {
    overlayElements[1].style.display = "none";
});
