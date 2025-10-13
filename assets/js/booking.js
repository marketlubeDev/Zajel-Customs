const editBtn = document.querySelector(".booking-edit-btn");
const backBtnLeft = document.querySelector(".back-btn-left");
const navBtn = document.querySelector(".nav-btn");
const newBookingNextBtn = document.querySelector(".booking-next-btn");

const bookingTable = document.querySelector(".booking-table");
const bookingDetails = document.querySelector(".booking-details");

// Mobile menu elements
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const handleBackBtnLeft = () => {};

const handleNewBookingNextBtn = (e) => {};

const handleStartNewBooking = (e) => {};

const handleEditBooking = () => {
  if (bookingTable && bookingDetails) {
    bookingTable.classList.add("remove");
    bookingDetails.classList.remove("remove");
  }

  if (backBtnLeft) backBtnLeft.classList.remove("remove");
  if (navBtn) navBtn.classList.add("remove");
};

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    sidebarOverlay.classList.toggle("active");
  });
}

// Close sidebar when clicking on overlay
if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
  });
}

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 1024) {
    if (
      sidebar &&
      menuToggle &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  }
});

// Booking card expand/collapse
document.querySelectorAll(".booking-card-mobile").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Don't expand if clicking on action buttons or links
    if (
      e.target.closest(".icon-btn") ||
      e.target.closest(".view-details-link")
    ) {
      return;
    }

    // Toggle expanded state
    card.classList.toggle("expanded");
  });
});

if (editBtn) editBtn.addEventListener("click", handleEditBooking);
if (backBtnLeft) backBtnLeft.addEventListener("click", handleBackBtnLeft);
