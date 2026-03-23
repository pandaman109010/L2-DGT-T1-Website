document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("join-form");
    const errorText = document.getElementById("join-space-error");
    const showbutton = document.getElementById("join-button");
    const joinPanel = document.querySelector(".join");
    const closebutton = document.getElementById("close-btn");

showbutton.addEventListener("click", () => {
    joinPanel.style.display = "block";
    joinPanel.classList.remove("hide-animation");
    // Show the whole container, not just the form
    joinPanel.classList.add("show-animation");
});


closebutton.addEventListener("click", () => {
    // Hide the join box
    joinPanel.classList.add("hide-animation");
    joinPanel.style.display = "none";
});

    // 1. Function to handle the "No Space" rule
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

    // 2. Attach the rule to your three inputs manually (no loops needed yet)
    document.getElementById("join-name").addEventListener("keydown", blockSpaces);
    document.getElementById("join-email").addEventListener("keydown", blockSpaces);
    document.getElementById("join-password").addEventListener("keydown", blockSpaces);

    // 3. Clear the error when they type anything valid
    form.addEventListener("input", () => {
        errorText.textContent = ""; 
    });

    // 4. Handle the Final Join
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