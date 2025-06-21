// Export SECTION_HEADERS as a module
export const SECTION_HEADERS = {
    "summary": /summary|objective|about me|profile/i,
    "education": /education/i,
    "experience": /experience/i,
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
            console.log(pageText, "PAGEEEE")
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
