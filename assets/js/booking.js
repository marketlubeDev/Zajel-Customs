const editBtn = document.querySelector(".booking-edit-btn");
const backBtnLeft = document.querySelector(".back-btn-left");
const navBtn = document.querySelector(".nav-btn");

const handleEditBooking = () => {
  const bookingTable = document.querySelector(".booking-table");

  const bookingDetails = document.querySelector(".booking-details");
  bookingTable.classList.add("remove");
  bookingDetails.classList.remove("remove");

  backBtnLeft.classList.remove("remove");
  navBtn.classList.add("remove");
};

const handleBackBtnLeft = () => {
  const bookingTable = document.querySelector(".booking-table");

  const bookingDetails = document.querySelector(".booking-details");
  bookingTable.classList.remove("remove");
  bookingDetails.classList.add("remove");

  backBtnLeft.classList.add("remove");
};

editBtn.addEventListener("click", handleEditBooking);
backBtnLeft.addEventListener("click", handleBackBtnLeft);
