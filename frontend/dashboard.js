document.addEventListener('DOMContentLoaded', function () {
  const eventsSection = document.getElementById('eventsSection');
  const eventDetailsSection = document.getElementById('eventDetailsSection');
  const selectedEventName = document.getElementById('selectedEventName');
  const formContainer = document.getElementById('formContainer');
  const listingsContainer = document.getElementById('listingsContainer');

  // Logout functionality: return to login page
  document.getElementById('logoutBtn').addEventListener('click', function () {
    window.location.href = 'LoginPage.html';
  });

  // When an event card is clicked, show event details view
  document.querySelectorAll('.eventCard').forEach(card => {
    card.addEventListener('click', function () {
      selectedEventName.innerText = this.dataset.event;
      eventDetailsSection.style.display = 'block';
      eventsSection.style.display = 'none';
      formContainer.innerHTML = '';
      loadReportedItems(); // Load persisted items when entering event details
    });
  });

  // Back to Dashboard button: return to events list view
  document.getElementById('backToDashboardBtn').addEventListener('click', function () {
    eventDetailsSection.style.display = 'none';
    eventsSection.style.display = 'block';
  });

  // Report Lost Item button
  document.getElementById('reportLostBtn').addEventListener('click', function () {
    formContainer.innerHTML = getLostFormHTML();
    attachLostFormListener();
  });

  // Report Found Item button
  document.getElementById('reportFoundBtn').addEventListener('click', function () {
    formContainer.innerHTML = getFoundFormHTML();
    attachFoundFormListener();
  });

  // Search Listings button: load search filters and items
  document.getElementById('searchListingsBtn').addEventListener('click', function () {
    formContainer.innerHTML = getSearchFiltersHTML();
    attachSearchListeners();
    loadReportedItems();
  });

  // Generate HTML for Lost Item form
  function getLostFormHTML() {
    return `
      <h3>Report Lost Item</h3>
      <form id="lostItemForm">
        <label>Description:</label>
        <input type="text" id="lostItemDesc" required>
        <label>Location Lost:</label>
        <input type="text" id="lostItemLocation" required>
        <label>Date Lost:</label>
        <input type="date" id="lostItemDate" required>
        <label>Contact Info (Optional):</label>
        <input type="text" id="lostItemContact" placeholder="Phone, Instagram, etc.">
        <button type="submit">Submit</button>
      </form>
      <div id="lostConfirmation"></div>
    `;
  }

  // Generate HTML for Found Item form
  function getFoundFormHTML() {
    return `
      <h3>Report Found Item</h3>
      <form id="foundItemForm">
        <label>Description:</label>
        <input type="text" id="foundItemDesc" required>
        <label>Location Found:</label>
        <input type="text" id="foundItemLocation" required>
        <label>Date Found:</label>
        <input type="date" id="foundItemDate" required>
        <label>Contact Info (Optional):</label>
        <input type="text" id="foundItemContact" placeholder="Phone, Instagram, etc.">
        <button type="submit">Submit</button>
      </form>
      <div id="foundConfirmation"></div>
    `;
  }

  // Generate HTML for Search Filters
  function getSearchFiltersHTML() {
    return `
      <h3>Search Lost & Found Items</h3>
      <input type="text" id="searchQuery" placeholder="Search by description or location">
      <input type="date" id="filterDate">
      <select id="filterStatus">
          <option value="">All Items</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
      </select>
      <button id="applyFiltersBtn">Apply Filters</button>
      <div id="searchResults"></div>
    `;
  }

  // Load reported items from localStorage and display them in listingsContainer
  function loadReportedItems() {
    const reportedItems = JSON.parse(localStorage.getItem('reportedItems')) || [];
    if (reportedItems.length > 0) {
      listingsContainer.innerHTML = reportedItems.map(item => `
        <div class="listingCard">
          <p><strong>${item.type}</strong>: ${item.description}</p>
          <p>Location: ${item.location}</p>
          <p>Date: ${item.date}</p>
          <p>Contact: ${item.contact || 'N/A'}</p>
        </div>
      `).join('');
    } else {
      listingsContainer.innerHTML = `<p>No items reported yet.</p>`;
    }
  }

  // Attach lost item form submission listener (with localStorage update)
  function attachLostFormListener() {
    document.getElementById('lostItemForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const newItem = {
        type: 'Lost',
        description: document.getElementById('lostItemDesc').value,
        location: document.getElementById('lostItemLocation').value,
        date: document.getElementById('lostItemDate').value,
        contact: document.getElementById('lostItemContact').value || ''
      };
      let items = JSON.parse(localStorage.getItem('reportedItems')) || [];
      items.push(newItem);
      localStorage.setItem('reportedItems', JSON.stringify(items));
      document.getElementById('lostConfirmation').innerHTML = `<p>Lost item reported successfully!</p>`;
      this.reset();
      loadReportedItems();
    });
  }

  // Attach found item form submission listener (with localStorage update)
  function attachFoundFormListener() {
    document.getElementById('foundItemForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const newItem = {
        type: 'Found',
        description: document.getElementById('foundItemDesc').value,
        location: document.getElementById('foundItemLocation').value,
        date: document.getElementById('foundItemDate').value,
        contact: document.getElementById('foundItemContact').value || ''
      };
      let items = JSON.parse(localStorage.getItem('reportedItems')) || [];
      items.push(newItem);
      localStorage.setItem('reportedItems', JSON.stringify(items));
      document.getElementById('foundConfirmation').innerHTML = `<p>Found item reported successfully!</p>`;
      this.reset();
      loadReportedItems();
    });
  }

  // Attach search filters listener to filter items from localStorage
  function attachSearchListeners() {
    document.getElementById('applyFiltersBtn').addEventListener('click', function () {
      const query = document.getElementById('searchQuery').value.toLowerCase();
      const date = document.getElementById('filterDate').value;
      const status = document.getElementById('filterStatus').value;
      displaySearchResults(query, date, status);
    });
  }

  // Display search results based on localStorage data
  function displaySearchResults(query, date, status) {
    let items = JSON.parse(localStorage.getItem('reportedItems')) || [];
    let filteredResults = items.filter(item => {
      return (!query || item.description.toLowerCase().includes(query) || item.location.toLowerCase().includes(query))
          && (!date || item.date === date)
          && (!status || item.type === status);
    });

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = filteredResults.length ? 
      filteredResults.map(item => `
        <div class="listingCard">
          <p><strong>${item.type}</strong>: ${item.description}</p>
          <p>Location: ${item.location}</p>
          <p>Date: ${item.date}</p>
          <p>Contact: ${item.contact || 'N/A'}</p>
        </div>
      `).join('') : `<p>No results found.</p>`;
  }
});
