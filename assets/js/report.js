// Report Generation JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const reportForm = document.querySelector(".report-form");
  const reportTypeSelect = document.getElementById("reportType");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const generateButton = document.querySelector(".btn-generate");

  // Set default date range (last 30 days)
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  startDateInput.value = thirtyDaysAgo.toISOString().split("T")[0];
  endDateInput.value = today.toISOString().split("T")[0];

  // Handle report type changes
  reportTypeSelect.addEventListener("change", function () {
    const selectedType = this.value;
    const today = new Date();
    let startDate, endDate;

    switch (selectedType) {
      case "monthly":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "quarterly":
        const currentQuarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), currentQuarter * 3, 1);
        endDate = new Date(today.getFullYear(), (currentQuarter + 1) * 3, 0);
        break;
      case "yearly":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "custom":
        // Keep current dates for custom
        return;
    }

    if (startDate && endDate) {
      startDateInput.value = startDate.toISOString().split("T")[0];
      endDateInput.value = endDate.toISOString().split("T")[0];
    }
  });

  // Handle form submission
  reportForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      reportType: reportTypeSelect.value,
      startDate: startDateInput.value,
      endDate: endDateInput.value,
    };

    // Validate form
    if (!formData.reportType) {
      showNotification("Please select a report type", "error");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      showNotification("Please select both start and end dates", "error");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      showNotification("Start date cannot be after end date", "error");
      return;
    }

    // Show loading state
    generateButton.disabled = true;
    generateButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="loading-spinner">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                </circle>
            </svg>
            Generating Report...
        `;

    // Simulate API call
    setTimeout(() => {
      generateReport(formData);
    }, 2000);
  });

  function generateReport(data) {
    // Here you would typically make an API call to generate the report
    console.log("Generating report with data:", data);

    // Simulate successful report generation
    showNotification("Report generated successfully!", "success");

    // Reset button
    generateButton.disabled = false;
    generateButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Generate Account Summary
        `;
  }

  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    ${
                      type === "success"
                        ? '<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                        : '<path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                    }
                </svg>
                <span>${message}</span>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#10b981" : "#ef4444"};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
});
