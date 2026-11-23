import json, os

with open(r"C:\Users\User\.gemini\antigravity\scratch\kompyuter-arxitektori\docs\extracted_summary.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for filename, doc in data.items():
    print(f"\n==================== {filename} ====================")
    paragraphs = doc["paragraphs"]
    # print first 5 paragraphs
    for p in paragraphs[:8]:
        if p.strip():
            print(f"- {p[:120]}")
    # find lines with "Topshiriq" or "Savollar" or "Variant"
    print("--- Selected key items ---")
    for p in paragraphs:
        lower = p.lower()
        if any(k in lower for k in ["topshiriq", "formula", "savol", "xulosa", "variant"]):
            print(f"  * {p[:140]}")
