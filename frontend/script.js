document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const lostItemForm = document.getElementById('lostItemForm');
    const foundItemForm = document.getElementById('foundItemForm');
    const reportedItemsDiv = document.getElementById('reportedItems');
  
    // In-memory array to store reported items (in a real app, this would be stored in a database)
    const reportedItems = [];
  
    // Function to add an item to the DOM
    function addItemToDOM(item) {
      const card = document.createElement('div');
      card.className = 'itemCard';
  
      let imageHTML = '';
      if (item.imageData) {
        imageHTML = `<img src="${item.imageData}" alt="Item Image">`;
      }
  
      card.innerHTML = `
        ${imageHTML}
        <div class="itemDetails">
          <p><strong>Type:</strong> ${item.type}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Location:</strong> ${item.location}</p>
          <p><strong>Date:</strong> ${item.date}</p>
        </div>
      `;
      reportedItemsDiv.appendChild(card);
    }
  
    // Helper function to convert an uploaded file to a data URL
    function readFileAsDataURL(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  
    // Handle lost item form submission
    lostItemForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const description = document.getElementById('lostItemDesc').value;
      const location = document.getElementById('lostItemLocation').value;
      const date = document.getElementById('lostItemDate').value;
      const imageInput = document.getElementById('lostItemImage');
      let imageData = null;
      if (imageInput.files && imageInput.files[0]) {
        imageData = await readFileAsDataURL(imageInput.files[0]);
      }
  
      const item = {
        type: 'Lost',
        description,
        location,
        date,
        imageData
      };
  
      reportedItems.push(item);
      addItemToDOM(item);
      lostItemForm.reset();
    });
  
    // Handle found item form submission
    foundItemForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const description = document.getElementById('foundItemDesc').value;
      const location = document.getElementById('foundItemLocation').value;
      const date = document.getElementById('foundItemDate').value;
      const imageInput = document.getElementById('foundItemImage');
      let imageData = null;
      if (imageInput.files && imageInput.files[0]) {
        imageData = await readFileAsDataURL(imageInput.files[0]);
      }
  
      const item = {
        type: 'Found',
        description,
        location,
        date,
        imageData
      };
  
      reportedItems.push(item);
      addItemToDOM(item);
      foundItemForm.reset();
    });
  });
  