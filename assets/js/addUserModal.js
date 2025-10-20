// Add New User Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const addUserModal = document.getElementById("addUserModal");
  const addUserModalOverlay = document.getElementById("addUserModalOverlay");
  const addUserModalClose = document.getElementById("addUserModalClose");
  const addUserCancel = document.getElementById("addUserCancel");
  const addUserForm = document.getElementById("addUserForm");
  const createUserBtn = document.querySelector(".create-user-btn");
  const createUserBtnMobile = document.querySelector(".create-user-btn-mobile");

  // Form elements
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Open modal function
  function openAddUserModal() {
    addUserModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus on first input
    setTimeout(() => {
      firstNameInput.focus();
    }, 100);
  }

  // Close modal function
  function closeAddUserModal() {
    addUserModal.classList.remove("active");
    document.body.style.overflow = "";

    // Reset form
    resetForm();
  }

  // Reset form function
  function resetForm() {
    addUserForm.reset();
    clearValidationErrors();
  }

  // Clear validation errors
  function clearValidationErrors() {
    const inputs = addUserForm.querySelectorAll(".form-input");
    inputs.forEach((input) => {
      input.classList.remove("error", "success");
    });

    const errorMessages = addUserForm.querySelectorAll(".form-error-message");
    errorMessages.forEach((message) => {
      message.classList.remove("show");
    });
  }

  // Validate form function
  function validateForm() {
    let isValid = true;
    clearValidationErrors();

    // Validate first name
    if (!firstNameInput.value.trim()) {
      showFieldError(firstNameInput, "First name is required");
      isValid = false;
    } else if (firstNameInput.value.trim().length < 2) {
      showFieldError(
        firstNameInput,
        "First name must be at least 2 characters"
      );
      isValid = false;
    } else {
      showFieldSuccess(firstNameInput);
    }

    // Validate last name
    if (!lastNameInput.value.trim()) {
      showFieldError(lastNameInput, "Last name is required");
      isValid = false;
    } else if (lastNameInput.value.trim().length < 2) {
      showFieldError(lastNameInput, "Last name must be at least 2 characters");
      isValid = false;
    } else {
      showFieldSuccess(lastNameInput);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showFieldError(emailInput, "Email address is required");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showFieldError(emailInput, "Please enter a valid email address");
      isValid = false;
    } else {
      showFieldSuccess(emailInput);
    }

    // Validate password
    if (!passwordInput.value) {
      showFieldError(passwordInput, "Password is required");
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      showFieldError(passwordInput, "Password must be at least 8 characters");
      isValid = false;
    } else {
      showFieldSuccess(passwordInput);
    }

    // Validate confirm password
    if (!confirmPasswordInput.value) {
      showFieldError(confirmPasswordInput, "Please confirm your password");
      isValid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      showFieldError(confirmPasswordInput, "Passwords do not match");
      isValid = false;
    } else {
      showFieldSuccess(confirmPasswordInput);
    }

    return isValid;
  }

  // Show field error
  function showFieldError(input, message) {
    input.classList.add("error");
    input.classList.remove("success");

    // Remove existing error message
    const existingError = input.parentNode.querySelector(".form-error-message");
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorMessage = document.createElement("div");
    errorMessage.className = "form-error-message show";
    errorMessage.textContent = message;
    input.parentNode.appendChild(errorMessage);
  }

  // Show field success
  function showFieldSuccess(input) {
    input.classList.add("success");
    input.classList.remove("error");

    // Remove existing error message
    const existingError = input.parentNode.querySelector(".form-error-message");
    if (existingError) {
      existingError.remove();
    }
  }

  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Get form data
    const formData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    // Show loading state
    const submitBtn = addUserForm.querySelector(".create-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Creating...";
    submitBtn.disabled = true;

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Show success message (you can replace this with actual success handling)
      alert("User created successfully!");

      // Close modal
      closeAddUserModal();

      // Here you would typically:
      // 1. Send data to your backend API
      // 2. Refresh the user list
      // 3. Show success notification
      console.log("New user data:", formData);
    }, 1500);
  }

  // Event listeners
  if (createUserBtn) {
    createUserBtn.addEventListener("click", openAddUserModal);
  }
  
  if (createUserBtnMobile) {
    createUserBtnMobile.addEventListener("click", openAddUserModal);
  }

  if (addUserModalClose) {
    addUserModalClose.addEventListener("click", closeAddUserModal);
  }

  if (addUserCancel) {
    addUserCancel.addEventListener("click", closeAddUserModal);
  }

  if (addUserModalOverlay) {
    addUserModalOverlay.addEventListener("click", closeAddUserModal);
  }

  if (addUserForm) {
    addUserForm.addEventListener("submit", handleFormSubmit);
  }

  // Close modal on Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && addUserModal.classList.contains("active")) {
      closeAddUserModal();
    }
  });

  // Real-time validation
  if (firstNameInput) {
    firstNameInput.addEventListener("blur", function () {
      if (this.value.trim()) {
        if (this.value.trim().length < 2) {
          showFieldError(this, "First name must be at least 2 characters");
        } else {
          showFieldSuccess(this);
        }
      }
    });
  }

  if (lastNameInput) {
    lastNameInput.addEventListener("blur", function () {
      if (this.value.trim()) {
        if (this.value.trim().length < 2) {
          showFieldError(this, "Last name must be at least 2 characters");
        } else {
          showFieldSuccess(this);
        }
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value.trim())) {
          showFieldError(this, "Please enter a valid email address");
        } else {
          showFieldSuccess(this);
        }
      }
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("blur", function () {
      if (this.value) {
        if (this.value.length < 8) {
          showFieldError(this, "Password must be at least 8 characters");
        } else {
          showFieldSuccess(this);
        }
      }
    });
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("blur", function () {
      if (this.value && passwordInput.value) {
        if (this.value !== passwordInput.value) {
          showFieldError(this, "Passwords do not match");
        } else {
          showFieldSuccess(this);
        }
      }
    });
  }

  // Re-validate confirm password when password changes
  if (passwordInput && confirmPasswordInput) {
    passwordInput.addEventListener("input", function () {
      if (confirmPasswordInput.value) {
        if (this.value !== confirmPasswordInput.value) {
          showFieldError(confirmPasswordInput, "Passwords do not match");
        } else {
          showFieldSuccess(confirmPasswordInput);
        }
      }
    });
  }
});
