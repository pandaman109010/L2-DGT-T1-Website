document.addEventListener("DOMContentLoaded", () => {
    // Cache key UI elements once the page has loaded.
    const form = document.getElementById("join-form");
    const errorText = document.getElementById("join-space-error");
    const showbutton = document.getElementById("join-button");
    const joinPanel = document.querySelector(".join");
    const closebutton = document.getElementById("close-btn");

// Open the join modal and play its entrance animation.
showbutton.addEventListener("click", () => {
    joinPanel.style.display = "block";
    joinPanel.classList.remove("hide-animation");
    // Show the whole container, not just the form
    joinPanel.classList.add("show-animation");
});


// Close the join modal by hiding the panel.
closebutton.addEventListener("click", () => {
    // Hide the join box
    joinPanel.classList.add("hide-animation");
    joinPanel.style.display = "none";
});

// Reusable validator: blocks spaces and shows a native browser validation bubble.
const blockSpaces = (event) => {
    const input = event.target;

    if (event.key === " ") {
        event.preventDefault(); // Stop them from typing the space
        
        // 1. Set the custom error message (this "primes" the bubble)
        input.setCustomValidity("Spaces are not allowed in this field.");
        
        // 2. Force the browser to show that specific bubble immediately
        input.reportValidity();
    } else {
        // 3. IMPORTANT: Reset the error so they can type other keys!
        input.setCustomValidity("");
    }
};

    // Apply the no-space rule to each field that must not contain spaces.
    document.getElementById("join-name").addEventListener("keydown", blockSpaces);
    document.getElementById("join-email").addEventListener("keydown", blockSpaces);
    document.getElementById("join-password").addEventListener("keydown", blockSpaces);

    // Clear the error text as soon as the user edits the form.
    form.addEventListener("input", () => {
        errorText.textContent = ""; 
    });

    // Final submit flow: stop page reload, validate, then show success/reset.
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (form.checkValidity()) {
            alert("Success! You joined the community.");
            form.reset();
        } else {
            form.reportValidity(); // This triggers the "Please fill in this field" bubble
        }
    });
});