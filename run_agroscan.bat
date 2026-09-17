@echo off
title AgroScan AI — Smart Crop Health & Disease Detection
echo =======================================================
echo  Starting AgroScan AI (Southern Africa Edition)
echo =======================================================
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not detected in your PATH.
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b
)

echo Launching AgroScan AI Desktop Interface...
python main.py
if %errorlevel% neq 0 (
    echo [Notice] AgroScan exited with code %errorlevel%.
    pause
)
