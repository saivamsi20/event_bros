// main.js

document.addEventListener("DOMContentLoaded", () => {
  // This is a good place for general DOM-related scripts,
  // like hamburger menu toggles, modal handlers, etc.
  // For now, we'll keep it focused on the clubs page filtering.

  // Example: Highlight active navigation link
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar nav ul li a");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // You can add more global JS here
});

// Function to filter clubs based on search and category
function filterClubs() {
  const searchTerm = document.getElementById("clubSearch").value.toLowerCase();
  const selectedCategory = document.getElementById("clubCategory").value;
  const clubCards = document.querySelectorAll(".club-card");
  let clubsFound = 0;

  clubCards.forEach((card) => {
    const clubName = card.getAttribute("data-name").toLowerCase();
    const clubCategory = card.getAttribute("data-category");
    const cardDescription = card
      .querySelector("p:not(.category)")
      .textContent.toLowerCase(); // Get description text

    const matchesSearch =
      clubName.includes(searchTerm) || cardDescription.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "" || clubCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = "flex"; // Show card
      clubsFound++;
    } else {
      card.style.display = "none"; // Hide card
    }
  });

  const noClubsMessage = document.getElementById("noClubsMessage");
  if (clubsFound === 0) {
    noClubsMessage.style.display = "block";
  } else {
    noClubsMessage.style.display = "none";
  }
}

// Initial filter call in case any pre-selected options exist or for initial display
// This can be called when the DOM is fully loaded, but since inputs have onchange/onkeyup,
// it will also react to user input.
// document.addEventListener('DOMContentLoaded', filterClubs); // Uncomment if you want to apply filter on page load
