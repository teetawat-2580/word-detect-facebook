@echo off
title 1-Click Facebook Group Extractor (Microsoft Edge)
echo ======================================================================
echo 🤖 1-CLICK FB GROUP EXTRACTOR - FRESH LATEST POSTS
echo Group: ห้องตั้งตี้หารค่าสมองกล (Google AI)
echo Target URL: https://www.facebook.com/groups/993813573590579
echo ======================================================================
echo.
echo 1. Opening Microsoft Edge to Latest Posts feed...
start msedge "https://www.facebook.com/groups/993813573590579/?sorting_setting=CHRONOLOGICAL"
echo.
echo 2. Running Python Extractor with your Edge Session...
python auto_collector.py
pause
