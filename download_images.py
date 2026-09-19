import urllib.request
import os

dest_dir = r"C:\Users\user\.gemini\antigravity\scratch\green-project-mockup\images"
os.makedirs(dest_dir, exist_ok=True)

images = [
    "hero-complex.png",
    "apt-1.png",
    "apt-2.png",
    "apt-3.png",
    "apt-4.png",
    "apt-5.png",
    "apt-6.png",
    "floorplan.png"
]

base_url = "https://nedvijka-gamma.vercel.app/images/"

for img in images:
    url = base_url + img
    dest_path = os.path.join(dest_dir, img)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(dest_path, 'wb') as f:
                f.write(data)
            print(f"Downloaded {img} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {img}: {e}")
