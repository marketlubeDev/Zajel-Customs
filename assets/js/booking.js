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

// New booking flow state
let currentStep = 1;

const handleBackBtnLeft = () => {
  // Hide both booking details and new booking details
  if (bookingDetails) bookingDetails.classList.add("remove");
  if (newBookingDetails) newBookingDetails.classList.add("remove");

  // Show booking table
  if (bookingTable) bookingTable.classList.remove("remove");

  // Hide back button and show nav button
  if (backBtnLeft) backBtnLeft.classList.add("remove");
  if (navBtn) navBtn.classList.remove("remove");

  // Reset booking flow to step 1
  currentStep = 1;
};

const updateBookingSteps = () => {
  const step1Box = document.querySelector(".new-booking:nth-of-type(1)");
  const step2Box = document.querySelector(".new-booking:nth-of-type(2)");
  const step3Box = document.querySelector(".new-booking:nth-of-type(3)");

  const processImg1 = document.querySelector(".booking-process-1-img");
  const processImg2 = document.querySelector(".booking-process-2-img");
  const processImg3 = document.querySelector(".booking-process-3-img");

  const line1 = document.querySelector(".booking-line-1");
  const line2 = document.querySelector(".booking-line-2");

  const label1 = document.querySelector(".label-1");
  const label2 = document.querySelector(".label-2");
  const label3 = document.querySelector(".label-3");

  const t1 = document.querySelector(".t-1");
  const t2 = document.querySelector(".t-2");
  const t3 = document.querySelector(".t-3");

  // Hide all boxes
  if (step1Box) step1Box.classList.add("remove");
  if (step2Box) step2Box.classList.add("remove");
  if (step3Box) step3Box.classList.add("remove");

  // Reset all progress indicators
  if (processImg1) processImg1.src = "./assets/icons/Stages2.svg";
  if (processImg2) processImg2.src = "./assets/icons/Stages2.svg";
  if (processImg3) processImg3.src = "./assets/icons/Stages2.svg";

  // Reset all lines
  if (line1) line1.classList.remove("line");
  if (line2) line2.classList.remove("line");

  // Reset all label colors
  [label1, label2, label3, t1, t2, t3].forEach((el) => {
    if (el) {
      el.style.color = "rgba(0, 0, 0, 0.38)";
    }
  });

  // Show current step and update UI
  if (currentStep === 1) {
    if (step1Box) step1Box.classList.remove("remove");
    if (processImg1) processImg1.src = "./assets/icons/Stages1.svg";
    if (label1) label1.style.color = "#164B7D";
    if (t1) t1.style.color = "#164B7D";
    if (newBookingNextBtn) {
      newBookingNextBtn.textContent = "Next";
      newBookingNextBtn.classList.remove("remove");
    }
  } else if (currentStep === 2) {
    if (step2Box) step2Box.classList.remove("remove");
    if (processImg1) processImg1.src = "./assets/icons/Stages1.svg";
    if (processImg2) processImg2.src = "./assets/icons/Stages1.svg";
    if (line1) line1.classList.add("line");
    if (label2) label2.style.color = "#164B7D";
    if (t2) t2.style.color = "#164B7D";
    if (newBookingNextBtn) {
      newBookingNextBtn.textContent = "Next";
      newBookingNextBtn.classList.remove("remove");
    }
  } else if (currentStep === 3) {
    if (step3Box) step3Box.classList.remove("remove");
    if (processImg1) processImg1.src = "./assets/icons/Stages1.svg";
    if (processImg2) processImg2.src = "./assets/icons/Stages1.svg";
    if (processImg3) processImg3.src = "./assets/icons/Stages1.svg";
    if (line1) line1.classList.add("line");
    if (line2) line2.classList.add("line");
    if (label3) label3.style.color = "#164B7D";
    if (t3) t3.style.color = "#164B7D";
    if (newBookingNextBtn) {
      newBookingNextBtn.textContent = "Pay now";
      newBookingNextBtn.classList.remove("remove");
    }
  }
};

const handleNewBookingNextBtn = (e) => {
  if (currentStep < 3) {
    currentStep++;
    updateBookingSteps();
  } else if (currentStep === 3) {
    // Open payment modal when on step 3
    openPaymentModal();
  }
};

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

  // Reset to step 1 and update UI
  currentStep = 1;
  updateBookingSteps();
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

// Next button for new booking flow
if (newBookingNextBtn) {
  newBookingNextBtn.addEventListener("click", handleNewBookingNextBtn);
}

// Cancel button handler for new booking
const cancelButtons = document.querySelectorAll(
  ".new-booking-details .cancel-link"
);
cancelButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    handleBackBtnLeft();
  });
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

// Payment Modal
const paymentModal = document.getElementById("paymentModal");
const paymentModalClose = document.getElementById("paymentModalClose");
const paymentModalOverlay = document.getElementById("paymentModalOverlay");
const paymentCancel = document.getElementById("paymentCancel");
const confirmPayment = document.getElementById("confirmPayment");

// Open payment modal function
const openPaymentModal = () => {
  if (paymentModal) {
    paymentModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

// Close payment modal function
const closePaymentModal = () => {
  if (paymentModal) {
    paymentModal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Close button
if (paymentModalClose) {
  paymentModalClose.addEventListener("click", closePaymentModal);
}

// Cancel button
if (paymentCancel) {
  paymentCancel.addEventListener("click", closePaymentModal);
}

// Overlay click
if (paymentModalOverlay) {
  paymentModalOverlay.addEventListener("click", closePaymentModal);
}

// Confirm and pay button
if (confirmPayment) {
  confirmPayment.addEventListener("click", () => {
    // Handle payment confirmation
    console.log("Payment confirmed");
    closePaymentModal();
    // You can add payment processing logic here
  });
}

// Close payment modal on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    paymentModal &&
    paymentModal.classList.contains("active")
  ) {
    closePaymentModal();
  }
});
