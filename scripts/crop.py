import sys
from PIL import Image

src = sys.argv[1]
out_prefix = sys.argv[2]
chunks = [int(x) for x in sys.argv[3].split(",")]

im = Image.open(src)
w, h = im.size
print("size", w, h)
bounds = [0] + chunks + [h]
for i in range(len(bounds) - 1):
    top, bottom = bounds[i], min(bounds[i + 1], h)
    if bottom <= top:
        continue
    crop = im.crop((0, top, w, bottom))
    crop.save(f"{out_prefix}-{i}.png")
    print(f"{out_prefix}-{i}.png", crop.size)
