import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
from pdfminer.high_level import extract_text

path = r"C:\Users\chail\Downloads\給孩子的永續素養課：我們想要的未來 (1).pdf"
text = extract_text(path)
print(text[:8000])
