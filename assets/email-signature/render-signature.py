from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random

ROOT = Path(__file__).resolve().parent.parent.parent
OUT = ROOT / 'assets' / 'email-signature'
FONTS = OUT / 'fonts'
SCALE = 4
W, H = 640, 200

def s(v):
    return int(round(v * SCALE))

def rounded_mask(size, radius):
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return mask

def circle_mask(size):
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size[0] - 1, size[1] - 1), fill=255)
    return mask

def fit_cover(img, size):
    target_w, target_h = size
    ratio = max(target_w / img.width, target_h / img.height)
    new = img.resize((int(img.width * ratio), int(img.height * ratio)), Image.Resampling.LANCZOS)
    left = (new.width - target_w) // 2
    top = (new.height - target_h) // 2
    return new.crop((left, top, left + target_w, top + target_h))

canvas = Image.new('RGB', (s(W), s(H)), '#09090b')
draw = ImageDraw.Draw(canvas)

# Soft matte texture, subtle enough for an email signature but not flat.
noise = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
noise_draw = ImageDraw.Draw(noise)
random.seed(12)
for _ in range(2600):
    x = random.randrange(canvas.width)
    y = random.randrange(canvas.height)
    alpha = random.randrange(7, 18)
    noise_draw.point((x, y), fill=(255, 255, 255, alpha))
canvas = Image.alpha_composite(canvas.convert('RGBA'), noise).convert('RGB')
draw = ImageDraw.Draw(canvas)

portrait = Image.open(ROOT / 'images' / 'tomi-profile-1.jpg').convert('RGB')
portrait = fit_cover(portrait, (s(109), s(127)))
portrait_mask = rounded_mask(portrait.size, s(12))
portrait_frame = Image.new('RGBA', (s(117), s(135)), (5, 5, 5, 255))
frame_draw = ImageDraw.Draw(portrait_frame)
frame_draw.rounded_rectangle((0, 0, s(117) - 1, s(135) - 1), radius=s(15), fill=(5, 5, 5, 255), outline=(39, 39, 42, 255), width=s(1))
portrait_layer = Image.new('RGBA', portrait_frame.size, (0, 0, 0, 0))
portrait_layer.paste(portrait.convert('RGBA'), (s(4), s(4)), portrait_mask)
portrait_frame = Image.alpha_composite(portrait_frame, portrait_layer)
canvas.paste(portrait_frame.convert('RGB'), (s(32), s(32)), portrait_frame.split()[-1])

# Divider.
draw.rectangle((s(177), s(46), s(178), s(154)), fill='#27272a')

name_font = ImageFont.truetype(str(FONTS / 'Sanchez-Regular.ttf'), s(27))
role_font = ImageFont.truetype(str(FONTS / 'Satoshi-Medium.otf'), s(14.5))
meta_font = ImageFont.truetype(str(FONTS / 'Satoshi-Regular.otf'), s(13))

# Text positions tuned to match the SVG/HTML layout.
draw.text((s(207), s(43)), 'Tomi Abe,', font=name_font, fill='#fafafa')
draw.text((s(207), s(80)), 'Principal, Tomi Abe Studio', font=role_font, fill='#a1a1aa')
draw.line((s(207), s(108), s(436), s(108)), fill='#27272a', width=s(1))
draw.text((s(207), s(122)), 'studio.tomiabe.com', font=meta_font, fill='#a1a1aa')
draw.ellipse((s(331.4), s(130.4), s(334.6), s(133.6)), fill='#27272a')
draw.text((s(349), s(122)), 'studio@tomiabe.com', font=meta_font, fill='#a1a1aa')

logo = Image.open(ROOT / 'favicon.png').convert('RGBA')
logo_size = s(116)
logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
logo_back = Image.new('RGBA', (s(126), s(126)), (0, 0, 0, 0))
logo_draw = ImageDraw.Draw(logo_back)
logo_draw.ellipse((s(4), s(4), s(122), s(122)), fill=(0, 0, 0, 255), outline=(39, 39, 42, 255), width=s(1))
logo_back.paste(logo, (s(5), s(5)), logo)
canvas.paste(logo_back.convert('RGB'), (s(485), s(37)), logo_back.split()[-1])

final = canvas.resize((W, H), Image.Resampling.LANCZOS)
png_path = OUT / 'tomi-abe-signature-sanchez-satoshi.png'
jpg_path = OUT / 'tomi-abe-signature-sanchez-satoshi.jpg'
final.save(png_path, 'PNG', optimize=True)
final.save(jpg_path, 'JPEG', quality=94, optimize=True, progressive=True)
print(png_path)
print(jpg_path)
