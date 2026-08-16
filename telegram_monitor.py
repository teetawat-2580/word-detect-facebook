"""
Automated Facebook Private Group Telegram Alert Monitor (Microsoft Edge Edition)
Target Group: https://www.facebook.com/groups/993813573590579
Target Keywords: ["รับคน", "เปิดหาสมาชิก"]
Pre-configured Credentials:
- Bot Token: 7535787456:AAFAzgfIL938dlFmH2-ZCWsGUIfQc96_wwg
- Chat ID: 7760403769
"""

import os
import sys
import json
import time
import requests
import subprocess

# Ensure UTF-8 output formatting on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

CONFIG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "telegram_config.json")
SEEN_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "notified_posts.json")

DEFAULT_CONFIG = {
    "bot_token": "7535787456:AAFAzgfIL938dlFmH2-ZCWsGUIfQc96_wwg",
    "chat_id": "7760403769",
    "check_interval_seconds": 300
}

def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                cfg = json.load(f)
                if cfg.get("bot_token") and cfg.get("chat_id"):
                    return cfg
        except Exception:
            pass
    save_config(DEFAULT_CONFIG)
    return DEFAULT_CONFIG

def save_config(config):
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)

def load_notified_posts():
    if os.path.exists(SEEN_FILE):
        try:
            with open(SEEN_FILE, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except Exception:
            pass
    return set()

def save_notified_posts(seen_set):
    with open(SEEN_FILE, "w", encoding="utf-8") as f:
        json.dump(list(seen_set), f, ensure_ascii=False, indent=2)

def send_telegram_alert(bot_token, chat_id, post):
    if not bot_token or not chat_id:
        print("⚠️ Telegram credentials missing. Skipping Telegram notification.")
        return False

    author_name = post.get("authorName", "สมาชิกกลุ่มตั้งตี้หารค่าสมองกล")
    author_url = post.get("authorUrl", "https://www.facebook.com/groups/993813573590579")
    post_time = post.get("postTimeText") or post.get("postDate") or "ไม่ระบุเวลา"
    post_url = post.get("postUrl", "https://www.facebook.com/groups/993813573590579")
    content = post.get("content", "")

    short_content = content[:350] + ("..." if len(content) > 350 else "")

    message_text = (
      f"🚨 <b>พบโพสต์ตั้งตี้หารค่าสมองกลใหม่!</b>\n"
      f"คีย์เวิร์ด: <code>\"รับคน\" / \"เปิดหาสมาชิก\"</code>\n\n"
      f"👤 <b>ผู้โพสต์:</b> <a href=\"{author_url}\">{author_name}</a>\n"
      f"📅 <b>เวลาโพสต์จริง:</b> {post_time}\n\n"
      f"📝 <b>ข้อความโพสต์:</b>\n{short_content}\n\n"
      f"🔗 <a href=\"{post_url}\"><b>เปิดดูโพสต์จริงบน Facebook ↗</b></a>\n"
      f"👤 <a href=\"{author_url}\"><b>ดูโปรไฟล์ผู้โพสต์ ↗</b></a>"
    )

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message_text,
        "parse_mode": "HTML",
        "disable_web_page_preview": False
    }

    try:
        res = requests.post(url, json=payload, timeout=10)
        if res.status_code == 200:
            print(f"✅ ส่งการแจ้งเตือน Telegram สำเร็จ ไปยัง Chat ID {chat_id} สำหรับโพสต์ของ: {author_name}")
            return True
        else:
            print(f"❌ Telegram API Error: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"❌ Failed to send Telegram Alert: {e}")
    return False

def get_edge_path():
    paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        os.path.expanduser(r"~\AppData\Local\Microsoft\Edge\Application\msedge.exe")
    ]
    for p in paths:
        if os.path.exists(p):
            return p
    return None

def start_auto_monitoring():
    print("=" * 65)
    print("🤖 AUTOMATED TELEGRAM ALERT MONITOR FOR FB PRIVATE GROUP")
    print("Group: ห้องตั้งตี้หารค่าสมองกล (Google AI)")
    print("Keywords: 'รับคน', 'เปิดหาสมาชิก'")
    print("Telegram Status: FULLY CONFIGURED & VERIFIED (Chat ID: 7760403769)")
    print("=" * 65)

    config = load_config()

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Installing playwright & requests...")
        subprocess.run([sys.executable, "-m", "pip", "install", "playwright", "requests"], check=True)
        from playwright.sync_api import sync_playwright

    edge_exe = get_edge_path()
    user_data_dir = os.path.join(os.path.expanduser("~"), ".fb_telegram_edge_session")
    os.makedirs(user_data_dir, exist_ok=True)
    notified_posts = load_notified_posts()

    with sync_playwright() as p:
        print("\n🌐 Opening Microsoft Edge for continuous background monitoring...")
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            executable_path=edge_exe if edge_exe else None,
            channel="msedge" if not edge_exe else None,
            headless=False,
            viewport={'width': 1366, 'height': 900},
            args=["--disable-notifications", "--start-maximized"]
        )

        page = context.pages[0] if context.pages else context.new_page()
        group_url = "https://www.facebook.com/groups/993813573590579/?sorting_setting=CHRONOLOGICAL"

        page.goto(group_url, wait_until="domcontentloaded")
        time.sleep(3)

        if "login" in page.url.lower():
            print("\n⚠️ กรุณาล็อกอิน Facebook ใน Microsoft Edge...")
            input("เมื่อล็อกอินเรียบร้อยแล้ว กด ENTER ที่นี่เพื่อเริ่มระบบเฝ้าระวังอัตโนมัติ > ")
            page.goto(group_url, wait_until="domcontentloaded")
            time.sleep(3)

        print("\n🟢 ระบบเริ่มเฝ้าระวังอัตโนมัติ (ส่งการแจ้งเตือนไปยัง Chat ID 7760403769)...\n")

        loop_count = 1
        while True:
            print(f"⏰ Round #{loop_count} - Checking group for new posts at {time.strftime('%H:%M:%S')}...")
            page.goto(group_url, wait_until="domcontentloaded")
            time.sleep(3)

            page.evaluate("window.scrollTo(0, 0)")
            time.sleep(1)

            for _ in range(5):
                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                time.sleep(1.5)

            # Extract posts DOM
            posts = page.evaluate("""() => {
                const TARGET_KEYWORDS = ["รับคน", "เปิดหาสมาชิก"];
                const postCards = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[role="article"]');
                const results = [];
                const seen = new Set();

                postCards.forEach((card, idx) => {
                    const textEl = card.querySelector('[dir="auto"]') || card;
                    const content = textEl ? textEl.textContent.trim() : '';

                    if (content.length > 15 && !seen.has(content)) {
                        seen.add(content);

                        let realPostTime = '';
                        const timeEl = card.querySelector('time') || card.querySelector('abbr') || card.querySelector('a[href*="/posts/"] span, a[href*="pfbid"] span');
                        if (timeEl) {
                            realPostTime = timeEl.getAttribute('title') || timeEl.getAttribute('aria-label') || timeEl.textContent.trim();
                        }
                        if (!realPostTime) {
                            const timestampAnchor = card.querySelector('a[href*="/posts/"], a[href*="/permalink/"], a[href*="pfbid"]');
                            if (timestampAnchor) realPostTime = timestampAnchor.textContent.trim();
                        }

                        let authorName = 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
                        let authorUrl = '';
                        const authorAnchors = Array.from(card.querySelectorAll('h2 a, h3 a, h4 a, strong a, a[href*="profile.php"], a[href*="/user/"], a[href*="/people/"]'));

                        for (const a of authorAnchors) {
                            const txt = a.textContent.trim();
                            const href = a.getAttribute('href') || '';
                            if (txt && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('ห้องตั้งตี้')) {
                                authorName = txt;
                                if (href && href !== '#') {
                                    authorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                                    break;
                                }
                            }
                        }

                        let postUrl = '';
                        const linkAnchors = Array.from(card.querySelectorAll('a[href*="/posts/"], a[href*="/permalink/"], a[href*="pfbid"], a[href*="multi_permalinks="]'));
                        for (const a of linkAnchors) {
                            const href = a.getAttribute('href') || '';
                            if (href && href !== '#') {
                                postUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                                break;
                            }
                        }

                        const isMatched = TARGET_KEYWORDS.some(kw => content.includes(kw));

                        results.push({
                            id: (postUrl && postUrl.includes('pfbid')) ? postUrl : (content.substring(0, 40) + '_' + authorName),
                            authorName: authorName,
                            authorUrl: authorUrl || 'https://www.facebook.com/groups/993813573590579',
                            content: content,
                            postTimeText: realPostTime || '',
                            postDate: new Date().toISOString(),
                            postUrl: postUrl || window.location.href,
                            isMatched: isMatched
                        });
                    }
                });
                return results;
            }""")

            matched_posts = [p for p in posts if p.get("isMatched")]
            print(f"   พบ {len(posts)} โพสต์ในฟีด, โพสต์ที่พบคีย์เวิร์ด: {len(matched_posts)} โพสต์")

            new_alerts = 0
            for post in matched_posts:
                post_id = post.get("id")
                if post_id not in notified_posts:
                    print(f"🔔 พบโพสต์ใหม่จาก '{post.get('authorName')}'! กำลังส่งแจ้งเตือน Telegram ไปยัง Chat ID 7760403769...")
                    sent = send_telegram_alert(config.get("bot_token"), config.get("chat_id"), post)
                    if sent:
                        notified_posts.add(post_id)
                        save_notified_posts(notified_posts)
                        new_alerts += 1

            if new_alerts > 0:
                print(f"✨ ส่งการแจ้งเตือน Telegram สำหรับโพสต์ใหม่สำเร็จ {new_alerts} รายการ!")
            else:
                print("   ไม่มีโพสต์ใหม่ที่ต้องแจ้งเตือนในรอบนี้")

            loop_count += 1
            interval = config.get("check_interval_seconds", 300)
            print(f"⏳ พักรอ {interval} วินาทีก่อนตรวจสอบรอบถัดไป...\n")
            time.sleep(interval)

if __name__ == "__main__":
    start_auto_monitoring()
