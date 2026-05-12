## 2025-05-12 - Neutral State for Price Changes
**Learning:** In financial trackers, tiny price changes (e.g., 0.004%) can round to "0.00%" but might still trigger "positive" or "negative" styles if the raw value is used. For consistent UX, the visual style (color/icons) should match the displayed rounded value.
**Action:** Use `parseFloat(value.toFixed(2))` to determine if a change should be treated as neutral (0.00%) before applying conditional classes or directional icons.
