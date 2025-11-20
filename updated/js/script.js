// Form handling for login and registration ONLY
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main JS loaded');
    
    // Add particles to background
    createParticles();
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation with animation
            if (email && password) {
                // Show loading animation
                const submitBtn = this.querySelector('.btn-block');
                showLoadingAnimation(submitBtn);
                
                // Simulate API call
                setTimeout(() => {
                    hideLoadingAnimation(submitBtn);
                    showSuccessAnimation(this);
                    setTimeout(() => {
                        alert('Login successful! Redirecting to home page...');
                        window.location.href = 'index.html';
                    }, 1000);
                }, 2000);
            } else {
                showErrorAnimation(this);
                alert('Please fill in all fields');
            }
        });
        
        // Add input animations
        addInputAnimations(loginForm);
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            
            // Simple validation with animation
            if (name && email && password) {
                // Show loading animation
                const submitBtn = this.querySelector('.btn-block');
                showLoadingAnimation(submitBtn);
                
                // Simulate API call
                setTimeout(() => {
                    hideLoadingAnimation(submitBtn);
                    showSuccessAnimation(this);
                    setTimeout(() => {
                        alert('Registration successful! Please login.');
                        window.location.href = 'login.html';
                    }, 1000);
                }, 2000);
            } else {
                showErrorAnimation(this);
                alert('Please fill in all fields');
            }
        });
        
        // Add input animations
        addInputAnimations(registerForm);
    }
    
    // Animation functions
    function showLoadingAnimation(button) {
        button.classList.add('btn-loading');
        button.disabled = true;
    }
    
    function hideLoadingAnimation(button) {
        button.classList.remove('btn-loading');
        button.disabled = false;
    }
    
    function showSuccessAnimation(form) {
        form.style.animation = 'none';
        form.offsetHeight; // Trigger reflow
        form.style.animation = 'pulse 0.6s ease-in-out';
        
        // Add success checkmark animation
        const submitBtn = form.querySelector('.btn-block');
        submitBtn.innerHTML = '✓ Success!';
        submitBtn.style.backgroundColor = '#2ecc71';
    }
    
    function showErrorAnimation(form) {
        form.style.animation = 'none';
        form.offsetHeight; // Trigger reflow
        form.style.animation = 'shake 0.5s ease-in-out';
        
        // Highlight empty fields
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            if (!input.value) {
                input.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            }
        });
    }
    
    function addInputAnimations(form) {
        const inputs = form.querySelectorAll('input');
        
        inputs.forEach((input, index) => {
            // Add focus animations
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.zIndex = '1';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.style.zIndex = '0';
            });
            
            // Add typing animation
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.style.background = 'linear-gradient(90deg, rgba(46, 204, 113, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%)';
                } else {
                    this.style.background = 'rgba(255, 255, 255, 0.9)';
                }
            });
        });
    }
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particlesContainer);
        
        // Create 15 particles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createParticle(particlesContainer);
            }, i * 200);
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
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
            createParticle(container); // Create new particle
        }, duration * 1000);
    }
});