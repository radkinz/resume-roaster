# rules.py

education_roasts = {
    "bs in *": [
        lambda wc: f"A Bachelor's in {wc[1]}? Bold choice for job security."
    ]
}

experience_roasts = {
    "* intern *": [
        lambda wc: f"Internship with {wc[1]}? Did you have a good summer pretending to be busy?"
    ],
    "* worked with *": [
        lambda wc: f"You have experience with {wc[1]}? Are you sure about that?"
    ]
}

awards_roasts = {
    "* award": [
        lambda wc: f"Won the '{wc[1]}' award — still milking that one, huh?",
        lambda wc: f"Congrats on the '{wc[1]}' award. I'm sure your mom was very proud."
    ],
    "* recognized for *": [
        lambda wc: f"Recognized for '{wc[1]}' — by whom? Your group chat?",
        lambda wc: f"Recognition for '{wc[1]}' — sounds like a polite way to say 'participated'."
    ]
}

publications_roasts = {
    "* published *": [
        lambda wc: f"Published in '{wc[1]}' — never heard of it, but I'll pretend to be impressed.",
        lambda wc: f"You got published? So did my grocery list on the fridge."
    ]
}

skills_roasts = {
    "python": [
        lambda wc: "Python? Wow, truly a unique skill... in 2010."
    ],
    "solidworks": [
        lambda wc: "SolidWorks expert? So you know how to make a gear... and crash a file."
    ],
    "linux": [
        lambda wc: "Lists Linux as a skill — bold move for someone who still uses Ubuntu GUI."
    ],
    "project management": [
        lambda wc: "Project Management — you mean assigning yourself tasks you never complete?"
    ],
    "teaching": [
        lambda wc: "Teaching experience? You mean TA'ing a class you barely passed last semester?"
    ],
    "machine learning": [
        lambda wc: "Machine learning — because 'ran a Jupyter notebook once' sounds less impressive."
    ],
    "algorithms": [
        lambda wc: "Algorithms — listed right next to ‘I sort my laundry sometimes.’"
    ],
    "autocad": [
        lambda wc: "AutoCAD: where your dreams of precision meet your computer’s RAM ceiling."
    ],
    "java": [
        lambda wc: "Java? For when Python just isn't verbose enough."
    ],
    "sas": [
        lambda wc: "SAS? Did you mean 'Statistical Ancient Software'?"
    ],
    "cybersecurity": [
        lambda wc: "Cybersecurity — because watching Mr. Robot once counts, right?"
    ]
}


# Applies to all sections
general_roasts = {
    "* detail-oriented *": [
        lambda wc: f"Detail-oriented? You spelled your own name wrong in the header."
    ],
    "* team player *": [
        lambda wc: f"Team player? You mean you nodded during meetings?"
    ]
}

SECTION_PATTERN_RULES = {
    "education": education_roasts,
    "experience": experience_roasts,
    "awards": awards_roasts,
    "projects": publications_roasts,
    "summary": {},  # can fill this in later
    "skills": skills_roasts,
    "general": general_roasts
}
