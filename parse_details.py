import json, re

with open(r"C:\Users\User\.gemini\antigravity\scratch\kompyuter-arxitektori\docs\extracted_summary.json", "r", encoding="utf-8") as f:
    data = json.load(f)

extracted = {}
for filename, doc in data.items():
    paras = doc["paragraphs"]
    tables = doc["tables"]
    
    # Extract questions
    questions = []
    in_q = False
    for p in paras:
        if "nazorat savollari" in p.lower() or "savollar:" in p.lower():
            in_q = True
            continue
        if in_q:
            if re.match(r"^\d+[\.\)]", p):
                questions.append(p)
            elif len(p) > 10 and not p.startswith("Amaliy") and not p.startswith("Ishdan"):
                questions.append(p)
            if len(questions) >= 10:
                in_q = False

    extracted[filename] = {
        "title": paras[0] if paras else "",
        "tables": tables,
        "questions": questions
    }

with open(r"C:\Users\User\.gemini\antigravity\scratch\kompyuter-arxitektori\docs\parsed_questions_tables.json", "w", encoding="utf-8") as f:
    json.dump(extracted, f, ensure_ascii=False, indent=2)

print("Parsed tables and questions!")
for f, d in extracted.items():
    print(f"{f}: {len(d['tables'])} tables, {len(d['questions'])} questions")
