// Export SECTION_HEADERS as a module
export const SECTION_HEADERS = {
    "summary": /summary|objective|about me|profile/i,
    "education": /education/i,
    "experience": /experience|activities|extracurriculars/i,
    "skills": /skills|technologies|tools|competencies/i,
    "awards": /awards|honors|recognition|achievements/i,
    "publications": /publications/i,
    "certifications": /certifications|certified|licenses/i
};

// Export the Resume class
export class Resume {
    constructor(file) {
        this.file = file;
        this.rawText = "";
        this.sectionsRaw = {};
        this.sectionsText = {};
        this.currentSection = "summary"; // Assume top block is summary
        this.extractTextFromPDF(file);
    }

    // Extract text using pdf.js
    async extractTextFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(" ");
            fullText += pageText + "\n";
        }

        this.rawText = fullText;
        this.segmentSections();
        this.printSections();
    }

    // Normalize text: remove non-alphabetical characters and convert to lowercase
    normalize(text) {
        return text.replace(/[^a-zA-Z ]+/g, "").trim().toLowerCase();
    }

    // Detect the section from a line of text
    detectSection(line) {
        const normalized = this.normalize(line);
        for (let section in SECTION_HEADERS) {
            if (SECTION_HEADERS[section].test(normalized)) {
                return section;
            }
        }
        return null;
    }

    // Segment resume into sections
    // Segment resume into sections
    segmentSections() {
        // Split the text by two or more consecutive spaces and trim the results
        const sentenceRegex = /([^ ](?:[^ ]| )+[^ ])/g;
        const lines = this.rawText.split(/\s{2,}/)  // Split by two or more spaces (more than one space)
            .map(line => line.trim())  // Remove leading/trailing spaces
            .filter(line => line.length > 0);  // Remove empty lines

        this.sectionsRaw[this.currentSection] = [];

        for (let line of lines) {
            const cleanedLine = line.replace(/^[•◦\-\*\u2022\s\●​]+/, "").trim(); // Remove bullets and extra whitespace

            if (!cleanedLine) continue;

            const possibleSection = this.detectSection(cleanedLine); // Check if the line matches a section header
            if (possibleSection && possibleSection !== this.currentSection) {
                // If we detect a new section, switch to that section
                this.currentSection = possibleSection;
                if (!this.sectionsRaw[this.currentSection]) {
                    this.sectionsRaw[this.currentSection] = [];
                }
            }

            // Add the cleaned line to the current section
            this.sectionsRaw[this.currentSection].push(cleanedLine);
        }

        // Create a combined text version of each section
        this.sectionsText = Object.fromEntries(
            Object.entries(this.sectionsRaw).map(([key, value]) => [key, value.join(" ")])
        );
    }

    // Detect the section from a line of text
    detectSection(line) {
        const normalized = this.normalize(line);  // Normalize the line to lowercase for matching
        for (let section in SECTION_HEADERS) {
            if (SECTION_HEADERS[section].test(normalized)) {
                return section;
            }
        }
        return null;
    }


    // Get raw section lines
    getSectionLines(name) {
        return this.sectionsRaw[name] || [];
    }

    // Get section text
    getSectionText(name) {
        return this.sectionsText[name] || "";
    }

    // Display a preview of the sections
    printSections() {
        for (let section in this.sectionsRaw) {
            const preview = this.sectionsRaw[section].join(" ").substring(0, 500);
            console.log(`\n== ${section.toUpperCase()} ==\n${preview}...\n`);
        }
    }

    // Extract candidate name (same logic as in Python)
    // Function to extract candidate's name from the resume text
    extractName() {
        // Split the text into lines based on multiple spaces or new lines
        const lines = this.rawText.split(/\s{2,}|\n/)  // Split by 2+ spaces or line breaks
            .map(line => line.trim())  // Clean up each line
            .filter(line => line.length > 0);  // Remove empty lines

        // We will look at the first line for the name
        const firstLine = lines[0];

        // List of non-name terms we should exclude (e.g., "student", "university")
        const nonNameTerms = [
            "address", "phone", "email", "linkedin", "github", "website",
            "student", "university", "boston", "cambridge", "fax", "candidate", "engineer"
        ];

        // Split the first line into words
        const words = firstLine.split(" ");
        let nameParts = [];

        // Go through each word in the first line and check if it's part of the name
        for (let word of words) {
            const lowerWord = word.toLowerCase();

            // If the word is not in the non-name terms, add it to the name
            if (!nonNameTerms.includes(lowerWord) && nameParts.length < 3) {
                nameParts.push(word);
            }

            // Stop once we have 3 words
            if (nameParts.length === 3) {
                break;
            }
        }

        // Return the name (join the parts together)
        return nameParts.join(" ") || null;  // Return the name, or null if not found
    }
}


export function generateStats(textBySection, name) {
    const stats = {};

    // ----- Identity -----
    const summaryText = textBySection.summary || "";
    const eduText = textBySection.education || "";
    const fullText = Object.values(textBySection).join(" ").toLowerCase();

    const githubRegex = /github\.com\/[a-z0-9\-_]+/i;
    const mitEmailRegex = /\b[a-z0-9._%+-]+@mit\.edu\b/i;

    let major = null;
    const majorMatch = eduText.match(/(major|B\.?S\.?|Bachelor)[^.:;\n]{0,100}/i);
    if (majorMatch) {
        const majorRaw = majorMatch[0].replace(/(major|B\.?S\.?|Bachelor)[:\s-]*/i, "");
        major = majorRaw.trim().replace(/[^a-zA-Z& ,]+/g, "");
    }

    stats.identity = {
        name: name || null,
        major: major || null,
        hasGithub: githubRegex.test(fullText),
        hasMITEmail: mitEmailRegex.test(fullText)
    };


    // ----- Education -----
    const gpaMatches = eduText.match(/GPA[:\s]*(\d\.\d{1,2})/gi) || [];
    const gpas = gpaMatches.map(g => parseFloat(g.match(/(\d\.\d{1,2})/)[1]));
    const honors = (eduText.match(/(summa|magna|cum laude|dean's list)/gi) || []).map(h => h.toLowerCase());

    stats.education = {
        numDegrees: (eduText.match(/\b(B\.?S\.?|M\.?S\.?|Ph\.?D\.?|Bachelor|Master|Doctor)/gi) || []).length,
        highestGPA: gpas.length ? Math.max(...gpas) : null,
        honors: [...new Set(honors)]
    };

    // ----- Experience -----
    const expText = textBySection.experience || "";

    // Define category keywords
    const jobTypeKeywords = {
        internship: ["intern", "internship"],
        research: ["research", "lab", "laboratory", "undergraduate researcher"],
        volunteer: ["volunteer", "mentorship", "mentor", "outreach", "tutor", "teaching"],
        industry: ["engineer", "developer", "software", "startup", "company", "corporation", "consulting"]
    };

    const leadershipWords = /\b(lead|president|founder|captain|head|chair)\b/i;

    // Break experience section into job blocks using date patterns as anchors
    const jobBlocks = expText
        .split(/(?=\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[.,]?\s*\d{4}\b|\b\d{2}\/\d{4})/)
        .map(block => block.trim())
        .filter(block => block.length > 20);  // Filter out junk lines

    // Initialize counters
    const jobTypes = Object.fromEntries(Object.keys(jobTypeKeywords).map(k => [k, 0]));
    let leadershipMentions = 0;

    // Analyze each job block
    for (const block of jobBlocks) {
        const blockText = block.toLowerCase();

        // Count leadership terms
        if (leadershipWords.test(blockText)) {
            leadershipMentions++;
        }

        // Classify job block by first matching type
        for (const [type, keywords] of Object.entries(jobTypeKeywords)) {
            if (keywords.some(kw => blockText.includes(kw))) {
                jobTypes[type]++;
                break;  // One category per job
            }
        }
    }

    // Final stats object
    stats.experience = {
        numJobs: jobBlocks.length,
        leadershipMentions,
        jobTypes
    };




    // ----- Skills -----
    // Define common section headings for skills or tools (case insensitive for most, uppercase for SKILLS/TOOLS)
    const skillSections = [
        'skills',
        'tools',
        'programming',
        'languages',
        'design software',
        'technologies',
        'expertise',
        'skills and interests' // Add this compound section for "Skills and Interests"
    ];

    // Assuming textBySection is an object containing various sections of the resume
    const text = textBySection.education + textBySection.skills || "";  // Modify according to how you store text data

    let skillsFound = [];
    let collectingSkills = false;
    let currentSkills = "";

    // Split the text by spaces and loop through it
    const words = text.split(/\s+/);  // Split by any whitespace (space, tabs, etc.)

    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();  // Convert word to lowercase for case-insensitive matching
        console.log(word, currentSkills, collectingSkills)
        // Check if the word matches a section header (e.g., "Skills:" or "Programming:")
        skillSections.forEach(section => {
            // Match the section keyword (e.g., "skills" or "skills and interests") followed by a colon
            if ((word === section && words[i + 1] === ":") || (word === `${section}:`)) {
                // We found the section header (e.g., "skills:", "programming:"), start collecting skills after this point
                collectingSkills = true;
                console.log(currentSkills, "YGTRIUGRIFJIJxs")
                currentSkills = "";  // Reset the current skills string
            }
        });

        // Also check for fully capitalized section headers like "SKILLS", "TOOLS"
        const allCapsSections = ["SKILLS", "TOOLS"];
        allCapsSections.forEach(section => {
            if (word === section.toLowerCase()) {
                // We found an all-caps header, start collecting skills after this point
                collectingSkills = true;
                currentSkills = "";  // Reset the current skills string
            }
        });

        if (collectingSkills) {
            // Collect the content after the section header
            currentSkills += words[i] + " "; // Append the current word

            // Check if the next word is the start of another section
            const nextWord = words[i + 1] ? words[i + 1].toLowerCase() : '';
            if (skillSections.some(section => nextWord === `${section}:`.toLowerCase() || nextWord === section.toUpperCase())) {
                // If the next word is another section header, stop collecting
                collectingSkills = false;
                skillsFound.push(currentSkills.trim());
                currentSkills = "";  // Reset for the next potential section
            }

            // If we're at the last word, add the collected skills as well
            if (i === words.length - 1) {
                skillsFound.push(currentSkills.trim());
            }
        }
    }

    // Now clean the final skills data after all loop processing
    const rawSkills = skillsFound
        .join(' ') // Join all collected skills
        .split(/[\n,•\-;|]+/) // Split on common delimiters like commas, semicolons, etc.
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 1); // Remove short entries like empty strings

    // Remove duplicates
    const uniqueSkills = [...new Set(rawSkills)];

    // Buzzwords list for filtering
    const buzzwordsList = ["synergy", "innovative", "disruptive", "pivot", "leverage", "streamlined", "scalable"];
    const buzzwordsFound = uniqueSkills.filter(skill => buzzwordsList.includes(skill));

    // Stats
    stats.skills = {
        total: uniqueSkills.length,
        duplicates: rawSkills.length - uniqueSkills.length,
        buzzwordDensity: buzzwordsFound.length / (uniqueSkills.length || 1),
        list: uniqueSkills,
        buzzwords: buzzwordsFound
    };

    console.log(stats.skills);

    // ----- Awards -----
    const awardsText = textBySection.awards || "";
    const awardLines = awardsText.split("\n").filter(l => l.trim().length > 0);

    stats.awards = {
        numAwards: awardLines.length,
        selfNamedAwards: 0 // needs résumé name to match
    };

    // ----- Publications -----
    const pubText = textBySection.publications || "";
    const pubLines = pubText.split("\n").filter(l => l.trim().length > 0);
    const conferences = ['IEEE', 'ICML', 'CVPR', 'NeurIPS', 'Nature', 'Science'];
    const conferenceMentions = pubLines.filter(line => conferences.some(conf => line.includes(conf))).length;

    stats.publications = {
        numPubs: pubLines.length,
        conferenceMentions
    };

    return stats;
}

export const personaNames = {
    academia: [
      "Publication Leech",       // Author 12th on a 3-person paper
      "Research Goblin",         // Crawls between labs collecting data and crumbs
      "Grant-Licker"             // Uses “funded by” like a flex
    ],
    gpa: [
      "Transcript Thirst Trap",  // Gave GPA its own line *and* bold text
      "Grade-Clinger",           // Still holding onto that 3.99 like it’s a lifeboat
    ],
    industry: [
      "Corporate Sleeper Agent", // Interned at 4 FAANGs and still calls it “impact”
      "Work Experience Maxxer",  // Had 3 jobs *last summer*
      "Most likely to sell out" 
    ],
    leadership: [
      "Ego with a Club Budget",  // Founded 2 orgs and a personal brand
      "Dictator of the Group Chat",     // “President” of 12-person Slack channel
      "Not so secretly power hungry"     
    ],
    skills: [
      "Executive of Insecurity",      // Lists Bash *and* Zsh. Calm down.
      "Buzzword Bloodbath",      // Synergy. Blockchain. AI. Marketing. Huh?
      "Jack of all keywords"       // VIM. Docker. GCC. QEMU. Therapist?
    ],
    fallback: [
      "Résumé Salad",            // A bunch of stuff. Not sure it’s food.
      "PDF of Vibes",            // No idea what they do, but they’re doing it loud
      "LinkedIn Mid"             // The energy is there. The experience is not.
    ]
  };
  
