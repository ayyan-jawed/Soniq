import sys, urllib.request
from pathlib import Path

url, out = sys.argv[1], sys.argv[2]
Path(out).parent.mkdir(parents=True, exist_ok=True)
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=120) as r, open(out, "wb") as f:
    f.write(r.read())
from PIL import Image
im = Image.open(out)
print(f"{out} {im.size} {im.mode}")
