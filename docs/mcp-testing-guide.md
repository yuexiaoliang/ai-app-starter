# MCP Testing Guide

> This document guides Agents on when and how to use the chrome-devtools MCP for auxiliary verification.
> MCP spot checks **do not replace** Playwright E2E; they are only used as supplementary validation in specific scenarios.

---

## Applicable Scenarios

The following scenarios are suitable for MCP spot checks:

| Scenario | Reason | Example |
| --- | --- | --- |
| Visual Detail Verification | Playwright struggles to assert visual effects (animations, transitions, colors) | Whether the page flickers during theme toggle, whether the drawer has a slide-in animation |
| Network Request Inspection | Need to verify request headers, response bodies, timing | Confirm whether `x-api-key` header is correctly attached, whether CORS preflight passes |
| Complex Interaction Debugging | Multi-step interactions are hard to stably describe in code | Mobile gestures, drag-and-drop, long-press, etc. |
| Problem Diagnosis | Quickly identify root cause when E2E fails | When E2E assertion fails, use MCP screenshot + console check to confirm actual state |

## Inapplicable Scenarios

The following scenarios **should not** use MCP:

- Routine page path regression (use Playwright)
- Form submission success/failure states (use Playwright)
- Data correctness validation (use unit tests)

---

## Standard Checklist

### Homepage Health Status Panel

1. Start both frontend and backend services
2. Navigate to homepage, take screenshot to confirm:
   - [ ] Health status dot is green / connected
   - [ ] Version number matches `@repo/config`'s `APP_VERSION`
3. Stop the server, click manual refresh
4. Take screenshot to confirm:
   - [ ] Health status dot turns red / not connected

### Theme Toggle

1. Open homepage, take screenshot of current theme
2. Click theme toggle button
3. Take screenshot to confirm:
   - [ ] Page light/dark mode switches
   - [ ] No flickering or layout jitter
4. Refresh the page
5. Take screenshot to confirm theme persists

### Settings Page Form

1. Navigate to settings page
2. Enter an invalid URL (e.g. `not-a-url`)
3. Take screenshot to confirm:
   - [ ] Input border turns red or error prompt appears
   - [ ] Test connection button is disabled
4. Clear input, enter a valid server address
5. Click test connection
6. Take screenshot to confirm:
   - [ ] Status shows "Connected"

### Mobile Navigation

1. Switch to mobile viewport (`375x667`)
2. Take screenshot to confirm:
   - [ ] Drawer button appears in top navigation bar
   - [ ] Desktop navigation links are hidden
3. Click drawer button
4. Take screenshot to confirm:
   - [ ] Drawer slides out from the left
   - [ ] Contains navigation links
5. Click a navigation link
6. Take screenshot to confirm:
   - [ ] Page navigation succeeds
   - [ ] Drawer automatically closes

---

## Operating Standards

1. **Screenshot first**: Take a screenshot after each key interaction, as verification evidence
2. **Console check**: When encountering anomalies, check the browser console and record error messages
3. **Network panel**: When verifying API requests, open the network panel to confirm request headers and response status
4. **Minimize operations**: Each spot check focuses on one functional point; avoid mixing multiple steps which makes diagnosis difficult
