document.addEventListener('DOMContentLoaded', () => {
    // Get references to the registration and login forms
    const registrationForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    // Get reference to the user table body if it exists
    const userTableBody = document.getElementById('userTable')?.querySelector('tbody');

    // Load saved user profiles from local storage when the page is loaded
    loadUserProfiles();

    // Handle registration form submission
    registrationForm.addEventListener('submit', (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the email and password values from the registration form
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Validate the email and password
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Create a user profile object
        const userProfile = {
            email,
            password,
            id: Date.now() // Use current timestamp as a unique ID
        };

        // Save the user profile to local storage and display it in the user table
        saveUserProfile(userProfile);
        displayUserProfile(userProfile);

        // Reset the registration form
        registrationForm.reset();

        // Show a success message
        alert('Registration successful!');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the email and password values from the login form
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Validate the email and password
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        // Get the saved user profiles from local storage
        const profiles = JSON.parse(localStorage.getItem('userProfiles')) || [];
        // Find a user profile that matches the provided email and password
        const user = profiles.find(profile => profile.email === email && profile.password === password);

        // If a matching user is found, show a success message and redirect to index.html
        if (user) {
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            // If no matching user is found, show an error message
            alert('Invalid email or password.');
        }

        // Reset the login form
        loginForm.reset();
    });

    // Function to load user profiles from local storage and display them
    function loadUserProfiles() {
        const profiles = JSON.parse(localStorage.getItem('userProfiles')) || [];
        profiles.forEach(profile => displayUserProfile(profile));
    }

    // Function to save a user profile to local storage
    function saveUserProfile(profile) {
        const profiles = JSON.parse(localStorage.getItem('userProfiles')) || [];
        profiles.push(profile);
        localStorage.setItem('userProfiles', JSON.stringify(profiles));
    }

    // Function to display a user profile in the user table
    function displayUserProfile(profile) {
        if (!userTableBody) return; // If the user table body does not exist, do nothing

        const row = document.createElement('tr'); // Create a new table row
        row.dataset.id = profile.id; // Set the data-id attribute to the user's ID

        const emailCell = document.createElement('td'); // Create a cell for the email
        emailCell.textContent = profile.email; // Set the email cell's text content

        const actionsCell = document.createElement('td'); // Create a cell for action buttons

        const deleteButton = document.createElement('button'); // Create a delete button
        deleteButton.textContent = 'Delete'; // Set the button's text content
        deleteButton.className = 'btn btn-secondary'; // Add a class to the button
        deleteButton.addEventListener('click', () => deleteUserProfile(profile.id, row)); // Add an event listener to handle deletion

        actionsCell.appendChild(deleteButton); // Add the delete button to the actions cell

        row.appendChild(emailCell); // Add the email cell to the row
        row.appendChild(actionsCell); // Add the actions cell to the row

        userTableBody.appendChild(row); // Add the row to the user table body
    }

    // Function to delete a user profile
    function deleteUserProfile(id, row) {
        let profiles = JSON.parse(localStorage.getItem('userProfiles')) || [];
        profiles = profiles.filter(profile => profile.id !== id); // Remove the user profile with the matching ID
        localStorage.setItem('userProfiles', JSON.stringify(profiles)); // Save the updated profiles back to local storage
        userTableBody.removeChild(row); // Remove the row from the table
    }

    // Function to validate an email address
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation
        return re.test(email); // Test the email against the regex and return the result
    }

    // Function to validate a password
    function validatePassword(password) {
        return password.length >= 6; // Ensure the password is at least 6 characters long
    }
});

// Function to toggle between login and registration forms
function toggleForm(form) {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    if (form === 'login') {
        loginContainer.style.display = 'block'; // Show the login form
        registerContainer.style.display = 'none'; // Hide the registration form
    } else {
        loginContainer.style.display = 'none'; // Hide the login form
        registerContainer.style.display = 'block'; // Show the registration form
    }
}