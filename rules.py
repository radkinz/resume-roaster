roast_patterns = {
    "* BS in *": [
    lambda wc: f"A Bachelor's in {wc[2]}? Bold choice for job security."
    ],
    "* intern": [
        lambda wc: f"Internship with {wc[1]}? Did you have a good summer pretending to be busy?"
    ],
    "* worked with *": [
        lambda wc: f"You have experience with {wc[1]}? Are you sure about that?"
    ],
    "* computer architecture *": [
    lambda wc: f"Interested in computer architecture? Bet you're fun at parties."
    ],
    "* published *": [
    lambda wc: f"Published in '{wc[1]}' — never heard of it, but I'll pretend to be impressed.",
    lambda wc: f"You got published? So did my grocery list on the fridge.",
    ],
    "* won * award *": [
    lambda wc: f"Won the '{wc[1]}' award — still milking that one, huh?",
    lambda wc: f"Congrats on the '{wc[1]}' award. I'm sure your mom was very proud.",
    ],
    "* recognized for *": [
    lambda wc: f"Recognized for '{wc[1]}' — by whom? Your group chat?",
    lambda wc: f"Recognition for '{wc[1]}' — sounds like a polite way to say 'participated'.",
    ]
}
