"""
Automated Facebook Private Group Scraper & Extractor - Microsoft Edge Edition
Target: https://www.facebook.com/groups/993813573590579
Keyword: "รับคน"
Destination Web App: https://word-detect-facebook.vercel.app/
"""

import os
import sys
import json
import time

def find_edge_path():
    possible_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        os.path.expanduser(r"~\AppData\Local\Microsoft\Edge\Application\msedge.exe")
    ]
    for path in possible_paths:
        if os.path.exists(path):
            return path
    return None

def run_auto_collector():
    print("=" * 65)
    print("🤖 AUTOMATED FACEBOOK PRIVATE GROUP COLLECTOR (MICROSOFT EDGE EDITION)")
    print("Group: ห้องตั้งตี้หารค่าสมองกล (Google AI)")
    print("Target URL: https://www.facebook.com/groups/993813573590579")
    print("Target Keyword: รับคน")
    print("Target Web App: https://word-detect-facebook.vercel.app/")
    print("=" * 65)

    edge_exe = find_edge_path()
    if edge_exe:
        print(f"✅ Microsoft Edge Found: {edge_exe}")
    else:
        print("⚠️ Standard Edge path not found, using Playwright msedge channel...")

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Installing required Playwright dependencies...")
        os.system("pip install playwright")
        from playwright.sync_api import sync_playwright

    user_data_dir = os.path.join(os.path.expanduser("~"), ".fb_word_detect_edge_session")
    os.makedirs(user_data_dir, exist_ok=True)

    with sync_playwright() as p:
        print("\n🌐 Launching Microsoft Edge Browser...")
        
        launch_kwargs = {
            "user_data_dir": user_data_dir,
            "headless": False,
            "viewport": {'width': 1280, 'height': 800},
            "args": ["--disable-notifications", "--start-maximized"]
        }

        if edge_exe:
            launch_kwargs["executable_path"] = edge_exe
        else:
            launch_kwargs["channel"] = "msedge"

        context = p.chromium.launch_persistent_context(**launch_kwargs)
        page = context.pages[0] if context.pages else context.new_page()

        target_url = "https://www.facebook.com/groups/993813573590579"
        print(f"🔗 Opening {target_url} in Microsoft Edge...")
        page.goto(target_url, wait_until="domcontentloaded")

        time.sleep(3)

        if "login" in page.url.lower():
            print("\n⚠️ กรุณาล็อกอินเข้า Facebook ในหน้าต่าง Microsoft Edge ที่เปิดขึ้นมา...")
            print("เมื่อล็อกอินเรียบร้อยแล้ว ให้กด ENTER ในหน้าต่างนี้เพื่อดึงโพสต์อัตโนมัติ!")
            input("กด Enter ที่นี่เพื่อเริ่มดึงข้อมูล > ")
            page.goto(target_url, wait_until="domcontentloaded")
            time.sleep(3)

        print("\n⏳ กำลังเลื่อนหน้าฟีดกลุ่มเพื่อดึงโพสต์จริงและลิงก์จริง...")
        for i in range(1, 8):
            print(f"   เลื่อนหน้าจอ Edge ({i}/7)...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        print("\n🔍 กำลังสกัดข้อความโพสต์ ลิงก์โพสต์จริง และลิงก์โปรไฟล์ผู้โพสต์จริง...")
        posts_data = page.evaluate("""() => {
            const TARGET_KEYWORD = "รับคน";
            const postElements = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], .userContentWrapper, div[role="article"]');
            const results = [];
            const seen = new Set();

            postElements.forEach((el, index) => {
                const textEl = el.querySelector('[dir="auto"]') || el;
                const content = textEl ? textEl.textContent.trim() : '';

                if (content.length > 15 && !seen.has(content)) {
                    seen.add(content);

                    // 1. REAL Author Name & REAL Author Facebook Profile URL
                    let realAuthorName = 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
                    let realAuthorUrl = '';

                    const headerAnchors = Array.from(el.querySelectorAll('h2 a, h3 a, h4 a, strong a, a[href*="profile.php"], a[href*="/user/"], a[href*="/people/"], a[href*="/groups/993813573590579/user/"]'));

                    for (const anchor of headerAnchors) {
                        const href = anchor.getAttribute('href') || '';
                        const txt = anchor.textContent.trim();

                        if (txt && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like') && !txt.includes('ห้องตั้งตี้')) {
                            realAuthorName = txt;
                            if (href && href !== '#' && !href.startsWith('javascript:')) {
                                realAuthorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                                break;
                            }
                        }
                    }

                    if (!realAuthorUrl) {
                        const fallbackAuthorLink = el.querySelector('a[href*="profile.php"], a[href*="/user/"], a[href*="/people/"]');
                        if (fallbackAuthorLink) {
                            let href = fallbackAuthorLink.getAttribute('href') || '';
                            realAuthorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                        }
                    }

                    // 2. REAL Post Permalink / URL Link
                    let realPostUrl = '';
                    const permalinkAnchor = el.querySelector('a[href*="/posts/"], a[href*="/permalink/"], a[href*="pfbid"], a[href*="multi_permalinks="], a[href*="story_fbid="]');

                    if (permalinkAnchor) {
                        let href = permalinkAnchor.getAttribute('href') || '';
                        realPostUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                    } else {
                        const allLinks = Array.from(el.querySelectorAll('a[role="link"], a[aria-label]'));
                        for (const link of allLinks) {
                            const href = link.getAttribute('href') || '';
                            if (href.includes('/posts/') || href.includes('/permalink/') || href.includes('pfbid') || href.includes('story_fbid=')) {
                                realPostUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                                break;
                            }
                        }
                    }

                    if (!realPostUrl) {
                        realPostUrl = window.location.href;
                    }

                    results.push({
                        id: 'edge_real_' + Date.now() + '_' + index,
                        authorName: realAuthorName,
                        authorUrl: realAuthorUrl || 'https://www.facebook.com/groups/993813573590579',
                        content: content,
                        postDate: new Date().toISOString(),
                        postUrl: realPostUrl,
                        isSamplePost: false,
                        isMatched: content.includes(TARGET_KEYWORD)
                    });
                }
            });
            return results;
        }""")

        print(f"\n🎉 ดึงโพสต์จริงสำเร็จทั้งหมด {len(posts_data)} โพสต์ พร้อมลิงก์โพสต์จริงและโปรไฟล์จริง!")

        output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "real_posts.json")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump({
                "groupName": "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
                "groupId": "993813573590579",
                "extractedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                "totalPosts": len(posts_data),
                "posts": posts_data
            }, f, ensure_ascii=False, indent=2)

        print(f"💾 บันทึกข้อมูลลงไฟล์: {output_file}")

        # Open Vercel app with real posts encoded in hash
        encoded_data = json.dumps({"posts": posts_data})
        import urllib.parse
        encoded_hash = urllib.parse.quote(encoded_data)
        target_web_app = f"https://word-detect-facebook.vercel.app/#data={encoded_hash}"

        print(f"\n🚀 กำลังเปิด Web App ค้นหาที่ https://word-detect-facebook.vercel.app/ ในแท็บใหม่ของ Microsoft Edge...")
        
        new_tab = context.new_page()
        new_tab.goto(target_web_app, wait_until="domcontentloaded")
        print("\n✨ เรียบร้อย! ระบบเปิดหน้าพร้อมแสดงผลลัพธ์โพสต์จริงเรียบร้อยแล้ว!")
        
        input("\nกด Enter เพื่อปิดโปรแกรม > ")
        context.close()

if __name__ == "__main__":
    run_auto_collector()
