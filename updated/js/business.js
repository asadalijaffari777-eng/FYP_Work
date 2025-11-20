// Business selection functionality - Specific to start-business.html
document.addEventListener('DOMContentLoaded', function() {
    console.log('Business JS loaded'); // Debug line
    
    const options = document.querySelectorAll('.option');
    const selectedItems = [];
    
    console.log('Found options:', options.length); // Debug line
    
    // Initialize each option with click event
    options.forEach(option => {
        option.addEventListener('click', function() {
            console.log('Option clicked:', this.textContent); // Debug line
            
            // Toggle selected class
            this.classList.toggle('selected');
            
            const category = this.getAttribute('data-category');
            const item = this.getAttribute('data-item');
            const itemText = this.querySelector('span').textContent;
            
            if (this.classList.contains('selected')) {
                // Add to selected items
                selectedItems.push({
                    category: category,
                    item: item,
                    text: itemText
                });
                console.log('Added:', itemText);
            } else {
                // Remove from selected items
                const index = selectedItems.findIndex(selected => 
                    selected.category === category && selected.item === item
                );
                if (index !== -1) {
                    selectedItems.splice(index, 1);
                }
                console.log('Removed:', itemText);
            }
            
            updateSelectedList();
        });
    });
    
    // Apply button functionality
    const applyBtn = document.getElementById('applyBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            if (selectedItems.length === 0) {
                alert('Please select at least one clothing item before applying.');
                return;
            }
            
            // Store selections in localStorage for use on other pages
            localStorage.setItem('businessSelections', JSON.stringify(selectedItems));
            
            alert('Your selections have been submitted! Redirecting to manufacturers page...');
            window.location.href = 'manufacturer.html';
        });
    }
    
    // Function to update the selected items list
    function updateSelectedList() {
        const selectedList = document.getElementById('selectedList');
        if (selectedList) {
            selectedList.innerHTML = '';
            
            if (selectedItems.length === 0) {
                const message = document.createElement('p');
                message.textContent = 'No items selected yet. Click on items above to select them.';
                message.style.color = '#6c757d';
                message.style.fontStyle = 'italic';
                selectedList.appendChild(message);
            } else {
                selectedItems.forEach(item => {
                    const selectedItem = document.createElement('div');
                    selectedItem.className = 'selected-item';
                    selectedItem.textContent = item.text;
                    selectedList.appendChild(selectedItem);
                });
            }
        }
    }
    
    // Check if we have previous selections and restore them
    const savedSelections = localStorage.getItem('businessSelections');
    if (savedSelections && options.length > 0) {
        const parsedSelections = JSON.parse(savedSelections);
        
        parsedSelections.forEach(selection => {
            const optionElement = document.querySelector(`.option[data-category="${selection.category}"][data-item="${selection.item}"]`);
            if (optionElement) {
                optionElement.classList.add('selected');
                // Add to selectedItems array if not already there
                if (!selectedItems.some(item => item.category === selection.category && item.item === selection.item)) {
                    selectedItems.push(selection);
                }
            }
        });
        
        updateSelectedList();
    }
    
    // Initialize selected list on page load
    updateSelectedList();
});