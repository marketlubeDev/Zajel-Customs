document.addEventListener("DOMContentLoaded", () => {
  const stepContainers = Array.from(
    document.querySelectorAll(".signup-form-container")
  );
  if (stepContainers.length === 0) return;

  const showStep = (targetIndex) => {
    stepContainers.forEach((container, index) => {
      const shouldHide = index !== targetIndex;
      container.classList.toggle("remove", shouldHide);
    });
  };

  let currentIndex = stepContainers.findIndex(
    (c) => !c.classList.contains("remove")
  );
  if (currentIndex === -1) {
    currentIndex = 0;
    showStep(currentIndex);
  }

  stepContainers.forEach((container, index) => {
    const nextBtn = container.querySelector(
      ".signup-from-action .btn.gradient-btn"
    );
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (index < stepContainers.length - 1) {
          currentIndex = index + 1;
          showStep(currentIndex);
        }
      });
    }

    const backBtn = container.querySelector(".btn.back-btn");
    if (backBtn) {
      // Remove any inline onclick to avoid navigation conflicts
      backBtn.removeAttribute("onclick");
      backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (index > 0) {
          currentIndex = index - 1;
          showStep(currentIndex);
        } else {
          window.location.href = "login.html";
        }
      });
    }
  });

  // Upload dropzone behavior: clicking the visible box opens the file picker
  const dropzones = Array.from(document.querySelectorAll(".upload-dropzone"));
  dropzones.forEach((zone) => {
    const input = zone.querySelector('input[type="file"]');
    if (!input) return;

    zone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        input.click();
      }
    });
  });
});
