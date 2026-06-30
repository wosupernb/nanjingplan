import os, sys, json
sys.stdout.reconfigure(line_buffering=True)

from PIL import Image, ImageStat, ImageFilter
import colorsys

base_dir = r'e:\TRAE-develop\Travel plan\景点图片'

def analyze_image(img_path):
    """Analyze image and return scores for 5 dimensions"""
    try:
        img = Image.open(img_path)
        w, h = img.size
        
        # 1. Resolution score (out of 20)
        pixels = w * h
        if pixels >= 3840 * 2160:      # 4K
            res_score = 20
        elif pixels >= 2560 * 1440:    # 2K
            res_score = 18
        elif pixels >= 1920 * 1080:    # Full HD
            res_score = 15
        elif pixels >= 1280 * 720:     # HD
            res_score = 12
        else:
            res_score = 8
        
        # 2. Color score (out of 20) - color richness and saturation
        rgb_img = img.convert('RGB')
        stat = ImageStat.Stat(rgb_img)
        r_mean, g_mean, b_mean = stat.mean
        r_std, g_std, b_std = stat.stddev
        
        # Color variety (stddev indicates color range)
        color_variety = (r_std + g_std + b_std) / 3
        if color_variety > 60:
            color_score = 18
        elif color_variety > 45:
            color_score = 15
        elif color_variety > 30:
            color_score = 12
        else:
            color_score = 8
        
        # Boost for warm tones (golden hour, sunset)
        if r_mean > g_mean and r_mean > b_mean and (r_mean - b_mean) > 20:
            color_score = min(20, color_score + 2)
        
        # 3. Lighting score (out of 20) - brightness distribution
        # Convert to grayscale for brightness analysis
        gray = img.convert('L')
        gray_stat = ImageStat.Stat(gray)
        brightness = gray_stat.mean[0]
        contrast = gray_stat.stddev[0]
        
        # Good lighting: moderate brightness, good contrast
        if 80 < brightness < 180 and contrast > 40:
            light_score = 18
        elif 60 < brightness < 200 and contrast > 30:
            light_score = 15
        elif 40 < brightness < 220:
            light_score = 12
        else:
            light_score = 8
        
        # 4. Clarity score (out of 20) - sharpness
        # Use edge detection to measure sharpness
        edges = gray.filter(ImageFilter.FIND_EDGES)
        edge_stat = ImageStat.Stat(edges)
        sharpness = edge_stat.mean[0]
        
        if sharpness > 30:
            clarity_score = 18
        elif sharpness > 20:
            clarity_score = 15
        elif sharpness > 12:
            clarity_score = 12
        else:
            clarity_score = 8
        
        # 5. Composition score (out of 20) - aspect ratio and balance
        ratio = max(w, h) / min(w, h)
        if 1.5 <= ratio <= 2.0:  # Good landscape ratio (3:2, 16:9)
            comp_score = 18
        elif 1.3 <= ratio <= 2.5:
            comp_score = 15
        elif 1.0 <= ratio <= 3.0:
            comp_score = 12
        else:
            comp_score = 8
        
        # Balance: check if image is well-balanced
        left_half = rgb_img.crop((0, 0, w//2, h))
        right_half = rgb_img.crop((w//2, 0, w, h))
        left_stat = ImageStat.Stat(left_half)
        right_stat = ImageStat.Stat(right_half)
        balance_diff = abs(sum(left_stat.mean) - sum(right_stat.mean))
        
        if balance_diff < 30:
            comp_score = min(20, comp_score + 2)
        
        total = res_score + color_score + light_score + clarity_score + comp_score
        
        return {
            'resolution': res_score,
            'color': color_score,
            'lighting': light_score,
            'clarity': clarity_score,
            'composition': comp_score,
            'total': total,
            'width': w,
            'height': h,
            'sharpness': sharpness,
            'brightness': brightness,
            'contrast': contrast,
        }
    except Exception as e:
        print(f"  Error: {e}", flush=True)
        return None

# Analyze all images
all_scores = []
spots = sorted(os.listdir(base_dir))

for spot in spots:
    spot_dir = os.path.join(base_dir, spot)
    if not os.path.isdir(spot_dir):
        continue
    
    files = [f for f in os.listdir(spot_dir) if f.endswith(('.jpg', '.jpeg', '.png'))]
    print(f"\n=== {spot} ===", flush=True)
    
    for fname in sorted(files):
        fpath = os.path.join(spot_dir, fname)
        result = analyze_image(fpath)
        if result:
            all_scores.append({
                'spot': spot,
                'file': fname,
                'path': fpath,
                **result,
            })
            print(f"  {fname}: {result['total']}/100 (R:{result['resolution']} C:{result['color']} L:{result['lighting']} Cl:{result['clarity']} Co:{result['composition']}) [{result['width']}x{result['height']}]", flush=True)

# Sort by total score descending
all_scores.sort(key=lambda x: x['total'], reverse=True)

# Show top 10
print("\n=== TOP 10 Images ===", flush=True)
for i, item in enumerate(all_scores[:10]):
    print(f"  #{i+1}: {item['spot']}/{item['file']} - {item['total']}/100", flush=True)

# Save results
output_path = r'e:\TRAE-develop\Travel plan\image_scores.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(all_scores, f, ensure_ascii=False, indent=2)
print(f"\nSaved {len(all_scores)} scores to {output_path}", flush=True)
