# PWA Improvements - fix/pwa-index-update

This document describes the PWA improvements made to index.html for better installability and debugging on GitHub Pages.

## Changes Made

### 1. Absolute Paths for Resources
- **Manifest**: Updated to `/SZN-budget/manifest.json` (line 8 in index.html)
- **Service Worker**: Updated to `/SZN-budget/service-worker.js` (line 202 in index.html)
- **Rationale**: Ensures resources resolve correctly when deployed on GitHub Pages at `https://{username}.github.io/SZN-budget/`

### 2. Exposed Install Prompt for Debugging
- **Global Variable**: `window.deferredPWAPrompt` (line 145 in index.html)
- **Usage**: Developers can manually trigger the install prompt from the browser console
- **Command**: `window.deferredPWAPrompt.prompt()`
- **Rationale**: Enables testing and debugging of the PWA install functionality

### 3. Service Worker Registration Timing
- **Implementation**: Wrapped in `window.addEventListener('load', ...)` (lines 200-212)
- **Rationale**: Prevents race conditions and ensures the service worker registers with the correct scope after the page fully loads

### 4. Absolute Path in PWA Status Check
- **Fetch URL**: `fetch('/SZN-budget/manifest.json')` (line 125)
- **Rationale**: Ensures the manifest validation check works correctly on GitHub Pages

### 5. Preserved Existing UI
All existing functionality remains intact:
- PWA status badges (Service Worker, Manifest, HTTPS, Installable)
- Install App button
- Test Offline Mode button  
- View Cache button
- Unregister Service Worker button
- Testing information section

## Testing Steps

1. **Deploy to GitHub Pages**
   ```
   https://{username}.github.io/SZN-budget/
   ```

2. **Verify Service Worker Registration**
   - Open DevTools > Application > Service Workers
   - Confirm service worker is registered

3. **Check Manifest Loading**
   - Open DevTools > Application > Manifest
   - Verify manifest.json loads without errors

4. **Test Install Prompt**
   - Open DevTools > Console
   - Type: `window.deferredPWAPrompt`
   - Should return the install prompt event object (if available)
   - Manually trigger: `window.deferredPWAPrompt.prompt()`

5. **Verify Offline Functionality**
   - Open DevTools > Network
   - Select "Offline" mode
   - Reload the page
   - Confirm the app still loads from cache

6. **Test All Buttons**
   - Click "Install App" (if shown)
   - Click "Test Offline Mode" - should show instructions
   - Click "View Cache" - should log cache contents to console
   - Click "Unregister Service Worker" - should unregister and reload

## Browser Compatibility

- Chrome/Edge: Full support for PWA install
- Firefox: Service worker and offline support (install prompt limited)
- Safari: Service worker support (install requires "Add to Home Screen")

## Technical Details

- **Manifest Scope**: `/SZN-budget/`
- **Service Worker Scope**: `/SZN-budget/`
- **Cache Name**: `szn-budget-v1`
- **Precached Resources**: index.html, manifest.json, icon files

## Future Improvements

- Add offline fallback page
- Implement background sync for budget data
- Add push notification support
- Optimize caching strategy for better performance
