/**
 * Facebook Private Group (993813573590579) Auto-Extractor Script - Microsoft Edge Edition
 * 
 * Instructions for Microsoft Edge:
 * 1. Open your Facebook Group in Microsoft Edge: https://www.facebook.com/groups/993813573590579
 * 2. Press F12 (or Ctrl+Shift+I) in Microsoft Edge -> Go to "Console" tab.
 * 3. Paste this script and press Enter.
 * 4. It will automatically scroll Microsoft Edge, extract real posts matching "รับคน", and open https://word-detect-facebook.vercel.app/ with real results!
 */

(async function autoExtractFBGroupEdge() {
  console.log("🚀 Starting Automatic Facebook Group Post Extractor (Microsoft Edge)...");
  
  const TARGET_KEYWORD = "รับคน";
  const SCROLL_COUNT = 10;
  const SCROLL_DELAY = 1500;

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(`⏳ เลื่อนหน้าจอ Microsoft Edge อัตโนมัติ (${i}/${SCROLL_COUNT})...`);
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(SCROLL_DELAY);
  }

  const postElements = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[dir="auto"]');
  const extractedPosts = [];
  const seenContent = new Set();

  postElements.forEach((el, index) => {
    const textEl = el.querySelector('[dir="auto"]') || el;
    const content = textEl ? textEl.textContent.trim() : '';
    
    if (content.length > 15 && !seenContent.has(content)) {
      seenContent.add(content);

      const authorEl = el.querySelector('h2, h3, strong, a[href*="/user/"], a[href*="/groups/"]');
      const authorName = authorEl ? authorEl.textContent.trim() : 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';

      const isMatched = content.includes(TARGET_KEYWORD);

      extractedPosts.push({
        id: `edge_auto_${Date.now()}_${index}`,
        authorName: authorName,
        content: content,
        postDate: new Date().toISOString(),
        postUrl: window.location.href,
        isSamplePost: false,
        isMatched: isMatched
      });
    }
  });

  console.log(`✅ ดึงโพสต์จริงสำเร็จ ${extractedPosts.length} โพสต์จาก Microsoft Edge!`);

  const payload = {
    groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
    groupId: "993813573590579",
    timestamp: new Date().toISOString(),
    posts: extractedPosts
  };

  // 1. Encode payload into URL hash parameter
  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetUrl = `https://word-detect-facebook.vercel.app/#data=${encodedPayload}`;

  // 2. Copy payload to Clipboard as backup
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(JSON.stringify(payload));
      console.log("📋 คัดลอกข้อมูลลง Clipboard เรียบร้อยแล้ว");
    }
  } catch (e) {}

  // 3. Open Vercel Web App in a new tab with encoded hash data
  window.open(targetUrl, "_blank");

  alert(`🎉 สกัดข้อมูลสำเร็จ! ดึงโพสต์จริงได้ ${extractedPosts.length} โพสต์จาก Microsoft Edge\n\nเปิดระบบค้นหาพร้อมแสดงผลลัพธ์ในแท็บใหม่เรียบร้อยแล้วครับ!`);
})();
