"""Generira SVG datoteke loga Bistra glavica s tekstom pretvorenim u krivulje."""
import io
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

INK, PAPER, SUN, FI, WOOD = "#17140F", "#FBF7EF", "#F2C230", "#E8461E", "#EFE7D6"

FONTS = ROOT / "node_modules/@fontsource-variable"


def load(path, axes):
    f = TTFont(path)
    inst = instantiateVariableFont(f, axes)
    buf = io.BytesIO()
    inst.flavor = None
    inst.save(buf)
    return inst, buf.getvalue()


bric, bric_bytes = load(FONTS / "bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2",
                        {"wght": 800, "opsz": 48})
fig, fig_bytes = load(FONTS / "figtree/files/figtree-latin-wght-normal.woff2", {"wght": 500})


def text_path(font, data, text, size, x, y, tracking=0.0):
    """Vraća (svg path d, širina) za tekst s baznom linijom na y."""
    face = hb.Face(data)
    hbfont = hb.Font(face)
    upem = face.upem
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    gs = font.getGlyphSet()
    order = font.getGlyphOrder()
    scale = size / upem
    pen = SVGPathPen(gs)
    cx = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        t = TransformPen(pen, (scale, 0, 0, -scale, x + (cx + pos.x_offset) * scale, y - pos.y_offset * scale))
        gs[name].draw(t)
        cx += pos.x_advance + tracking * upem
    return pen.getCommands(), (cx - tracking * upem) * scale


def mark(outline, body, eraser, ferrule, tip, lead, burst, fill_none=False):
    """Znak u koordinatama 0..100 (viewBox 2 2 96 96)."""
    f = (lambda c: "none") if fill_none else (lambda c: c)
    return f'''<g transform="translate(-8 8) rotate(-45 50 50)" stroke="{outline}" stroke-width="2.5" stroke-linejoin="round">
<rect x="6" y="42" width="8" height="16" fill="{f(eraser)}"/>
<rect x="14" y="42" width="6" height="16" fill="{ferrule}"/>
<rect x="20" y="42" width="46" height="16" fill="{f(body)}"/>
<polygon points="66,42 82,50 66,58" fill="{f(tip)}"/>
<polygon points="77,47.5 82,50 77,52.5" fill="{lead}"/>
</g>
<g transform="translate(56 4) scale(0.4)" fill="none" stroke="{burst}" stroke-width="10" stroke-linecap="round">
<path d="M50 28 L50 4"/><path d="M65.6 34.4 L82.5 17.5"/><path d="M72 50 L96 50"/><path d="M65.6 65.6 L82.5 82.5"/><path d="M34.4 34.4 L17.5 17.5"/>
</g>'''


VARIANTS = {
    "boja": dict(mark=dict(outline=INK, body=SUN, eraser=FI, ferrule=INK, tip=PAPER, lead=INK, burst=FI), text=INK, sub="#5A5347", bg=None),
    "tamna-podloga": dict(mark=dict(outline=INK, body=SUN, eraser=FI, ferrule=PAPER, tip=WOOD, lead=INK, burst=SUN), text=PAPER, sub="#D9D2C3", bg=INK),
    "crna": dict(mark=dict(outline=INK, body=INK, eraser=INK, ferrule=INK, tip=INK, lead=INK, burst=INK, fill_none=True), text=INK, sub=INK, bg=None),
    "bijela": dict(mark=dict(outline="#FFFFFF", body="#FFFFFF", eraser="#FFFFFF", ferrule="#FFFFFF", tip="#FFFFFF", lead="#FFFFFF", burst="#FFFFFF", fill_none=True), text="#FFFFFF", sub="#FFFFFF", bg=None),
}


def svg(w, h, body, title, bg=None):
    rect = f'<rect width="{w:.1f}" height="{h:.1f}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} {h:.1f}" width="{w:.0f}" height="{h:.0f}" role="img">'
            f'<title>{title}</title>{rect}{body}</svg>\n')


for name, v in VARIANTS.items():
    m = mark(**v["mark"])
    pad = 0
    # 1. Samo znak
    body = f'<g transform="translate(-2 -2)">{m}</g>'
    (OUT / f"znak-{name}.svg").write_text(svg(96, 96, body, "Bistra glavica, znak", v["bg"]))

    # 2. Vodoravni logo: znak + BISTRA GLAVICA u jednom redu
    size = 40
    d, tw = text_path(bric, bric_bytes, "BISTRA GLAVICA", size, 0, 0)
    mark_h = 64
    gap = 14
    th = size * 0.72  # visina velikih slova
    W = mark_h + gap + tw
    H = mark_h
    body = (f'<g transform="scale({mark_h/96}) translate(-2 -2)">{m}</g>'
            f'<path transform="translate({mark_h + gap} {H/2 + th/2})" d="{d}" fill="{v["text"]}"/>')
    (OUT / f"logo-vodoravni-{name}.svg").write_text(svg(W, H, body, "Bistra glavica", v["bg"]))

    # 3. Složeni logo: znak lijevo, BISTRA / GLAVICA u dva reda, ispod podnaslov
    size = 44
    d1, w1 = text_path(bric, bric_bytes, "BISTRA", size, 0, 0)
    d2, w2 = text_path(bric, bric_bytes, "GLAVICA", size, 0, 0)
    ds, ws = text_path(fig, fig_bytes, "obrt za instrukcije i poduku", 15, 0, 0)
    cap = size * 0.72
    line = size * 0.9
    tx = 120 + 18
    y1 = cap
    y2 = cap + line
    ys = y2 + 26
    H = max(120, ys + 4)
    W = tx + max(w1, w2, ws)
    body = (f'<g transform="translate(0 {(H-120)/2}) scale({120/96}) translate(-2 -2)">{m}</g>'
            f'<g transform="translate({tx} {(H - ys - 4)/2})">'
            f'<path transform="translate(0 {y1})" d="{d1}" fill="{v["text"]}"/>'
            f'<path transform="translate(0 {y2})" d="{d2}" fill="{v["text"]}"/>'
            f'<path transform="translate(0 {ys})" d="{ds}" fill="{v["sub"]}"/></g>')
    (OUT / f"logo-slozeni-{name}.svg").write_text(svg(W, H, body, "Bistra glavica, obrt za instrukcije i poduku", v["bg"]))

# 4. Profilna slika (Instagram, WhatsApp): znak na papiru, kvadrat, siguran za krug
m = mark(**VARIANTS["boja"]["mark"])
body = f'<g transform="translate(140 140) scale({800/96}) translate(-2 -2)">{m}</g>'
(OUT / "profilna-slika.svg").write_text(svg(1080, 1080, body, "Bistra glavica", PAPER))
print("ok", sorted(p.name for p in OUT.iterdir()))
