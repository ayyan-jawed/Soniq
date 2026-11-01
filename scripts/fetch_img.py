import sys, time, urllib.request
from pathlib import Path
from PIL import Image, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = False

url, out = sys.argv[1], sys.argv[2]
out_path = Path(out)
out_path.parent.mkdir(parents=True, exist_ok=True)
tmp = out_path.with_suffix(out_path.suffix + ".part")

last_error = None
for attempt in range(1, 4):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=90) as response:
            data = response.read()
        tmp.write_bytes(data)
        image = Image.open(tmp)
        image.load()  # full decode — catches truncated transfers
        image.save(out_path, quality=95)
        tmp.unlink(missing_ok=True)
        print(f"OK {out} {image.size} {len(data)} bytes")
        sys.exit(0)
    except Exception as error:  # noqa: BLE001 - retry any transport/decode failure
        last_error = error
        tmp.unlink(missing_ok=True)
        print(f"attempt {attempt} failed: {error}", file=sys.stderr)
        time.sleep(2 * attempt)

print(f"FAILED {out}: {last_error}", file=sys.stderr)
sys.exit(1)
