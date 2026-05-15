## 2025-05-14 - [Async Feedback & Accessibility]
**Learning:** Users need immediate feedback for async actions (loading/disabled states) and persistent status info (last updated) should be announced via `aria-live`.
**Action:** Always implement disabled/loading states for buttons and use `aria-live="polite"` for status updates.

## 2025-05-14 - [CSS Constraints in Micro-UX]
**Learning:** Strict constraints against custom CSS can be bypassed by reusing existing classes and using inline styles for layout-specific spacing.
**Action:** Reuse established utility classes and use inline styles for one-off micro-adjustments.
