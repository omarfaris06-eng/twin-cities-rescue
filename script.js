// Main JavaScript for Twin Cities Animal Rescue - Touchstone 4

// Data structures using Objects and Arrays (Advanced requirement)
const rescueDetails = {
    name: "Twin Cities Animal Rescue",
    region: "Twin Cities Metro Area",
    status: "Zero-Kill Shelter"
};

const petOptions = [
    { type: "dog", title: "Dogs & Puppies", info: "Friendly companions seeking active homes, regular walks, and yards." },
    { type: "cat", title: "Cats & Kittens", info: "Independent yet affectionate felines looking for cozy indoor living." },
    { type: "small", title: "Small Pets", info: "Gentle rabbits, guinea pigs, and small mammals suitable for quiet spaces." }
];

// Function 1: Handle dynamic updates for the interactive feature
function updatePetDisplay(selectedType) {
    const displayArea = document.getElementById('dynamic-pet-info');
    if (!displayArea) return;

    const foundPet = petOptions.find(item => item.type === selectedType);
    if (foundPet) {
        displayArea.innerHTML = `<strong>${foundPet.title}:</strong> ${foundPet.info}`;
        // Save selection to localStorage (Browser Storage requirement)
        localStorage.setItem('savedPetPreference', selectedType);
    } else {
        displayArea.innerHTML = "Please select a category above to view information.";
    }
}

// Function 2: Load saved preference from localStorage on startup
function restoreUserPreference() {
    const savedType = localStorage.getItem('savedPetPreference');
    const selectDropdown = document.getElementById('petTypeSelect');
    
    if (savedType && selectDropdown) {
        selectDropdown.value = savedType;
        updatePetDisplay(savedType);
    }
}

// Function 3: Form validation logic
function validateContactForm(event) {
    let isValid = true;

    // Clear previous errors
    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    if (nameErr) nameErr.textContent = "";
    if (emailErr) emailErr.textContent = "";

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('emailAddress');

    // Check 1: Required Name
    if (nameInput && nameInput.value.trim() === "") {
        isValid = false;
        if (nameErr) nameErr.textContent = "Error: Full name is required.";
    }

    // Check 2: Email format validation
    if (emailInput) {
        const val = emailInput.value.trim();
        if (val === "" || !val.includes("@") || !val.includes(".")) {
            isValid = false;
            if (emailErr) emailErr.textContent = "Error: Enter a valid email address.";
        }
    }

    // Prevent submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
}

// Event listeners initialization
document.addEventListener('DOMContentLoaded', () => {
    restoreUserPreference();

    const selectDropdown = document.getElementById('petTypeSelect');
    if (selectDropdown) {
        selectDropdown.addEventListener('change', (e) => {
            updatePetDisplay(e.target.value);
        });
    }

    const rescueForm = document.getElementById('rescueContactForm');
    if (rescueForm) {
        rescueForm.addEventListener('submit', validateContactForm);
    }
});
