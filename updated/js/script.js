document.addEventListener('DOMContentLoaded', function() {
    console.log('Main JS loaded');

    // Add particles background
    createParticles();

    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // prevent default for animation

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (email && password) {
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                showLoadingAnimation(submitBtn);

                // Wait for animation, then submit using fetch
                setTimeout(async () => {
                    hideLoadingAnimation(submitBtn);
                    showSuccessAnimation(loginForm);

                    try {
                        const response = await fetch('/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: `loginEmail=${encodeURIComponent(email)}&loginPassword=${encodeURIComponent(password)}`
                        });

                        const text = await response.text();
                        if (response.ok) {
                            // If backend renders a page, replace current page
                            document.open();
                            document.write(text);
                            document.close();
                        } else {
                            alert(text);
                        }
                    } catch (err) {
                        alert('Error connecting to server.');
                        console.error(err);
                    }

                }, 500); // half second animation
            } else {
                showErrorAnimation(loginForm);
                alert('Please fill in all fields');
            }
        });
    }

    // Handle Registration Form (same as before, fixed for fetch)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            if (name && email && password) {
                const submitBtn = registerForm.querySelector('button[type="submit"]');
                showLoadingAnimation(submitBtn);

                setTimeout(async () => {
                    hideLoadingAnimation(submitBtn);
                    showSuccessAnimation(registerForm);

                    try {
                        const response = await fetch('/register', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: `registerName=${encodeURIComponent(name)}&registerEmail=${encodeURIComponent(email)}&registerPassword=${encodeURIComponent(password)}`
                        });

                        const text = await response.text();
                        document.open();
                        document.write(text);
                        document.close();
                    } catch (err) {
                        alert('Error connecting to server.');
                        console.error(err);
                    }

                }, 500);
            } else {
                showErrorAnimation(registerForm);
                alert('Please fill in all fields');
            }
        });
    }

    // --- Animation functions ---
    function showLoadingAnimation(button) {
        button.disabled = true;
        button.innerText = 'Processing...';
    }

    function hideLoadingAnimation(button) {
        button.disabled = false;
        button.innerText = button.tagName === 'BUTTON' ? 'Submit' : button.innerText;
    }

    function showSuccessAnimation(form) {
        form.style.animation = 'none';
        form.offsetHeight;
        form.style.animation = 'pulse 0.6s ease-in-out';
    }

    function showErrorAnimation(form) {
        form.style.animation = 'none';
        form.offsetHeight;
        form.style.animation = 'shake 0.5s ease-in-out';
    }

    // --- Particle Background ---
    function createParticles() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < 15; i++) {
            setTimeout(() => createParticle(container), i * 200);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            position: absolute;
            border-radius: 50%;
            background: rgba(52, 152, 219, 0.2);
        `;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, duration * 1000);
    }
});
