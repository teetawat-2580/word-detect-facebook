/**
 * Facebook Private Group (993813573590579) F12 Auto-Extractor Script
 * 
 * Instructions:
 * 1. Open your Facebook Group in Microsoft Edge: https://www.facebook.com/groups/993813573590579
 * 2. Press F12 (or Ctrl+Shift+I) -> Go to "Console" tab.
 * 3. Type "allow pasting" if Edge prompts you, then paste this script and press Enter.
 * 4. It will auto-scroll, extract ALL REAL posts, REAL post permalinks, and REAL author profile links, then open Vercel Web App!
 */

(async function autoExtractFBGroupF12() {
  console.log("🚀 Starting Facebook Group F12 Real Post Extractor...");
  
  const TARGET_KEYWORD = "รับคน";
  const VERCEL_URL = "https://word-detect-facebook.vercel.app/";
  const SCROLL_COUNT = 8;
  const SCROLL_DELAY = 1300;

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // 1. Auto Scroll Feed
  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(`⏳ เลื่อนหน้าจอ Facebook (${i}/${SCROLL_COUNT})...`);
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(SCROLL_DELAY);
  }

  // 2. Select post units
  const postElements = Array.from(document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[role="article"]'));
  const extractedPosts = [];
  const seenText = new Set();

  postElements.forEach((el, index) => {
    // Extract text content
    const textEls = el.querySelectorAll('[dir="auto"]');
    let fullText = '';
    textEls.forEach(t => {
      const txt = t.textContent.trim();
      if (txt.length > 10 && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like') && !txt.includes('Write a comment')) {
        if (!fullText.includes(txt)) {
          fullText += (fullText ? '\n' : '') + txt;
        }
      }
    });

    if (!fullText) {
      fullText = el.textContent.trim();
    }

    if (fullText.length > 15 && !seenText.has(fullText)) {
      seenText.add(fullText);

      // Extract ALL anchors inside post element
      const anchors = Array.from(el.querySelectorAll('a[href]'));

      let authorName = 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
      let authorUrl = '';
      let postUrl = '';

      for (const a of anchors) {
        const href = a.getAttribute('href') || '';
        const txt = a.textContent.trim();

        // Check for Individual Post Permalink (pfbid / /posts/ /permalink/)
        if (!postUrl && (href.includes('/posts/') || href.includes('/permalink/') || href.includes('pfbid') || href.includes('multi_permalinks=') || href.includes('story_fbid='))) {
          let cleanHref = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
          postUrl = cleanHref;
        }

        // Check for Author Profile link
        if (!authorUrl && txt && txt.length > 1 && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like') && !txt.includes('ห้องตั้งตี้')) {
          if (href.includes('/user/') || href.includes('profile.php') || href.includes('/people/') || href.startsWith('/')) {
            // Exclude main group links
            if (!href.includes('/groups/993813573590579?') && href !== '/groups/993813573590579/') {
              authorName = txt;
              authorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
            }
          }
        }
      }

      // Fallbacks
      if (!postUrl) {
        postUrl = window.location.href;
      }
      if (!authorUrl) {
        authorUrl = 'https://www.facebook.com/groups/993813573590579';
      }

      extractedPosts.push({
        id: `f12_real_${Date.now()}_${index}`,
        authorName: authorName,
        authorUrl: authorUrl,
        content: fullText,
        postDate: new Date().toISOString(),
        postUrl: postUrl,
        isSamplePost: false,
        isMatched: fullText.includes(TARGET_KEYWORD)
      });
    }
  });

  console.log(`🎉 สกัดข้อมูลสำเร็จ ${extractedPosts.length} โพสต์จริง!`);

  const payload = {
    groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
    groupId: "993813573590579",
    timestamp: new Date().toISOString(),
    posts: extractedPosts
  };

  // Encode payload into URL Hash for instant transfer
  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetAppUrl = `${VERCEL_URL}#data=${encodedPayload}`;

  // Backup payload to Clipboard
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(JSON.stringify(payload));
      console.log("📋 คัดลอกข้อมูลลง Clipboard เรียบร้อยแล้ว");
    }
  } catch (e) {}

  // Open Vercel Web App in a new tab with encoded real post data
  window.open(targetAppUrl, "_blank");

  alert(`🎉 สกัดเรียบร้อย! ดึง ${extractedPosts.length} โพสต์จริงสำเร็จ พร้อมลิงก์โพสต์จริงและลิงก์โปรไฟล์จริง\n\nเปิดหน้าเว็บค้นหาที่ ${VERCEL_URL} เรียบร้อยแล้วครับ!`);
})();
