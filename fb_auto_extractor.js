/**
 * Facebook Private Group (993813573590579) Auto-Extractor - Chronological Fresh Posts
 * Forces refresh to latest posts, extracts real names, author profile links, and direct post links.
 */

(async function autoExtractFBGroupLatest() {
  console.log("🚀 Starting Facebook Group Extractor (Fresh Latest Posts)...");
  
  const TARGET_KEYWORD = "รับคน";
  const VERCEL_URL = "https://word-detect-facebook.vercel.app/";
  
  // 1. Force Scroll to Top & ensure Chronological order
  window.scrollTo(0, 0);
  console.log("🔄 Starting from top for freshest posts...");
  await new Promise(r => setTimeout(r, 1000));

  // 2. Auto Scroll Feed to load latest posts
  const SCROLL_COUNT = 8;
  const SCROLL_DELAY = 1200;

  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(`⏳ เลื่อนดึงโพสต์ล่าสุด (${i}/${SCROLL_COUNT})...`);
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, SCROLL_DELAY));
  }

  // 3. Select all post units
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
            if (!href.includes('/groups/993813573590579?') && href !== '/groups/993813573590579/') {
              authorName = txt;
              authorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
            }
          }
        }
      }

      // Fallbacks
      if (!postUrl) postUrl = window.location.href;
      if (!authorUrl) authorUrl = 'https://www.facebook.com/groups/993813573590579';

      extractedPosts.push({
        id: `fresh_real_${Date.now()}_${index}`,
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

  console.log(`🎉 สกัดข้อมูลสดใหม่สำเร็จ ${extractedPosts.length} โพสต์จริง!`);

  const payload = {
    groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
    groupId: "993813573590579",
    timestamp: new Date().toISOString(),
    posts: extractedPosts
  };

  // Encode payload into URL Hash for instant transfer
  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetAppUrl = `${VERCEL_URL}#data=${encodedPayload}`;

  // Open Vercel Web App in a new tab
  window.open(targetAppUrl, "_blank");

  alert(`🎉 สกัดข้อมูลสดใหม่สำเร็จ ${extractedPosts.length} โพสต์จริง!\n\nเปิดหน้าเว็บค้นหาเรียบร้อยแล้วครับ!`);
})();
