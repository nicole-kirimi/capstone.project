document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Login form submitted');

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            console.log('Username:', username);
            console.log('Password:', password);

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();
                console.log('Server response:', result);
                if (result.success) {
                    window.location.href = 'home.html';
                } else {
                    alert('Incorrect username or password');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Signup form submitted');

            const newUsername = document.getElementById('new-username').value;
            const newPassword = document.getElementById('new-password').value;
            console.log('New Username:', newUsername);
            console.log('New Password:', newPassword);

            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: newUsername, password: newPassword })
                });

                const result = await response.json();
                console.log('Server response:', result);
                if (result.success) {
                    alert('Sign-up successful! Please log in.');
                    window.location.href = 'index.html';
                } else {
                    alert('Sign-up failed: ' + result.message);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        });
    }
});
