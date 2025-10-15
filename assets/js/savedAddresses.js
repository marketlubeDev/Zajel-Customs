// Saved Addresses Page JavaScript
// This script handles the functionality for the saved addresses page

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
      if (window.innerWidth <= 1024) {
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

  // Modal functionality
  const addAddressBtn = document.querySelector(".add-address-btn");
  const addAddressModal = document.getElementById("addAddressModal");
  const closeModalBtn = document.getElementById("closeModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const modalContainer = document.querySelector(".modal-container");

  if (addAddressBtn && addAddressModal) {
    // Open modal
    addAddressBtn.addEventListener("click", () => {
      addAddressModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close modal
    const closeModal = () => {
      addAddressModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside
    addAddressModal.addEventListener("click", (e) => {
      if (e.target === addAddressModal) {
        closeModal();
      }
    });

    // Prevent closing when clicking inside modal
    if (modalContainer) {
      modalContainer.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }
});
