// Select all image containers
const images = document.querySelectorAll(".image-container");
let activeImage = null;

// Move the image with the mouse (Increased movement range)
function moveImage(event, img) {
  const { clientX: x, clientY: y } = event;

  // Increased movement range by multiplying offset values
  gsap.to(img, {
    x: (x - window.innerWidth / 2) * 0.2, // Increased from 0.1 to 0.2 (More movement)
    y: (y - window.innerHeight / 2) * 0.2,
    duration: 0.4, // Smooth transition
    ease: "power3.out"
  });
}

// Hover Effects
images.forEach((img) => {
  img.addEventListener("mouseenter", (e) => {
    // Ensure only one active image at a time
    if (activeImage) return;

    // Set current image as active
    activeImage = img;
    img.classList.add("active");

    // Fade out other images and hide main text
    images.forEach((otherImg) => {
      if (otherImg !== img) gsap.to(otherImg, { opacity: 0.1, duration: 0.6 });
    });

    // Hide the main hero text
    gsap.to(".hero-text", { opacity: 0, duration: 0.6 });

    // Allow the image to follow the cursor
    window.addEventListener("mousemove", (event) => moveImage(event, img));
  });

  img.addEventListener("mouseleave", () => {
    // Reset active image
    activeImage = null;
    img.classList.remove("active");

    // Restore image opacity and main text visibility
    images.forEach((otherImg) => gsap.to(otherImg, { opacity: 1, duration: 0.6 }));
    gsap.to(".hero-text", { opacity: 1, duration: 0.6 });

    // Stop image tracking
    window.removeEventListener("mousemove", (event) => moveImage(event, img));

    // Reset image position after mouse leaves
    gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  });
});
