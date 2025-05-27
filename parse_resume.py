import fitz  # PyMuPDF
import re

SECTION_HEADERS = {
    "summary": re.compile(r"(summary|objective|about me|profile)", re.IGNORECASE),
    "education": re.compile(r"education", re.IGNORECASE),
    "experience": re.compile(r"(experience|employment|work|career|positions)", re.IGNORECASE),
    "skills": re.compile(r"(skills|technologies|tools|competencies)", re.IGNORECASE),
    "projects": re.compile(r"(projects|portfolio|creations|builds)", re.IGNORECASE),
    "awards": re.compile(r"(awards|honors|recognition|achievements)", re.IGNORECASE),
    "certifications": re.compile(r"(certifications|certified|licenses)", re.IGNORECASE),
    "other": re.compile(r".*")  # fallback
}


class Resume:
    def __init__(self, file_path):
        self.file_path = file_path
        self.raw_text = self._extract_text()
        self.sections = {}
        self.current_section = "summary"  # default starting section
        self._segment_sections()

    def _extract_text(self):
        doc = fitz.open(self.file_path)
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        return text

    def _normalize(self, text):
        return re.sub(r"[^a-zA-Z ]+", "", text).strip().lower()

    def _detect_section(self, line):
        normalized = self._normalize(line)
        for name, pattern in SECTION_HEADERS.items():
            if pattern.search(normalized):
                return name
        return None

    def _segment_sections(self):
        lines = [line.strip() for line in self.raw_text.splitlines() if line.strip()]
        self.sections[self.current_section] = []

        for line in lines:
            possible_section = self._detect_section(line)
            if possible_section and possible_section != self.current_section and possible_section != "other":
                self.current_section = possible_section
                if self.current_section not in self.sections:
                    self.sections[self.current_section] = []
                continue  # optional: skip header line

            self.sections.setdefault(self.current_section, []).append(line)

        # flatten lines into strings per section
        for k in self.sections:
            self.sections[k] = " ".join(self.sections[k])

    def get_section(self, name):
        return self.sections.get(name, "")

    def print_sections(self):
        for section, content in self.sections.items():
            print(f"\n== {section.upper()} ==\n{content[:500]}...\n")  # preview

    def get_current_section(self):
        return self.current_section


# Example usage
if __name__ == "__main__":
    import sys
    file = sys.argv[1]
    resume = Resume(file)
    resume.print_sections()
