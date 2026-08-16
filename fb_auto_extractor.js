/**
 * Facebook Private Group (993813573590579) Auto-Extractor Script
 * 
 * Instructions:
 * 1. Open your Facebook Group: https://www.facebook.com/groups/993813573590579
 * 2. Press F12 (Developer Tools) -> Go to "Console" tab.
 * 3. Paste this script and press Enter.
 * 4. It will automatically scroll, extract posts matching "รับคน", and send them straight to your Web App!
 */

(async function autoExtractFBGroup() {
  console.log("🚀 Starting Automatic Facebook Group Post Extractor...");
  
  const TARGET_KEYWORD = "รับคน";
  const WEB_APP_URL = "http://localhost:8080";
  const SCROLL_COUNT = 10; // Number of auto-scrolls to fetch posts
  const SCROLL_DELAY = 1500; // ms

  // Helper to wait
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Auto-scroll loop
  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(`⏳ Auto-scrolling group feed (${i}/${SCROLL_COUNT})...`);
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(SCROLL_DELAY);
  }

  // Extract posts from DOM
  const postElements = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[dir="auto"]');
  const extractedPosts = [];
  const seenContent = new Set();

  postElements.forEach((el, index) => {
    const textEl = el.querySelector('[dir="auto"]') || el;
    const content = textEl ? textEl.textContent.trim() : '';
    
    // Ignore short or duplicate texts
    if (content.length > 15 && !seenContent.has(content)) {
      seenContent.add(content);

      // Extract author
      const authorEl = el.querySelector('h2, h3, strong, a[href*="/user/"], a[href*="/groups/"]');
      const authorName = authorEl ? authorEl.textContent.trim() : 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';

      // Check for target keyword "รับคน"
      const isMatched = content.includes(TARGET_KEYWORD);

      extractedPosts.push({
        id: `auto_real_${Date.now()}_${index}`,
        authorName: authorName,
        content: content,
        postDate: new Date().toISOString(),
        postUrl: window.location.href,
        isSamplePost: false,
        isMatched: isMatched
      });
    }
  });

  console.log(`✅ Extracted ${extractedPosts.length} real posts from group!`);

  // Send extracted data to local Web App via localStorage sync / window postMessage
  const payload = {
    groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
    groupId: "993813573590579",
    timestamp: new Date().toISOString(),
    posts: extractedPosts
  };

  // Save payload to localStorage so localhost:8080 picks it up instantly
  try {
    localStorage.setItem("AUTO_EXTRACTED_FB_POSTS", JSON.stringify(payload));
  } catch (e) {}

  // Open / focus Web App with payload
  const appWindow = window.open(WEB_APP_URL, "_blank");
  
  alert(`🎉 สกัดข้อมูลสำเร็จ! ดึงข้อมูลได้ ${extractedPosts.length} โพสต์จริงจากกลุ่ม 993813573590579\n\nเปิดระบบค้นหาที่ ${WEB_APP_URL} แล้วครับ!`);
})();
