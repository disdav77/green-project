import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/images/plans', exist_ok=True)

font_label = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 16)
font_size = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 16)
font_dim = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 14)
font_scale = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 12)

def generate_architectural_plan(filename, rooms_data, overall_dim_x_str="8.40 м", overall_dim_y_str="6.80 м"):
    # Target canvas 1200 x 825 (matching 16:11 aspect ratio of cards)
    W, H = 1200, 825
    img = Image.new('RGB', (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # 1. Subtle Architectural Grid (very light, high-end blueprint paper look)
    grid_spacing = 30
    grid_color = (246, 248, 246)
    for x in range(0, W, grid_spacing):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, grid_spacing):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)

    # 2. Calculate Bounding Box of all rooms to perfectly center
    min_x = min(r['x'] for r in rooms_data)
    min_y = min(r['y'] for r in rooms_data)
    max_x = max(r['x'] + r['w'] for r in rooms_data)
    max_y = max(r['y'] + r['h'] for r in rooms_data)
    
    raw_w = max_x - min_x
    raw_h = max_y - min_y

    # Max available area for geometry inside 1200x825
    # Leave 130px top (clean buffer for badges), 100px bottom (scale & compass), 120px sides (dimensions)
    avail_w = 940
    avail_h = 580

    scale = min(avail_w / raw_w, avail_h / raw_h)
    
    scaled_w = raw_w * scale
    scaled_h = raw_h * scale

    # Offset to mathematically center the geometry in canvas
    # Center X is 600, Center Y is 415 (slightly lowered to give badges plenty of air)
    ox = (W - scaled_w) / 2.0 - (min_x * scale) + 15
    oy = (H - scaled_h) / 2.0 - (min_y * scale) + 20

    # Colors
    wall_color = (30, 41, 59)          # Deep charcoal
    interior_wall = (71, 85, 105)      # Slate grey
    dim_color = (120, 135, 155)        # Dimension lines
    pine_accent = (33, 145, 78)        # Green Project emerald

    # 3. Draw Room Fills and Features
    for r in rooms_data:
        rx0 = int(ox + r['x'] * scale)
        ry0 = int(oy + r['y'] * scale)
        rx1 = int(rx0 + r['w'] * scale)
        ry1 = int(ry0 + r['h'] * scale)
        rw = rx1 - rx0
        rh = ry1 - ry0

        fill_color = r.get('fill', (252, 253, 252))
        draw.rectangle([rx0, ry0, rx1, ry1], fill=fill_color, outline=None)

        feature = r.get('feature')
        if feature == 'bed':
            bw, bh = int(110 * scale), int(140 * scale)
            bx0 = rx0 + int(24 * scale)
            by0 = ry0 + (rh - bh) // 2
            draw.rectangle([bx0, by0, bx0 + bw, by0 + bh], outline=(148, 163, 184), width=2, fill=(255, 255, 255))
            # Pillows
            pw, ph = int(35 * scale), int(42 * scale)
            draw.rectangle([bx0 + 8, by0 + 10, bx0 + 8 + pw, by0 + 10 + ph], outline=(160, 175, 195), width=1, fill=(245, 248, 252))
            draw.rectangle([bx0 + 8, by0 + bh - 10 - ph, bx0 + 8 + pw, by0 + bh - 10], outline=(160, 175, 195), width=1, fill=(245, 248, 252))
            # Blanket fold line
            draw.line([(bx0 + int(55 * scale), by0), (bx0 + int(55 * scale), by0 + bh)], fill=(203, 213, 225), width=2)
        elif feature == 'sofa':
            sw, sh = int(150 * scale), int(60 * scale)
            sx0 = rx0 + int(30 * scale)
            sy0 = ry0 + int(30 * scale)
            draw.rectangle([sx0, sy0, sx0 + sw, sy0 + sh], outline=(148, 163, 184), width=2, fill=(255, 255, 255))
            # Coffee table
            cw, ch = int(70 * scale), int(40 * scale)
            cx0 = sx0 + (sw - cw) // 2
            cy0 = sy0 + sh + int(25 * scale)
            draw.rectangle([cx0, cy0, cx0 + cw, cy0 + ch], outline=(203, 213, 225), width=1, fill=(248, 250, 252))
        elif feature == 'bath':
            # Tub
            tw, th = int(60 * scale), int(120 * scale)
            draw.rectangle([rx0 + 12, ry0 + 12, rx0 + 12 + tw, ry0 + 12 + th], outline=(14, 165, 233), width=2, fill=(240, 249, 255))
            # Basin
            bs_x = rx1 - int(45 * scale)
            bs_y = ry0 + int(16 * scale)
            draw.ellipse([bs_x, bs_y, bs_x + int(32 * scale), bs_y + int(32 * scale)], outline=(14, 165, 233), width=2)
            # Toilet
            wc_x = rx1 - int(48 * scale)
            wc_y = ry1 - int(55 * scale)
            draw.ellipse([wc_x, wc_y, wc_x + int(34 * scale), wc_y + int(42 * scale)], outline=(148, 163, 184), width=2)
        elif feature == 'kitchen':
            kw = int(38 * scale)
            draw.rectangle([rx0, ry0, rx1, ry0 + kw], outline=(203, 213, 225), width=2, fill=(241, 245, 249))
            draw.rectangle([rx0, ry0, rx0 + kw, ry1], outline=(203, 213, 225), width=2, fill=(241, 245, 249))
            # Stove circles
            st_x = rx0 + int(60 * scale)
            draw.ellipse([st_x, ry0 + 8, st_x + int(20 * scale), ry0 + 8 + int(20 * scale)], outline=(100, 116, 139), width=2)
            draw.ellipse([st_x + int(30 * scale), ry0 + 8, st_x + int(50 * scale), ry0 + 8 + int(20 * scale)], outline=(100, 116, 139), width=2)
        elif feature == 'balcony':
            draw.line([(rx0, ry1), (rx1, ry1)], fill=pine_accent, width=4)
            step = max(int(15 * scale), 12)
            for bx in range(rx0, rx1, step):
                draw.line([(bx, ry1 - 10), (bx, ry1)], fill=pine_accent, width=2)

    # 4. Draw Walls (Exterior thick, interior medium)
    for r in rooms_data:
        rx0 = int(ox + r['x'] * scale)
        ry0 = int(oy + r['y'] * scale)
        rx1 = int(rx0 + r['w'] * scale)
        ry1 = int(ry0 + r['h'] * scale)
        is_outer = r.get('outer', True)
        color = wall_color if is_outer else interior_wall
        width = 7 if is_outer else 4
        draw.rectangle([rx0, ry0, rx1, ry1], outline=color, width=width)

    # 5. Draw Centered Room Labels and Areas
    for r in rooms_data:
        rx0 = int(ox + r['x'] * scale)
        ry0 = int(oy + r['y'] * scale)
        rx1 = int(rx0 + r['w'] * scale)
        ry1 = int(ry0 + r['h'] * scale)
        cx = (rx0 + rx1) // 2
        cy = (ry0 + ry1) // 2
        label = r.get('label', '')
        size_txt = r.get('size', '')

        # Position label in free floor area
        feature = r.get('feature')
        if feature == 'bed':
            bw = int(110 * scale)
            bx0 = rx0 + int(24 * scale)
            cx = (bx0 + bw + rx1) // 2
        elif feature == 'bath':
            tw = int(60 * scale)
            cx = (rx0 + 12 + tw + rx1) // 2
        elif feature == 'sofa':
            sh = int(60 * scale)
            sy0 = ry0 + int(30 * scale)
            ch = int(40 * scale)
            cy0 = sy0 + sh + int(25 * scale)
            cy = (cy0 + ch + ry1) // 2
        elif feature == 'kitchen':
            kw = int(38 * scale)
            cy = (ry0 + kw + ry1) // 2

        l_bbox = font_label.getbbox(label)
        lw = l_bbox[2] - l_bbox[0]
        lh = l_bbox[3] - l_bbox[1]
        draw.text((cx - lw // 2, cy - 18), label, fill=(15, 23, 42), font=font_label)

        if size_txt:
            s_bbox = font_size.getbbox(size_txt)
            sw = s_bbox[2] - s_bbox[0]
            draw.text((cx - sw // 2, cy + 6), size_txt, fill=pine_accent, font=font_size)

    # 6. Exterior Dimension Lines (Architectural CAD styling)
    geom_left = int(ox + min_x * scale)
    geom_right = int(ox + max_x * scale)
    geom_top = int(oy + min_y * scale)
    geom_bottom = int(oy + max_y * scale)

    # Top dimension
    dim_top_y = geom_top - 28
    draw.line([(geom_left, dim_top_y), (geom_right, dim_top_y)], fill=dim_color, width=1)
    draw.line([(geom_left, dim_top_y - 8), (geom_left, dim_top_y + 8)], fill=dim_color, width=1)
    draw.line([(geom_right, dim_top_y - 8), (geom_right, dim_top_y + 8)], fill=dim_color, width=1)
    dim_x_bbox = font_dim.getbbox(overall_dim_x_str)
    dim_x_w = dim_x_bbox[2] - dim_x_bbox[0]
    draw.text(((geom_left + geom_right) // 2 - dim_x_w // 2, dim_top_y - 20), overall_dim_x_str, fill=dim_color, font=font_dim)

    # Left dimension
    dim_left_x = geom_left - 30
    draw.line([(dim_left_x, geom_top), (dim_left_x, geom_bottom)], fill=dim_color, width=1)
    draw.line([(dim_left_x - 8, geom_top), (dim_left_x + 8, geom_top)], fill=dim_color, width=1)
    draw.line([(dim_left_x - 8, geom_bottom), (dim_left_x + 8, geom_bottom)], fill=dim_color, width=1)
    dim_y_bbox = font_dim.getbbox(overall_dim_y_str)
    dim_y_w = dim_y_bbox[2] - dim_y_bbox[0]
    draw.text((dim_left_x - dim_y_w - 12, (geom_top + geom_bottom) // 2 - 8), overall_dim_y_str, fill=dim_color, font=font_dim)

    # 7. Subtle Scale Bar at Bottom-Left
    scale_y = H - 42
    scale_x = geom_left
    draw.line([(scale_x, scale_y), (scale_x + 120, scale_y)], fill=(71, 85, 105), width=3)
    draw.text((scale_x, scale_y + 6), "0", fill=(100, 116, 139), font=font_scale)
    draw.text((scale_x + 55, scale_y + 6), "2 м", fill=(100, 116, 139), font=font_scale)
    draw.text((scale_x + 110, scale_y + 6), "4 м", fill=(100, 116, 139), font=font_scale)
    draw.text((scale_x + 155, scale_y + 6), "МАСШТАБ 1:50 | АРХИТЕКТУРНЫЙ ПЛАН GP-CAD", fill=(148, 163, 184), font=font_scale)

    # 8. Clean Modern Compass at Bottom-Right
    cx, cy = geom_right - 25, H - 46
    draw.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], outline=(203, 213, 225), width=1)
    draw.polygon([(cx, cy - 16), (cx - 6, cy + 3), (cx + 6, cy + 3)], fill=(15, 56, 46))
    draw.polygon([(cx, cy + 16), (cx - 6, cy + 3), (cx + 6, cy + 3)], fill=(203, 213, 225))
    draw.text((cx - 4, cy - 35), "N", fill=(15, 56, 46), font=font_scale)

    img.save(filename, 'PNG', optimize=True)
    print(f"Generated clean centered plan: {filename} (geom size: {int(scaled_w)}x{int(scaled_h)})")

# 1. Studio 38 sqm
generate_architectural_plan(
    'public/images/plans/plan_studio_38.png',
    [
        {'x': 0, 'y': 0, 'w': 280, 'h': 240, 'label': 'ПРИХОЖАЯ', 'size': '4.2 м²', 'fill': (248, 250, 252)},
        {'x': 0, 'y': 240, 'w': 280, 'h': 260, 'label': 'САНУЗЕЛ', 'size': '4.8 м²', 'feature': 'bath', 'fill': (240, 249, 255)},
        {'x': 280, 'y': 0, 'w': 540, 'h': 220, 'label': 'КУХНЯ-НИША', 'size': '8.5 м²', 'feature': 'kitchen'},
        {'x': 280, 'y': 220, 'w': 540, 'h': 420, 'label': 'ГОСТИНАЯ-СПАЛЬНЯ', 'size': '16.7 м²', 'feature': 'sofa'},
        {'x': 400, 'y': 640, 'w': 420, 'h': 100, 'label': 'ФРАНЦУЗСКИЙ БАЛКОН', 'size': '3.8 м²', 'feature': 'balcony', 'fill': (240, 253, 244)},
    ],
    overall_dim_x_str="8.20 м",
    overall_dim_y_str="7.40 м"
)

# 2. 1-Room 42 sqm
generate_architectural_plan(
    'public/images/plans/plan_1k_42.png',
    [
        {'x': 0, 'y': 0, 'w': 260, 'h': 260, 'label': 'ХОЛЛ', 'size': '5.2 м²'},
        {'x': 0, 'y': 260, 'w': 260, 'h': 260, 'label': 'ВАННАЯ', 'size': '4.6 м²', 'feature': 'bath', 'fill': (240, 249, 255)},
        {'x': 260, 'y': 0, 'w': 380, 'h': 520, 'label': 'КУХНЯ-СТОЛОВАЯ', 'size': '14.0 м²', 'feature': 'kitchen'},
        {'x': 640, 'y': 0, 'w': 420, 'h': 520, 'label': 'СПАЛЬНЯ', 'size': '14.0 м²', 'feature': 'bed'},
        {'x': 640, 'y': 520, 'w': 420, 'h': 120, 'label': 'ЛОДЖИЯ', 'size': '4.2 м²', 'feature': 'balcony', 'fill': (240, 253, 244)},
    ],
    overall_dim_x_str="10.60 м",
    overall_dim_y_str="6.40 м"
)

# 3. 2-Room Euro 64 sqm
generate_architectural_plan(
    'public/images/plans/plan_2k_64.png',
    [
        {'x': 0, 'y': 0, 'w': 240, 'h': 300, 'label': 'ПРИХОЖАЯ', 'size': '7.2 м²'},
        {'x': 0, 'y': 300, 'w': 240, 'h': 260, 'label': 'САНУЗЕЛ', 'size': '5.2 м²', 'feature': 'bath', 'fill': (240, 249, 255)},
        {'x': 240, 'y': 0, 'w': 460, 'h': 560, 'label': 'КУХНЯ-ГОСТИНАЯ', 'size': '22.0 м²', 'feature': 'sofa'},
        {'x': 700, 'y': 0, 'w': 380, 'h': 560, 'label': 'МАСТЕР-СПАЛЬНЯ', 'size': '17.5 м²', 'feature': 'bed'},
        {'x': 240, 'y': 560, 'w': 460, 'h': 130, 'label': 'ТЕРРАСА-БАЛКОН', 'size': '5.6 м²', 'feature': 'balcony', 'fill': (240, 253, 244)},
    ],
    overall_dim_x_str="10.80 м",
    overall_dim_y_str="6.90 м"
)

# 4. 3-Room Family 88.5 sqm
generate_architectural_plan(
    'public/images/plans/plan_3k_88.png',
    [
        {'x': 0, 'y': 0, 'w': 260, 'h': 320, 'label': 'ПРИХОЖАЯ & ХОЛЛ', 'size': '9.8 м²'},
        {'x': 0, 'y': 320, 'w': 180, 'h': 240, 'label': 'С/У 1', 'size': '3.2 м²'},
        {'x': 180, 'y': 320, 'w': 220, 'h': 240, 'label': 'ВАННАЯ', 'size': '5.6 м²', 'feature': 'bath', 'fill': (240, 249, 255)},
        {'x': 260, 'y': 0, 'w': 420, 'h': 320, 'label': 'КУХНЯ-ГОСТИНАЯ', 'size': '21.5 м²', 'feature': 'kitchen'},
        {'x': 680, 'y': 0, 'w': 400, 'h': 320, 'label': 'СПАЛЬНЯ 1', 'size': '15.2 м²', 'feature': 'bed'},
        {'x': 400, 'y': 320, 'w': 340, 'h': 280, 'label': 'ДЕТСКАЯ', 'size': '14.0 м²'},
        {'x': 740, 'y': 320, 'w': 340, 'h': 280, 'label': 'МАСТЕР-СПАЛЬНЯ', 'size': '12.0 м²', 'feature': 'bed'},
        {'x': 260, 'y': 600, 'w': 480, 'h': 120, 'label': 'ГЛУБОКАЯ ЛОДЖИЯ', 'size': '7.2 м²', 'feature': 'balcony', 'fill': (240, 253, 244)},
    ],
    overall_dim_x_str="10.80 м",
    overall_dim_y_str="7.20 м"
)

# 5. Penthouse 110 sqm
generate_architectural_plan(
    'public/images/plans/plan_penthouse_110.png',
    [
        {'x': 0, 'y': 0, 'w': 300, 'h': 280, 'label': 'ВЕСТИБЮЛЬ', 'size': '12.0 м²'},
        {'x': 0, 'y': 280, 'w': 300, 'h': 280, 'label': 'SPA & ВАННАЯ', 'size': '8.5 м²', 'feature': 'bath', 'fill': (240, 249, 255)},
        {'x': 300, 'y': 0, 'w': 500, 'h': 560, 'label': 'ГРАНД-ГОСТИНАЯ', 'size': '44.0 м²', 'feature': 'sofa'},
        {'x': 800, 'y': 0, 'w': 360, 'h': 560, 'label': 'МАСТЕР-СЮИТ', 'size': '25.0 м²', 'feature': 'bed'},
        {'x': 0, 'y': 560, 'w': 1160, 'h': 160, 'label': 'КРУГОВАЯ ПАНОРАМНАЯ ТЕРРАСА', 'size': '20.5 м²', 'feature': 'balcony', 'fill': (240, 253, 244)},
    ],
    overall_dim_x_str="11.60 м",
    overall_dim_y_str="7.20 м"
)

# 6. Townhouse 120 sqm
generate_architectural_plan(
    'public/images/plans/plan_townhouse_120.png',
    [
        {'x': 0, 'y': 0, 'w': 280, 'h': 280, 'label': 'ТАМБУР & ХОЛЛ', 'size': '8.4 м²'},
        {'x': 0, 'y': 280, 'w': 280, 'h': 280, 'label': 'КОТЕЛЬНАЯ & С/У', 'size': '6.2 м²', 'feature': 'bath', 'fill': (240, 249, 255)},
        {'x': 280, 'y': 0, 'w': 480, 'h': 560, 'label': 'КУХНЯ-ГОСТИНАЯ С КАМИНОМ', 'size': '38.0 м²', 'feature': 'sofa'},
        {'x': 760, 'y': 0, 'w': 380, 'h': 560, 'label': '3 СПАЛЬНИ (2 ЭТАЖ)', 'size': '48.0 м²', 'feature': 'bed'},
        {'x': 280, 'y': 560, 'w': 860, 'h': 160, 'label': 'ЗЕЛЕНОЕ ПАТИО С ВЫХОДОМ В САД', 'size': '19.4 м²', 'feature': 'balcony', 'fill': (240, 253, 244)},
    ],
    overall_dim_x_str="11.40 м",
    overall_dim_y_str="7.20 м"
)

print("All floor plans regenerated with mathematical centering, zero title overlaps, and Setl CAD styling!")
