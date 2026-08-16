/**
 * Facebook Private Group Word Search - Core Application Engine
 * Configured specifically for Group: 993813573590579 & Keyword: "รับคน"
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
    dropzone: document.getElementById('file-dropzone'),
    fileInput: document.getElementById('file-input'),
    rawTextInput: document.getElementById('raw-text-input'),
    submitRawTextBtn: document.getElementById('submit-raw-text-btn'),
    loadSampleDataBtn: document.getElementById('load-sample-data-btn'),
    exportBtn: document.getElementById('export-results-btn'),
    toastContainer: document.getElementById('toast-container')
  };

  // Initialize Application
  function init() {
    bindEvents();

    if (DOM.searchInput) {
      DOM.searchInput.value = state.searchQuery;
      if (DOM.searchClearBtn) DOM.searchClearBtn.style.display = 'block';
    }

    // Load sample data if available
    if (window.SAMPLE_FB_GROUP_DATA && window.SAMPLE_FB_GROUP_DATA.posts) {
      loadDataset(window.SAMPLE_FB_GROUP_DATA.posts, "Group 993813573590579 Dataset");
    }
  }

  // Bind Event Listeners
  function bindEvents() {
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
          loadDataset(window.SAMPLE_FB_GROUP_DATA.posts, "Group 993813573590579 Dataset");
          closeModal(DOM.importModal);
          showToast("โหลดข้อมูลกลุ่ม 993813573590579 เรียบร้อยแล้ว!", "success");
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
    state.posts = postsArray.map((p, index) => ({
      id: p.id || `post_${Date.now()}_${index}`,
      authorName: p.authorName || p.author || 'สมาชิกกลุ่ม 993813573590579',
      authorAvatar: p.authorAvatar || getAvatarPlaceholder(p.authorName || 'User'),
      postDate: p.postDate || p.date || new Date().toISOString(),
      postUrl: p.postUrl || 'https://www.facebook.com/groups/993813573590579',
      content: p.content || p.text || p.message || '',
      reactionsCount: p.reactionsCount || p.likes || 0,
      commentsCount: (p.comments ? p.comments.length : (p.commentsCount || 0)),
      hasLinks: p.hasLinks || (p.content && p.content.includes('http')),
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

        // Common FB DOM Selectors for saved group pages
        const postContainers = doc.querySelectorAll('[role="feed"] > div, [data-pagelet^="FeedUnit"], .userContentWrapper, div[dir="auto"]');

        if (postContainers.length === 0) {
          const textBlocks = doc.querySelectorAll('div[dir="auto"], span[dir="auto"]');
          let idCounter = 1;
          textBlocks.forEach(el => {
            const txt = el.textContent.trim();
            if (txt.length > 25 && !txt.includes('Comment') && !txt.includes('Like')) {
              extractedPosts.push({
                id: `html_p_${idCounter++}`,
                authorName: 'สมาชิกกลุ่ม 993813573590579',
                content: txt,
                postDate: new Date().toISOString(),
                postUrl: 'https://www.facebook.com/groups/993813573590579',
                comments: []
              });
            }
          });
        } else {
          let idCounter = 1;
          postContainers.forEach(container => {
            const textEl = container.querySelector('[dir="auto"]') || container;
            const content = textEl ? textEl.textContent.trim() : '';
            const authorEl = container.querySelector('h2, h3, strong, a[href*="/user/"], a[href*="/groups/"]');
            const authorName = authorEl ? authorEl.textContent.trim() : 'สมาชิกกลุ่ม 993813573590579';

            if (content.length > 15) {
              extractedPosts.push({
                id: `html_fb_${idCounter++}`,
                authorName: authorName,
                content: content,
                postDate: new Date().toISOString(),
                postUrl: 'https://www.facebook.com/groups/993813573590579',
                comments: []
              });
            }
          });
        }

        if (extractedPosts.length > 0) {
          loadDataset(extractedPosts, file.name);
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
          const dateKey = keys.find(k => /date|time|created|วันที่/i.test(k));
          const urlKey = keys.find(k => /url|link|ลิงก์/i.test(k));

          return {
            id: `excel_${idx}`,
            authorName: authorKey ? String(row[authorKey]) : 'สมาชิกกลุ่ม 993813573590579',
            content: contentKey ? String(row[contentKey]) : '',
            postDate: dateKey ? String(row[dateKey]) : new Date().toISOString(),
            postUrl: urlKey ? String(row[urlKey]) : 'https://www.facebook.com/groups/993813573590579',
            comments: []
          };
        }).filter(p => p.content.trim().length > 0);

        loadDataset(extractedPosts, file.name);
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
        loadDataset(postsArray, file.name);
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
    parseRawTextString(text, "ข้อความที่วาง");
    DOM.rawTextInput.value = '';
    closeModal(DOM.importModal);
  }

  function parseRawTextString(text, sourceName) {
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 5);
    const posts = paragraphs.map((p, idx) => ({
      id: `raw_${idx}`,
      authorName: 'ข้อความที่คัดลอกมา',
      content: p.trim(),
      postDate: new Date().toISOString(),
      postUrl: 'https://www.facebook.com/groups/993813573590579',
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

  // Render Post Feed with Word Highlighting
  function renderFeed() {
    if (!DOM.postsFeed) return;

    if (state.filteredPosts.length === 0) {
      DOM.postsFeed.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">ไม่พบโพสต์ที่ตรงกับคำค้นหา "${escapeHtml(state.searchQuery)}"</h3>
          <p class="empty-desc">ลองเปลี่ยนคำค้นหา หรือกดล้างตัวกรองทั้งหมดเพื่อแสดงโพสต์ทั้งหมดในกลุ่ม 993813573590579</p>
          <button class="btn btn-secondary" onclick="document.getElementById('reset-filters-btn').click()">ล้างตัวกรองทั้งหมด</button>
        </div>
      `;
      return;
    }

    const query = state.searchQuery.trim();
    const regex = createSearchRegex(query);

    const html = state.filteredPosts.map(post => {
      const highlightedContent = highlightText(post.content, regex);

      // Comments rendering
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

      return `
        <article class="post-card ${query ? 'highlighted-card' : ''}">
          <header class="post-header">
            <div class="author-meta">
              <img class="author-avatar" src="${escapeHtml(post.authorAvatar)}" alt="${escapeHtml(post.authorName)}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(post.authorName)}&background=1877F2&color=fff'">
              <div>
                <div class="author-name">${escapeHtml(post.authorName)}</div>
                <div class="post-timestamp">📅 ${formattedDate} • Group 993813573590579</div>
              </div>
            </div>
            <a href="${escapeHtml(post.postUrl)}" target="_blank" class="post-badge" style="text-decoration: none;">
              🔗 เปิดใน Facebook ↗
            </a>
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
      "กลุ่ม (Group)": "https://www.facebook.com/groups/993813573590579",
      "ผู้โพสต์ (Author)": p.authorName,
      "วันที่ (Date)": p.postDate,
      "ข้อความโพสต์ (Content)": p.content,
      "จำนวนคอมเมนต์": p.commentsCount,
      "ลิงก์โพสต์": p.postUrl
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FB_Group_Search");

    XLSX.writeFile(workbook, `FB_Group_993813573590579_Search_รับคน.xlsx`);
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
