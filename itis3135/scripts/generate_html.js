document.addEventListener("DOMContentLoaded", () => {
    const mainElement = document.querySelector("main");
    
    if (!mainElement) {
        console.error("Main element not found.");
        return;
    }

    //returns escaped string
    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    function generateIntroHtml(formElement) {
        if (!formElement) return;

        const formData = new FormData(formElement);

        // Get form data
        const fname = formData.get('fname') || '';
        const mname = formData.get('mname') || '';
        const nname = formData.get('nname') || '';
        const lname = formData.get('lname') || '';
        const divider = formData.get('divider') || '';
        const adj = formData.get('adj') || '';
        const animal = formData.get('animal') || '';
        const caption = formData.get('caption') || '';
        const imageUrl = 'images/gp-2020-lookkback.jpeg'; // Default image

        // Make HTML string
        let htmlOutput = "";

        let title = `<h3>${escapeHTML(fname)}`;
        if (mname) title += ` ${escapeHTML(mname)}`;
        if (nname) title += ` (${escapeHTML(nname)})`;
        title += ` ${escapeHTML(lname)} ${escapeHTML(divider)} ${escapeHTML(adj)} ${escapeHTML(animal)}</h3>\n\n`;
        htmlOutput += title;

        htmlOutput += `<figure>\n`;
        htmlOutput += `    <img\n`;
        htmlOutput += `        src="${escapeHTML(imageUrl)}"\n`;
        htmlOutput += `        alt="Introduction image for ${escapeHTML(fname)} ${escapeHTML(lname)}"\n`;
        htmlOutput += `    />\n`;
        htmlOutput += `    <figcaption>${escapeHTML(caption)}</figcaption>\n`;
        htmlOutput += `</figure>\n\n`;

        htmlOutput += `<ul>\n`;
        htmlOutput += `    <li>\n        <strong>Personal Background:</strong> ${escapeHTML(formData.get('personal_bg') || '')}\n    </li>\n`;
        htmlOutput += `    <li>\n        <strong>Professional Background:</strong> ${escapeHTML(formData.get('professional_bg') || '')}\n    </li>\n`;
        htmlOutput += `    <li>\n        <strong>Academic Background:</strong> ${escapeHTML(formData.get('academic_bg') || '')}\n    </li>\n`;
        htmlOutput += `    <li>\n        <strong>Primary Computer:</strong> ${escapeHTML(formData.get('primary_computer') || '')}\n    </li>\n`;
        
        htmlOutput += `    <li>\n        <strong>Courses I’m Taking, & Why:</strong>\n        <ul>\n`;
        const courseCodes = formData.getAll('course_code');
        const courseNames = formData.getAll('course_name');
        const courseReasons = formData.getAll('course_reason');
        
        // Loop through courses
        for (let i = 0; i < courseCodes.length; i++) {
            htmlOutput += `            <li>\n                <strong>${escapeHTML(courseCodes[i] || '')} - ${escapeHTML(courseNames[i] || '')}:</strong> ${escapeHTML(courseReasons[i] || '')}\n            </li>\n`;
        }
        htmlOutput += `        </ul>\n    </li>\n`;

        htmlOutput += `    <li>\n        <strong>Funny/Interesting Item to Remember Me by:</strong> ${escapeHTML(formData.get('funny_item') || '')}\n    </li>\n`;
        htmlOutput += `    <li>\n        <strong>I’d Also Like to Share:</strong> ${escapeHTML(formData.get('share_other') || '')}\n    </li>\n`;
        htmlOutput += `</ul>\n`;


        const pageOutput = `
            <h2>Introduction HTML</h2>
            <p>This page displays the HTML source code generated from the introduction form. You can copy the code below.</p>
            <section class="html-output">
                <pre><code class="language-html">${htmlOutput}</code></pre>
            </section>
            <br>
            <button type="button" id="reset-page">Reset</button>
        `;

        //Replace Content and Highlight.js
        mainElement.innerHTML = pageOutput;

        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        } else {
            console.warn("Highlight.js not found. Code will not be highlighted.");
        }
    }

    // Click listener
    mainElement.addEventListener('click', (e) => {
        if (e.target.matches('#generate-html')) {
            e.preventDefault();
            const form = mainElement.querySelector("#form");
            if (form) {
                if (!form.checkValidity()) {
                    form.reportValidity(); // Show validation errors if form is incomplete
                } else {
                    generateIntroHtml(form);
                }
            }
        }
    });
});