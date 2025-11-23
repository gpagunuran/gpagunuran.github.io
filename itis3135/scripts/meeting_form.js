// Meeting Form Specific Behavior
document.addEventListener('DOMContentLoaded', function() {
    const meetingForm = document.getElementById('meetingForm');
    const successMessage = document.getElementById('successMessage');
    const whatToExpect = document.getElementById('whatToExpect');
    
    if (meetingForm) {
        // Override the default form submission from form_validation.js
        meetingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate the form using the validation function from form_validation.js
            if (typeof validateForm === 'function' && validateForm(this)) {
                // Hide the form with a fade-out effect
                meetingForm.style.transition = 'opacity 0.5s ease-out';
                meetingForm.style.opacity = '0';
                
                setTimeout(function() {
                    // Remove form from display
                    meetingForm.style.display = 'none';
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease-in';
                    
                    setTimeout(function() {
                        successMessage.style.opacity = '1';
                    }, 50);
                    
                    // Show "What to Expect" section after a short delay
                    setTimeout(function() {
                        whatToExpect.style.display = 'block';
                        whatToExpect.style.opacity = '0';
                        whatToExpect.style.transition = 'opacity 0.5s ease-in';
                        
                        setTimeout(function() {
                            whatToExpect.style.opacity = '1';
                            
                            // Smooth scroll to success message
                            successMessage.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start' 
                            });
                        }, 50);
                    }, 500);
                }, 500);
            } else {
                // If form is invalid, scroll to first error
                const firstError = this.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    firstError.closest('.form-group').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
});