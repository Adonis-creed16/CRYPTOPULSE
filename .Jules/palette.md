## 2025-05-15 - Accessible Status Updates
**Learning:** Using `aria-live="polite"` on a status bar that displays the "Last updated" time ensures that screen reader users are notified when data refreshes without interrupting their current task.
**Action:** Always wrap dynamic metadata like timestamps or status messages in an `aria-live` region.

## 2025-05-15 - Visual Scannability with Trend Cues
**Learning:** Adding visual trend indicators (▲/▼) alongside color cues (positive/negative) significantly improves data scannability, but neutral states (0.00%) should remain distinct (no arrow, neutral color) to avoid clutter and confusion.
**Action:** Implement trend arrows for directional data and ensure a clear neutral state.
