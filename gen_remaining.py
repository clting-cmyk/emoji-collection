import sys, os, subprocess
sys.stdout.reconfigure(encoding='utf-8')

remaining = [
    ("wind", "風力發電機和太陽能板，再生能源，綠色能源，簡潔插圖"),
    ("justice", "天秤兩端，氣候正義，公平概念，簡潔風格"),
    ("youth", "年輕人舉標語氣候抗議，希望，簡潔插圖"),
    ("taiwan", "台灣島被海水上升淹沒，氣候威脅，簡潔風格"),
    ("future", "兩個地球對比，一邊綠色一邊枯黃，希望與行動"),
]

draw_py = os.path.expanduser(r"~\.config\opencode\skills\draw\draw.py")
out_dir = os.path.expanduser(r"~\Documents\emoji-collection\ppt_imgs")

for key, prompt in remaining:
    path = os.path.join(out_dir, f"{key}.svg")
    cmd = [sys.executable, draw_py, prompt, "--name", key, "--quality", "low"]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120, cwd=out_dir)
        if result.returncode == 0:
            print(f"✅ {key}")
        else:
            print(f"❌ {key}: {result.stderr[:100]}")
    except subprocess.TimeoutExpired:
        print(f"⏰ {key}: timeout")
