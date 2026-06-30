import requests, re, os, time, sys, json

sys.stdout.reconfigure(line_buffering=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
}

base_dir = r'e:\TRAE-develop\Travel plan\景点图片'

# Only download spots with < 3 images
spots = {
    '中山陵': 'sun yat-sen mausoleum nanjing china',
    '夫子庙秦淮河': 'confucius temple qinhuai river nanjing night',
    '明孝陵': 'ming xiaoling tomb nanjing',
    '梧桐大道': 'nanjing plane tree road autumn',
    '紫金山天文台': 'purple mountain observatory nanjing china',
    '老门东': 'laomendong nanjing old street',
    '音乐台': 'nanjing music terrace zhongshan',
    '鸡鸣寺': 'jiming temple nanjing cherry blossom',
}

def search_bing_images(query, count=20):
    url = 'https://www.bing.com/images/search'
    params = {
        'q': query,
        'first': '1',
        'count': str(count),
        'qft': '+filterui:imagesize-large',
    }
    try:
        r = requests.get(url, params=params, headers=headers, timeout=15)
        if r.status_code == 200:
            urls = re.findall(r'"murl":"(https?://[^"]+)"', r.text)
            if not urls:
                urls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', r.text)
            return urls
    except Exception as e:
        print(f"    Bing error: {e}", flush=True)
    return []

def download(url, save_path, min_size=80000):
    try:
        r = requests.get(url, headers=headers, timeout=20, allow_redirects=True)
        if r.status_code == 200 and len(r.content) > min_size:
            if r.content[:2] == b'\xff\xd8' or r.content[:8] == b'\x89PNG\r\n\x1a\n':
                with open(save_path, 'wb') as f:
                    f.write(r.content)
                print(f"    OK {len(r.content)//1024}KB", flush=True)
                return True
            else:
                print(f"    Skip (not image)", flush=True)
        else:
            print(f"    Skip (status={r.status_code}, size={len(r.content)})", flush=True)
    except Exception as e:
        print(f"    Error: {e}", flush=True)
    return False

for spot, query in spots.items():
    d = os.path.join(base_dir, spot)
    os.makedirs(d, exist_ok=True)
    
    existing = len([f for f in os.listdir(d) if f.endswith('.jpg')])
    if existing >= 5:
        print(f"\n=== {spot} === already has {existing} images, skip", flush=True)
        continue
    
    # Remove existing files
    for f in os.listdir(d):
        os.remove(os.path.join(d, f))
    
    print(f"\n=== {spot} ===", flush=True)
    count = 0
    
    print(f"  Bing: {query}", flush=True)
    urls = search_bing_images(query, 20)
    print(f"  Found {len(urls)} URLs", flush=True)
    
    for url in urls:
        if count >= 5:
            break
        path = os.path.join(d, f"{spot}_{count+1:02d}.jpg")
        if download(url, path):
            count += 1
        time.sleep(1.5)  # Slower to avoid rate limit
    
    print(f"  Total: {count}", flush=True)

print("\nDone", flush=True)
