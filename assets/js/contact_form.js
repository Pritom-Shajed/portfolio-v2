document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
            });

            if (response.ok) {
                // Clear the form
                form.reset();

                // Show success toast
                showToast("Successfully submitted!", "success");
            } else {
                showToast("Failed to submit. Please try again.", "error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            showToast("An error occurred. Please try again.", "error");
        }
    });

    function showToast(message, type) {
        const toast = document.createElement("toast-container");
        toast.textContent = message;
    
        // Add Tailwind classes for styling the toast
        toast.className = `fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
            type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`;
    
        // Append the toast to the body (no need for a separate container)
        document.body.appendChild(toast);
    
        // Automatically remove the toast after 3 seconds
        setTimeout(() => {
            toast.classList.add("opacity-0"); // Fade out the toast
            setTimeout(() => {
                toast.remove();
            }, 300); // Wait for the fade-out transition to finish
        }, 3000);
    }
    
});
