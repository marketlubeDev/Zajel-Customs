const editBtn = document.querySelector(".booking-edit-btn");
const backBtnLeft = document.querySelector(".back-btn-left");
const navBtn = document.querySelector(".nav-btn");
const newBookingNextBtn = document.querySelector(".booking-next-btn");

const bookingTable = document.querySelector(".booking-table");
const bookingDetails = document.querySelector(".booking-details");

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

if (editBtn) editBtn.addEventListener("click", handleEditBooking);
if (backBtnLeft) backBtnLeft.addEventListener("click", handleBackBtnLeft);
