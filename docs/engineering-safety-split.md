# Engineering extraction from PR #2

This branch isolates result invalidation and event ownership from the broader clinical changes in PR #2 (`a229252ac889c6269ce6f03c81d71616e994ffb0`).

- Editing any input invalidates dependent displayed results. Invalid recalculation also clears previous results while retaining entered values.
- GCS keeps its existing automatic change-event calculation and invalidates stale output during input changes or incomplete selections.
- ABG replacement/close removes owned listeners, restores focus and leaves detached controls inert.
- Infusions rejects unsupported unit selections and non-positive/non-finite intermediate or final arithmetic rather than displaying invalid numerical output.

Existing accepted numerical input ranges, clinical formulas, score/risk thresholds, GCS options and interpretation messages, ABG compensation and oxygen wording, Shock Index rounding, and infusion fixed-decimal display remain as in main. Their preservation does not establish clinical validity.

The following remain outside this extraction: extended GCS NT choices, altered GCS maximum-score wording, NEWS2 fractional-input policy, Shock Index boundary display, ABG oxygenation wording and Winter display/number policy, layout restyling, and the full clinical decision register in #2.

Infusion display precision is a separate dependent proposal. Existing fixed-decimal rounding defects are not resolved by this engineering branch.

Tests exercise result transitions, input preservation, invalid recalculation, reset/reopen and ABG listener/focus lifecycle. They verify software behavior rather than clinical acceptance.
