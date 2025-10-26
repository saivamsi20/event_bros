// events.js

document.addEventListener("DOMContentLoaded", () => {
  // Attach event listeners for search and filter elements
  const eventSearchInput = document.getElementById("eventSearch");
  const eventCategorySelect = document.getElementById("eventCategory");
  const eventDateInput = document.getElementById("eventDate");
  const applyFiltersButton = document.querySelector(
    ".search-filter-section .btn-primary"
  ); // Assuming there's an 'Apply Filters' button

  if (eventSearchInput) {
    eventSearchInput.addEventListener("keyup", filterEvents);
  }
  if (eventCategorySelect) {
    eventCategorySelect.addEventListener("change", filterEvents);
  }
  if (eventDateInput) {
    eventDateInput.addEventListener("change", filterEvents);
  }
  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", filterEvents);
  }

  // Initial filter call to ensure correct display on page load
  filterEvents();
});

/**
 * Filters the event cards displayed on the page based on search term, category, and date.
 */
function filterEvents() {
  const searchTerm = document.getElementById("eventSearch").value.toLowerCase();
  const selectedCategory = document.getElementById("eventCategory").value;
  const selectedDate = document.getElementById("eventDate").value; // Format YYYY-MM-DD

  const eventCards = document.querySelectorAll(".event-card");
  let eventsFound = 0;

  eventCards.forEach((card) => {
    const eventName = card.getAttribute("data-name").toLowerCase();
    const eventCategory = card.getAttribute("data-category"); // Can be multiple, e.g., "Academic, Workshop"
    const eventDate = card.getAttribute("data-date"); // Format YYYY-MM-DD
    const cardDescription = card
      .querySelector("p:not(.category):not(.club-name)")
      .textContent.toLowerCase();

    // Check if event name or description includes search term
    const matchesSearch =
      eventName.includes(searchTerm) || cardDescription.includes(searchTerm);

    // Check if event category matches (handles multiple categories per event card)
    const matchesCategory =
      selectedCategory === "" || eventCategory.includes(selectedCategory);

    // Check if event date matches or is after the selected date
    let matchesDate = true;
    if (selectedDate !== "") {
      // Compare YYYY-MM-DD strings directly
      matchesDate = eventDate >= selectedDate;
    }

    if (matchesSearch && matchesCategory && matchesDate) {
      card.style.display = "flex"; // Show card
      eventsFound++;
    } else {
      card.style.display = "none"; // Hide card
    }
  });

  const noEventsMessage = document.getElementById("noEventsMessage");
  if (noEventsMessage) {
    if (eventsFound === 0) {
      noEventsMessage.style.display = "block";
    } else {
      noEventsMessage.style.display = "none";
    }
  }
}
