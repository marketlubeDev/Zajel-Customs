/**
 * Client Modal Component
 * Handles opening and closing of client details modal
 */

class ClientModal {
  constructor() {
    this.modal = document.getElementById("clientModal");
    this.overlay = document.getElementById("clientModalOverlay");
    this.closeBtn = document.getElementById("clientModalClose");
    this.viewClientBtns = document.querySelectorAll(".view-client-btn");
    this.manageUsersBtns = document.querySelectorAll(".manage-users-btn");

    // Check if required modal elements exist
    if (!this.modal) {
      console.error("ClientModal: Modal element not found");
      return;
    }
    if (!this.overlay) {
      console.error("ClientModal: Modal overlay element not found");
      return;
    }
    if (!this.closeBtn) {
      console.error("ClientModal: Modal close button not found");
      return;
    }

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // View client buttons
    this.viewClientBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleViewClientClick(e));
    });

    // Manage users buttons
    this.manageUsersBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleManageUsersClick(e));
    });

    // Close button
    this.closeBtn.addEventListener("click", () => this.close());

    // Overlay click
    this.overlay.addEventListener("click", () => this.close());

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });
  }

  handleViewClientClick(event) {
    const btn = event.currentTarget;
    const clientData = this.extractClientData(btn);
    this.open(clientData);
  }

  handleManageUsersClick(event) {
    const btn = event.currentTarget;
    const clientId = btn.getAttribute("data-client-id");
    const clientName = btn.getAttribute("data-client-name");

    // For now, open the same modal but you can customize this behavior
    const clientData = {
      id: clientId,
      name: clientName,
      type: "Credit", // Default values - you can add more data attributes
      status: "Active",
      contactPerson: "Mr. Valtine Pinto",
      email: "logistics@apexrecyclables.com",
      phone: "+971 4359 1881",
      streetAddress:
        "Office No 609 Makateb Building, Behind Nissan Showroom, Opp Dnata Office, Deira",
      city: "Dubai (DXB)",
      country: "UAE",
      zone: "A1",
    };

    this.open(clientData);
  }

  extractClientData(button) {
    return {
      id: button.getAttribute("data-client-id"),
      name: button.getAttribute("data-client-name"),
      type: button.getAttribute("data-client-type"),
      status: button.getAttribute("data-client-status"),
      contactPerson: button.getAttribute("data-contact-person"),
      email: button.getAttribute("data-email"),
      phone: button.getAttribute("data-phone"),
      streetAddress: button.getAttribute("data-street-address"),
      city: button.getAttribute("data-city"),
      country: button.getAttribute("data-country"),
      zone: button.getAttribute("data-zone"),
    };
  }

  open(clientData) {
    this.updateModalContent(clientData);
    this.show();
  }

  updateModalContent(clientData) {
    // Update modal content with client data
    const elements = {
      title: document.getElementById("clientModalTitle"),
      status: document.getElementById("clientModalStatus"),
      id: document.getElementById("clientModalId"),
      type: document.getElementById("clientModalType"),
      contactPerson: document.getElementById("clientContactPerson"),
      email: document.getElementById("clientEmail"),
      phone: document.getElementById("clientPhone"),
      streetAddress: document.getElementById("clientStreetAddress"),
      city: document.getElementById("clientCity"),
      country: document.getElementById("clientCountry"),
      zone: document.getElementById("clientZone"),
    };

    // Check if all required elements exist
    const missingElements = Object.entries(elements)
      .filter(([key, element]) => !element)
      .map(([key]) => key);

    if (missingElements.length > 0) {
      console.error(`Missing modal elements: ${missingElements.join(", ")}`);
      return;
    }

    // Update content safely
    // Update title while preserving the status span
    const statusSpan = elements.title.querySelector(".client-modal-status");
    if (statusSpan) {
      elements.title.innerHTML = `${
        clientData.name || ""
      } <span class="client-modal-status ${
        clientData.status ? clientData.status.toLowerCase() : "active"
      }" id="clientModalStatus">${clientData.status || "Active"}</span>`;
    } else {
      elements.title.textContent = clientData.name || "";
    }
    elements.status.textContent = clientData.status || "";
    elements.id.textContent = clientData.id || "";
    elements.type.textContent = clientData.type || "";
    elements.contactPerson.textContent = clientData.contactPerson || "";
    elements.email.textContent = clientData.email || "";
    elements.phone.textContent = clientData.phone || "";
    elements.streetAddress.textContent = clientData.streetAddress || "";
    elements.city.textContent = clientData.city || "";
    elements.country.textContent = clientData.country || "";
    elements.zone.textContent = clientData.zone || "";

    // Update status badge class (handled in title update above)
    // The status class is now set when updating the title innerHTML
  }

  show() {
    if (this.modal) {
      this.modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }

  isOpen() {
    return this.modal && this.modal.classList.contains("show");
  }

  // Public method to add new client buttons dynamically
  addClientButton(button, type = "view") {
    if (type === "view") {
      button.classList.add("view-client-btn");
      button.addEventListener("click", (e) => this.handleViewClientClick(e));
    } else if (type === "manage") {
      button.classList.add("manage-users-btn");
      button.addEventListener("click", (e) => this.handleManageUsersClick(e));
    }
  }

  // Public method to refresh button listeners (useful for dynamic content)
  refresh() {
    this.viewClientBtns = document.querySelectorAll(".view-client-btn");
    this.manageUsersBtns = document.querySelectorAll(".manage-users-btn");
    this.bindEvents();
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ClientModal();
});
