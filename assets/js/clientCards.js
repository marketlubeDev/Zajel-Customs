// Client Cards Mobile View Handler
(function() {
  'use strict';

  function generateMobileCards() {
    const tableBody = document.querySelector('.table-body');
    const cardsContainer = document.querySelector('.client-cards-container');
    
    if (!tableBody || !cardsContainer) return;

    // Clear existing cards (keep only the first one as template if needed)
    cardsContainer.innerHTML = '';

    // Get all table rows
    const tableRows = tableBody.querySelectorAll('.table-body-row');

    tableRows.forEach(row => {
      // Extract data from table row
      const cells = row.querySelectorAll('.table-body-row-cell');
      
      if (cells.length < 6) return; // Skip if not enough cells

      // Extract client information
      const nameCell = cells[0];
      const clientName = nameCell.querySelector('div:first-child')?.textContent.trim() || '';
      const clientType = nameCell.querySelector('div:last-child')?.textContent.trim() || '';
      
      const contactPerson = cells[1].textContent.trim();
      const email = cells[2].textContent.trim();
      const numUsers = cells[3].textContent.trim();
      const city = cells[4].textContent.trim();
      
      const statusBadge = cells[5].querySelector('.status-badge');
      const status = statusBadge?.textContent.trim() || '';
      const statusClass = statusBadge?.classList.contains('active') ? 'active' : 'inactive';

      // Get action buttons data
      const viewBtn = cells[6].querySelector('.view-client-btn');
      const manageBtn = cells[6].querySelector('.manage-users-btn');

      // Create card element
      const card = document.createElement('div');
      card.className = 'client-card-mobile';
      
      card.innerHTML = `
        <div class="client-card-header">
          <div class="client-card-header-left">
            <div class="client-card-name">${clientName}</div>
            <div class="client-card-type">${clientType}</div>
          </div>
          <div class="client-card-header-right">
            <span class="client-card-status ${statusClass}">${status}</span>
          </div>
        </div>
        <div class="client-card-details">
          <div class="client-card-row">
            <div class="client-card-field contact-person">
              <span class="client-card-label">Contact person</span>
              <span class="client-card-value">${contactPerson}</span>
            </div>
            <div class="client-card-field">
              <span class="client-card-label">City</span>
              <span class="client-card-value">${city}</span>
            </div>
          </div>

        </div>

      `;

      // Add click event to redirect to cmUser.html
      card.style.cursor = 'pointer';
      card.addEventListener('click', function() {
        window.location.href = './cmUser.html';
      });

      // Copy data attributes to card buttons
      const cardViewBtn = card.querySelector('.view-client-btn');
      const cardManageBtn = card.querySelector('.manage-users-btn');

      if (viewBtn && cardViewBtn) {
        // Copy all data attributes
        Array.from(viewBtn.attributes).forEach(attr => {
          if (attr.name.startsWith('data-')) {
            cardViewBtn.setAttribute(attr.name, attr.value);
          }
        });
      }

      if (manageBtn && cardManageBtn) {
        // Copy all data attributes
        Array.from(manageBtn.attributes).forEach(attr => {
          if (attr.name.startsWith('data-')) {
            cardManageBtn.setAttribute(attr.name, attr.value);
          }
        });
      }

      cardsContainer.appendChild(card);
    });
  }

  // Generate cards on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateMobileCards);
  } else {
    generateMobileCards();
  }

  // Regenerate cards on window resize (if crossing the 1024px breakpoint)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth <= 1024) {
        generateMobileCards();
      }
    }, 250);
  });

})();