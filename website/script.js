import { Resume } from './resume.js';  // Import the Resume class from resume.js
import { educationRoasts, experienceRoasts, skillsRoasts, generalRoasts, awardsRoasts, publicationsRoasts } from './roastRules.js';  // Import roast rules from roastRules.js
import { applyPatternDict } from './roastRules.js';  // Import the pattern matching function
import { generateStats } from './resume.js';
import { personaNames, pickPersonaName } from './resume.js';

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
async function roastEntireResume(resume, seed = null) {
    let allRoasts = [];
    let roastCountPerSection = {};  // Track the number of roasts per section

    // Iterate through sections and roast each one
    for (const section in resume.sectionsRaw) {
        const lines = resume.sectionsRaw[section];
        const roasts = roastResumeSection(section, lines);

        // Get the number of roasts to select for this section from roastsPerSection
        const roastsToSelect = roastsPerSection[section] || 1;

        // Limit the number of roasts for this section
        const selectedRoasts = selectRoasts(roasts, roastsToSelect, seed);

        // Track how many roasts we've added for each section
        if (!roastCountPerSection[section]) {
            roastCountPerSection[section] = 0;
        }

        // Add the selected roasts from this section to the allRoasts array
        selectedRoasts.forEach(roast => {
            if (roastCountPerSection[section] < roastsToSelect) {
                roastCountPerSection[section] += 1;  // Increment the roast count for this section
                allRoasts.push(roast);      // Add the roast to the list
            }
        });
    }

    // Display selected roasts on the webpage
    //displayRoastsOnPage(allRoasts);

    const statsBySection = await generateStats(resume.sectionsText, resume.extractName());
    console.log(statsBySection, "STATS")

    const selectedRoast = pickPersonaName(statsBySection, personaNames);
    console.log("Your roast:", selectedRoast);

    // Display the business card with roasts
    displayBusinessCard(allRoasts, resume.extractName, selectedRoast);

    return allRoasts;  // Return selected roasts for use elsewhere (e.g., in the UI)
}



// Function to display selected roasts on the webpage
function displayRoastsOnPage(roasts) {
    const roastList = document.getElementById("roast-list");
    roastList.innerHTML = ''; // Clear any previous roasts before adding new ones

    // Add each roast as a list item in the unordered list
    roasts.forEach(roast => {
        const listItem = document.createElement("li");
        listItem.textContent = roast;  // Make sure this is just the roast text, not an object
        roastList.appendChild(listItem); // Append the <li> to the list
    });
}

function displayBusinessCard(roasts, name, nameRoast) {
    const card = document.getElementById("business-card");
    const cardName = document.getElementById("card-name");
    const cardRoastList = document.getElementById("card-roast-list");

    // Remove the 'hidden' class to make the business card visible
    card.classList.remove("hidden");
    card.classList.add("show");  // Add the 'show' class to display the card

    // Set the name on the business card
    cardName.textContent = `${name || "Your Name"} aka ${nameRoast}`;


    // Add each roast as a list item in the business card's unordered list
    cardRoastList.innerHTML = ''; // Clear any existing roasts in the card

    roasts.forEach(roast => {
        const listItem = document.createElement("li");
        listItem.textContent = roast;  // Set the roast text
        cardRoastList.appendChild(listItem); // Append the <li> to the list
    });
}

// Function to format the roasts (you can adjust how this looks)
function formatRoasts(roasts) {
    return roasts.join("\n");  // Join all roasts into a string with each roast on a new line
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
    console.log(resume.sectionsText, "TEXT")
}


// Bind the roast button to trigger the roast process
document.getElementById("roast-button").addEventListener("click", handleRoast);
