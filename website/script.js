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

// Function to randomly select up to `max_count` unique roasts
function selectRoasts(roasts, maxCount = 5, seed = null) {
    if (seed !== null) {
        // Set seed for deterministic random sampling if needed
        Math.seedrandom(seed);
    }

    if (roasts.length <= maxCount) {
        return roasts;
    }

    // Random sampling without replacement
    const selected = [];
    while (selected.length < maxCount && roasts.length > 0) {
        const randomIndex = Math.floor(Math.random() * roasts.length);
        selected.push(roasts.splice(randomIndex, 1)[0]);
    }

    return selected;
}

// Function to roast a specific resume section
function roastResumeSection(sectionName, sectionLines) {
    const sectionRules = SECTION_PATTERN_RULES[sectionName] || {};
    const generalRules = SECTION_PATTERN_RULES.general || {};

    let roasts = [];

    if (sectionRules["__any__"]) {
        try {
            const f = sectionRules["__any__"][Math.floor(Math.random() * sectionRules["__any__"].length)];
            const result = f();
            if (result) roasts.push(result);
        } catch (e) {
            console.error('Error in general roast:', e);
        }
    }

    // Apply specific and general pattern matching to each line in the section
    sectionLines.forEach(line => {
        roasts = roasts.concat(applyPatternDict(sectionRules, line));
        roasts = roasts.concat(applyPatternDict(generalRules, line));
    });

    return roasts;
}

// Function to roast the entire resume
function roastEntireResume(resume, maxRoasts = 5, seed = null) {
    console.log(`\nRoasts for: ${resume.filePath}`);
    console.log("=" * 50);

    let allRoasts = [];
    let seen = new Set();

    const name = resume.extractName() || resume.filePath;
    console.log(`\nRoasts for: ${name}`);

    // Iterate through sections and roast each one
    for (const section in resume.sectionsRaw) {
        const lines = resume.sectionsRaw[section];
        const roasts = roastResumeSection(section, lines);
        roasts.forEach(r => {
            if (!seen.has(r)) {
                seen.add(r);
                allRoasts.push(r);
            }
        });
    }

    const selectedRoasts = selectRoasts(allRoasts, maxRoasts, seed);

    // Display selected roasts on the webpage
    displayRoastsOnPage(selectedRoasts);

    return selectedRoasts;  // Return selected roasts for use elsewhere (e.g., in the UI)
}

// Function to display roasts on the webpage
function displayRoastsOnPage(roasts) {
    const roastList = document.getElementById("roast-list");
    roastList.innerHTML = ''; // Clear any previous roasts

    // Add each roast as a list item in the unordered list
    roasts.forEach(roast => {
        const listItem = document.createElement("li");
        listItem.textContent = roast;
        roastList.appendChild(listItem);
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
