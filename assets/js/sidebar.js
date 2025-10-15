// Sidebar Carousel Functionality
// This script handles the carousel functionality for the sidebar promotional cards

document.addEventListener("DOMContentLoaded", function () {
  // Initialize carousel if elements exist
  const carouselDots = document.querySelectorAll(".carousel-dots .dot");
  const carouselSlides = document.querySelectorAll(".sidebar-promo-card");
  const carouselContainer = document.querySelector(".carousel-slides");

  // Only initialize if carousel elements are present
  if (carouselDots.length > 0 && carouselSlides.length > 0) {
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
      carouselSlides.forEach((slide) => slide.classList.remove("active"));
      carouselDots.forEach((dot) => dot.classList.remove("active"));
      carouselSlides[index].classList.add("active");
      carouselDots[index].classList.add("active");
      if (carouselContainer) {
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
      }
      currentSlide = index;
    }

    // Add click event listeners to dots
    carouselDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        // Reset auto-play timer when user manually changes slide
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % carouselSlides.length;
          showSlide(currentSlide);
        }, 5000);
      });
    });

    // Start auto-play
    carouselInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      showSlide(currentSlide);
    }, 5000);

    // Pause auto-play when user hovers over carousel
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    if (carouselWrapper) {
      carouselWrapper.addEventListener("mouseenter", () => {
        clearInterval(carouselInterval);
      });

      carouselWrapper.addEventListener("mouseleave", () => {
        carouselInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % carouselSlides.length;
          showSlide(currentSlide);
        }, 5000);
      });
    }
  }
});
