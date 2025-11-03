document.addEventListener("DOMContentLoaded", () => {
    const mainElement = document.querySelector("main");
    
    if (!mainElement) {
        console.error("Main element not found.");
        return;
    }

    function generateJson(formElement) {
        if (!formElement) return;

        const formData = new FormData(formElement);
        
        // Build JSON Object
        const jsonData = {};

        // Basic Info
        jsonData.firstName = formData.get('fname') || '';
        jsonData.preferredName = formData.get('nname') || '';
        const mname = formData.get('mname') || '';
        jsonData.middleInitial = mname ? mname.charAt(0).toUpperCase() : '';
        jsonData.lastName = formData.get('lname') || '';
        jsonData.divider = formData.get('divider') || '';
        jsonData.mascotAdjective = formData.get('adj') || '';
        jsonData.mascotAnimal = formData.get('animal') || '';

        jsonData.image = 'images/gp-2020-lookkback.jpeg'; 
        jsonData.imageCaption = formData.get('caption') || '';
        
        jsonData.personalStatement = "...";
        jsonData.personalBackground = formData.get('personal_bg') || '';
        jsonData.professionalBackground = formData.get('professional_bg') || '';
        jsonData.academicBackground = formData.get('academic_bg') || '';
        jsonData.subjectBackground = "...";
        jsonData.primaryComputer = formData.get('primary_computer') || '';

        // Courses
        jsonData.courses = [];
        const courseCodes = formData.getAll('course_code');
        const courseNames = formData.getAll('course_name');
        const courseReasons = formData.getAll('course_reason');
      
        //Put courses into JSON
        for (let i = 0; i < courseCodes.length; i++) {
            const codeParts = (courseCodes[i] || ' ').split(' ');
            let dept = codeParts[0] || 'EXAMPLE';
            let num = codeParts.slice(1).join(' ') || '101';

            jsonData.courses.push({
                department: dept,
                number: num,
                name: courseNames[i] || '',
                reason: courseReasons[i] || ''
            });
        }
    

        // Links
        jsonData.links = [];
        const linkUrls = [
            formData.get('link1'),
            formData.get('link2'),
            formData.get('link3'),
            formData.get('link4'),
            formData.get('link5')
        ];
        const linkNames = ['CLT Web', 'GitHub', 'freeCodeCamp', 'Codecademy', 'LinkedIn'];

        // Add links if URL is provided
        for (let i = 0; i < linkUrls.length; i++) {
            if (linkUrls[i]) {
                jsonData.links.push({
                    name: linkNames[i] || `Link ${i+1}`,
                    href: linkUrls[i]
                });
            }
        }
        
        // Output HTML
        const jsonString = JSON.stringify(jsonData, null, 2);
        
        // Escape HTML characters
        const escapedJsonString = jsonString.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const outputHTML = `
            <h2>Introduction HTML</h2>
            <p>This page displays the JSON data generated from the introduction form. You can copy the code below.</p>
            <section class="json-output">
                <pre><code class="language-json">${escapedJsonString}</code></pre>
            </section>
            <br>
            <button type="button" id="reset-page">Reset</button>
        `;

        // Replace content and highlight.js
        mainElement.innerHTML = outputHTML;

        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        } else {
            console.warn("Highlight.js not found. Code will not be highlighted.");
        }
    }

    // Click listener
    mainElement.addEventListener('click', (e) => {
        if (e.target.matches('#generate-json')) {
            e.preventDefault();
            const form = mainElement.querySelector("#form");
            if (form) {
                if (!form.checkValidity()) {
                    form.reportValidity(); // Show validation errors if form is incomplete
                } else {
                    generateJson(form);
                }
            }
        }
    });
});