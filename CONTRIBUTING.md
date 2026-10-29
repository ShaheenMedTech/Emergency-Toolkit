# Contributing to Emergency Toolkit

Start from the current `main` branch and keep each pull request focused on one change. Check existing issues and pull requests first; development branches may contain work that is not yet approved for production.

## Validation

Run the existing structural checks:

```sh
python3 tests/smoke-test.py
```

Check JavaScript syntax with Node.js:

```sh
for file in js/*.js js/algorithms/*.js js/calculators/*.js; do
  node --check "$file"
done
```

For interface changes, serve the project locally and verify the affected calculator or modal on desktop and mobile, including light and dark modes. Use synthetic data only.

These checks verify structure and syntax. They do not validate clinical recommendations, formulas, doses, or patient safety. Changes to clinical behavior need appropriate clinical review, authoritative references, and tests covering normal values, boundary conditions, invalid inputs, and units before production use. A passing CI run alone is not clinical approval.

## Pull requests

Describe the problem, change, validation performed, and any remaining limitations. Include synthetic examples and screenshots when useful. Do not include real patient data, credentials, or confidential institutional information. Follow [SECURITY.md](SECURITY.md) for sensitive reports.

Contributions are distributed under the repository's [MIT License](LICENSE).
