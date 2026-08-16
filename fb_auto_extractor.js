/**
 * Facebook Private Group (993813573590579) F12 Auto-Extractor & Telegram Notifier
 * Target Keywords: "รับคน", "เปิดหาสมาชิก"
 * Directly sends Telegram notifications via browser fetch() to Chat ID 7760403769!
 */

(async function autoExtractFBGroupF12Telegram() {
  console.log("🚀 Starting Facebook Group F12 Extractor with Direct Telegram Alerts...");

  const BOT_TOKEN = "7535787456:AAFAzgfIL938dlFmH2-ZCWsGUIfQc96_wwg";
  const CHAT_ID = "7760403769";
  const TARGET_KEYWORDS = ["รับคน", "เปิดหาสมาชิก"];
  const VERCEL_URL = "https://word-detect-facebook.vercel.app/";

  // 1. Force Scroll to Top
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 1000));

  // 2. Auto Scroll Feed to load latest posts
  const SCROLL_COUNT = 8;
  const SCROLL_DELAY = 1200;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(`⏳ เลื่อนดึงโพสต์ล่าสุด (${i}/${SCROLL_COUNT})...`);
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(SCROLL_DELAY);
  }

  // 3. Extract posts from DOM
  const postElements = Array.from(document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[role="article"]'));
  const extractedPosts = [];
  const matchedPosts = [];
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

    if (!fullText) fullText = el.textContent.trim();

    if (fullText.length > 15 && !seenText.has(fullText)) {
      seenText.add(fullText);

      // Extract REAL Post Time Text
      let realPostTime = '';
      const timeEl = el.querySelector('time') || el.querySelector('abbr') || el.querySelector('a[href*="/posts/"] span, a[href*="pfbid"] span');
      if (timeEl) {
        realPostTime = timeEl.getAttribute('title') || timeEl.getAttribute('aria-label') || timeEl.textContent.trim();
      }
      if (!realPostTime) {
        const timestampAnchor = el.querySelector('a[href*="/posts/"], a[href*="/permalink/"], a[href*="pfbid"]');
        if (timestampAnchor) realPostTime = timestampAnchor.textContent.trim();
      }

      // Extract Anchors for Permalink & Author Profile Link
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

      const postObj = {
        id: `f12_real_${Date.now()}_${index}`,
        authorName: authorName,
        authorUrl: authorUrl,
        content: fullText,
        postDate: realPostTime || new Date().toISOString(),
        postTimeText: realPostTime || '',
        postUrl: postUrl,
        isSamplePost: false,
        isMatched: isMatched
      };

      extractedPosts.push(postObj);
      if (isMatched) matchedPosts.push(postObj);
    }
  });

  console.log(`🎉 สกัดข้อมูลสำเร็จ ${extractedPosts.length} โพสต์จริง (พบคีย์เวิร์ด ${matchedPosts.length} โพสต์)!`);

  // 4. Send Telegram Alerts directly from browser fetch()
  let telegramSentCount = 0;
  if (matchedPosts.length > 0) {
    console.log(`📱 กำลังส่งแจ้งเตือน Telegram ${matchedPosts.length} โพสต์ไปยัง Chat ID ${CHAT_ID}...`);
    for (const p of matchedPosts) {
      const shortContent = p.content.substring(0, 300) + (p.content.length > 300 ? '...' : '');
      const msg = `🚨 <b>พบโพสต์ตั้งตี้หารค่าสมองกลใหม่!</b>\n` +
                  `คีย์เวิร์ด: <code>"รับคน" / "เปิดหาสมาชิก"</code>\n\n` +
                  `👤 <b>ผู้โพสต์:</b> <a href="${p.authorUrl}">${p.authorName}</a>\n` +
                  `📅 <b>เวลาโพสต์จริง:</b> ${p.postTimeText || 'ไม่ระบุเวลา'}\n\n` +
                  `📝 <b>ข้อความโพสต์:</b>\n${shortContent}\n\n` +
                  `🔗 <a href="${p.postUrl}"><b>เปิดดูโพสต์จริงบน Facebook ↗</b></a>\n` +
                  `👤 <a href="${p.authorUrl}"><b>ดูโปรไฟล์ผู้โพสต์ ↗</b></a>`;

      try {
        const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: msg,
            parse_mode: 'HTML',
            disable_web_page_preview: false
          })
        });
        if (resp.ok) telegramSentCount++;
      } catch (err) {
        console.warn("Telegram alert send error:", err);
      }
    }
  }

  // 5. Open Vercel Web App with data
  const payload = {
    groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
    groupId: "993813573590579",
    timestamp: new Date().toISOString(),
    posts: extractedPosts
  };

  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetAppUrl = `${VERCEL_URL}#data=${encodedPayload}`;

  window.open(targetAppUrl, "_blank");

  alert(`🎉 สกัดเรียบร้อย!\n\n- ดึงโพสต์สดใหม่ได้ ${extractedPosts.length} โพสต์\n- พบคีย์เวิร์ด ${matchedPosts.length} โพสต์\n- ส่งแจ้งเตือนไปยัง Telegram สำเร็จ ${telegramSentCount} โพสต์!\n\nเปิดหน้าค้นหา Web App เรียบร้อยแล้วครับ!`);
})();
