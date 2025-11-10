@echo off
title Knowledge Graph Job Search Explorer
echo.
echo ========================================
echo   Knowledge Graph Job Search Explorer
echo ========================================
echo.
echo Starting the application...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart your computer and try again.
    echo.
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not available
    echo.
    echo Please ensure npm is properly installed with Node.js
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies (this may take a few minutes)...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install dependencies
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

echo Starting development server...
echo.
echo The application will open in your default browser.
echo If it doesn't open automatically, go to: http://localhost:5173
echo.
echo To stop the server, press Ctrl+C in this window.
echo.

REM Start the development server
npm run dev

echo.
echo Server stopped.
pause
