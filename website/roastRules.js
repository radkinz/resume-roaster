// Define roast rules for different sections
export const educationRoasts = {
    "bs in *": [
        wc => `A Bachelor's in ${wc[1]}? Bold choice for job security.`,
        wc => `Bachelor's in ${wc[1]} — you and 50,000 others.`,
        wc => `${wc[1]}? So you majored in prereqs and regret.`
    ],
    "major: *": [
        wc => `A Bachelor's in ${wc[1]}? Bold choice for job security.`,
        wc => `Bachelor's in ${wc[1]} — you and 50,000 others.`,
        wc => `${wc[1]}? So you majored in prereqs and regret.`
    ],
    "minor in *": [
        wc => `Minor in ${wc[1]}? Bold of you to admit you voluntarily took extra electives.`,
        wc => `Minor in ${wc[1]} — so basically, you sat in the back of those classes and called it a second degree.`,
        wc => `A minor in ${wc[1]}? That’s résumé code for ‘took three random courses and hoped for the best.’`,
        wc => `Minor in ${wc[1]}? Ah yes, the academic participation trophy.`
    ],
    "minors: *": [
        wc => `Minor in ${wc[1]}? Bold of you to admit you voluntarily took extra electives.`,
        wc => `Minor in ${wc[1]} — so basically, you sat in the back of those classes and called it a second degree.`,
        wc => `A minor in ${wc[1]}? That’s résumé code for ‘took three random courses and hoped for the best.’`,
        wc => `Minor in ${wc[1]}? Ah yes, the academic participation trophy.`
    ],
    "gpa": [
        wc => `Included your GPA — bold move. You must think it's impressive.`,
        wc => "Ah yes, the GPA flex. Nothing screams 'hire me' like a number you curved up from a C+.",
        wc => "GPA on the résumé? Thanks for the transcript preview."
    ]
};

export const experienceRoasts = {
    "* intern *": [
        wc => `Internship with ${wc[1]}? Did you have a good summer pretending to be busy?`,
        wc => `${wc[1]} internship? Nice. Did you refill the Keurig or just Slack '👍' all day?`,
        wc => `Interned at ${wc[1]} — but your biggest project was resizing the logo.`
    ],
    "* worked with *": [
        wc => `You have experience with ${wc[1]}? Are you sure about that?`,
        wc => `Worked with ${wc[1]}? Or did you mean 'read the docs and gave up'?`
    ],
    "research assistant": [
        wc => "Research assistant? So you were the grad student's grad student.",
        wc => "Research assistant — the unpaid labor tier of academia.",
        wc => "Research assistant — as in, you assisted... by not breaking the equipment. Most of the time."
    ],
    "researcher": [
        wc => "Undergraduate Researcher? Aka free labor with a fancy title.",
        wc => "Student researcher — so you watered the petri dish and prayed.",
        wc => "Undergraduate Researcher? You mean you held the flashlight for the grad student.",
        wc => "Undergrad researcher — your job was mostly nodding while pretending to understand."
    ]
};

export const awardsRoasts = {
    "* award": [
        wc => `Won the '${wc[1]}' award — still milking that one, huh?`,
        wc => `Congrats on the '${wc[1]}' award. I'm sure your mom was very proud.`,
        wc => `'${wc[1]}' — not to brag, but I also won Most Improved in T-ball once.`
    ],
    "* recognized for *": [
        wc => `Recognized for '${wc[1]}' — by whom? Your group chat?`,
        wc => `Recognition for '${wc[1]}' — sounds like a polite way to say 'participated'.`,
        wc => `Recognition for '${wc[1]}'? Cool, so you showed up once.`
    ]
};

export const publicationsRoasts = {
    "__any__": [
        () => "Published? So you're better than the rest of us now?",
        () => "You got published? So did my grocery list on the fridge.",
        () => "Published? Must’ve been a really slow journal issue."
    ]
};

export const skillsRoasts = {
    "python": [
        wc => "Python? Wow, truly a unique skill... in 2010.",
        wc => "Python — like every other résumé this week.",
        wc => "Python? Let me guess, you imported pandas and called it a day."
    ],
    "solidworks": [
        wc => "SolidWorks expert? So you know how to make a gear... and crash a file.",
        wc => "SolidWorks? Cool. Hope your laptop's fan is still alive.",
        wc => "SolidWorks — where Ctrl+S becomes muscle memory after every sketch."
    ]
};

// General roasts
export const generalRoasts = {
    "detail-oriented": [
        wc => `Detail-oriented? You spelled your own name wrong in the header.`,
        wc => "Detail-oriented — that's why your bullet points switch between periods and no periods?",
        wc => "Detail-oriented? Your formatting says otherwise."
    ],
    "team player": [
        wc => `Team player? You mean you nodded during meetings?`,
        wc => "Team player? So you hovered in the group chat and said 'thoughts?'",
        wc => "Team player — translation: didn't actively sabotage the group project."
    ]
};

// Mapping sections to roast categories
export const SECTION_PATTERN_RULES = {
    "education": educationRoasts,
    "experience": experienceRoasts,
    "awards": awardsRoasts,
    "publications": publicationsRoasts,
    "skills": skillsRoasts,
    "general": generalRoasts
};

// Example of how to apply pattern matching to a resume text
export function applyPatternDict(patternDict, text) {
    const results = [];

    for (const pattern in patternDict) {
        if (pattern === "__any__") {
            continue;
        }

        const wc = matchPattern(pattern, text);
        if (wc) {
            try {
                const lambdas = patternDict[pattern];
                const randomIndex = Math.floor(Math.random() * lambdas.length);
                const f = lambdas[randomIndex];
                const result = f([''].concat(wc));  // mimic 1-indexing of wc[1], wc[2], etc.
                if (result) {
                    results.push(result);
                }
            } catch (e) {
                console.error("EXCEPTION", e);
                continue;
            }
        }
    }

    return results;
}

export function matchPattern(pattern, text) {
    const normPattern = normalize(pattern);
    const normText = normalize(text);

    if (!pattern.includes('*')) {
        if (normText.includes(normPattern.trim())) {
            return [pattern.trim()];
        }
        return null;
    }

    const normParts = normPattern.split('*');
    let normRegex = '';
    for (let i = 0; i < normParts.length; i++) {
        normRegex += escapeRegExp(normParts[i]);
        if (i < normParts.length - 1) {
            normRegex += '([^.,;:!?]+)';
        }
    }

    const normMatch = new RegExp(normRegex).exec(normText);
    if (!normMatch) {
        return null;
    }

    const rawParts = pattern.split('*');
    let rawRegex = '';
    for (let i = 0; i < rawParts.length; i++) {
        rawRegex += escapeRegExp(rawParts[i]);
        if (i < rawParts.length - 1) {
            rawRegex += '([^.,;:!?]+)';
        }
    }

    const rawMatch = new RegExp(rawRegex, 'i').exec(normText);
    if (rawMatch) {
        return rawMatch.slice(1).map(g => g.replace(/[\—:]+$/, '').trim());
    }

    return null;
}

export function normalize(s) {
    return s.toLowerCase().replace(/[^a-zA-Z ]+/g, "").trim();
}

export function escapeRegExp(str) {
    return str.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');
}
