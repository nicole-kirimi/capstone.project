document.getElementById('login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
        // Redirect to home page on successful login
        window.location.href = 'home.html';
    } else {
        alert('Incorrect username or password');
    }
});

document.getElementById('signup-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, password: newPassword })
    });

    const result = await response.json();
    if (result.success) {
        alert('Sign-up successful! Please log in.');
        window.location.href = 'index.html';
    } else {
        alert('Sign-up failed: ' + result.message);
    }
});

document.getElementById('login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (result.success) {
        // Redirect to home page on successful login
        window.location.href = 'home.html';
    } else {
        alert('Incorrect username or password');
    }
});

document.getElementById('signup-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, password: newPassword })
    });

    const result = await response.json();
    if (result.success) {
        alert('Sign-up successful! Please log in.');
        window.location.href = 'index.html';
    } else {
        alert('Sign-up failed: ' + result.message);
    }
});
