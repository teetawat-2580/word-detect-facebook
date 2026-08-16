/**
 * Facebook Private Group (993813573590579) F12 Auto-Extractor Script
 * Target Keywords: "รับคน", "เปิดหาสมาชิก"
 */

(async function autoExtractFBGroupF12() {
  console.log("🚀 Starting Facebook Group F12 Real Post Extractor...");
  
  const TARGET_KEYWORDS = ["รับคน", "เปิดหาสมาชิก"];
  const VERCEL_URL = "https://word-detect-facebook.vercel.app/";
  
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 1000));
  
  const SCROLL_COUNT = 8;
  const SCROLL_DELAY = 1200;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(`⏳ เลื่อนดึงโพสต์ล่าสุด (${i}/${SCROLL_COUNT})...`);
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(SCROLL_DELAY);
  }

  const postElements = Array.from(document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[role="article"]'));
  const extractedPosts = [];
  const seenText = new Set();

  postElements.forEach((el, index) => {
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

      const anchors = Array.from(el.querySelectorAll('a[href]'));

      let authorName = 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
      let authorUrl = '';
      let postUrl = '';

      for (const a of anchors) {
        const href = a.getAttribute('href') || '';
        const txt = a.textContent.trim();

        if (!postUrl && (href.includes('/posts/') || href.includes('/permalink/') || href.includes('pfbid') || href.includes('multi_permalinks=') || href.includes('story_fbid='))) {
          postUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
        }

        if (!authorUrl && txt && txt.length > 1 && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like') && !txt.includes('ห้องตั้งตี้')) {
          if (href.includes('/user/') || href.includes('profile.php') || href.includes('/people/') || href.startsWith('/')) {
            if (!href.includes('/groups/993813573590579?') && href !== '/groups/993813573590579/') {
              authorName = txt;
              authorUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
            }
          }
        }
      }

      if (!postUrl) postUrl = window.location.href;
      if (!authorUrl) authorUrl = 'https://www.facebook.com/groups/993813573590579';

      const isMatched = TARGET_KEYWORDS.some(kw => fullText.includes(kw));

      extractedPosts.push({
        id: `f12_real_${Date.now()}_${index}`,
        authorName: authorName,
        authorUrl: authorUrl,
        content: fullText,
        postDate: new Date().toISOString(),
        postUrl: postUrl,
        isSamplePost: false,
        isMatched: isMatched
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

  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetAppUrl = `${VERCEL_URL}#data=${encodedPayload}`;

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(JSON.stringify(payload));
    }
  } catch (e) {}

  window.open(targetAppUrl, "_blank");
  alert(`🎉 สกัดเรียบร้อย! ดึง ${extractedPosts.length} โพสต์สดใหม่สำเร็จ ("รับคน" / "เปิดหาสมาชิก")\n\nเปิดหน้าเว็บค้นหาเรียบร้อยแล้วครับ!`);
})();
