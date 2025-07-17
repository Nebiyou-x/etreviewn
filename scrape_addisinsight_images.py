import requests
from bs4 import BeautifulSoup
import json
import time
from bs4.element import Tag

BASE_URL = "https://www.addisinsight.net/category/entertainment-and-arts/ethiopian-movie/"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

image_urls = []
page = 1

while True:
    url = BASE_URL if page == 1 else f"{BASE_URL}page/{page}/"
    print(f"Scraping: {url}")
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code != 200:
        print(f"Failed to fetch page {page}, status code: {resp.status_code}")
        break
    soup = BeautifulSoup(resp.content, "html.parser")
    found_any = False
    # Find all <span> elements with class 'entry-thumb'
    spans = soup.find_all("span", class_="entry-thumb")
    for span in spans:
        if isinstance(span, Tag) and span.has_attr("data-img-url"):
            img_url = span["data-img-url"]
            if img_url and img_url not in image_urls:
                image_urls.append(img_url)
                found_any = True
    if not found_any:
        print("No new images found on this page. Stopping.")
        break
    next_link = soup.find("a", class_="page-numbers next")
    if not next_link:
        print("No next page link found. Stopping.")
        break
    page += 1
    time.sleep(1)  # Be polite to the server

with open("addisinsight_ethiopian_movie_images.json", "w", encoding="utf-8") as f:
    json.dump(image_urls, f, ensure_ascii=False, indent=2)

print(f"Scraped {len(image_urls)} images. Data saved to addisinsight_ethiopian_movie_images.json.") 