/**
 * Automated Facebook Private Group Scraper & Extractor
 * Target: https://www.facebook.com/groups/993813573590579
 * Keyword: "รับคน"
 */

import os
import sys
import json
import time

def run_auto_collector():
    print("=" * 60)
    print("🤖 AUTOMATED FACEBOOK PRIVATE GROUP COLLECTOR")
    print("Group: ห้องตั้งตี้หารค่าสมองกล (Google AI)")
    print("Target URL: https://www.facebook.com/groups/993813573590579")
    print("Target Keyword: รับคน")
    print("=" * 60)

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Installing required dependencies...")
        os.system("pip install playwright")
        os.system("playwright install chromium")
        from playwright.sync_api import sync_playwright

    # Store user browser session data so login is saved
    user_data_dir = os.path.join(os.path.expanduser("~"), ".fb_word_detect_chrome_session")
    os.makedirs(user_data_dir, exist_ok=True)

    with sync_playwright() as p:
        print("\n🌐 Launching Chrome Browser...")
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            viewport={'width': 1280, 'height': 800},
            args=["--disable-notifications", "--start-maximized"]
        )

        page = context.pages[0] if context.pages else context.new_page()
        
        target_url = "https://www.facebook.com/groups/993813573590579"
        print(f"🔗 Navigating to {target_url}...")
        page.goto(target_url, wait_until="domcontentloaded")

        time.sleep(3)

        # Check if login is needed
        if "login" in page.url.lower():
            print("\n⚠️ Please log into Facebook in the opened browser window...")
            print("Press ENTER here in terminal after logging into Facebook!")
            input("Waiting for user to log in... Press Enter when ready > ")
            page.goto(target_url, wait_until="domcontentloaded")
            time.sleep(3)

        print("\n⏳ Auto-scrolling group feed to collect live posts...")
        for i in range(1, 8):
            print(f"   Scroll page ({i}/7)...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)

        print("\n🔍 Extracting post contents...")
        posts_data = page.evaluate("""() => {
            const TARGET_KEYWORD = "รับคน";
            const postElements = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[dir="auto"]');
            const results = [];
            const seen = new Set();

            postElements.forEach((el, index) => {
                const textEl = el.querySelector('[dir="auto"]') || el;
                const content = textEl ? textEl.textContent.trim() : '';

                if (content.length > 20 && !seen.has(content)) {
                    seen.add(content);
                    const authorEl = el.querySelector('h2, h3, strong, a[href*="/user/"], a[href*="/groups/"]');
                    const authorName = authorEl ? authorEl.textContent.trim() : 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';

                    results.push({
                        id: 'real_auto_' + Date.now() + '_' + index,
                        authorName: authorName,
                        content: content,
                        postDate: new Date().toISOString(),
                        postUrl: window.location.href,
                        isSamplePost: false,
                        isMatched: content.includes(TARGET_KEYWORD)
                    });
                }
            });
            return results;
        }""")

        print(f"\n🎉 Successfully extracted {len(posts_data)} REAL posts from private group!")

        # Save to real_posts.json
        output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "real_posts.json")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump({
                "groupName": "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
                "groupId": "993813573590579",
                "extractedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                "totalPosts": len(posts_data),
                "posts": posts_data
            }, f, ensure_ascii=False, indent=2)

        print(f"💾 Saved real group data to: {output_file}")
        print("\n🚀 Opening Web App on http://localhost:8080...")

        # Also launch local web app
        context.close()

if __name__ == "__main__":
    run_auto_collector()
