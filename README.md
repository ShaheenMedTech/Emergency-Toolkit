# Emergency Toolkit

[![Emergency Toolkit Tests](https://github.com/ShaheenMedTech/Emergency-Toolkit/actions/workflows/tests.yml/badge.svg?branch=v1.3-development)](https://github.com/ShaheenMedTech/Emergency-Toolkit/actions/workflows/tests.yml)

> Emergency Medicine Point-of-Care Toolkit

A lightweight, browser-based clinical reference toolkit designed for rapid point-of-care use in Emergency Medicine.

## Overview

Emergency Toolkit brings together clinical calculators and emergency-management quick references in a single interface.

The project is designed around:

- Rapid access
- Minimal interaction
- Responsive mobile-first use
- Clear clinical grouping
- Independent modules
- Offline-friendly local deployment

> **Clinical safety:** This project is an educational and clinical reference aid. It does not replace local hospital protocols, specialist advice, or clinical judgement. Always verify drug doses, concentrations, routes, contraindications, and treatment pathways against current local guidance.

## Current Features

### Clinical Calculators

- GCS — Glasgow Coma Scale
- NEWS2 — National Early Warning Score
- Shock Index
- ABG — Acid-Base Analysis
- Infusion Calculator

### Emergency Algorithms

- Cardiac Arrest
- Sepsis
- Toxicology
- Anaphylaxis
- Acute Asthma
- COPD Exacerbation
- Acute Pulmonary Oedema
- GI Bleeding
- Acute Pancreatitis
- Acute Abdomen
- Bowel Obstruction
- Trauma
- Airway
- Breathing
- Circulation
- Disability
- Exposure
- Stroke
- Electrolytes
- Seizures / Status Epilepticus
- DKA
- ACS

### Emergency Resources

- Adult Emergency Drugs
- Paediatric Emergency Assessment

## Interface

The toolkit currently supports:

- Responsive desktop layout
- Responsive mobile layout
- Scrollable clinical modals
- Light Mode
- Dark Mode
- Touch-friendly controls
- Independent clinical modules
- Independent calculator modules

## Project Structure

```text
Emergency-Toolkit/
├── assets/
├── css/
│   └── style.css
├── js/
│   ├── algorithms/
│   │   ├── acs.js
│   │   ├── acute-abdomen.js
│   │   ├── airway.js
│   │   ├── anaphylaxis.js
│   │   ├── asthma.js
│   │   ├── bowel-obstruction.js
│   │   ├── breathing.js
│   │   ├── cardiac-arrest.js
│   │   ├── circulation.js
│   │   ├── copd.js
│   │   ├── disability.js
│   │   ├── dka.js
│   │   ├── electrolytes.js
│   │   ├── emergency-drugs.js
│   │   ├── exposure.js
│   │   ├── gi-bleeding.js
│   │   ├── paediatric.js
│   │   ├── pancreatitis.js
│   │   ├── pulmonary-oedema.js
│   │   ├── seizures.js
│   │   ├── sepsis.js
│   │   ├── stroke.js
│   │   ├── toxicology.js
│   │   └── trauma.js
│   ├── calculators/
│   │   ├── acid-base.js
│   │   ├── gcs.js
│   │   ├── infusions.js
│   │   ├── news2.js
│   │   └── shock-index.js
│   └── app.js
├── index.html
├── LICENSE
└── README.md
```
