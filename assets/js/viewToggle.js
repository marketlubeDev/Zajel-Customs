/**
 * View Toggle Component
 * Handles switching between table (list) and card (grid) views
 */

class ViewToggle {
  constructor() {
    this.toggleButtons = document.querySelectorAll(".view-toggle-btn");
    this.tableContainer = document.querySelector(".table-container");
    this.paginationContainer = document.querySelector(".table-pagination");
    this.currentView = "list"; // Default view

    if (!this.tableContainer) {
      console.error("ViewToggle: Table container not found");
      return;
    }

    this.init();
  }

  init() {
    this.bindEvents();
    this.setInitialView();
  }

  bindEvents() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.handleToggleClick(e));
    });
  }

  handleToggleClick(event) {
    const button = event.currentTarget;
    const viewType = button.getAttribute("data-view");

    if (viewType === this.currentView) {
      return; // Already in this view
    }

    this.switchView(viewType);
    this.updateActiveButton(button);
  }

  switchView(viewType) {
    // Remove current view class
    this.tableContainer.classList.remove(`${this.currentView}-view`);

    // Add new view class
    this.tableContainer.classList.add(`${viewType}-view`);

    // Update current view
    this.currentView = viewType;

    // Show/hide pagination based on view
    this.togglePaginationVisibility(viewType);

    // Store preference in localStorage
    localStorage.setItem("userViewPreference", viewType);

    // Dispatch custom event for other components
    this.dispatchViewChangeEvent(viewType);
  }

  updateActiveButton(activeButton) {
    // Remove active class from all buttons
    this.toggleButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add active class to clicked button
    activeButton.classList.add("active");
  }

  togglePaginationVisibility(viewType) {
    if (!this.paginationContainer) {
      console.warn("ViewToggle: Pagination container not found");
      return;
    }

    if (viewType === "list") {
      // Show pagination for table view
      this.paginationContainer.style.display = "flex";
    } else if (viewType === "grid") {
      // Hide pagination for grid view
      this.paginationContainer.style.display = "none";
    }
  }

  setInitialView() {
    // Check localStorage for saved preference
    const savedView = localStorage.getItem("userViewPreference");

    if (savedView && (savedView === "list" || savedView === "grid")) {
      this.currentView = savedView;
    }

    // Apply initial view
    this.tableContainer.classList.add(`${this.currentView}-view`);

    // Set initial pagination visibility
    this.togglePaginationVisibility(this.currentView);

    // Update active button
    const activeButton = document.querySelector(
      `[data-view="${this.currentView}"]`
    );
    if (activeButton) {
      this.updateActiveButton(activeButton);
    }
  }

  dispatchViewChangeEvent(viewType) {
    const event = new CustomEvent("viewChanged", {
      detail: {
        view: viewType,
        isGridView: viewType === "grid",
        isListView: viewType === "list",
      },
    });

    document.dispatchEvent(event);
  }

  // Public methods for external control
  switchToListView() {
    const listButton = document.querySelector('[data-view="list"]');
    if (listButton) {
      this.handleToggleClick({ currentTarget: listButton });
    }
  }

  switchToGridView() {
    const gridButton = document.querySelector('[data-view="grid"]');
    if (gridButton) {
      this.handleToggleClick({ currentTarget: gridButton });
    }
  }

  getCurrentView() {
    return this.currentView;
  }

  // Method to add more user cards dynamically
  addUserCard(userData) {
    const gridWrapper = document.querySelector(".user-grid-wrapper");
    if (!gridWrapper) return;

    const cardElement = this.createUserCard(userData);
    gridWrapper.appendChild(cardElement);
  }

  createUserCard(userData) {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="user-card-header">
        <div class="user-card-info">
          <div class="user-card-name">${userData.name || "Unknown User"}</div>
          <div class="user-card-username">${
            userData.username || "@username"
          }</div>
          <div class="user-card-email">${userData.email || "No email"}</div>
        </div>
      </div>
      <div class="user-card-content">
        <!-- Content area for additional info if needed -->
      </div>
      <div class="user-card-footer">
        <div class="user-card-last-updated">${
          userData.lastUpdated || "No date"
        }</div>
        <div class="user-card-actions">
          <button class="user-card-action-btn refresh-btn" title="Refresh">
            <img src="./assets/icons/lock.svg" alt="" />
          </button>
          <button class="user-card-action-btn more-btn" title="More options">
            <img src="./assets/icons/threedot.svg" alt="" />
          </button>
        </div>
      </div>
    `;

    return card;
  }

  // Method to sync table data with grid cards
  syncDataFromTable() {
    const tableRows = document.querySelectorAll(".table-body-row");
    const gridWrapper = document.querySelector(".user-grid-wrapper");

    if (!gridWrapper || tableRows.length === 0) return;

    // Clear existing cards (except the first one which is the template)
    const existingCards = gridWrapper.querySelectorAll(".user-card");
    existingCards.forEach((card, index) => {
      if (index > 0) {
        // Keep the first card as template
        card.remove();
      }
    });

    // Add cards for each table row
    tableRows.forEach((row, index) => {
      if (index === 0) return; // Skip first row as it's already in the template

      const userData = this.extractUserDataFromRow(row);
      const card = this.createUserCard(userData);
      gridWrapper.appendChild(card);
    });
  }

  extractUserDataFromRow(row) {
    const cells = row.querySelectorAll(".table-body-row-cell");

    const nameCell = cells[0];
    const emailCell = cells[1];
    const loggedStatusCell = cells[2];
    const statusCell = cells[3];
    const lastUpdatedCell = cells[4];

    const nameElement = nameCell.querySelector(".user-name");
    const usernameElement = nameCell.querySelector(".user-username");
    const emailElement = emailCell.querySelector("span");
    const loggedStatusElement =
      loggedStatusCell.querySelector(".logged-status");
    const statusElement = statusCell.querySelector(".status-badge");
    const lastUpdatedElement = lastUpdatedCell.querySelector("span");

    return {
      name: nameElement ? nameElement.textContent : "Unknown User",
      username: usernameElement ? usernameElement.textContent : "@username",
      email: emailElement ? emailElement.textContent : "No email",
      loggedStatus: loggedStatusElement
        ? loggedStatusElement
            .querySelector(".status-dot")
            .classList.contains("online")
          ? "online"
          : "offline"
        : "offline",
      loggedStatusText: loggedStatusElement
        ? loggedStatusElement.querySelector("span:last-child").textContent
        : "Offline",
      status: statusElement
        ? statusElement.classList.contains("active")
          ? "active"
          : "inactive"
        : "inactive",
      statusText: statusElement ? statusElement.textContent : "Inactive",
      lastUpdated: lastUpdatedElement
        ? lastUpdatedElement.textContent
        : "No date",
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const viewToggle = new ViewToggle();

  // Make it globally accessible for debugging
  window.viewToggle = viewToggle;
});
