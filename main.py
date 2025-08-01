from parse_resume import Resume
from rules import SECTION_PATTERN_RULES
from pattern_matcher import apply_pattern_dict
import random

def select_roasts(roasts, max_count=5, seed=None):
    """
    Return up to max_count unique roasts, randomly sampled.
    Optional seed allows deterministic output.
    """
    if seed is not None:
        random.seed(seed)

    if len(roasts) <= max_count:
        return roasts

    return random.sample(roasts, max_count)

def roast_resume_section(section_name, section_lines):
    section_rules = SECTION_PATTERN_RULES.get(section_name, {})
    general_rules = SECTION_PATTERN_RULES.get("general", {})

    roasts = []

    if "__any__" in section_rules.keys():
        try:
            f = random.choice(section_rules["__any__"])
            result = f()
            if result:
                roasts.append(result)
        except Exception:
            pass
    else:
        for line in section_lines:
            roasts += apply_pattern_dict(section_rules, line)
            roasts += apply_pattern_dict(general_rules, line)
    
    return roasts

def roast_entire_resume(resume, max_roasts=5, seed=None, return_roasts=True):
    print(f"\nRoasts for: {resume.file_path}")
    print("=" * 50)

    all_roasts = []
    seen = set()

    name = resume.extract_name() or resume.file_path
    print(f"\nRoasts for: {name}")

    for section, lines in resume.sections_raw.items():
        roasts = roast_resume_section(section, lines)
        for r in roasts:
            if r not in seen:
                seen.add(r)
                all_roasts.append(r)

    selected_roasts = select_roasts(all_roasts, max_count=max_roasts, seed=seed)

    for r in selected_roasts:
        print(f"• {r}")
    print()

    if return_roasts:
        return select_roasts

# Command-line usage
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python roast_runner.py <resume.pdf>")
        sys.exit(1)

    resume = Resume(sys.argv[1])
    roast_entire_resume(resume)
