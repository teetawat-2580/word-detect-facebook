/**
 * Facebook Private Group Word Search - Core Application Engine
 * Target Group: "ห้องตั้งตี้หารค่าสมองกล (Google AI)" (Group ID: 993813573590579)
 * Target Keyword: "รับคน"
 */

(function () {
  'use strict';

  // State Management
  const state = {
    posts: [],
    filteredPosts: [],
    authors: new Set(),
    searchQuery: 'รับคน', // Default target keyword
    searchMode: 'exact', // 'exact', 'words', 'regex'
    caseSensitive: false,
    wholeWord: false,
    selectedAuthor: 'all',
    startDate: '',
    endDate: '',
    commentsOnly: false,
    linksOnly: false,
    stats: {
      totalPosts: 0,
      matchedPosts: 0,
      totalComments: 0,
      uniqueAuthors: 0
    }
  };

  // Minified 1-Click Bookmarklet Extractor Code
  const BOOKMARKLET_CODE = `javascript:(async function(){const K="รับคน",V="https://word-detect-facebook.vercel.app/";window.scrollTo(0,0);await new Promise(r=>setTimeout(r,800));for(let i=1;i<=8;i++){window.scrollTo(0,document.body.scrollHeight);await new Promise(r=>setTimeout(r,1200));}const P=Array.from(document.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], div[role="article"]')),res=[],seen=new Set();P.forEach((el,idx)=>{const T=Array.from(el.querySelectorAll('[dir="auto"]')).map(t=>t.textContent.trim()).filter(t=>t.length>10&&!t.includes('Comment')&&!t.includes('Share')).join('\\n')||el.textContent.trim();if(T.length>15&&!seen.has(T)){seen.add(T);const A=Array.from(el.querySelectorAll('a[href]'));let au='สมาชิกกลุ่มตั้งตี้หารค่าสมองกล',auUrl='',pUrl='';for(const a of A){const h=a.getAttribute('href')||'',txt=a.textContent.trim();if(!pUrl&&(h.includes('/posts/')||h.includes('/permalink/')||h.includes('pfbid')||h.includes('multi_permalinks=')))pUrl=h.startsWith('/')?'https://www.facebook.com'+h:h;if(!auUrl&&txt&&txt.length>1&&!txt.includes('Comment')&&!txt.includes('Share')&&!txt.includes('ห้องตั้งตี้')){if(h.includes('/user/')||h.includes('profile.php')||h.includes('/people/')||h.startsWith('/')){if(!h.includes('/groups/993813573590579?')){au=txt;auUrl=h.startsWith('/')?'https://www.facebook.com'+h:h;}}}}res.push({id:'bm_'+Date.now()+'_'+idx,authorName:au,authorUrl:auUrl||'https://www.facebook.com/groups/993813573590579',content:T,postDate:new Date().toISOString(),postUrl:pUrl||window.location.href,isSamplePost:false,isMatched:T.includes(K)});}});const payload={groupName:"ห้องตั้งตี้หารค่าสมองกล (Google AI)",groupId:"993813573590579",timestamp:new Date().toISOString(),posts:res};const target=V+'#data='+encodeURIComponent(JSON.stringify(payload));window.open(target,'_blank');})();`;

  // F12 Extractor Script String for 1-click clipboard copy
  const F12_EXTRACTOR_SCRIPT = `(async function autoExtractFBGroupF12() {
  console.log("🚀 Starting Facebook Group F12 Real Post Extractor...");
  const TARGET_KEYWORD = "รับคน";
  const VERCEL_URL = "https://word-detect-facebook.vercel.app/";
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 1000));
  const SCROLL_COUNT = 8;
  const SCROLL_DELAY = 1200;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  for (let i = 1; i <= SCROLL_COUNT; i++) {
    console.log(\`⏳ เลื่อนดึงโพสต์ล่าสุด (\${i}/\${SCROLL_COUNT})...\`);
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
      if (txt.length > 10 && !txt.includes('Comment') && !txt.includes('Share') && !txt.includes('Like')) {
        if (!fullText.includes(txt)) fullText += (fullText ? '\\n' : '') + txt;
      }
    });

    if (!fullText) fullText = el.textContent.trim();

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

      extractedPosts.push({
        id: \`f12_real_\${Date.now()}_\${index}\`,
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

  const payload = { groupName: "ห้องตั้งตี้หารค่าสมองกล (Google AI)", groupId: "993813573590579", timestamp: new Date().toISOString(), posts: extractedPosts };
  const encodedPayload = encodeURIComponent(JSON.stringify(payload));
  const targetAppUrl = \`\${VERCEL_URL}#data=\${encodedPayload}\`;

  try { await navigator.clipboard.writeText(JSON.stringify(payload)); } catch (e) {}
  window.open(targetAppUrl, "_blank");
  alert(\`🎉 สกัดเรียบร้อย! ดึง \${extractedPosts.length} โพสต์จริงสำเร็จ พร้อมลิงก์โพสต์จริงและลิงก์โปรไฟล์จริง\\n\\nเปิดหน้าเว็บค้นหาแล้วครับ!\`);
})();`;

  // DOM Cache
  const DOM = {
    searchInput: document.getElementById('main-search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    postsFeed: document.getElementById('posts-feed-container'),
    searchModeSelect: document.getElementById('search-mode-select'),
    caseSensitiveToggle: document.getElementById('case-sensitive-toggle'),
    wholeWordToggle: document.getElementById('whole-word-toggle'),
    authorFilterSelect: document.getElementById('author-filter-select'),
    startDateInput: document.getElementById('start-date-input'),
    endDateInput: document.getElementById('end-date-input'),
    commentsOnlyToggle: document.getElementById('comments-only-toggle'),
    linksOnlyToggle: document.getElementById('links-only-toggle'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    bookmarkletBtn: document.getElementById('bookmarklet-btn'),
    // Stats Elements
    statTotalPosts: document.getElementById('stat-total-posts'),
    statMatchedPosts: document.getElementById('stat-matched-posts'),
    statUniqueAuthors: document.getElementById('stat-unique-authors'),
    statMatchedComments: document.getElementById('stat-matched-comments'),
    activeFiltersBar: document.getElementById('active-filters-bar'),
    filterPillsContainer: document.getElementById('filter-pills-container'),
    // Modals
    importModal: document.getElementById('import-modal'),
    importModalOpenBtn: document.getElementById('import-modal-open-btn'),
    importModalCloseBtn: document.getElementById('import-modal-close-btn'),
    copyF12ScriptBtn: document.getElementById('copy-f12-script-btn'),
    dropzone: document.getElementById('file-dropzone'),
    fileInput: document.getElementById('file-input'),
    rawTextInput: document.getElementById('raw-text-input'),
    submitRawTextBtn: document.getElementById('submit-raw-text-btn'),
    loadSampleDataBtn: document.getElementById('load-sample-data-btn'),
    exportBtn: document.getElementById('export-results-btn'),
    toastContainer: document.getElementById('toast-container')
  };

  // Initialize Application
  async function init() {
    bindEvents();

    if (DOM.bookmarkletBtn) {
      DOM.bookmarkletBtn.setAttribute('href', BOOKMARKLET_CODE);
    }

    if (DOM.searchInput) {
      DOM.searchInput.value = state.searchQuery;
      if (DOM.searchClearBtn) DOM.searchClearBtn.style.display = 'block';
    }

    let loadedData = false;

    // 1. Check for data passed directly via URL Hash (#data=...)
    if (window.location.hash && window.location.hash.includes('data=')) {
      try {
        const hashStr = window.location.hash.substring(window.location.hash.indexOf('data=') + 5);
        const jsonStr = decodeURIComponent(hashStr);
        const parsed = JSON.parse(jsonStr);
        if (parsed && parsed.posts && parsed.posts.length > 0) {
          loadDataset(parsed.posts, "ข้อมูลจริงจาก Facebook Auto-Extractor");
          loadedData = true;
          showToast(`🎉 โหลด ${parsed.posts.length} โพสต์สดใหม่พร้อมลิงก์โปรไฟล์สำเร็จ!`, "success");
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      } catch (e) {
        console.warn("Could not parse data from URL hash", e);
      }
    }

    // 2. Check for real_posts.json if available locally
    if (!loadedData) {
      loadedData = await tryLoadRealPostsJson();
    }

    // 3. Fallback to localStorage
    if (!loadedData) {
      const cached = localStorage.getItem("AUTO_EXTRACTED_FB_POSTS");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.posts && parsed.posts.length) {
            loadDataset(parsed.posts, "ข้อมูลดึงอัตโนมัติ (Auto-Extracted)");
            loadedData = true;
          }
        } catch (e) {}
      }
    }

    // 4. Fallback to sample dataset if no real data is found
    if (!loadedData && window.SAMPLE_FB_GROUP_DATA && window.SAMPLE_FB_GROUP_DATA.posts) {
      loadDataset(window.SAMPLE_FB_GROUP_DATA.posts, "ชุดข้อมูลตัวอย่าง (Demo Sample)");
    }
  }

  // Try auto-fetching real_posts.json
  async function tryLoadRealPostsJson() {
    try {
      const resp = await fetch('real_posts.json', { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.posts && data.posts.length > 0) {
          loadDataset(data.posts, "โพสต์จริงจาก auto_collector.py");
          showToast(`โหลด ${data.posts.length} โพสต์จริงจาก real_posts.json เรียบร้อยแล้ว!`, "success");
          return true;
        }
      }
    } catch (e) {
      // Ignore if real_posts.json doesn't exist
    }
    return false;
  }

  // Bind Event Listeners
  function bindEvents() {
    if (DOM.copyF12ScriptBtn) {
      DOM.copyF12ScriptBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(F12_EXTRACTOR_SCRIPT);
          showToast("📋 คัดลอกสคริปต์ F12 เรียบร้อย! เปิดหน้า Facebook กด F12 แล้ววางได้ทันที", "success");
        } catch (e) {
          showToast("คัดลอกไม่สำเร็จ กรุณาคัดลอกไฟล์ fb_auto_extractor.js", "warning");
        }
      });
    }

    // Search input typing
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (DOM.searchClearBtn) {
          DOM.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        applyFiltersAndRender();
      });
    }

    if (DOM.searchClearBtn) {
      DOM.searchClearBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.searchClearBtn.style.display = 'none';
        applyFiltersAndRender();
      });
    }

    // Controls changes
    if (DOM.searchModeSelect) {
      DOM.searchModeSelect.addEventListener('change', (e) => {
        state.searchMode = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.caseSensitiveToggle) {
      DOM.caseSensitiveToggle.addEventListener('change', (e) => {
        state.caseSensitive = e.target.checked;
        applyFiltersAndRender();
      });
    }

    if (DOM.wholeWordToggle) {
      DOM.wholeWordToggle.addEventListener('change', (e) => {
        state.wholeWord = e.target.checked;
        applyFiltersAndRender();
      });
    }

    if (DOM.authorFilterSelect) {
      DOM.authorFilterSelect.addEventListener('change', (e) => {
        state.selectedAuthor = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.startDateInput) {
      DOM.startDateInput.addEventListener('change', (e) => {
        state.startDate = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.endDateInput) {
      DOM.endDateInput.addEventListener('change', (e) => {
        state.endDate = e.target.value;
        applyFiltersAndRender();
      });
    }

    if (DOM.commentsOnlyToggle) {
      DOM.commentsOnlyToggle.addEventListener('change', (e) => {
        state.commentsOnly = e.target.checked;
        applyFiltersAndRender();
      });
    }

    if (DOM.linksOnlyToggle) {
      DOM.linksOnlyToggle.addEventListener('change', (e) => {
        state.linksOnly = e.target.checked;
        applyFiltersAndRender();
      });
    }

    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener('click', resetFilters);
    }

    // Modal Events
    if (DOM.importModalOpenBtn) {
      DOM.importModalOpenBtn.addEventListener('click', () => openModal(DOM.importModal));
    }
    if (DOM.importModalCloseBtn) {
      DOM.importModalCloseBtn.addEventListener('click', () => closeModal(DOM.importModal));
    }

    // File Drag & Drop
    if (DOM.dropzone) {
      DOM.dropzone.addEventListener('click', () => DOM.fileInput.click());
      DOM.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        DOM.dropzone.classList.add('dragover');
      });
      DOM.dropzone.addEventListener('dragleave', () => DOM.dropzone.classList.remove('dragover'));
      DOM.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        DOM.dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
          handleFiles(e.dataTransfer.files);
        }
      });
    }

    if (DOM.fileInput) {
      DOM.fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
          handleFiles(e.target.files);
        }
      });
    }

    // Raw text import
    if (DOM.submitRawTextBtn) {
      DOM.submitRawTextBtn.addEventListener('click', parseRawTextImport);
    }

    // Load Sample Data Button
    if (DOM.loadSampleDataBtn) {
      DOM.loadSampleDataBtn.addEventListener('click', () => {
        if (window.SAMPLE_FB_GROUP_DATA) {
          loadDataset(window.SAMPLE_FB_GROUP_DATA.posts, "ชุดข้อมูลตัวอย่าง (Demo Sample)");
          closeModal(DOM.importModal);
          showToast("โหลดชุดข้อมูลตัวอย่างเรียบร้อยแล้ว", "success");
        }
      });
    }

    // Export button
    if (DOM.exportBtn) {
      DOM.exportBtn.addEventListener('click', exportSearchResults);
    }
  }

  // Load a new dataset
  function loadDataset(postsArray, sourceName = "Imported File") {
    const isSampleSource = sourceName.includes("Demo") || sourceName.includes("Sample") || sourceName.includes("ตัวอย่าง");

    state.posts = postsArray.map((p, index) => ({
      id: p.id || `post_${Date.now()}_${index}`,
      authorName: p.authorName || p.author || 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล',
      authorUrl: p.authorUrl || p.userUrl || 'https://www.facebook.com/groups/993813573590579',
      authorAvatar: p.authorAvatar || getAvatarPlaceholder(p.authorName || 'User'),
      postDate: p.postDate || p.date || new Date().toISOString(),
      postUrl: p.postUrl || 'https://www.facebook.com/groups/993813573590579',
      content: p.content || p.text || p.message || '',
      reactionsCount: p.reactionsCount || p.likes || 0,
      commentsCount: (p.comments ? p.comments.length : (p.commentsCount || 0)),
      hasLinks: p.hasLinks || (p.content && p.content.includes('http')),
      isSamplePost: p.isSamplePost !== undefined ? p.isSamplePost : isSampleSource,
      comments: p.comments || []
    }));

    // Rebuild author set
    state.authors.clear();
    state.posts.forEach(p => {
      if (p.authorName) state.authors.add(p.authorName);
    });

    populateAuthorDropdown();
    applyFiltersAndRender();
    showToast(`โหลด ${state.posts.length} โพสต์จาก ${sourceName} สำเร็จ`, 'success');
  }

  function getAvatarPlaceholder(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1877F2&color=fff&bold=true`;
  }

  function populateAuthorDropdown() {
    if (!DOM.authorFilterSelect) return;
    DOM.authorFilterSelect.innerHTML = '<option value="all">ผู้โพสต์ทั้งหมด (All)</option>';
    Array.from(state.authors).sort().forEach(author => {
      const opt = document.createElement('option');
      opt.value = author;
      opt.textContent = author;
      DOM.authorFilterSelect.appendChild(opt);
    });
  }

  // File Handlers (HTML, XLSX, CSV, JSON)
  function handleFiles(files) {
    Array.from(files).forEach(file => {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.html') || fileName.endsWith('.htm')) {
        parseFBHtmlFile(file);
      } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.csv')) {
        parseExcelFile(file);
      } else if (fileName.endsWith('.json')) {
        parseJsonFile(file);
      } else if (fileName.endsWith('.txt')) {
        parseTxtFile(file);
      } else {
        showToast(`ไม่รองรับไฟล์ประเภท: ${file.name}`, 'warning');
      }
    });
    closeModal(DOM.importModal);
  }

  // Parser: Facebook Saved HTML Pages
  function parseFBHtmlFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.target.result, 'text/html');
        const extractedPosts = [];

        const postContainers = doc.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], .userContentWrapper, div[dir="auto"]');

        if (postContainers.length === 0) {
          const textBlocks = doc.querySelectorAll('div[dir="auto"], span[dir="auto"]');
          let idCounter = 1;
          textBlocks.forEach(el => {
            const txt = el.textContent.trim();
            if (txt.length > 25 && !txt.includes('Comment') && !txt.includes('Like')) {
              extractedPosts.push({
                id: `real_html_${idCounter++}`,
                authorName: 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล (จากไฟล์จริง)',
                authorUrl: 'https://www.facebook.com/groups/993813573590579',
                content: txt,
                postDate: new Date().toISOString(),
                postUrl: 'https://www.facebook.com/groups/993813573590579',
                isSamplePost: false,
                comments: []
              });
            }
          });
        } else {
          let idCounter = 1;
          postContainers.forEach(container => {
            const textEl = container.querySelector('[dir="auto"]') || container;
            const content = textEl ? textEl.textContent.trim() : '';
            const authorEl = container.querySelector('h2 a, h3 a, strong a, a[href*="/user/"], a[href*="profile.php"], a[href*="/groups/"]');
            const authorName = authorEl ? authorEl.textContent.trim() : 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล';
            
            let authorUrl = authorEl ? authorEl.getAttribute('href') || '' : '';
            if (authorUrl && authorUrl.startsWith('/')) {
              authorUrl = 'https://www.facebook.com' + authorUrl;
            }
            if (!authorUrl) authorUrl = 'https://www.facebook.com/groups/993813573590579';

            if (content.length > 15) {
              extractedPosts.push({
                id: `real_fb_${idCounter++}`,
                authorName: authorName,
                authorUrl: authorUrl,
                content: content,
                postDate: new Date().toISOString(),
                postUrl: 'https://www.facebook.com/groups/993813573590579',
                isSamplePost: false,
                comments: []
              });
            }
          });
        }

        if (extractedPosts.length > 0) {
          loadDataset(extractedPosts, `ไฟล์จริง: ${file.name}`);
        } else {
          showToast(`ไม่พบข้อมูลโพสต์ในไฟล์ ${file.name}`, 'warning');
        }
      } catch (err) {
        showToast(`อ่านไฟล์ HTML ไม่สำเร็จ: ${err.message}`, 'danger');
      }
    };
    reader.readAsText(file);
  }

  // Parser: Excel (.xlsx, .csv)
  function parseExcelFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonRows = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonRows.length) {
          showToast("ตาราง Excel ว่างเปล่า!", "warning");
          return;
        }

        const extractedPosts = jsonRows.map((row, idx) => {
          const keys = Object.keys(row);
          const contentKey = keys.find(k => /content|post|message|text|body|ข้อความ|รายละเอียด/i.test(k)) || keys[0];
          const authorKey = keys.find(k => /author|user|name|poster|sender|ผู้โพสต์|ชื่อ/i.test(k));
          const authorUrlKey = keys.find(k => /profile|account|authorurl|author_url|ลิงก์โปรไฟล์/i.test(k));
          const dateKey = keys.find(k => /date|time|created|วันที่/i.test(k));
          const urlKey = keys.find(k => /url|link|ลิงก์/i.test(k));

          return {
            id: `excel_${idx}`,
            authorName: authorKey ? String(row[authorKey]) : 'สมาชิกกลุ่มตั้งตี้หารค่าสมองกล',
            authorUrl: authorUrlKey ? String(row[authorUrlKey]) : 'https://www.facebook.com/groups/993813573590579',
            content: contentKey ? String(row[contentKey]) : '',
            postDate: dateKey ? String(row[dateKey]) : new Date().toISOString(),
            postUrl: urlKey ? String(row[urlKey]) : 'https://www.facebook.com/groups/993813573590579',
            isSamplePost: false,
            comments: []
          };
        }).filter(p => p.content.trim().length > 0);

        loadDataset(extractedPosts, `ไฟล์จริง: ${file.name}`);
      } catch (err) {
        showToast(`อ่านไฟล์ Excel/CSV ล้มเหลว: ${err.message}`, 'danger');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  // Parser: JSON
  function parseJsonFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const postsArray = Array.isArray(json) ? json : (json.posts || [json]);
        loadDataset(postsArray, `ไฟล์นำเข้า: ${file.name}`);
      } catch (err) {
        showToast(`รูปแบบไฟล์ JSON ไม่ถูกต้อง: ${err.message}`, 'danger');
      }
    };
    reader.readAsText(file);
  }

  // Parser: Plain Text
  function parseTxtFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      parseRawTextString(e.target.result, file.name);
    };
    reader.readAsText(file);
  }

  function parseRawTextImport() {
    const text = DOM.rawTextInput ? DOM.rawTextInput.value.trim() : '';
    if (!text) {
      showToast("กรุณากรอกหรือวางข้อความโพสต์ก่อนนำเข้า", "warning");
      return;
    }
    parseRawTextString(text, "ข้อความที่วางจริง");
    DOM.rawTextInput.value = '';
    closeModal(DOM.importModal);
  }

  function parseRawTextString(text, sourceName) {
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 5);
    const posts = paragraphs.map((p, idx) => ({
      id: `raw_${idx}`,
      authorName: 'ข้อความจริงที่คัดลอกมา',
      authorUrl: 'https://www.facebook.com/groups/993813573590579',
      content: p.trim(),
      postDate: new Date().toISOString(),
      postUrl: 'https://www.facebook.com/groups/993813573590579',
      isSamplePost: false,
      comments: []
    }));
    loadDataset(posts, sourceName);
  }

  // Core Filtering & Search Logic
  function applyFiltersAndRender() {
    let results = state.posts;

    // 1. Author Filter
    if (state.selectedAuthor !== 'all') {
      results = results.filter(p => p.authorName === state.selectedAuthor);
    }

    // 2. Date Range Filter
    if (state.startDate) {
      const startMs = new Date(state.startDate).getTime();
      results = results.filter(p => new Date(p.postDate).getTime() >= startMs);
    }
    if (state.endDate) {
      const endMs = new Date(state.endDate).getTime() + (24 * 60 * 60 * 1000);
      results = results.filter(p => new Date(p.postDate).getTime() <= endMs);
    }

    // 3. Comments / Links Only
    if (state.commentsOnly) {
      results = results.filter(p => p.comments && p.comments.length > 0);
    }
    if (state.linksOnly) {
      results = results.filter(p => p.hasLinks || (p.content && p.content.includes('http')));
    }

    // 4. Keyword / Regex Search Filter
    const query = state.searchQuery.trim();
    let totalMatchedComments = 0;

    if (query) {
      const regex = createSearchRegex(query);

      results = results.filter(post => {
        let postMatches = false;
        let commentMatches = false;

        if (regex) {
          postMatches = regex.test(post.content);

          if (post.comments && post.comments.length) {
            post.comments.forEach(c => {
              if (regex.test(c.text)) {
                commentMatches = true;
                totalMatchedComments++;
              }
            });
          }
        }

        return postMatches || commentMatches;
      });
    }

    state.filteredPosts = results;

    // Update Stats
    state.stats.totalPosts = state.posts.length;
    state.stats.matchedPosts = results.length;
    state.stats.uniqueAuthors = state.authors.size;
    state.stats.totalComments = totalMatchedComments;

    updateStatsUI();
    updateFilterPillsUI();
    renderFeed();
  }

  // Regex Builder
  function createSearchRegex(query) {
    if (!query) return null;
    try {
      let flags = state.caseSensitive ? 'g' : 'gi';

      if (state.searchMode === 'regex') {
        return new RegExp(query, flags);
      }

      let escaped = escapeRegExp(query);

      if (state.searchMode === 'words') {
        const words = query.split(/\s+/).map(w => escapeRegExp(w)).filter(Boolean);
        if (words.length > 0) {
          const pattern = words.map(w => state.wholeWord ? `\\b${w}\\b` : w).join('|');
          return new RegExp(`(${pattern})`, flags);
        }
      }

      if (state.wholeWord) {
        escaped = `\\b${escaped}\\b`;
      }

      return new RegExp(`(${escaped})`, flags);
    } catch (err) {
      console.warn("Invalid search pattern", err);
      return null;
    }
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Render Post Feed with Word Highlighting & Author Profile Links
  function renderFeed() {
    if (!DOM.postsFeed) return;

    if (state.filteredPosts.length === 0) {
      DOM.postsFeed.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">ไม่พบโพสต์ที่ตรงกับคำค้นหา "${escapeHtml(state.searchQuery)}"</h3>
          <p class="empty-desc">กดปุ่ม 1-Click FB Extractor บนแถบบุ๊กมาร์ก หรือลากไฟล์ HTML มาวางที่นี่เพื่อดึงโพสต์ล่าสุด</p>
          <button class="btn btn-secondary" onclick="document.getElementById('reset-filters-btn').click()">ล้างตัวกรองทั้งหมด</button>
        </div>
      `;
      return;
    }

    const query = state.searchQuery.trim();
    const regex = createSearchRegex(query);

    const html = state.filteredPosts.map(post => {
      const highlightedContent = highlightText(post.content, regex);

      let commentsHtml = '';
      if (post.comments && post.comments.length > 0) {
        const commentItems = post.comments.map(c => {
          const isMatched = regex ? regex.test(c.text) : false;
          const commentTextHighlighted = highlightText(c.text, regex);
          return `
            <div class="comment-item ${isMatched ? 'matched-comment' : ''}">
              <div class="comment-author">${escapeHtml(c.authorName)}</div>
              <div class="comment-text">${commentTextHighlighted}</div>
            </div>
          `;
        }).join('');

        commentsHtml = `
          <div class="comments-section">
            <div class="comments-header">💬 ${post.comments.length} ความคิดเห็น</div>
            ${commentItems}
          </div>
        `;
      }

      const formattedDate = new Date(post.postDate).toLocaleString('th-TH', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const badgeLabel = post.isSamplePost ? '⚠️ ข้อมูลสาธิต' : '✅ โพสต์สดใหม่จาก Facebook';
      const badgeStyle = post.isSamplePost ? 'background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);' : 'background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);';

      return `
        <article class="post-card ${query ? 'highlighted-card' : ''}">
          <header class="post-header">
            <div class="author-meta">
              <a href="${escapeHtml(post.authorUrl)}" target="_blank" title="เปิดโปรไฟล์ Facebook ของ ${escapeHtml(post.authorName)}">
                <img class="author-avatar" src="${escapeHtml(post.authorAvatar)}" alt="${escapeHtml(post.authorName)}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=1877F2&color=fff'">
              </a>
              <div>
                <a href="${escapeHtml(post.authorUrl)}" target="_blank" class="author-name-link">
                  👤 ${escapeHtml(post.authorName)} ↗
                </a>
                <div class="post-timestamp">📅 ${formattedDate} • ห้องตั้งตี้หารค่าสมองกล</div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
              <span class="post-badge" style="${badgeStyle}">${badgeLabel}</span>
              <a href="${escapeHtml(post.authorUrl)}" target="_blank" class="post-badge" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); text-decoration: none;">
                👤 โปรไฟล์ผู้โพสต์ ↗
              </a>
              <a href="${escapeHtml(post.postUrl)}" target="_blank" class="post-badge" style="text-decoration: none;">
                🔗 โพสต์ Facebook ↗
              </a>
            </div>
          </header>

          <div class="post-body">${highlightedContent}</div>

          ${commentsHtml}
        </article>
      `;
    }).join('');

    DOM.postsFeed.innerHTML = html;
  }

  // Safely Highlight Target Words
  function highlightText(text, regex) {
    if (!text) return '';
    const safeText = escapeHtml(text);
    if (!regex) return safeText;

    regex.lastIndex = 0;
    return safeText.replace(regex, (match) => `<mark class="search-highlight">${match}</mark>`);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Update Statistics UI Counters
  function updateStatsUI() {
    if (DOM.statTotalPosts) DOM.statTotalPosts.textContent = state.stats.totalPosts;
    if (DOM.statMatchedPosts) DOM.statMatchedPosts.textContent = state.stats.matchedPosts;
    if (DOM.statUniqueAuthors) DOM.statUniqueAuthors.textContent = state.stats.uniqueAuthors;
    if (DOM.statMatchedComments) DOM.statMatchedComments.textContent = state.stats.totalComments;
  }

  // Render Active Filter Badges
  function updateFilterPillsUI() {
    if (!DOM.activeFiltersBar || !DOM.filterPillsContainer) return;

    const pills = [];

    if (state.searchQuery) {
      pills.push({ label: `คำค้น: "${state.searchQuery}"`, type: 'query' });
    }
    if (state.selectedAuthor !== 'all') {
      pills.push({ label: `ผู้โพสต์: ${state.selectedAuthor}`, type: 'author' });
    }
    if (state.startDate) {
      pills.push({ label: `ตั้งแต่: ${state.startDate}`, type: 'startDate' });
    }
    if (state.endDate) {
      pills.push({ label: `ถึง: ${state.endDate}`, type: 'endDate' });
    }
    if (state.commentsOnly) {
      pills.push({ label: `มีคอมเมนต์เท่านั้น`, type: 'commentsOnly' });
    }
    if (state.linksOnly) {
      pills.push({ label: `มีลิงก์เท่านั้น`, type: 'linksOnly' });
    }

    if (pills.length === 0) {
      DOM.activeFiltersBar.style.display = 'none';
      return;
    }

    DOM.activeFiltersBar.style.display = 'flex';
    DOM.filterPillsContainer.innerHTML = pills.map(p => `
      <span class="filter-pill">
        ${escapeHtml(p.label)}
        <span class="filter-pill-remove" onclick="window.removeFilter('${p.type}')">&times;</span>
      </span>
    `).join('');
  }

  window.removeFilter = function (type) {
    if (type === 'query') {
      state.searchQuery = '';
      if (DOM.searchInput) DOM.searchInput.value = '';
      if (DOM.searchClearBtn) DOM.searchClearBtn.style.display = 'none';
    } else if (type === 'author') {
      state.selectedAuthor = 'all';
      if (DOM.authorFilterSelect) DOM.authorFilterSelect.value = 'all';
    } else if (type === 'startDate') {
      state.startDate = '';
      if (DOM.startDateInput) DOM.startDateInput.value = '';
    } else if (type === 'endDate') {
      state.endDate = '';
      if (DOM.endDateInput) DOM.endDateInput.value = '';
    } else if (type === 'commentsOnly') {
      state.commentsOnly = false;
      if (DOM.commentsOnlyToggle) DOM.commentsOnlyToggle.checked = false;
    } else if (type === 'linksOnly') {
      state.linksOnly = false;
      if (DOM.linksOnlyToggle) DOM.linksOnlyToggle.checked = false;
    }
    applyFiltersAndRender();
  };

  function resetFilters() {
    state.searchQuery = 'รับคน';
    state.selectedAuthor = 'all';
    state.startDate = '';
    state.endDate = '';
    state.commentsOnly = false;
    state.linksOnly = false;

    if (DOM.searchInput) {
      DOM.searchInput.value = 'รับคน';
      if (DOM.searchClearBtn) DOM.searchClearBtn.style.display = 'block';
    }
    if (DOM.authorFilterSelect) DOM.authorFilterSelect.value = 'all';
    if (DOM.startDateInput) DOM.startDateInput.value = '';
    if (DOM.endDateInput) DOM.endDateInput.value = '';
    if (DOM.commentsOnlyToggle) DOM.commentsOnlyToggle.checked = false;
    if (DOM.linksOnlyToggle) DOM.linksOnlyToggle.checked = false;

    applyFiltersAndRender();
    showToast("รีเซ็ตตัวกรองแล้ว ค้นหาคำว่า 'รับคน' ตามเดิม", "success");
  }

  // Export Results to Excel / CSV
  function exportSearchResults() {
    if (state.filteredPosts.length === 0) {
      showToast("ไม่มีผลการค้นหาสำหรับส่งออก!", "warning");
      return;
    }

    const rows = state.filteredPosts.map(p => ({
      "ประเภท": p.isSamplePost ? "ข้อมูลสาธิต" : "โพสต์จริง",
      "กลุ่ม (Group)": "ห้องตั้งตี้หารค่าสมองกล (Google AI)",
      "ชื่อผู้โพสต์ (Author)": p.authorName,
      "ลิงก์โปรไฟล์ผู้โพสต์ (Profile URL)": p.authorUrl,
      "วันที่ (Date)": p.postDate,
      "ข้อความโพสต์ (Content)": p.content,
      "จำนวนคอมเมนต์": p.commentsCount,
      "ลิงก์โพสต์": p.postUrl
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AI_Group_Search");

    XLSX.writeFile(workbook, `FB_Group_ห้องตั้งตี้หารค่าสมองกล_Search_รับคน.xlsx`);
    showToast(`ส่งออก ${rows.length} แถวไปยังไฟล์ Excel สำเร็จ!`, "success");
  }

  // Modal Control Helpers
  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add('active');
  }

  function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('active');
  }

  // Toast Notifications
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Run Initialization on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
