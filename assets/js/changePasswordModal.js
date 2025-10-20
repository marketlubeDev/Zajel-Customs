/**
 * Change Password Modal Component
 * Handles opening, closing, and form validation for the change password modal
 */

class ChangePasswordModal {
  constructor() {
    this.modal = document.getElementById("changePasswordModal");
    this.overlay = document.getElementById("changePasswordModalOverlay");
    this.closeBtn = document.getElementById("changePasswordModalClose");
    this.cancelBtn = document.getElementById("changePasswordCancel");
    this.form = document.getElementById("changePasswordForm");
    this.newPasswordInput = document.getElementById("newPassword");
    this.confirmPasswordInput = document.getElementById("confirmPassword");
    this.changeBtn = this.form.querySelector(".change-btn");

    // Store the user data for the modal
    this.currentUser = null;

    if (!this.modal) {
      console.error("ChangePasswordModal: Modal element not found");
      return;
    }

    this.init();
  }

  init() {
    this.bindEvents();
    this.setupFormValidation();
  }

  bindEvents() {
    // Close modal events
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.cancelBtn) {
      this.cancelBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeModal());
    }

    // Form submission
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // Real-time validation
    if (this.newPasswordInput) {
      this.newPasswordInput.addEventListener("input", () =>
        this.validateNewPassword()
      );
    }

    if (this.confirmPasswordInput) {
      this.confirmPasswordInput.addEventListener("input", () =>
        this.validatePasswordMatch()
      );
    }

    // Keyboard events
    document.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  setupFormValidation() {
    // Add error message elements to form groups
    this.addErrorMessageElements();
  }

  addErrorMessageElements() {
    const formGroups = this.form.querySelectorAll(".form-group");

    formGroups.forEach((group) => {
      const existingError = group.querySelector(".form-error-message");
      if (!existingError) {
        const errorElement = document.createElement("div");
        errorElement.className = "form-error-message";
        group.appendChild(errorElement);
      }
    });
  }

  openModal(userData = null) {
    this.currentUser = userData;

    if (this.modal) {
      this.modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling

      // Focus on first input
      setTimeout(() => {
        if (this.newPasswordInput) {
          this.newPasswordInput.focus();
        }
      }, 100);

      // Dispatch custom event
      this.dispatchModalEvent("opened", { user: userData });
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling

      // Reset form
      this.resetForm();

      // Dispatch custom event
      this.dispatchModalEvent("closed", { user: this.currentUser });

      this.currentUser = null;
    }
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
      this.clearValidationErrors();
    }
  }

  clearValidationErrors() {
    // Remove error classes from inputs
    const inputs = this.form.querySelectorAll(".form-input");
    inputs.forEach((input) => {
      input.classList.remove("error", "success");
    });

    // Hide error messages
    const errorMessages = this.form.querySelectorAll(".form-error-message");
    errorMessages.forEach((message) => {
      message.classList.remove("show");
      message.textContent = "";
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (this.validateForm()) {
      this.submitPasswordChange();
    }
  }

  validateForm() {
    const isNewPasswordValid = this.validateNewPassword();
    const isPasswordMatchValid = this.validatePasswordMatch();

    return isNewPasswordValid && isPasswordMatchValid;
  }

  validateNewPassword() {
    const password = this.newPasswordInput.value.trim();
    const errorMessage = this.getErrorMessage("newPassword");

    // Clear previous validation
    this.newPasswordInput.classList.remove("error", "success");
    errorMessage.classList.remove("show");

    if (!password) {
      this.showFieldError("newPassword", "New password is required");
      return false;
    }

    if (password.length < 8) {
      this.showFieldError(
        "newPassword",
        "Password must be at least 8 characters long"
      );
      return false;
    }

    if (!this.isStrongPassword(password)) {
      this.showFieldError(
        "newPassword",
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    }

    this.showFieldSuccess("newPassword");
    return true;
  }

  validatePasswordMatch() {
    const newPassword = this.newPasswordInput.value.trim();
    const confirmPassword = this.confirmPasswordInput.value.trim();
    const errorMessage = this.getErrorMessage("confirmPassword");

    // Clear previous validation
    this.confirmPasswordInput.classList.remove("error", "success");
    errorMessage.classList.remove("show");

    if (!confirmPassword) {
      this.showFieldError("confirmPassword", "Please confirm your password");
      return false;
    }

    if (newPassword !== confirmPassword) {
      this.showFieldError("confirmPassword", "Passwords do not match");
      return false;
    }

    this.showFieldSuccess("confirmPassword");
    return true;
  }

  isStrongPassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }

  showFieldError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorMessage = this.getErrorMessage(fieldName);

    if (input) {
      input.classList.add("error");
      input.classList.remove("success");
    }

    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.classList.add("show");
    }
  }

  showFieldSuccess(fieldName) {
    const input = document.getElementById(fieldName);
    const errorMessage = this.getErrorMessage(fieldName);

    if (input) {
      input.classList.add("success");
      input.classList.remove("error");
    }

    if (errorMessage) {
      errorMessage.classList.remove("show");
    }
  }

  getErrorMessage(fieldName) {
    const input = document.getElementById(fieldName);
    if (input) {
      const formGroup = input.closest(".form-group");
      return formGroup ? formGroup.querySelector(".form-error-message") : null;
    }
    return null;
  }

  async submitPasswordChange() {
    const newPassword = this.newPasswordInput.value.trim();

    // Disable submit button
    this.changeBtn.disabled = true;
    this.changeBtn.textContent = "Changing...";

    try {
      // Simulate API call
      await this.simulatePasswordChange(newPassword);

      // Show success message
      this.showSuccessMessage("Password changed successfully!");

      // Close modal after a short delay
      setTimeout(() => {
        this.closeModal();
      }, 1500);
    } catch (error) {
      console.error("Password change failed:", error);
      this.showFieldError(
        "newPassword",
        "Failed to change password. Please try again."
      );
    } finally {
      // Re-enable submit button
      this.changeBtn.disabled = false;
      this.changeBtn.textContent = "Change";
    }
  }

  async simulatePasswordChange(newPassword) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
          // 90% success rate
          resolve({ success: true, message: "Password changed successfully" });
        } else {
          reject(new Error("Server error"));
        }
      }, 1500);
    });
  }

  showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement("div");
    successDiv.className = "form-success-message show";
    successDiv.textContent = message;
    successDiv.style.position = "absolute";
    successDiv.style.top = "10px";
    successDiv.style.left = "50%";
    successDiv.style.transform = "translateX(-50%)";
    successDiv.style.background = "#22c55e";
    successDiv.style.color = "white";
    successDiv.style.padding = "8px 16px";
    successDiv.style.borderRadius = "6px";
    successDiv.style.fontSize = "14px";
    successDiv.style.zIndex = "1001";

    this.modal.appendChild(successDiv);

    // Remove after 3 seconds
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 3000);
  }

  handleKeydown(event) {
    // Close modal on Escape key
    if (event.key === "Escape" && this.modal.classList.contains("active")) {
      this.closeModal();
    }
  }

  dispatchModalEvent(eventType, detail = {}) {
    const event = new CustomEvent(`changePasswordModal${eventType}`, {
      detail: {
        modal: this,
        user: this.currentUser,
        ...detail,
      },
    });

    document.dispatchEvent(event);
  }

  // Public methods for external control
  openForUser(userData) {
    this.openModal(userData);
  }

  isOpen() {
    return this.modal && this.modal.classList.contains("active");
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const changePasswordModal = new ChangePasswordModal();

  // Make it globally accessible
  window.changePasswordModal = changePasswordModal;

  // Bind change password buttons
  const changePasswordButtons = document.querySelectorAll(
    ".user-card-change-password"
  );
  changePasswordButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Get user data from the card
      const userCard = button.closest(".user-card");
      const userData = extractUserDataFromCard(userCard);

      // Open modal
      changePasswordModal.openForUser(userData);
    });
  });
});

// Helper function to extract user data from card
function extractUserDataFromCard(card) {
  if (!card) return null;

  const nameElement = card.querySelector(".user-card-name");
  const usernameElement = card.querySelector(".user-card-username");
  const emailElement = card.querySelector(".user-card-email");
  const statusElement = card.querySelector(".user-card-toggle-label");

  return {
    name: nameElement ? nameElement.textContent.trim() : "Unknown User",
    username: usernameElement
      ? usernameElement.textContent.trim()
      : "@username",
    email: emailElement ? emailElement.textContent.trim() : "No email",
    status: statusElement
      ? statusElement.textContent.trim().toLowerCase()
      : "unknown",
  };
}
