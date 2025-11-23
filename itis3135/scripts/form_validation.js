// Form validation functions

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (US format)
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length === 10;
}

// Display error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    input.style.borderColor = '#d32f2f';
}

// Clear error message
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    input.style.borderColor = '#ddd';
}

// Validate required fields
function validateRequired(input) {
    if (input.value.trim() === '') {
        showError(input, 'This field is required');
        return false;
    }
    clearError(input);
    return true;
}

// Real-time validation listeners
function setupValidation() {
    // Email inputs
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach((input) => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !validateEmail(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else if (this.value.trim() === '' && this.hasAttribute('required')) {
                showError(this, 'Email is required');
            } else {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '' && validateEmail(this.value)) {
                clearError(this);
            }
        });
    });
    
    // Phone inputs
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((input) => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !validatePhone(this.value)) {
                showError(this, 'Please enter a valid 10-digit phone number');
            } else if (this.value.trim() === '' && this.hasAttribute('required')) {
                showError(this, 'Phone number is required');
            } else {
                clearError(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '' && validatePhone(this.value)) {
                clearError(this);
            }
        });
    });
    
    // Required text inputs
    const requiredInputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    requiredInputs.forEach((input) => {
        input.addEventListener('blur', function() {
            validateRequired(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                clearError(this);
            }
        });
    });
}

// Form submission validation (globally accessible)
function validateForm(form) {
    let isValid = true;
    
    // Validate all required fields
    const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    requiredInputs.forEach((input) => {
        if (!validateRequired(input)) {
            isValid = false;
        }
    });
    
    // Validate email fields
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach((input) => {
        if (input.value.trim() !== '' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    // Validate phone fields
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((input) => {
        if (input.value.trim() !== '' && !validatePhone(input.value)) {
            showError(input, 'Please enter a valid 10-digit phone number');
            isValid = false;
        }
    });
    
    return isValid;
}

// Initialize validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupValidation();
    
    // Handle form submissions (only for forms without custom handlers)
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        // Skip forms with custom handlers
        if (form.id === 'meetingForm' || form.id === 'volunteerForm') {
            return;
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Form is valid - show success message
                alert('Form submitted successfully! Thank you for your submission.');
                this.style.display = 'none';
                
                // Clear any remaining error messages
                const errorMessages = this.querySelectorAll('.error-message');
                errorMessages.forEach((error) => {
                    error.style.display = 'none';
                });
                
                const inputs = this.querySelectorAll('input, textarea, select');
                inputs.forEach((input) => {
                    input.style.borderColor = '#ddd';
                });
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    firstError.closest('.form-group').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    });
});