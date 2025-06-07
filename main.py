from parse_resume import Resume
from rules import SECTION_PATTERN_RULES
from pattern_matcher import apply_pattern_dict

def roast_resume_section(section_name, section_lines):
    section_rules = SECTION_PATTERN_RULES.get(section_name, {})
    general_rules = SECTION_PATTERN_RULES.get("general", {})

    roasts = []
    for line in section_lines:
        roasts += apply_pattern_dict(section_rules, line)
        roasts += apply_pattern_dict(general_rules, line)

    # Remove duplicates while preserving order
    seen = set()
    unique_roasts = []
    for r in roasts:
        if r not in seen:
            seen.add(r)
            unique_roasts.append(r)

    return unique_roasts

def roast_entire_resume(resume):
    print(f"\nRoasts for: {resume.file_path}")
    print("=" * 50)

    for section, lines in resume.sections_raw.items():
        roasts = roast_resume_section(section, lines)
        if roasts:
            print(f"\n[{section.upper()}]")
            for r in roasts:
                print(f"• {r}")
    print()

# Command-line usage
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python roast_runner.py <resume.pdf>")
        sys.exit(1)

    resume = Resume(sys.argv[1])
    roast_entire_resume(resume)
