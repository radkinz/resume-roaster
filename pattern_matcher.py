import re
import random

def match_pattern(pattern, text):
    """
    Matches wildcard patterns like 'BS in *', allowing for variant forms of degrees.
    Wildcards (*) match up to common punctuation marks (like commas).
    Returns captures from original text.
    """
    def normalize(s):
        s = s.lower()
        s = re.sub(r"\bbachelor('?s)?\b", "bs", s)
        s = re.sub(r"\bb\s*\.?\s*s\.?\b", "bs", s)  # handles B.S., B S, B. S.
        return s

    norm_pattern = normalize(pattern)
    norm_text = normalize(text)

    # Simple keyword match (no wildcards)
    if '*' not in pattern:
        if normalize(pattern).strip() in norm_text:
            return [pattern.strip()]
        return None

    # Build regex from normalized pattern (for matching)
    norm_parts = norm_pattern.split('*')
    norm_regex = ''
    for i, part in enumerate(norm_parts):
        norm_regex += re.escape(part)
        if i < len(norm_parts) - 1:
            norm_regex += r'([^.,;:!?]+)'  # capture until punctuation

    # Do match on normalized string
    if not re.match(norm_regex, norm_text):
        return None

    # Build parallel regex for original (non-normalized) text
    raw_parts = pattern.split('*')
    raw_regex = ''
    for i, part in enumerate(raw_parts):
        raw_regex += re.escape(part)
        if i < len(raw_parts) - 1:
            raw_regex += r'([^.,;:!?]+)'

    raw_match = re.search(raw_regex, norm_text, re.IGNORECASE)
    if raw_match:
        return [
            re.sub(r'[\—:]+$', '', g).strip()  # remove trailing - or :
            for g in raw_match.groups()
        ]
    return None

def apply_pattern_dict(pattern_dict, text):
    """
    Tries to match every pattern in pattern_dict to the given text.
    Returns list of generated roasts from any matches.
    Randomly selects one roast per matched pattern.
    """
    results = []

    for pattern, lambdas in pattern_dict.items():
        if pattern == "__any__":
            continue
        wc = match_pattern(pattern, text)
        if wc:
            try:
                f = random.choice(lambdas)
                result = f([""] + wc)  # mimic 1-indexing of wc[1], wc[2], etc.
                if result:
                    results.append(result)
            except Exception:
                print("EXCEPTION")
                continue

    return results
