// Check if user is already logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form['confirm-password'].value;
    const preferredLanguage = form['preferred-language'].value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    // Create new user
    const newUser = {
        name,
        email,
        password, // Note: In a real app, you should hash the password
        preferredLanguage,
        progress: {
            streak: 0,
            wordsLearned: 0,
            quizzesCompleted: 0
        }
    };

    // Save user
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('user', JSON.stringify(newUser));

    // Redirect to home page
    window.location.href = 'index.html';
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const remember = form.remember.checked;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Save user session
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password!');
    }
}

// Initialize authentication
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Add event listeners based on current page
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}); 