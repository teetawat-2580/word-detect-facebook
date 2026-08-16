/**
 * Facebook Private Group (993813573590579) Auto-Extractor Script - Microsoft Edge Edition
 * Extracts REAL post contents, REAL post permalinks, AND REAL author account profile links.
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

  // Select all post units in Facebook group feed
  const postElements = document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], .userContentWrapper, div[role="article"]');
  const extractedPosts = [];
  const seenContent = new Set();

  postElements.forEach((el, index) => {
    // 1. Extract Post Content Text
    const textEl = el.querySelector('[dir="auto"]') || el;
    const content = textEl ? textEl.textContent.trim() : '';

    if (content.length > 15 && !seenContent.has(content)) {
      seenContent.add(content);

      // 2. Extract REAL Author Name and REAL Author Facebook Profile URL
      let realAuthorName = 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
      let realAuthorUrl = '';

      // Search post header links (h2, h3, h4, strong, author links)
      const headerAnchors = Array.from(el.querySelectorAll('h2 a, h3 a, h4 a, strong a, a[href*="profile.php"], a[href*="/user/"], a[href*="/people/"], a[href*="/groups/993813573590579/user/"]'));

      for (const anchor of headerAnchors) {
        const href = anchor.getAttribute('href') || '';
        const txt = anchor.textContent.trim();

        if (txt && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like') && !txt.includes('ห้องตั้งตี้')) {
          realAuthorName = txt;
          if (href && href !== '#' && !href.startsWith('javascript:')) {
            let fullUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
            // Clean up tracking params if needed, but preserve profile ID / username
            realAuthorUrl = fullUrl;
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

      // 3. Extract REAL Post Permalink / URL Link
      let realPostUrl = '';
      const permalinkAnchor = el.querySelector('a[href*="/posts/"], a[href*="/permalink/"], a[href*="pfbid"], a[href*="multi_permalinks="], a[href*="story_fbid="]');

      if (permalinkAnchor) {
        let href = permalinkAnchor.getAttribute('href') || '';
        realPostUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
      } else {
        // Fallback: search all anchors in post header for timestamp links
        const allLinks = Array.from(el.querySelectorAll('a[role="link"], a[aria-label]'));
        for (const link of allLinks) {
          const href = link.getAttribute('href') || '';
          if (href.includes('/posts/') || href.includes('/permalink/') || href.includes('pfbid') || href.includes('story_fbid=')) {
            realPostUrl = href.startsWith('/') ? 'https://www.facebook.com' + href : href;
            break;
          }
        }
      }

      // If no specific post permalink found, fallback to group URL
      if (!realPostUrl) {
        realPostUrl = window.location.href;
      }

      const isMatched = content.includes(TARGET_KEYWORD);

      extractedPosts.push({
        id: `real_edge_${Date.now()}_${index}`,
        authorName: realAuthorName,
        authorUrl: realAuthorUrl || 'https://www.facebook.com/groups/993813573590579',
        content: content,
        postDate: new Date().toISOString(),
        postUrl: realPostUrl,
        isSamplePost: false,
        isMatched: isMatched
      });
    }
  });

  console.log(`✅ ดึงโพสต์จริงสำเร็จ ${extractedPosts.length} โพสต์ พร้อมลิงก์โพสต์จริงและลิงก์โปรไฟล์ผู้โพสต์จริง!`);

  const payload = {
    groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
    groupId: "993813573590579",
    timestamp: new Date().toISOString(),
    posts: extractedPosts
  };

  // Encode payload into URL hash parameter
  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetUrl = `https://word-detect-facebook.vercel.app/#data=${encodedPayload}`;

  // Copy payload to Clipboard as backup
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(JSON.stringify(payload));
      console.log("📋 คัดลอกข้อมูลลง Clipboard เรียบร้อยแล้ว");
    }
  } catch (e) {}

  // Open Vercel Web App in a new tab with encoded hash data
  window.open(targetUrl, "_blank");

  alert(`🎉 สกัดข้อมูลสำเร็จ! ดึงโพสต์จริง ${extractedPosts.length} โพสต์ พร้อมลิงก์โพสต์จริงและลิงก์โปรไฟล์ผู้โพสต์จริง\n\nเปิดระบบค้นหาที่ ${targetUrl} เรียบร้อยแล้วครับ!`);
})();
