## 2025-05-09 - [Trend Indicator Neutral States]
**Learning:** Binary trend indicators (up/down) can be misleading for neutral data (e.g., 0.00% change). UX clarity is improved by omitting arrows and color coding for zero values.
**Action:** Always implement a three-way check (positive, negative, zero) for trend indicators to ensure visual accuracy.

## 2025-05-09 - [Handling Synchronous State Updates in useEffect]
**Learning:** The `react-hooks/set-state-in-effect` rule prevents synchronous state updates during the render phase.
**Action:** Wrap initial data fetching in an asynchronous IIFE or an asynchronous guard within `useEffect` to ensure state updates happen after the initial render and satisfy linting requirements without using `setTimeout`.
