import { Resume } from './resume.js';
import { educationRoasts, experienceRoasts, skillsRoasts, generalRoasts, awardsRoasts, publicationsRoasts } from './roastRules.js';
import { applyPatternDict } from './roastRules.js';
import { generateStats } from './resume.js';
import { personaNames, pickPersonaName } from './resume.js'; // Or ./personaRules.js if you move them

// --- Configuration ---
const SECTION_PATTERN_RULES = {
    education: educationRoasts,
    experience: experienceRoasts,
    awards: awardsRoasts,
    publications: publicationsRoasts,
    skills: skillsRoasts,
    general: generalRoasts
};

const roastsPerSection = {
    education: 1,
    experience: 3,
    skills: 3,
    awards: 1,
    publications: 1,
    general: 1
};

// --- Utility ---
function selectRoasts(roasts, maxCount, seed = null) {
    if (seed !== null) Math.seedrandom(seed);
    const copy = [...roasts];
    const selected = [];
    while (selected.length < maxCount && copy.length > 0) {
        const idx = Math.floor(Math.random() * copy.length);
        selected.push(copy.splice(idx, 1)[0]);
    }
    return selected;
}

// --- Class: BusinessCard ---
class BusinessCard {
    constructor(name, stats) {
        this.name = name || "Your Name";
        this.stats = stats;
        this.persona = null;
        this.roasts = {}; // { section: [text, ...] }
    }

    setPersona(pickPersonaNameFn, personaNameData) {
        this.persona = pickPersonaNameFn(this.stats, personaNameData);
    }

    addRoasts(section, roastList) {
        if (!this.roasts[section]) this.roasts[section] = [];
        this.roasts[section].push(...roastList);
    }

    getAllRoasts() {
        return Object.entries(this.roasts).flatMap(([section, list]) =>
            list.map(text => ({ text, section }))
        );
    }

    renderToDOM() {
        const card = document.getElementById("business-card");
        const cardName = document.getElementById("card-name");
        const cardRoastList = document.getElementById("card-roast-list");

        card.classList.remove("hidden");
        card.classList.add("show");

        const displayName = `${this.name} aka ${this.persona}`;
        cardName.textContent = displayName;

        cardRoastList.innerHTML = '';
        this.getAllRoasts().forEach(({ text, section }) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${section}:</strong> ${text}`;
            cardRoastList.appendChild(li);
        });
    }
}

// --- Roasting Logic ---
function roastSection(sectionName, lines) {
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

    lines.forEach(line => {
        roasts.push(...applyPatternDict(sectionRules, line));
        roasts.push(...applyPatternDict(generalRules, line));
    });

    return roasts;
}

async function generateBusinessCard(resume, seed = null) {
    const stats = await generateStats(resume.sectionsText, resume.extractName());
    const card = new BusinessCard(resume.extractName(), stats);
    card.setPersona(pickPersonaName, personaNames);

    const sectionRoastCount = {
        education: 1,
        experience: 1,
        skills: 2
    };

    const remainingRoasts = [];

    for (const section in resume.sectionsRaw) {
        const lines = resume.sectionsRaw[section];
        const rawRoasts = roastSection(section, lines);
        const count = sectionRoastCount[section] || 0;

        if (count > 0 && rawRoasts.length > 0) {
            const selected = selectRoasts(rawRoasts, count, seed);
            card.addRoasts(section, selected);
        } else if (rawRoasts.length > 0) {
            remainingRoasts.push({ section, roasts: rawRoasts });
        }
    }

    // Add 1 roast from any other section (if available)
    const flatPool = remainingRoasts.flatMap(({ section, roasts }) =>
        roasts.map(text => ({ section, text }))
    );

    if (flatPool.length > 0) {
        const pick = flatPool[Math.floor(Math.random() * flatPool.length)];
        card.addRoasts(pick.section, [pick.text]);
    }

    return card;
}


// --- Event Hook ---
async function handleRoast() {
    const fileInput = document.getElementById("pdf-upload");
    const file = fileInput.files[0];
    if (!file) {
        alert("Please upload a resume first.");
        return;
    }

    const resume = new Resume(file);
    await resume.extractTextFromPDF(file);

    const card = await generateBusinessCard(resume);
    card.renderToDOM();
}

// --- Event Binding ---
document.getElementById("roast-button").addEventListener("click", handleRoast);
