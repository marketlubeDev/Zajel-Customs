(function () {
  function initOtpInputs(containerSelector) {
    var inputs = Array.prototype.slice.call(
      document.querySelectorAll(containerSelector + " .otp-input")
    );
    if (!inputs.length) return;

    function focusNext(currentIndex) {
      if (currentIndex < inputs.length - 1) inputs[currentIndex + 1].focus();
    }

    function focusPrev(currentIndex) {
      if (currentIndex > 0) inputs[currentIndex - 1].focus();
    }

    inputs.forEach(function (input, idx) {
      input.addEventListener("input", function (e) {
        var value = e.target.value.replace(/\D/g, "");
        e.target.value = value.slice(0, 1);
        if (e.target.value) focusNext(idx);
      });

      input.addEventListener("keydown", function (e) {
        if ((e.key === "Backspace" || e.key === "Delete") && !e.target.value) {
          focusPrev(idx);
        }
      });

      input.addEventListener("paste", function (e) {
        e.preventDefault();
        var text = (e.clipboardData || window.clipboardData)
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, inputs.length);
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].value = text[i] || "";
        }
        var nextIndex = Math.min(text.length, inputs.length - 1);
        inputs[nextIndex].focus();
      });
    });

    var form = document.querySelector(containerSelector + " form");
    if (form) {
      form.addEventListener("submit", function (e) {
        var otp = inputs
          .map(function (el) {
            return el.value;
          })
          .join("");
        if (otp.length !== inputs.length) {
          e.preventDefault();
          var firstEmpty = inputs.find(function (el) {
            return !el.value;
          });
          if (firstEmpty) firstEmpty.focus();
        }
      });
    }
  }

  // Auto-init for pages that follow the verify OTP layout
  document.addEventListener("DOMContentLoaded", function () {
    initOtpInputs(".forgotPassword-form-container");
  });

  // Expose for reuse if needed elsewhere
  window.ZajelOtp = { init: initOtpInputs };
})();
