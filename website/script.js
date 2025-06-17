import { Resume } from './resume.js';  // Import the Resume class from resume.js
import { educationRoasts, experienceRoasts, skillsRoasts, generalRoasts, awardsRoasts, publicationsRoasts } from './roastRules.js';  // Import roast rules from roastRules.js
import { applyPatternDict } from './roastRules.js';  // Import the pattern matching function

// Define the SECTION_PATTERN_RULES for each section
const SECTION_PATTERN_RULES = {
    "education": educationRoasts,
    "experience": experienceRoasts,
    "awards": awardsRoasts,
    "publications": publicationsRoasts,
    "skills": skillsRoasts,
    "general": generalRoasts
};

// Define how many roasts to select from each section
const roastsPerSection = {
    "education": 1,  // 1 roast from the Education section
    "experience": 3, // 1 roast from the Experience section
    "skills": 3,     // 3 roasts from the Skills section
    "awards": 1,     // 1 roast from the Awards section
    "publications": 1, // 1 roast from the Publications section
    "general": 1     // 1 roast from the General section
};

// Function to randomly select up to `max_count` unique roasts
function selectRoasts(roasts, maxCount, seed = null) {
    if (seed !== null) {
        // Set seed for deterministic random sampling if needed
        Math.seedrandom(seed);
    }

    if (roasts.length <= maxCount) {
        return roasts;
    }

    console.log(roasts, "IPTIONSdfs")

    // Random sampling without replacement
    const selected = [];
    while (selected.length < maxCount && roasts.length > 0) {
        const randomIndex = Math.floor(Math.random() * roasts.length);
        selected.push(roasts.splice(randomIndex, 1)[0]);
        console.log(roasts.splice(randomIndex, 1)[0])
    }

    console.log(selected, "SELECTED")

    return selected;
}

// Function to roast a specific resume section
function roastResumeSection(sectionName, sectionLines) {
    const sectionRules = SECTION_PATTERN_RULES[sectionName] || {};
    const generalRules = SECTION_PATTERN_RULES.general || {};

    let roasts = [];

    // Track "__any__" roasts
    if (sectionRules["__any__"]) {
        try {
            const f = sectionRules["__any__"][Math.floor(Math.random() * sectionRules["__any__"].length)];
            const result = f();
            if (result) roasts.push(result);  // Add just the roast text here, not an object
        } catch (e) {
            console.error('Error in general roast:', e);
        }
    }

    // Apply specific and general pattern matching to each line in the section
    sectionLines.forEach(line => {
        // Apply the pattern matching for both section-specific and general patterns
        roasts = roasts.concat(applyPatternDict(sectionRules, line));
        roasts = roasts.concat(applyPatternDict(generalRules, line));
    });

    return roasts;  // This should now be an array of roast texts (strings), not objects
}


// Function to roast the entire resume
// Function to roast the entire resume
function roastEntireResume(resume, seed = null) {
    console.log(`\nRoasts for: ${resume.filePath}`);
    console.log("=" * 50);

    let allRoasts = [];
    let roastCountPerSection = {};  // Track the number of roasts per section

    const name = resume.extractName() || resume.filePath;
    console.log(`\nRoasts for: ${name}`);

    // Iterate through sections and roast each one
    for (const section in resume.sectionsRaw) {
        const lines = resume.sectionsRaw[section];
        const roasts = roastResumeSection(section, lines);

        // Get the number of roasts to select for this section from roastsPerSection
        const roastsToSelect = roastsPerSection[section] || 1;

        console.log(`Available roasts for ${section}:`, roasts);  // Debugging line

        // Limit the number of roasts for this section
        const selectedRoasts = selectRoasts(roasts, roastsToSelect, seed);

        console.log(`Selected roasts for ${section}:`, selectedRoasts);  // Debugging line

        // Track how many roasts we've added for each section
        if (!roastCountPerSection[section]) {
            roastCountPerSection[section] = 0;
        }

        // Add the selected roasts from this section to the allRoasts array
        selectedRoasts.forEach(roast => {
            // Only add roast if we haven't already added the maximum number for this section
            if (roastCountPerSection[section] < roastsToSelect) {
                roastCountPerSection[section] += 1;  // Increment the roast count for this section
                allRoasts.push(roast);      // Add the roast to the list
            }
        });
    }

    // Display selected roasts on the webpage
    displayRoastsOnPage(allRoasts);

    return allRoasts;  // Return selected roasts for use elsewhere (e.g., in the UI)
}


// Function to display selected roasts on the webpage
function displayRoastsOnPage(roasts) {
    const roastList = document.getElementById("roast-list"); // Get the unordered list
    roastList.innerHTML = ''; // Clear any previous roasts before adding new ones

    // Add each roast as a list item in the unordered list
    roasts.forEach(roast => {
        const listItem = document.createElement("li"); // Create a new <li> element
        listItem.textContent = roast; // Set the roast text (ensure roast is a string)
        roastList.appendChild(listItem); // Append the <li> to the list
    });
}
// Example usage: Trigger roasting when a resume is uploaded
async function handleRoast() {
    const fileInput = document.getElementById("pdf-upload");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a resume first.");
        return;
    }

    // Create a new Resume object and extract text
    const resume = new Resume(file);
    await resume.extractTextFromPDF(file);

    // Perform roasting on the entire resume
    roastEntireResume(resume);
}

// Bind the roast button to trigger the roast process
document.getElementById("roast-button").addEventListener("click", handleRoast);
