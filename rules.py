# rules.py

education_roasts = {
    "bs in *": [
        lambda wc: f"A Bachelor's in {wc[1]}? Bold choice for job security.",
        lambda wc: f"Bachelor's in {wc[1]} — you and 50,000 others.",
        lambda wc: f"{wc[1]}? So you majored in prereqs and regret."
    ],
    "major: *": [
        lambda wc: f"A Bachelor's in {wc[1]}? Bold choice for job security.",
        lambda wc: f"Bachelor's in {wc[1]} — you and 50,000 others.",
        lambda wc: f"{wc[1]}? So you majored in prereqs and regret."
    ],
    "minor in *": [
        lambda wc: f"Minor in {wc[1]}? Bold of you to admit you voluntarily took extra electives.",
        lambda wc: f"Minor in {wc[1]} — so basically, you sat in the back of those classes and called it a second degree.",
        lambda wc: f"A minor in {wc[1]}? That’s résumé code for ‘took three random courses and hoped for the best.’",
        lambda wc: f"Minor in {wc[1]}? Ah yes, the academic participation trophy."
    ],
    "minors: *": [
        lambda wc: f"Minor in {wc[1]}? Bold of you to admit you voluntarily took extra electives.",
        lambda wc: f"Minor in {wc[1]} — so basically, you sat in the back of those classes and called it a second degree.",
        lambda wc: f"A minor in {wc[1]}? That’s résumé code for ‘took three random courses and hoped for the best.’",
        lambda wc: f"Minor in {wc[1]}? Ah yes, the academic participation trophy."
    ],
    "gpa": [
        lambda wc: f"Included your GPA — bold move. You must think it's impressive.",
        lambda wc: "Ah yes, the GPA flex. Nothing screams 'hire me' like a number you curved up from a C+.",
        lambda wc: "GPA on the résumé? Thanks for the transcript preview."
    ]
}

experience_roasts = {
    "* intern *": [
        lambda wc: f"Internship with {wc[1]}? Did you have a good summer pretending to be busy?",
        lambda wc: f"{wc[1]} internship? Nice. Did you refill the Keurig or just Slack '👍' all day?",
        lambda wc: f"Interned at {wc[1]} — but your biggest project was resizing the logo."
    ],
    "* worked with *": [
        lambda wc: f"You have experience with {wc[1]}? Are you sure about that?",
        lambda wc: f"Worked with {wc[1]}? Or did you mean 'read the docs and gave up'?"
    ],
    "research assistant": [
        lambda wc: "Research assistant? So you were the grad student's grad student.",
        lambda wc: "Research assistant — the unpaid labor tier of academia.",
        lambda wc: "Research assistant — as in, you assisted... by not breaking the equipment. Most of the time.",
    ],
    "undergraduate researcher": [
        lambda wc: "Undergraduate Researcher? Aka free labor with a fancy title.",
        lambda wc: "Undergrad researcher — so you watered the petri dish and prayed.",
        lambda wc: "Undergraduate Researcher? You mean you held the flashlight for the grad student.",
        lambda wc: "Undergrad researcher — your job was mostly nodding while pretending to understand.",
        lambda wc: "Undergraduate Researcher? So you washed glassware and wrote 'collaborated on analysis'.",
        lambda wc: "Undergrad research — where 'troubleshooting' means emailing your PI twice and giving up.",
        lambda wc: "Most of your research was conducted the night before your presentation — and it shows.",
        lambda wc: "Undergraduate Researcher? So you did nothing for two weeks, then scrambled before your PI meeting.",
        lambda wc: "Ah yes, the undergrad researcher hustle: forget the assignment, panic at 11PM, present like nothing happened.",
    ]

}

awards_roasts = {
    "* award": [
        lambda wc: f"Won the '{wc[1]}' award — still milking that one, huh?",
        lambda wc: f"Congrats on the '{wc[1]}' award. I'm sure your mom was very proud.",
        lambda wc: f"'{wc[1]}' — not to brag, but I also won Most Improved in T-ball once."
    ],
    "* recognized for *": [
        lambda wc: f"Recognized for '{wc[1]}' — by whom? Your group chat?",
        lambda wc: f"Recognition for '{wc[1]}' — sounds like a polite way to say 'participated'.",
        lambda wc: f"Recognition for '{wc[1]}'? Cool, so you showed up once."
    ]
}


publications_roasts = {
    "__any__": [
        lambda: "Published? So you're better than the rest of us now?",
        lambda: "You got published? So did my grocery list on the fridge.",
        lambda: "Published? Must’ve been a really slow journal issue."
    ]
}

skills_roasts = {
    "python": [
        lambda wc: "Python? Wow, truly a unique skill... in 2010.",
        lambda wc: "Python — like every other résumé this week.",
        lambda wc: "Python? Let me guess, you imported pandas and called it a day.",
        lambda wc: "Python? So you took one intro class and now you think you're Guido van Rossum?",
        lambda wc: "Python — great for scripting, and apparently for padding your résumé too."
    ],
    "solidworks": [
        lambda wc: "SolidWorks expert? So you know how to make a gear... and crash a file.",
        lambda wc: "SolidWorks? Cool. Hope your laptop's fan is still alive.",
        lambda wc: "SolidWorks — where Ctrl+S becomes muscle memory after every sketch.",
        lambda wc: "Proficient in SolidWorks? Or just really good at pretending your assembly mates.",
        lambda wc: "SolidWorks? The software that crashes more than your last relationship."
    ],
    "linux": [
        lambda wc: "Lists Linux as a skill — bold move for someone who still uses Ubuntu GUI.",
        lambda wc: "Linux? You mean the OS you boot once, break everything, and crawl back to macOS?",
        lambda wc: "Linux? So you're the reason no one else can print in the lab anymore.",
        lambda wc: "Linux — because your entire personality is 'I don't use Windows.'",
        lambda wc: "Comfortable with Linux? That just means you're comfortable Googling error messages."
    ],
    "project management": [
        lambda wc: "Project Management — you mean assigning yourself tasks you never complete?",
        lambda wc: "Project management? You had a Trello board with two cards."
    ],
    "teaching": [
        lambda wc: "Teaching experience? You mean TA'ing a class you barely passed last semester?",
        lambda wc: "Teaching? So you answered one Piazza question and called it mentorship."
    ],
    "machine learning": [
        lambda wc: "Machine learning — because 'ran a Jupyter notebook once' sounds less impressive.",
        lambda wc: "Machine learning? You mean overfitting and hoping for the best?"
    ],
    "algorithms": [
        lambda wc: "Algorithms — listed right next to 'I sort my laundry sometimes.'",
        lambda wc: "Algorithms? So you remember Dijkstra... kind of."
    ],
    "autocad": [
        lambda wc: "AutoCAD: where your dreams of precision meet your computer's RAM ceiling.",
        lambda wc: "AutoCAD? You mean 'Ctrl+Z until it works?'"
    ],
    "java": [
        lambda wc: "Java? For when Python just isn't verbose enough.",
        lambda wc: "Java — great if you enjoy writing six lines to print 'Hello.'"
    ],
    "sas": [
        lambda wc: "SAS? Did you mean 'Statistical Ancient Software'?",
        lambda wc: "SAS — the software you learn right before switching to R."
    ],
    "cybersecurity": [
        lambda wc: "Cybersecurity — because watching Mr. Robot once counts, right?",
        lambda wc: "Cybersecurity? So you clicked inspect element and called it hacking?"
    ],
    "excel": [
        lambda wc: "Excel? What are you, 45 and applying for an office admin job?",
        lambda wc: "Excel master? You bolded the column header. Good job."
    ],
    "git": [
        lambda wc: "Git? You mean you memorized 'git push --force' and prayed?",
        lambda wc: "Git expert? Or just really good at merging conflicts you caused."
    ],
    "communication": [
        lambda wc: "Communication skills? Your email said 'plz see attached' with no attachment.",
        lambda wc: "Excellent communicator — until it's your turn to present."
    ],
    "powerpoint": [
        lambda wc: "PowerPoint expert? You mean you mastered 'Fade In' animations?",
        lambda wc: "PowerPoint? Cool. So your skill is moving boxes slightly to the left?"
    ]
}

# Applies to all sections
general_roasts = {
    "detail-oriented": [
        lambda wc: f"Detail-oriented? You spelled your own name wrong in the header.",
        lambda wc: "Detail-oriented — that's why your bullet points switch between periods and no periods?",
        lambda wc: "Detail-oriented? Your formatting says otherwise."
    ],
    "team player": [
        lambda wc: f"Team player? You mean you nodded during meetings?",
        lambda wc: "Team player? So you hovered in the group chat and said 'thoughts?'",
        lambda wc: "Team player — translation: didn't actively sabotage the group project."
    ],
    "* coursework: *": [
        lambda wc: f"Relevant coursework: {wc[2]}? You really think that counts as experience?",
        lambda wc: f"Listed {wc[2]} as coursework? Your professor wouldn't even write you a rec.",
        lambda wc: f"{wc[2]}? You mean you sat in the back and scrolled Reddit?"
    ],
    "* chair": [
        lambda wc: f"{wc[1].title()} Chair? I, too, enjoy meetings about meetings.",
        lambda wc: f"{wc[1].title()} Chair — sounds like you had a fancy title and no actual power.",
        lambda wc: f"{wc[1].title()} Chair? Did you even remember to reserve the room?"
    ],
    "event planning": [
        lambda wc: f"Event planning? So you ordered pizza and forgot the napkins.",
        lambda wc: "Event planning? You mean frantically Googling 'event checklist' the night before.",
        lambda wc: "Event planning — did that include forgetting the RSVP form?"
    ],
    "community engagement": [
        lambda wc: f"Community engagement — sounds like a class assignment you turned into a personality.",
        lambda wc: "Community engagement? So you posted once on the club’s Instagram.",
        lambda wc: "Community engagement — aka convincing three friends to show up to your event."
    ],
    "leadership": [
        lambda wc: f"Leadership? That's just being loud in meetings and calling it vision.",
        lambda wc: f"Ah yes, 'leadership' — the skill you list when you yelled the loudest in your group chat.",
        lambda wc: "Leadership — you mean you made the group slideshow and demanded everyone's fonts match?",
        lambda wc: "Leadership? So you added 'CEO of My Dorm Hall' to your LinkedIn?"
    ],
    "public speaking": [
    lambda wc: "Public speaking? I bet you're fun at parties — if the party is a TEDxSalon about bullet journaling."
    ],
    "organized": [
        lambda wc: "Organized? Color-coding your planner doesn’t count as a personality."
    ],
    "analytical": [
        lambda wc: "Analytical? Yeah, so is Excel — and it's way more fun at parties."
    ],
    "lifelong learner": [
        lambda wc: "Lifelong learner? You sound like someone who cornered the host at a party to explain blockchain."
    ],
    "self-starter": [
        lambda wc: "Self-starter? You mean the kind of person who plans a 'game night' and brings a spreadsheet."
    ],
    "motivated": [
        lambda wc: "Motivated? I can tell — you even put your hobbies in bullet points.",
        lambda wc: "Motivated? You made it all the way to editing your résumé and still sent this?",
        lambda wc: "Motivated? You really typed that and thought it added value."
    ],
    "hard-working": [
        lambda wc: "Hard-working? That’s just what you write when you don’t know what else to say.",
        lambda wc: "Hard-working — so you’re tired and underpaid. Got it."
    ],
    "critical thinker": [
        lambda wc: "Critical thinker? You mean you asked one question in a lecture once.",
        lambda wc: "Critical thinking? Is that what you call indecision now?"
    ],
    "creative": [
        lambda wc: "Creative? You used Calibri and thought that was bold.",
        lambda wc: "Creative — is that why your résumé has four fonts and a border?"
    ],
    "passionate": [
        lambda wc: "Passionate? So passionate you put it right next to 'proficient in Excel.'",
        lambda wc: "Passionate? That word is doing a lot of work for someone who copy-pasted their cover letter."
    ]

}

SECTION_PATTERN_RULES = {
    "education": education_roasts,
    "experience": experience_roasts,
    "awards": awards_roasts,
    "projects": publications_roasts,
    "summary": {},  # can fill this in later
    "skills": skills_roasts,
    "general": general_roasts,
    "publications": publications_roasts
}
