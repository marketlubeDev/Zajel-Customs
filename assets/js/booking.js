const editBtn = document.querySelector(".booking-edit-btn");
const backBtnLeft = document.querySelector(".back-btn-left");
const navBtn = document.querySelector(".nav-btn");
const newBookingNextBtn = document.querySelector(".booking-next-btn");

const bookingTable = document.querySelector(".booking-table");
const bookingDetails = document.querySelector(".booking-details");
const newBookingDetails = document.querySelector(".new-booking-details");
const newBookingBtns = document.querySelectorAll(".new-booking-btn");

// Mobile menu elements
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const handleBackBtnLeft = () => {
  // Hide both booking details and new booking details
  if (bookingDetails) bookingDetails.classList.add("remove");
  if (newBookingDetails) newBookingDetails.classList.add("remove");

  // Show booking table
  if (bookingTable) bookingTable.classList.remove("remove");

  // Hide back button and show nav button
  if (backBtnLeft) backBtnLeft.classList.add("remove");
  if (navBtn) navBtn.classList.remove("remove");
};

const handleNewBookingNextBtn = (e) => {};

const handleStartNewBooking = (e) => {};

const handleEditBooking = () => {
  if (bookingTable && bookingDetails) {
    bookingTable.classList.add("remove");
    bookingDetails.classList.remove("remove");
  }
  if (newBookingDetails) newBookingDetails.classList.add("remove");

  if (backBtnLeft) backBtnLeft.classList.remove("remove");
  if (navBtn) navBtn.classList.add("remove");
};

const handleNewBooking = () => {
  if (bookingTable) bookingTable.classList.add("remove");
  if (bookingDetails) bookingDetails.classList.add("remove");
  if (newBookingDetails) newBookingDetails.classList.remove("remove");

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

// View details button click handler
document.querySelectorAll(".view-details-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    handleEditBooking();
  });
});

if (editBtn) editBtn.addEventListener("click", handleEditBooking);
if (backBtnLeft) backBtnLeft.addEventListener("click", handleBackBtnLeft);

// New booking buttons click handler
newBookingBtns.forEach((btn) => {
  btn.addEventListener("click", handleNewBooking);
});

// Tracking Modal
const trackingModal = document.getElementById("trackingModal");
const trackingModalClose = document.getElementById("trackingModalClose");
const trackingModalBack = document.getElementById("trackingModalBack");
const trackingModalOverlay = document.getElementById("trackingModalOverlay");
const bookingTrackBtn = document.querySelector(".booking-track-btn");
const bookingLocationBtns = document.querySelectorAll(".booking-location-btn");

// Open tracking modal function
const openTrackingModal = () => {
  if (trackingModal) {
    trackingModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

// Open tracking modal from three-dot icon
if (bookingTrackBtn) {
  bookingTrackBtn.addEventListener("click", openTrackingModal);
}

// Open tracking modal from location icon in mobile cards
bookingLocationBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent card expand/collapse
    openTrackingModal();
  });
});

// Close tracking modal
const closeTrackingModal = () => {
  if (trackingModal) {
    trackingModal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Close button (desktop)
if (trackingModalClose) {
  trackingModalClose.addEventListener("click", closeTrackingModal);
}

// Back button (mobile)
if (trackingModalBack) {
  trackingModalBack.addEventListener("click", closeTrackingModal);
}

// Overlay click (desktop)
if (trackingModalOverlay) {
  trackingModalOverlay.addEventListener("click", closeTrackingModal);
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    trackingModal &&
    trackingModal.classList.contains("active")
  ) {
    closeTrackingModal();
  }
});
