// Baseline snapshots from ABG-INTERPRETATION-SAFETY-SPEC.md at fd26613.
// NOT clinically approved diagnostic expectations. No classification logic here.
(function () {
    const reference = "pH within reference range — assess for compensated or mixed disorder";
    const mixedAcid = "Acidaemia — mixed or partially compensated disorder";
    const mixedAlk = "Alkalaemia — mixed or partially compensated disorder";
    const none = "No specific compensation formula applied.";
    const fixtures = {
        ids: ["abgPH", "abgPCO2", "abgHCO3", "abgPaO2", "abgNa", "abgCl"],
        examples: [
            { id: "E1", inputs: ["7.40", "20", "12", "80", "140", "100"], gap: "28.0", primary: reference, compensation: none, pending: "D02,D04: normal-pH mixed-disorder limitation" },
            { id: "E2", inputs: ["7.52", "15", "12", "80", "140", "100"], gap: "28.0", primary: "Respiratory alkalosis", compensation: none, pending: "D02,D04,D07: alkalemic mixed-disorder limitation" },
            { id: "E3", inputs: ["7.46", "70", "48", "80", "140", "90"], gap: "2.0", primary: "Metabolic alkalosis", compensation: none, pending: "D05: compensation not assessed" },
            { id: "E4", inputs: ["7.28", "60", "27", "80", "140", "105"], gap: "8.0", primary: "Respiratory acidosis", compensation: none, pending: "D06: acute/chronic context absent" },
            { id: "E5", inputs: ["7.33", "42", "21.8", "80", "140", "100"], gap: "18.2", primary: mixedAcid, compensation: "Appropriate respiratory compensation. Expected PaCO₂ interval 38.7–42.7 mmHg (inclusive)", pending: "D03: primary/compensation ambiguity" },
            { id: "E6", inputs: ["7.40", "80", "12", "80", "140", "105"], gap: "23.0", primary: reference, compensation: none, pending: "D08,D09: inconsistent inputs accepted; not an approved diagnosis" },
            { id: "E7", inputs: ["7.29", "32.63", "15.1", "80", "140", "110"], gap: "14.9", primary: "Metabolic acidosis", compensation: "Appropriate respiratory compensation. Expected PaCO₂ interval 28.65–32.65 mmHg (inclusive)", pending: "D15: presentation review remains pending" },
            { id: "E8", inputs: ["7.33", "42.85", "21.9", "80", "140", "105"], gap: "13.1", primary: mixedAcid, compensation: "Additional respiratory acidosis. Expected PaCO₂ interval 38.849999999999994–42.849999999999994 mmHg (inclusive)", pending: "D15,D16: readability and binary-decimal boundary semantics" },
            { id: "E9", inputs: ["7.30", "30", "15", "", "140", "110"], alert: "Please enter a valid PaO₂.", pending: "D13: PaO₂ remains mandatory" }
        ],
        // Independent precomputed rational mathematical endpoints; source arithmetic
        // is checked separately from baseline diagnosis/gating snapshots.
        winterReferences: [
            { hco3: "1", lower: "7.5", upper: "11.5" },
            { hco3: "9.25", lower: "19.875", upper: "23.875" },
            { hco3: "12", lower: "24", upper: "28" },
            { hco3: "15.1", lower: "28.65", upper: "32.65" },
            { hco3: "15.25", lower: "28.875", upper: "32.875" },
            { hco3: "21.8", lower: "38.7", upper: "42.7" },
            { hco3: "21.9", lower: "38.85", upper: "42.85" }
        ],
        // Each row is [pH, PaCO2, HCO3, literal baseline primary label].
        // These synthetic boundary combinations need not be physiologically coherent.
        primaryBoundaries: [
            ["7.349999", "26", "12", "Metabolic acidosis"],
            ["7.35", "26", "12", reference], ["7.350001", "26", "12", reference],
            ["7.449999", "26", "12", reference], ["7.45", "26", "12", reference],
            ["7.450001", "26", "12", "Respiratory alkalosis"],
            ["7.30", "40", "21.999999", "Metabolic acidosis"],
            ["7.30", "40", "22", mixedAcid], ["7.30", "40", "22.000001", mixedAcid],
            ["7.30", "60", "21.999999", mixedAcid],
            ["7.30", "60", "22", "Respiratory acidosis"], ["7.30", "60", "22.000001", "Respiratory acidosis"],
            ["7.50", "40", "25.999999", mixedAlk], ["7.50", "40", "26", mixedAlk],
            ["7.50", "40", "26.000001", "Metabolic alkalosis"],
            ["7.50", "30", "25.999999", "Respiratory alkalosis"], ["7.50", "30", "26", "Respiratory alkalosis"],
            ["7.50", "30", "26.000001", mixedAlk],
            ["7.50", "34.999999", "24", "Respiratory alkalosis"],
            ["7.50", "35", "24", mixedAlk], ["7.50", "35.000001", "24", mixedAlk],
            ["7.30", "39.999999", "20", "Metabolic acidosis"], ["7.30", "40", "20", "Metabolic acidosis"],
            ["7.30", "40.000001", "20", mixedAcid],
            ["7.50", "39.999999", "30", mixedAlk], ["7.50", "40", "30", "Metabolic alkalosis"],
            ["7.50", "40.000001", "30", "Metabolic alkalosis"],
            ["7.30", "44.999999", "24", mixedAcid], ["7.30", "45", "24", mixedAcid],
            ["7.30", "45.000001", "24", "Respiratory acidosis"]
        ]
    };
    if (typeof module !== "undefined" && module.exports) module.exports = fixtures;
    else globalThis.ABGBaselineFixtures = fixtures;
})();
