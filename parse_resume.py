import fitz  # PyMuPDF
from PyPDF2 import PdfReader
import re
import sys

SECTION_HEADERS = {
    "summary": re.compile(r"(summary|objective|about me|profile)", re.IGNORECASE),
    "education": re.compile(r"education", re.IGNORECASE),
    "experience": re.compile(r"(experience)", re.IGNORECASE),
    "skills": re.compile(r"(skills|technologies|tools|competencies)", re.IGNORECASE),
    "awards": re.compile(r"(awards|honors|recognition|achievements)", re.IGNORECASE),
    "publications": re.compile(r"(publications)", re.IGNORECASE),
    "certifications": re.compile(r"(certifications|certified|licenses)", re.IGNORECASE)
}

class Resume:
    def __init__(self, file_path):
        self.file_path = file_path
        self.raw_text = self._extract_text()
        self.sections_raw = {}
        self.sections_text = {}
        self.current_section = "summary"  # assume top block is summary
        self._segment_sections()

    def _extract_text(self):
        try:
            doc = fitz.open(self.file_path)
            text = ""
            for page in doc:
                text += page.get_text() + "\n"
            
            #raise exception if parsing failed
            if text == "": 
                raise Exception("broken fizz")
            
            return text
        except Exception as e:
            print(f"[fitz] Failed to open PDF: {e}")
            print("[fallback] Trying PyPDF2 instead...")

            # Fallback: PyPDF2
            try:
                reader = PdfReader(self.file_path)
                text = ""
                for page in reader.pages:
                    text += page.extract_text() or ""
                return text
            except Exception as e2:
                print(f"[PyPDF2] Also failed to read PDF: {e2}")
                raise RuntimeError("Could not extract text from PDF using any method.")


    def _normalize(self, text):
        return re.sub(r"[^a-zA-Z ]+", "", text).strip().lower()

    def _detect_section(self, line):
        normalized = self._normalize(line)

        # if normalized.startswith("skills "):  # only trigger if it starts cleanly
        #     return "skills"

        for name, pattern in SECTION_HEADERS.items():
            if pattern.search(normalized):
                return name
        return None

    def _segment_sections(self):
        lines = [line.strip() for line in self.raw_text.splitlines() if line.strip()]
        self.sections_raw[self.current_section] = []

        for line in lines:
            # Remove leading bullet symbols and surrounding whitespace
            cleaned_line = re.sub(r"^[•◦\-\*\u2022\s\●​]+", "", line).strip()

            if not cleaned_line:
                continue  # skip empty or bullet-only lines

            possible_section = self._detect_section(cleaned_line)
            if possible_section and possible_section != self.current_section:
                self.current_section = possible_section
                if self.current_section not in self.sections_raw:
                    self.sections_raw[self.current_section] = []

                # Check if the line is *just* a header (e.g., "Skills" or "Skills:")
                normalized_line = self._normalize(line)
                normalized_section = possible_section.lower()
             
                if normalized_line == normalized_section:
                    continue  # skip if it's a plain header line

                # Otherwise, treat it as content too


            self.sections_raw.setdefault(self.current_section, []).append(cleaned_line)

        self.sections_text = {
            k: " ".join(v) for k, v in self.sections_raw.items() if v
        }


    def get_section_lines(self, name):
        return self.sections_raw.get(name, [])

    def get_section_text(self, name):
        return self.sections_text.get(name, "")

    def print_sections(self):
        for section, lines in self.sections_raw.items():
            preview = " ".join(lines)[:500]
            print(f"\n== {section.upper()} ==\n{preview}...\n")

    def get_current_section(self):
        return self.current_section
        
    def extract_name(self):
        """
        Heuristically extract the candidate's name from the résumé text.
        Skips common headers like 'Home Address' or location lines.
        Returns the first plausible name (2-4 words, mostly capitalized).
        """
        import re

        lines = [line.strip() for line in self.raw_text.splitlines() if line.strip()]
        
        for line in lines:
            # Skip if line contains obvious non-name stuff
            lowered = line.lower()
            if any(keyword in lowered for keyword in [
                "address", "phone", "email", "linkedin", "github", "website", "cambridge", "boston",
                "massachusetts", "usa", "united states", "fax"
            ]):
                continue
            if re.search(r"\d", line):  # skip lines with numbers (e.g. ZIP, phone)
                continue
            if "@" in line:  # skip emails
                continue

            # Match lines that are likely names:
            # - 2 to 4 words long
            # - each word is capitalized or all-caps
            words = line.split()
            if 1 < len(words) <= 4 and all(
                word[0].isupper() or word.isupper() for word in words if word.isalpha()
            ):
                return line.title()  # Title-case it for display

        return None




# Example usage
if __name__ == "__main__":
    file = sys.argv[1]
    resume = Resume(file)
    resume.print_sections()
