// Get video element
const video = document.getElementById("video");

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error("Camera access denied!", error);
    });

// Dragging functionality for the idol overlay
const idolImage = document.getElementById("idolOverlay");
let offsetX, offsetY, isDragging = false;

idolImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - idolImage.offsetLeft;
    offsetY = e.clientY - idolImage.offsetTop;
    idolImage.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        idolImage.style.left = `${e.clientX - offsetX}px`;
        idolImage.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    idolImage.style.cursor = "grab";
});

// Start Countdown Timer Before Capture
function startTimer() {
    let countdown = document.getElementById("countdown");
    let timeLeft = 3; // 3-second countdown

    countdown.innerText = timeLeft;
    countdown.style.display = "block";

    let timerInterval = setInterval(() => {
        timeLeft--;
        countdown.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            countdown.style.display = "none";
            captureImage(); // Capture after countdown
        }
    }, 1000);
}

// Capture the image with overlay
function captureImage() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw the idol overlay at its current position
    const idolX = idolImage.offsetLeft - video.offsetLeft;
    const idolY = idolImage.offsetTop - video.offsetTop;
    ctx.drawImage(idolImage, idolX, idolY, idolImage.width, idolImage.height);

    // Convert canvas to image and show in modal
    const imageData = canvas.toDataURL("image/png");
    document.getElementById("capturedImage").src = imageData;
    document.getElementById("downloadBtn").href = imageData;
    openModal();
}

// Open modal function
function openModal() {
    document.getElementById("modal").style.display = "block";
}

// Close modal function
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
