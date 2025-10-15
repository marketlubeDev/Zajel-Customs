// New Booking specific functionality

const backBtnLeft = document.querySelector(".back-btn-left");
const newBookingNextBtn = document.querySelector(".booking-next-btn");
const cancelLink = document.querySelector(".cancel-link");

// Mobile menu elements
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

// New booking flow state
let currentStep = 1;

const handleBackBtnLeft = () => {
  // Navigate back to booking page
  window.location.href = "./booking.html";
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

const handleCancel = () => {
  // Navigate back to booking page
  window.location.href = "./booking.html";
};

// Event listeners
if (backBtnLeft) {
  backBtnLeft.addEventListener("click", handleBackBtnLeft);
}

if (newBookingNextBtn) {
  newBookingNextBtn.addEventListener("click", handleNewBookingNextBtn);
}

if (cancelLink) {
  cancelLink.addEventListener("click", handleCancel);
}

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

// Close sidebar and remove overlay when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    if (sidebar) sidebar.classList.remove("active");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
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

// Overlay click
if (paymentModalOverlay) {
  paymentModalOverlay.addEventListener("click", closePaymentModal);
}

// Cancel button
if (paymentCancel) {
  paymentCancel.addEventListener("click", closePaymentModal);
}

// Confirm payment button
if (confirmPayment) {
  confirmPayment.addEventListener("click", () => {
    const selectedPaymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    );
    if (selectedPaymentMethod) {
      closePaymentModal();
      window.location.href = "./booking.html";
    }
  });
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    paymentModal &&
    paymentModal.classList.contains("active")
  ) {
    closePaymentModal();
  }
});

// Initialize the booking steps
updateBookingSteps();
