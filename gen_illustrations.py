import sys, os, subprocess
sys.stdout.reconfigure(encoding='utf-8')

prompts = {
    "earth": "地球從太空俯瞰的插圖，藍色海洋綠色陸地，簡潔風格",
    "iceberg": "北極冰山融化，北極熊站在小浮冰上，悲傷表情，簡潔插圖",
    "thermometer": "地球溫度計正在上升，顯示全球暖化，簡潔風格",
    "cop26": "COP26 氣候峰會，各國領袖開會討論，簡潔插圖",
    "netzero": "淨零排放概念圖，工廠排放和樹木吸收達到平衡，簡潔風格",
    "wind": "風力發電機和太陽能板，再生能源，綠色能源，簡潔插圖",
    "justice": "天秤兩端一邊是已開發國家一邊是開發中國家，氣候正義概念，簡潔風格",
    "youth": "年輕人手舉標語為氣候罷課，環保抗議，簡潔插圖",
    "taiwan": "台灣島嶼被海水上升淹沒的示意圖，氣候威脅，簡潔風格",
    "future": "兩個地球對比，一個被破壞、一個綠色永續，希望與行動，簡潔風格",
}

draw_py = os.path.expanduser(r"~\.config\opencode\skills\draw\draw.py")
out_dir = os.path.expanduser(r"~\Documents\emoji-collection\ppt_imgs")
os.makedirs(out_dir, exist_ok=True)

for key, prompt in prompts.items():
    path = os.path.join(out_dir, f"{key}.svg")
    if os.path.exists(path):
        print(f"Skip {key} (already exists)")
        continue
    cmd = [sys.executable, draw_py, prompt, "--name", key, "--quality", "low"]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60, cwd=out_dir)
    if result.returncode == 0:
        print(f"✅ {key}: {result.stdout.strip()}")
    else:
        print(f"❌ {key}: {result.stderr.strip()[:100]}")
