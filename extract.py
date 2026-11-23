import zipfile, xml.etree.ElementTree as ET, os, json

docs_dir = r"C:\Users\User\.gemini\antigravity\scratch\kompyuter-arxitektori\docs"
files = sorted([f for f in os.listdir(docs_dir) if f.endswith(".docx")], key=lambda x: int(x.split(".")[0]))

def parse_docx(path):
    with zipfile.ZipFile(path) as z:
        tree = ET.fromstring(z.read("word/document.xml"))
        w_p = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p"
        w_t = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t"
        w_tbl = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tbl"
        w_tr = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr"
        w_tc = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc"

        paragraphs = []
        for p in tree.iter(w_p):
            texts = [node.text for node in p.iter(w_t) if node.text]
            if texts:
                paragraphs.append("".join(texts).strip())
        
        tables = []
        for tbl in tree.iter(w_tbl):
            table_rows = []
            for tr in tbl.iter(w_tr):
                row_cells = []
                for tc in tr.iter(w_tc):
                    cell_text = " ".join([node.text for node in tc.iter(w_t) if node.text]).strip()
                    row_cells.append(cell_text)
                if row_cells:
                    table_rows.append(row_cells)
            if table_rows:
                tables.append(table_rows)
        return {"paragraphs": paragraphs, "tables": tables}

all_data = {}
for f in files:
    all_data[f] = parse_docx(os.path.join(docs_dir, f))

with open(os.path.join(docs_dir, "extracted_summary.json"), "w", encoding="utf-8") as out:
    json.dump(all_data, out, ensure_ascii=False, indent=2)

print("Extracted successfully!")
for f, data in all_data.items():
    print(f"=== {f} ===: {len(data['paragraphs'])} paragraphs, {len(data['tables'])} tables")
