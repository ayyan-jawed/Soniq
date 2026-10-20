from PIL import Image
import glob, os

files = sorted(glob.glob('public/images/*.jpg'))
files = [f for f in files if '_ref' not in f and 'hero-raw' not in f]
cols, tw, th = 4, 420, 315
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * th), (20, 20, 20))
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB')
    im.thumbnail((tw - 10, th - 10))
    x, y = (i % cols) * tw, (i // cols) * th
    sheet.paste(im, (x + 5, y + 5))
    print(i, os.path.basename(f), Image.open(f).size)
sheet.save('scripts/contact.jpg', quality=80)
print('sheet', sheet.size)
