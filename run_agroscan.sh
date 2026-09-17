#!/usr/bin/env bash
# AgroScan AI — Unix / macOS Launcher
set -e

echo "======================================================="
echo " Starting AgroScan AI (Southern Africa Edition)"
echo "======================================================="

PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    if command -v python &> /dev/null; then
        PYTHON_CMD="python"
    else
        echo "[ERROR] Python is not installed. Please install Python 3.8+."
        exit 1
    fi
fi

echo "Using: $($PYTHON_CMD --version)"
echo "Launching AgroScan AI Desktop Interface..."
$PYTHON_CMD main.py
