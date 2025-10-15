// Tracking Page JavaScript
// This script handles the functionality for the tracking page

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      sidebarOverlay.classList.toggle("active");
    });

    // Close sidebar when clicking on overlay
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove("active");
          sidebarOverlay.classList.remove("active");
        }
      }
    });

    // Close sidebar and remove overlay when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
      }
    });
  }

  // Clear input button functionality
  const awbInput = document.getElementById("awb-input");
  const clearButton = document.querySelector(".tracking-input-clear");

  if (clearButton && awbInput) {
    clearButton.addEventListener("click", () => {
      awbInput.value = "";
      awbInput.focus();
    });
  }

  // Track shipment button - navigate to tracking details
  const trackBtn = document.querySelector(".tracking-btn");
  if (trackBtn) {
    trackBtn.addEventListener("click", () => {
      const awb = awbInput ? awbInput.value.trim() : "";
      const url = awb
        ? `trackingDetails.html?awb=${encodeURIComponent(awb)}`
        : "trackingDetails.html";
      window.location.href = url;
    });
  }
});
