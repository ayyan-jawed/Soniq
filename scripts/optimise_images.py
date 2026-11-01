from pathlib import Path
from PIL import Image

ROOT = Path("public/images")

# use the re-shot lifestyle imagery
for name, target in [
    ("life-commute-v2.jpg", "life-commute.jpg"),
    ("life-studio-v2.jpg", "life-studio.jpg"),
    ("life-night-v2.jpg", "life-night.jpg"),
]:
    source = ROOT / name
    if source.exists() and source.stat().st_size > 10_000:
        Image.open(source).load()
        source.replace(ROOT / target)

rules = {
    "hero.jpg": (2400, 86),
    "life-commute.jpg": (1600, 84),
    "life-studio.jpg": (1800, 84),
    "life-night.jpg": (1800, 84),
    "story-workshop.jpg": (1600, 84),
    "lab-exploded.jpg": (1600, 84),
    "detail-cup.jpg": (1400, 84),
    "detail-headband.jpg": (1400, 84),
}

total_before = 0
total_after = 0
for path in sorted(ROOT.glob("*.jpg")):
    if path.name.endswith("-v2.jpg"):
        continue
    total_before += path.stat().st_size
    image = Image.open(path)
    image.load()
    image = image.convert("RGB")

    if path.name in rules:
        max_width, quality = rules[path.name]
    else:
        max_width, quality = 1600, 84

    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.LANCZOS)

    image.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    total_after += path.stat().st_size
    print(f"{path.name:26} {image.width}x{image.height}  {path.stat().st_size // 1024:5d} KB")

print(f"total {total_before // 1024} KB -> {total_after // 1024} KB")
