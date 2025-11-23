// Volunteer Form Specific Behavior
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteerForm');
    const successMessage = document.getElementById('vSuccessMessage');
    const whatHappensNext = document.getElementById('vWhatHappensNext');
    
    if (volunteerForm) {
        // Checkbox validation function
        function validateCheckboxGroup(name, errorMessage) {
            const checkboxes = volunteerForm.querySelectorAll(`input[name="${name}"]`);
            const checked = Array.from(checkboxes).some((cb) => cb.checked);
            
            const firstCheckbox = checkboxes[0];
            const formGroup = firstCheckbox.closest('.form-group');
            const errorElement = formGroup ? formGroup.querySelector('.error-message') : null;
            
            if (!checked) {
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = 'block';
                }
                return false;
            } else {
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                return true;
            }
        }
        
        // Real-time validation for checkboxes
        const daysCheckboxes = volunteerForm.querySelectorAll('input[name="days"]');
        daysCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', function() {
                validateCheckboxGroup('days', 'Please select at least one day');
            });
        });
        
        const timeCheckboxes = volunteerForm.querySelectorAll('input[name="timeOfDay"]');
        timeCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', function() {
                validateCheckboxGroup('timeOfDay', 'Please select at least one time of day');
            });
        });
        
        // Form submission handler
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate standard fields using global validation function
            if (typeof validateForm === 'function') {
                isValid = validateForm(this);
            }
            
            // Validate checkbox groups
            const daysValid = validateCheckboxGroup('days', 'Please select at least one day');
            const timeValid = validateCheckboxGroup('timeOfDay', 'Please select at least one time of day');
            
            // Combined validation check
            if (!isValid || !daysValid || !timeValid) {
                // Scroll to first error
                const firstError = this.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    firstError.closest('.form-group').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
                return;
            }
            
            // If all validation passes, proceed with form submission animation
            volunteerForm.style.transition = 'opacity 0.5s ease-out';
            volunteerForm.style.opacity = '0';
            
            setTimeout(function() {
                // Remove form from display
                volunteerForm.style.display = 'none';
                
                // Show success message
                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s ease-in';
                
                setTimeout(function() {
                    successMessage.style.opacity = '1';
                }, 50);
                
                // Show "What Happens Next" section after a short delay
                setTimeout(function() {
                    whatHappensNext.style.display = 'block';
                    whatHappensNext.style.opacity = '0';
                    whatHappensNext.style.transition = 'opacity 0.5s ease-in';
                    
                    setTimeout(function() {
                        whatHappensNext.style.opacity = '1';
                        
                        // Smooth scroll to success message
                        successMessage.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 50);
                }, 500);
            }, 500);
        });
    }
});