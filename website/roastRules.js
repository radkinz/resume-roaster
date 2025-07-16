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
    ],
    "excel": [
        wc => "Excel wizard? Can you make a pivot table, or just scroll endlessly?",
        wc => "Excel skills? If it’s not an Excel formula, it’s just the default column letters.",
        wc => "Excel? I hope you know your VLOOKUPs and don't just click buttons and pray."
    ],
    "autocad": [
        wc => "AutoCAD — because who needs paper when you can just print directly from your computer?",
        wc => "AutoCAD? Yeah, just a quick way to pretend you're not drowning in layers.",
        wc => "AutoCAD, eh? Bet you love working with 2D lines that never seem to align."
    ],
    "photoshop": [
        wc => "Photoshop? So you're an expert at cropping and slapping a filter on everything?",
        wc => "Photoshop skills: You probably think 'Layer Mask' is some kind of magic trick.",
        wc => "Photoshop? Sure, if you mean transforming people into abstract art on Instagram."
    ],
    "blender": [
        wc => "Blender skills? Ah yes, the art of crashing your PC while trying to render something simple.",
        wc => "Blender — because who needs ease when you can just be confused for hours?",
        wc => "Blender? Oh, so you’ve made a donut tutorial your life goal."
    ],
    "leadership": [
        wc => "Leadership skills? Can you actually lead a team, or just send motivational quotes?",
        wc => "Leadership? More like 'keeping the chair warm' while others do the real work.",
        wc => "Leadership? Sure, if you mean organizing meetings that could’ve been emails."
    ],
    "teamwork": [
        wc => "Teamwork? Are you sure you’re not just excellent at taking credit for others' ideas?",
        wc => "Teamwork skills: You can communicate... as long as the ideas are your own.",
        wc => "Teamwork? Oh, you mean the ability to look busy while someone else carries the load."
    ],
    "communication": [
        wc => "Communication? I hope that means you actually listen and don’t just talk for the sake of talking.",
        wc => "Communication skills? You mean you can send an email without sounding like a robot?",
        wc => "Communication? How well do you handle the 'reply-all' chaos?"
    ],
    "project management": [
        wc => "Project management? You must be great at managing things… that never get finished.",
        wc => "Project management: A skill? Or just a fancy title for 'I’m in charge of the chaos.'",
        wc => "Project management? Oh, so you mean you’re an expert at scheduling meetings that don’t lead anywhere."
    ],
    "organized": [
        wc => "Organizational skills? More like 'I can make a to-do list and never look at it again.'",
        wc => "Organization? I bet your desk is a disaster but your digital files are worse.",
        wc => "Organizational skills — because everything needs a folder... even the stuff you’ll never use."
    ],
    "leadership": [
        wc => "Leadership? Sure, if you count putting out fires that you started yourself.",
        wc => "Leadership? Oh, you mean how to nod at meetings without making any decisions?",
        wc => "Leadership? That’s a funny way of saying you delegate everything but the blame."
    ],
    "led": [
        wc => "Leadership? Sure, if you count putting out fires that you started yourself.",
        wc => "Leadership? Oh, you mean how to nod at meetings without making any decisions?",
        wc => "Leadership? That’s a funny way of saying you delegate everything but the blame."
    ],
    "collaborated": [
        wc => "Collaboration? Oh, you mean passive-aggressively editing someone else’s work?",
        wc => "Collaboration skills? Can you actually compromise, or do you just fight for your idea?",
        wc => "Collaboration? If by that you mean waiting for someone else to take the lead, sure."
    ],
    "javascript": [
        wc => "JavaScript? Did you just google 'how to use JS' and call it a skill?",
        wc => "JavaScript? You probably just copy-pasted that code and pretended you understood it.",
        wc => "JavaScript? Yeah, if by 'programming' you mean fixing console.log errors all day."
    ],
    "html": [
        wc => "HTML? I hope your 'skills' extend beyond h1 tags and divs.",
        wc => "HTML? So you can use <b> and <i> in your code... how revolutionary.",
        wc => "HTML skills — bet you think closing tags are optional, huh?"
    ],
    "css": [
        wc => "CSS skills? Is that just 'make it look pretty until it breaks on mobile'?",
        wc => "CSS? More like 'I know how to change colors and hide elements.'",
        wc => "CSS skills? I bet your 'responsive design' doesn’t work on anything except your laptop screen."
    ],
    "swift": [
        wc => "Swift? So you’ve spent years optimizing for the iPhone... but only on paper.",
        wc => "Swift — great for making things run... right until it doesn’t.",
        wc => "Swift? Hope you can avoid a crash, both the app and your hopes for the future."
    ],
    "kotlin": [
        wc => "Kotlin? Ah yes, the programming language that made Android development more complicated.",
        wc => "Kotlin? So you can use a language that’s almost Java... but not quite.",
        wc => "Kotlin skills? Bet you use it because it makes you feel cooler than using Java."
    ],
    "java": [
        wc => "Java? Cool, you know how to write a million lines of code to do something simple.",
        wc => "Java? Ah yes, the language where every project feels like it could be a university course.",
        wc => "Java? So, you like to explain why it takes forever to run, but then blame everything else."
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
