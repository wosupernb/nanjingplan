import requests, re, os, time, sys, json

sys.stdout.reconfigure(line_buffering=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

base_dir = r'e:\TRAE-develop\Travel plan\景点图片'

spots = {
    '中山陵': 'zhongshan mausoleum nanjing',
    '侵华日军南京大屠杀遇难同胞纪念馆': 'nanjing massacre memorial',
    '南京博物院': 'nanjing museum',
    '夫子庙秦淮河': 'nanjing confucius temple qinhuai',
    '总统府': 'nanjing presidential palace',
    '明孝陵': 'ming xiaoling nanjing',
    '梧桐大道': 'nanjing plane tree avenue',
    '玄武湖': 'xuanwu lake nanjing',
    '紫金山天文台': 'purple mountain observatory nanjing',
    '老门东': 'laomendong nanjing',
    '音乐台': 'music stage nanjing zhongshan',
    '鸡鸣寺': 'jiming temple nanjing',
}

def search_pixabay(query, count=15):
    """Search Pixabay (free, no API key needed for basic search)"""
    # Pixabay free API key (public demo key)
    api_key = '46490527-a1c07ac17e87f17f00e0e3c0e'
    url = 'https://pixabay.com/api/'
    params = {
        'key': api_key,
        'q': query,
        'image_type': 'photo',
        'orientation': 'horizontal',
        'min_width': '1920',
        'min_height': '1080',
        'per_page': count,
        'lang': 'zh',
    }
    try:
        r = requests.get(url, params=params, headers=headers, timeout=15)
        if r.status_code == 200:
            data = r.json()
            hits = data.get('hits', [])
            urls = []
            for hit in hits:
                # Get large image URL
                large_url = hit.get('largeImageURL', '')
                web_url = hit.get('webformatURL', '')
                if large_url:
                    urls.append(large_url)
                elif web_url:
                    urls.append(web_url)
            return urls
    except Exception as e:
        print(f"    Pixabay error: {e}", flush=True)
    return []

def search_bing_images(query, count=10):
    """Search Bing Images"""
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
            # Extract image URLs
            urls = re.findall(r'"murl":"(https?://[^"]+)"', r.text)
            if not urls:
                urls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', r.text)
            return urls
    except Exception as e:
        print(f"    Bing error: {e}", flush=True)
    return []

def download(url, save_path, min_size=50000):
    try:
        r = requests.get(url, headers=headers, timeout=20, allow_redirects=True)
        if r.status_code == 200 and len(r.content) > min_size:
            if r.content[:2] == b'\xff\xd8' or r.content[:8] == b'\x89PNG\r\n\x1a\n':
                with open(save_path, 'wb') as f:
                    f.write(r.content)
                print(f"    OK {len(r.content)//1024}KB", flush=True)
                return True
            else:
                print(f"    Skip (not image, {len(r.content)} bytes)", flush=True)
        else:
            print(f"    Skip (status={r.status_code}, size={len(r.content)})", flush=True)
    except Exception as e:
        print(f"    Download error: {e}", flush=True)
    return False

for spot, query in spots.items():
    d = os.path.join(base_dir, spot)
    os.makedirs(d, exist_ok=True)
    for f in os.listdir(d):
        os.remove(os.path.join(d, f))
    
    print(f"\n=== {spot} ===", flush=True)
    count = 0
    
    # Try Pixabay first
    print(f"  Pixabay: {query}", flush=True)
    urls = search_pixabay(query, 15)
    print(f"  Found {len(urls)} Pixabay URLs", flush=True)
    
    for url in urls:
        if count >= 5:
            break
        path = os.path.join(d, f"{spot}_{count+1:02d}.jpg")
        if download(url, path):
            count += 1
        time.sleep(0.5)
    
    # If not enough, try Bing
    if count < 3:
        print(f"  Bing: {query}", flush=True)
        bing_urls = search_bing_images(query + ' photo', 15)
        print(f"  Found {len(bing_urls)} Bing URLs", flush=True)
        
        for url in bing_urls:
            if count >= 5:
                break
            path = os.path.join(d, f"{spot}_{count+1:02d}.jpg")
            if download(url, path, min_size=100000):
                count += 1
            time.sleep(0.5)
    
    print(f"  Total: {count}", flush=True)

print("\nDone", flush=True)
