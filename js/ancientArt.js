// const accessKey = "OeSXP4yLsGfgfVJkezIz0VcZ0KoyopfUvvhUqUEQvSs";
const accessKey = "M6_93WS_6J6tMrzF6Ga4L-i9IJEIpSEBHfgf5E1RyB0";
const galleryElement = document.getElementById("gallery");
let likedImages = JSON.parse(localStorage.getItem("likedImages")) || [];

// Function to fetch images of specific size from Unsplash API
async function fetchSpecificSizeImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30&query=ancient art&width=250&height=150`
    );
    const data = await response.json();

    data.forEach((photo) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      const img = document.createElement("img");
      img.src = photo.urls.regular;
      img.alt = photo.alt_description;

      const heartIcon = document.createElement("div");
      heartIcon.classList.add("heart-icon");
      heartIcon.innerHTML = "❤️";

      let clickCount = 0;

      // Handle double-click to like an image
      imageContainer.addEventListener("click", () => {
        clickCount++;
        if (clickCount === 2) {
          toggleLike(photo, heartIcon);
          clickCount = 1; // Reset click count
        }
      });

      imageContainer.appendChild(img);
      imageContainer.appendChild(heartIcon);
      galleryElement.appendChild(imageContainer);
    });
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Toggle like status for an image
function toggleLike(image, heartIcon) {
  const index = likedImages.findIndex(
    (likedImage) => likedImage.id === image.id
  );

  if (index === -1) {
    likedImages.push(image);
    showAndHideHeartIcon(heartIcon);
  } else {
    likedImages.splice(index, 1);
    // No need to hide the heart icon on unlike
  }

  localStorage.setItem("likedImages", JSON.stringify(likedImages));
}

// Show and hide the heart icon with animation
function showAndHideHeartIcon(heartIcon) {
  heartIcon.style.display = "block"; // Show heart icon

  // Set a timeout to hide the heart icon after 2 seconds
  setTimeout(() => {
    heartIcon.style.display = "none";
  }, 2000);
}

// Fetch specific size images when the page loads
fetchSpecificSizeImages();
