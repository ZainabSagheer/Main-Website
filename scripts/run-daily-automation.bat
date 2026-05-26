@echo off
cd /d "d:\BITSOL Marketing Private Limited\bitsol-frontend"
node scripts\daily-content-automation.mjs >> scripts\logs\scheduler.log 2>&1
