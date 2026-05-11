#!/usr/bin/env python3
"""
LinkedIn public profile posts scraper (Requests + BeautifulSoup)
- Designed to extract basic post info from a public LinkedIn profile's "recent activity / posts" page.
- Attempts best-effort parsing of server-rendered HTML. LinkedIn uses heavy JS; results may vary.
- Outputs JSON matching your format: id, caption, media_type, media_url, permalink, timestamp
- Usage: python linkedin_scraper.py --username iportsolutions --out posts.json --max 7
- NOTE: This is a best-effort scraper for public pages. For reliable production use prefer LinkedIn API.

Author: uedarap
"""
import argparse
import json
import re
import time
from datetime import datetime
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch_profile_posts_page(username: str) -> Optional[str]:
    """
    Try some likely URLs for a public profile's posts page.
    Returns HTML or None.
    """
    page = [
        f"https://br.linkedin.com/company/{username}/",
    ]
    for url in page:
        try:
            r = requests.get(url, headers=HEADERS, timeout=15)
            if r.status_code == 200 and len(r.text) > 5000:
                return r.text
        except requests.RequestException:
            pass
        time.sleep(1)
    return None


def extract_posts_from_html(html: str, max_posts: int = 7) -> List[Dict]:
    """
    Parse the HTML and extract post-like blocks.
    Returns a list of dicts with fields similar to your JSON format.
    """
    soup = BeautifulSoup(html, "html.parser")

    posts = []
    seen_links = set()
    # 1️⃣ Localiza a UL principal que contém todos os posts
    updates_list = soup.find("ul", class_="updates__list")

    # 2️⃣ Se encontrar, pega todos os LI (cada <li> é um post)
    if updates_list:
        page = updates_list.find_all("li", recursive=False)
    else:
        page = []

    for post in page:
        if len(posts) >= max_posts:
            break

        # permalink: look for anchor that looks like a post link
        permalink = None
        a = post.find("a", href=True)
        if a:
            href = a["href"]
            # prefer links that contain '/posts/' or '/activity/' or '/feed/update/'
            if any(x in href for x in ("/posts/")):
                permalink = href.split("?")[0]
                
        # Extraindo tempo (ex: 2 m, 3 h, 1 sem ...) sem pegar "Editado"
        try:
            lockup = post.find("div", class_="base-main-feed-card__entity-lockup")
            if lockup:
                time_tag = lockup.find("time")
                if time_tag and time_tag.contents:
                    # Pega apenas o primeiro conteúdo textual, ignorando <span> como "Editado"
                    timestamp = time_tag.contents[0].strip()
                else:
                    timestamp = ""
            else:
                timestamp = ""
        except AttributeError:
            timestamp = ""

        try:
            caption_text = post.find("p", class_="attributed-text-segment-list__content").get_text(strip=True)
        except AttributeError:
            caption_text = ""

        # media: look for images or video tags
        media_type = None
        media_url = None
        img = post.find("img", class_="object-cover")
        if img:
            media_type = "IMAGE"
            media_url = img.attrs['data-delayed-url']
        else:
            vid = post.find("video")
            if vid and vid["data-poster-url"]:
                media_type = "VIDEO"
                media_url = vid["data-poster-url"]

        # Build ID: prefer permalink end or fallback to hash of caption+time
        post_id = None
        if permalink:
            # try to extract ID-like substring
            m = re.search(r"([A-Za-z0-9_-]{6,})$", permalink)
            post_id = m.group(1) if m else permalink
        else:
            # fallback id from caption/time
            hashable = (caption_text or "") + (timestamp or "")
            post_id = str(abs(hash(hashable)))[:12]

        # skip duplicates by permalink or media_url
        dedup_key = permalink or media_url or post_id
        if dedup_key in seen_links:
            continue
        seen_links.add(dedup_key)

        # normalize timestamp to ISO if numeric (milliseconds)
        if timestamp and re.fullmatch(r"\d{10,13}", str(timestamp)):
            # treat as epoch (seconds or ms)
            tstr = str(timestamp)
            if len(tstr) == 13:
                ts = int(tstr) / 1000.0
            else:
                ts = int(tstr)
            try:
                timestamp = datetime.utcfromtimestamp(ts).isoformat() + "Z"
            except Exception:
                pass

        post = {
            "id": str(post_id),
            "caption": caption_text,
            "media_type": media_type or "NONE",
            "media_url": media_url,
            "permalink": permalink,
            "timestamp": timestamp,
        }
        posts.append(post)

    # Return up to requested count
    return posts[:max_posts]


def save_json(posts: List[Dict], out_path: str):
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({"data": posts}, f, ensure_ascii=False, indent=2)


def main():
    try:
        parser = argparse.ArgumentParser(description="Scrape public LinkedIn profile posts (best-effort).")
        parser.add_argument("--username", required=True, help="LinkedIn username (the part after /in/).")
        parser.add_argument("--out", default="src/assets/linkedin_posts.json", help="Output JSON file path.")
        parser.add_argument("--max", type=int, default=7, help="Maximum number of posts to extract.")
        args = parser.parse_args()
        username = args.username
        max_posts = args.max
        outfile = args.out

    except SystemExit:
        # Aqui cai quando argparse não recebe argumentos
        print("⚠ Nenhum argumento fornecido. Entrando em modo DEBUG com 'iportsolutions'...")
        username = "iportsolutions"
        max_posts = 7
        outfile = "src/assets/linkedin_posts.json"

    # Daqui pra frente, o código sempre continua (modo normal ou debug)
    print(f"Fetching public posts page for: {username}")
    html = fetch_profile_posts_page(username)
    if not html:
        print("❌ Falha ao carregar HTML (pode ser bloqueado pelo LinkedIn)")
        return

    print("🔍 Parsing posts...")
    posts = extract_posts_from_html(html, max_posts=max_posts)
    print(f"✅ {len(posts)} post(s) encontrados. Salvando em {outfile} ...")
    save_json(posts, outfile)

    if posts:
        print("📝 Exemplo de post extraído:")
        print(json.dumps(posts[0], ensure_ascii=False, indent=2))
    else:
        print("⚠ Nenhum post encontrado. Talvez precise Selenium ou API.")


if __name__ == "__main__":
    main()
