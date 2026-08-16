# 🔍 Facebook Private Group Word Search & Detector Web App

A modern, high-performance web application designed to search, filter, and detect specific words, sentences, or regular expressions across Facebook Private Group posts and comments with instant visual keyword highlighting.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## 🌟 Features

- **Multi-Format Ingestion**:
  - **Saved Facebook HTML Pages**: Save any Facebook Private Group feed page using `Ctrl + S` in Google Chrome or Edge and drop the `.html` file into the app.
  - **Excel & CSV Import**: Read `.xlsx`, `.xls`, or `.csv` files containing exported post text, authors, timestamps, and comments.
  - **Copy-Paste Raw Text**: Import raw text directly into the text editor.
  - **Sample Dataset**: Built-in sample Facebook group data for instant demonstration.

- **Deep Search & Regex Engine**:
  - **Exact Phrase Matching**: Search for exact sentences (e.g. `"looking for recommendation"`).
  - **Keyword Search**: Match any or all specified keywords.
  - **Regular Expression (Regex)**: Supports custom regex patterns (e.g. `\b(price|cost|buy)\b`).
  - **Visual Highlighting**: High-contrast glowing amber/yellow highlights around matching terms in posts and comments.

- **Filters & Analytics**:
  - Real-time statistics counters (Total Posts, Matched Results, Unique Authors, Matched Comments).
  - Author filter dropdown.
  - Date Range pickers (Start Date / End Date).
  - Toggles for *Case Sensitivity*, *Whole Word Match*, *Posts with Comments*, and *Contains Links*.

- **Export Engine**:
  - Export filtered search results into clean Excel (`.xlsx`) files with one click.

---

## 🚀 Quick Start

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/teetawat-2580/word-detect-facebook.git
   cd word-detect-facebook
   ```

2. **Run Locally**:
   You can serve the web app using any simple HTTP server. For Python:
   ```bash
   python -m http.server 8080
   ```

3. **Open in Browser**:
   Navigate to [http://localhost:8080](http://localhost:8080).

---

## 💡 How to Import Facebook Private Group Data

Since Facebook restricts direct API scraping of private group feeds, this app uses client-side ingestion:

1. Open your **Facebook Private Group** in Google Chrome or Edge.
2. Scroll down to load the posts you want to index.
3. Press <kbd>Ctrl</kbd> + <kbd>S</kbd> (or <kbd>Cmd</kbd> + <kbd>S</kbd> on Mac) to save the page as **Webpage, Complete** or **Webpage, HTML Only**.
4. Open the Web App, click **Import Data**, and drop your saved `.html` file into the upload zone!

---

## 🛠️ Project Structure

```
word-detect-facebook/
├── index.html       # Main single-page interface layout
├── styles.css       # Dark mode glassmorphism UI & highlight styles
├── app.js           # Search engine, parsers, filters & export logic
├── sample_data.js   # Pre-packaged sample group dataset
├── .gitignore       # Git ignore config
└── README.md        # Documentation
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
