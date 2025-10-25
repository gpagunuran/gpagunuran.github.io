
function loadImage() {
    var image = document.getElementById("IntroImage").files[0];
    const imageUrl = URL.createObjectURL(image);
    var text = "<img src='" + imageUrl + "' >";
    document.getElementById("loadImage").innerHTML = text;
}

document.addEventListener("DOMContentLoaded", () => {

    //Variables
    const mainElement = document.querySelector("main");
    const originalFormHTML = mainElement.innerHTML;
    let defaultFormData;

    //Functions
    function addCourseEntry() {
        let courseContainer = null;
        const courseEntries = document.querySelectorAll('div.course-entry');
        if (courseEntries.length > 0) {
            courseContainer = courseEntries[0].parentElement;
        } else {
             const label = document.querySelector('label + input[name="course_code"]');
             if (label && label.parentElement && label.parentElement.parentElement) {
                 courseContainer = label.parentElement.parentElement;
             }
        }
        const addCourseButton = courseContainer ? courseContainer.querySelector('#add-course-btn') : null;
        if (!courseContainer || !addCourseButton) return;

        const newCourse = document.createElement('div');
        newCourse.className = 'course-entry';
        newCourse.innerHTML = `
            <label>Course Code:</label> <input type="text" name="course_code" placeholder="e.g., ITIS 3135" required>
            <label>Name:</label> <input type="text" name="course_name" placeholder="Name" required>
            <label>Reason:</label> <textarea name="course_reason" placeholder="Reason" required></textarea>
            <button type="button" class="delete-course" style="color:red; background: #fee;">Delete</button>
        `;
        courseContainer.insertBefore(newCourse, addCourseButton);
    }

    function handleSubmit(formElement) {
        if (!formElement.checkValidity()) {
            formElement.reportValidity();
            return;
        }

        const formData = new FormData(formElement);
        const fname = formData.get('fname') || '';
        const mname = formData.get('mname') ? ` ${formData.get('mname')}` : '';
        const nname = formData.get('nname') ? ` (${formData.get('nname')})` : '';
        const lname = formData.get('lname') || '';
        const fullName = `${fname}${mname}${nname} ${lname}`;

        const picInput = document.getElementById('IntroImage');
        let imageUrl = 'images/gp-2020-lookkback.jpeg'; // Default
        if (picInput && picInput.files && picInput.files[0]) {
            imageUrl = URL.createObjectURL(picInput.files[0]);
        }

        let coursesHTML = '<ul>';
        const courseCodes = formData.getAll('course_code');
        const courseNames = formData.getAll('course_name');
        const courseReasons = formData.getAll('course_reason');
        for (let i = 0; i < courseCodes.length; i++) {
            coursesHTML += `<li><b>${courseCodes[i]} - ${courseNames[i]}:</b> ${courseReasons[i]}</li>`;
        }
        coursesHTML += '</ul>';

        let bulletsHTML = '<ul>';
        bulletsHTML += `<li><b>Personal Background:</b> ${formData.get('personal_bg') || ''}</li>`;
        bulletsHTML += `<li><b>Professional Background:</b> ${formData.get('professional_bg') || ''}</li>`;
        bulletsHTML += `<li><b>Academic Background:</b> ${formData.get('academic_bg') || ''}</li>`;
        bulletsHTML += `<li><b>Primary Computer:</b> ${formData.get('primary_computer') || ''}</li>`;
        bulletsHTML += `<li><b>Courses I’m Taking, & Why:</b>${coursesHTML}</li>`;
        bulletsHTML += `<li><b>Funny/Interesting Item to Remember Me by:</b> ${formData.get('funny_item') || ''}</li>`;
        bulletsHTML += `<li><b>I’d Also Like to Share:</b> ${formData.get('share_other') || ''}</li>`;
        bulletsHTML += '</ul>';

        const outputHTML = `
            <h2>Introduction ${formData.get('divider') || ''} ${fullName}</h2>
            <figure class="intro-figure">
                <img class="intro-pic" src="${imageUrl}" alt="${fullName}">
                <figcaption>${formData.get('caption') || ''}</figcaption>
            </figure>
            ${bulletsHTML}
            <p class="memorable-item"><b>${formData.get('share_other') || ''}</b></p>
            <p>${formData.get('funny_item') || ''}</p>
            <br>
            <button type="button" id="reset-page">Reset</button>
        `;
        
        mainElement.innerHTML = outputHTML;
    }

    function clearForm(formElement) {
        Array.from(formElement.querySelectorAll("input")).forEach((input) => {
            if (input.type !== 'hidden') {
                input.value = "";
                if (input.type === 'checkbox' || input.type === 'radio') input.checked = false;
            }
        });
        Array.from(formElement.querySelectorAll("textarea")).forEach((textarea) => { 
            textarea.value = "";
        });
        const courses = formElement.querySelectorAll('.course-entry');
        courses.forEach((course, index) => {
            if (index > 0) course.remove(); 
        });
        const loadImageDiv = formElement.querySelector("#loadImage");
        if (loadImageDiv) loadImageDiv.innerHTML = "";
    }
    

    function setupCourseControls() {
        let courseContainer = null;
        const courseEntries = document.querySelectorAll('div.course-entry');
        if (courseEntries.length > 0) {
            courseContainer = courseEntries[0].parentElement;
        } else {
             const label = document.querySelector('label + input[name="course_code"]');
             if (label && label.parentElement && label.parentElement.parentElement) {
                 courseContainer = label.parentElement.parentElement;
             }
        }
        if (!courseContainer) return;

        // Only add the button if it doesn't exist
        if (!courseContainer.querySelector('#add-course-btn')) {
            let addCourseButton = document.createElement('button');
            addCourseButton.type = 'button';
            addCourseButton.id = 'add-course-btn';
            addCourseButton.textContent = 'Add Course';
            courseContainer.appendChild(addCourseButton);
        }
    }

    function restoreOriginalForm() {
        mainElement.innerHTML = originalFormHTML;
        setupCourseControls(); 
        defaultFormData = new FormData(document.getElementById("form"));
    }

    //Execute

    // 1. Set up the 'Add Course' button on the initial form
    setupCourseControls();
    
    // 2. Capture the default form data *after* setup is complete
    defaultFormData = new FormData(document.getElementById("form"));

    // 3. Attach ONE master listener to the <main> element
    mainElement.addEventListener('click', (e) => {
        const form = mainElement.querySelector("#form"); // Get current form instance
        
        if (e.target.matches('button[type="submit"]')) {
            e.preventDefault(); 
            if (form) handleSubmit(form); 
        }
        
        // ** UPDATED: Directly call restoreOriginalForm **
        if (e.target.matches('button[type="reset"]')) {
            e.preventDefault(); 
            if (form) restoreOriginalForm(); 
        }
        
        if (e.target.matches('#clear-form')) {
           if (form) clearForm(form); 
        }
        
        if (e.target.matches('#add-course-btn')) {
            addCourseEntry();
        }
        
        if (e.target.matches('.delete-course')) {
            e.target.parentElement.remove();
        }
        
        // This button only exists on the output page
        if (e.target.matches('#reset-page')) {
            restoreOriginalForm();
        }
    });
});