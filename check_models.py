import json, os, urllib.request
key = None
with open(os.path.expanduser("~/.openai.env")) as f:
    for line in f:
        if line.startswith("OPENAI_API_KEY="):
            key = line.split("=", 1)[1].strip().strip("'\"")
req = urllib.request.Request(
    "https://openrouter.ai/api/v1/models",
    headers={"Authorization": f"Bearer {key}"}
)
data = json.loads(urllib.request.urlopen(req).read())
for m in data.get("data", []):
    print(m["id"])
