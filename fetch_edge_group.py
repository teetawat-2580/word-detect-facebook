"""
Zero-Effort Automated Private Group Extractor (Microsoft Edge)
Group: ห้องตั้งตี้หารค่าสมองกล (Google AI) - https://www.facebook.com/groups/993813573590579
Keyword: "รับคน"
"""

import os
import sys
import json
import time
import subprocess

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

def main():
    print("=" * 65)
    print("🚀 AUTOMATED EDGE EXTRACTOR FOR PRIVATE GROUP 993813573590579")
    print("=" * 65)

    edge_exe = get_edge_path()
    if not edge_exe:
        print("❌ Could not locate Microsoft Edge executable.")
        return

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Installing playwright...")
        subprocess.run([sys.executable, "-m", "pip", "install", "playwright"], check=True)
        from playwright.sync_api import sync_playwright

    # Store user session data so login state is saved permanently
    user_data_dir = os.path.join(os.path.expanduser("~"), ".fb_edge_group_session")
    os.makedirs(user_data_dir, exist_ok=True)

    with sync_playwright() as p:
        print("\n🌐 Opening Microsoft Edge...")
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            executable_path=edge_exe,
            headless=False,
            viewport={'width': 1366, 'height': 900},
            args=["--disable-notifications", "--start-maximized"]
        )

        page = context.pages[0] if context.pages else context.new_page()
        group_url = "https://www.facebook.com/groups/993813573590579"

        print(f"🔗 Navigating to {group_url}...")
        page.goto(group_url, wait_until="domcontentloaded")
        time.sleep(3)

        # Check if user needs to log in
        if "login" in page.url.lower() or "checkpoint" in page.url.lower():
            print("\n⚠️ Please log into Facebook in the Microsoft Edge window that just opened.")
            print("After logging in, press ENTER here in terminal to continue!")
            input("Waiting for login... Press Enter when logged in > ")
            page.goto(group_url, wait_until="domcontentloaded")
            time.sleep(3)

        print("\n⏳ Auto-scrolling Facebook Group feed to load all posts & comments...")
        for i in range(1, 10):
            print(f"   Scrolling feed ({i}/9)...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        print("\n🔍 Extracting full DOM and parsing real posts...")

        # Extract full page HTML content
        html_content = page.content()
        html_save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "group_feed.html")
        
        with open(html_save_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        print(f"💾 Saved full group HTML feed to: {html_save_path}")

        # Parse posts inside browser context for maximum accuracy
        extracted_data = page.evaluate("""() => {
            const TARGET_KEYWORD = "รับคน";
            const results = [];
            const seen = new Set();

            // Find all post cards in FB DOM
            const postCards = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[role="article"]');

            postCards.forEach((card, idx) => {
                const textEl = card.querySelector('[dir="auto"]') || card;
                const content = textEl ? textEl.textContent.trim() : '';

                if (content.length > 20 && !seen.has(content)) {
                    seen.add(content);

                    // Extract Author Name & Profile Link
                    let authorName = 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
                    let authorUrl = 'https://www.facebook.com/groups/993813573590579';

                    const authorAnchors = Array.from(card.querySelectorAll('h2 a, h3 a, h4 a, strong a, a[href*="profile.php"], a[href*="/user/"], a[href*="/people/"]'));
                    
                    for (const a of authorAnchors) {
                        const txt = a.textContent.trim();
                        const href = a.getAttribute('href') || '';
                        if (txt && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like') && !txt.includes('ห้องตั้งตี้')) {
                            authorName = txt;
                            if (href && href !== '#') {
                                authorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                                break;
                            }
                        }
                    }

                    // Extract Post Permalink
                    let postUrl = 'https://www.facebook.com/groups/993813573590579';
                    const linkAnchors = Array.from(card.querySelectorAll('a[href*="/posts/"], a[href*="/permalink/"], a[href*="pfbid"], a[href*="multi_permalinks="], a[href*="story_fbid="]'));
                    
                    for (const a of linkAnchors) {
                        const href = a.getAttribute('href') || '';
                        if (href && href !== '#') {
                            postUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
                            break;
                        }
                    }

                    results.push({
                        id: 'edge_real_' + Date.now() + '_' + idx,
                        authorName: authorName,
                        authorUrl: authorUrl,
                        content: content,
                        postDate: new Date().toISOString(),
                        postUrl: postUrl,
                        isSamplePost: false,
                        isMatched: content.includes(TARGET_KEYWORD)
                    });
                }
            });

            return results;
        }""")

        print(f"🎉 Successfully extracted {len(extracted_data)} REAL posts!")

        # Save to real_posts.json
        json_save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "real_posts.json")
        with open(json_save_path, "w", encoding="utf-8") as f:
            json.dump({
                "groupName": "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
                "groupId": "993813573590579",
                "extractedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                "totalPosts": len(extracted_data),
                "posts": extracted_data
            }, f, ensure_ascii=False, indent=2)

        print(f"💾 Saved JSON results to: {json_save_path}")

        # Open Vercel web app in Edge tab with encoded payload
        import urllib.parse
        encoded_hash = urllib.parse.quote(json.dumps({"posts": extracted_data}))
        app_url = f"https://word-detect-facebook.vercel.app/#data={encoded_hash}"

        print(f"\n🚀 Opening https://word-detect-facebook.vercel.app/ in Microsoft Edge...")
        app_page = context.new_page()
        app_page.goto(app_url, wait_until="domcontentloaded")

        print("\n✨ ALL DONE! Your real group posts are loaded with real author & post links!")
        input("\nPress Enter to exit > ")
        context.close()

if __name__ == "__main__":
    main()
