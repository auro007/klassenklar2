# Learning coverage review — 4 October 2026

## Delivered

37 lessons, 118 multiple-choice questions and 43 flashcards across all seven topics.

## Requirement map — current audit

| Requirement from supplied material / statutory training framework | Implemented lesson IDs | Evidence and limit |
|---|---|---|
| Classification, MFA and S–P/M/V | basics-role, classes, classes-boundaries | Source-linked text, boundary questions and calculator checks |
| Anatomy, directions, tissues and cuts | anatomy, anatomy-cuts | Text and image references; practical identification still requires trainer assessment |
| ZP measurement, formula and tolerances | zp, zp-calculation | Worked calculations and mapped practice; actual measurement is practical |
| Optical probes, reflection, F* | equipment-principles, probe-measurement, probe-reference | Uploaded booklet reference images and dated device values |
| OptiGrade MCP | optigrade-mcp | Length/reflection/software/position checks, source images, diagram and browser-tested practice |
| A/B scan and handheld ultrasound | equipment-principles, handheld-ultrasound | Principles and supplied historical controls; omitted manual table remains explicitly missing |
| AutoFOM I/III | autofom-system, morning-control, autofom-software, autofom-hardware, autofom-environment, autofom-calculation | All supplied inspection areas, checksum conflict, 16-head controls, part-weight examples and diagrams |
| Presentation and cutting | cutting, cutting-errors | Standard/special presentation, approved deviations, error cases and practice |
| Weighing and documentation | weighing, records, supplier-information | Timing, tare diagram, identity, fields, retention and separate disclosure deadlines |
| Slaughter technology and hygiene | slaughter-hygiene | Process/check diagrams and hygiene distinctions; practical hygiene plan is site-specific |
| Industry institutions and personal approval | institution-roles, classifier-approval | Official sources and targeted questions |
| Prices and reporting | payment-models, price-reporting | Illustrative payment example; statutory reporting rules and weighted-price calculation |
| Animal traffic, traceability and food law extracts | traceability, food-law | Source-linked introductory extracts and cases; does not claim every locally selected legal excerpt |
| Practical/theoretical exam preparation | statutory-exam, exam-map, exam-rehearsal | National framework, study sequence and complete oral case; local examiner scope unprovided |
| Learning aids and application flows | app.js, check-learning.cjs, tests/smoke.mjs | Questions/cards, topic-balanced practice, progress, MFA calculator, account/role/PWA checks |

Completion of every possible local exam requirement is **not proven**. Needed external evidence is the examiner's selected course scope, current installation approval/instructions, and practical trainer assessment. Missing source pages 25–26 and 37–38 remain recorded below. Counts and passing code checks do not establish practical competence.

| Topic | Lessons | Covered content |
|---|---:|---|
| Grundlagen | 13 | Role, study sequence, responsibilities, marking, quality vs class, price masks and part-weight points |
| Handelsklassen | 2 | S–P boundaries, M/V categories, weight range, percentages |
| Anatomie | 2 | Directions, regions, cuts, tissue, measurement muscles; existing picture references |
| ZP-Verfahren | 2 | Eligibility, anatomical measurement points, formula, examples, tolerances |
| FOM-Gerät | 13 | Optical/A-/B-scan principles, probes, F*, dated handheld reference values, ultrasound image checks, AutoFOM I/III hardware/software, environment, verification, part weights |
| Schnittführung | 2 | German weighing presentation, special categories, deviations, splitting and error scenarios |
| Verwiegung | 3 | Warm weighing, timing, tare, identification, EU reporting cold-weight calculation, records and retention |

## Evidence and source status

- German legal details checked against linked official sources: SchwHKlV §§ 2–4 and Annexes 1–3; 1. FlGDV §§ 1–3; MessEV § 34 and Annex 7; EU 2017/1182 Articles 7 and 14.
- Equipment examples summarized from user photographs. The inspection manual is dated 14 March 2016; approval tables are dated 7 December 2020. Supplemental photographs include other editions and handouts.
- Conflicting AutoFOM I RCS values are explicitly flagged. Do not combine device/CD editions or use historical revisions as current installation requirements.
- More precise part-weight factors from the worked handout are distinguished from rounded summary-table factors.
- Missing pages 25–26 and 37–38 of the equipment manual remain missing; similarly numbered pages of another booklet do not replace them.
- No official exam syllabus was provided. This is coverage of the supplied material and verified core rules, not confirmation of every possible exam requirement.
- Site-specific approval, current installed software and practical assessment must be confirmed against the actual equipment and trainer requirements.

## Verification

- Syntax checks: app.js, equipment.js, curriculum.js and sw.js passed.
- `node check-learning.cjs`: unique IDs, four distinct answer options per question, valid answer indices, explanations, topic coverage, table shapes and worked calculations passed.
- Browser: app reload shows 26 lessons; topic lists show new units; presentation lesson renders expanded text, table and official source links; new presentation practice question accepts the correct answer and displays its explanation.
- One demo answer was recorded during browser verification; real learner records were not used.
- Practical competence and exact examination completeness cannot be checked by these automated checks.

## Reproduce content checks

Run `node check-learning.cjs` from the project directory.

## Study flow improvements

- Progress includes a topic checklist linking to the next unread lesson.
- Mixed practice uses shuffled topic buckets, ensuring all seven topics occur when at least seven questions are requested.
- Text-only practice retains anatomy text questions; only the two existing illustration questions use the poster.
- Practical checks include presentation, morning controls, software checks and responses to measurement errors, with matching server validation.

- Added an interactive MFA calculator under Mehr: ZP and probe formula, substitution steps, class assignment and independent exercises. Browser confirmed 16/60 yields 56.98142 % and E for ZP.
- Restarted the verified workspace server on port 4173 to load practical-check changes.

## Integrated review

Added a 27th lesson: a complete spoken case rehearsal covering device checks, presentation, measurement, calculations, weighing, identity, documentation and escalation. Worked values use the already verified lesson formulas.

- Audited legacy questions: replaced app-description items with ZP anatomy and cranial direction; corrected flashcard protocol-field count.
- Flashcards now actually filter new/due cards using stored dates, with an explicit all-cards option and finished-review state.

## Confirmed practical device: OptiGrade MCP

User confirmed OptiGrade MCP. Dedicated lesson, eight questions and four cards added. Covers optics, configuration, seals, lengths, reflection, software identity, measurement-position controls and documentation. Manual examples remain dated 2016; page 23 controls are attributed to the supplementary booklet. Two original uploaded spread photos are linked from lessons for measurement-site and reflection-curve study.

## Supplied PDF review

- Gescanntes Dokument(1).pdf: 31 image pages, cover Kulmbach 2025, body inspection pages dated 2016. Printed pages 25–26 and 37–38 are still absent.
- Both Textfassung PDFs: 40 pages and identical extracted text, script filename dated 2020-02-10. OCR has errors, including software identifiers; confirm exact symbols from original device manual.
- Added visually verified OptiGrade length-test sequence from PDF page 10 / printed page 13, restart control requirement, two source-page images, two questions and two flashcards.

## Supplied PDF review

- The two text PDFs contain the same extracted content (40 pages, edition 2020); counted as one source.
- Scanned PDF: 31 image pages. OptiGrade length-check and reflection-check instructions were read visually; original page images are embedded in the lesson.
- Added payment-model lesson from text pages 35–36 with explicitly invented exercise prices and no current-market-price claim.
- Latest content check: 29 lessons, 99 questions, 35 cards; structure, formulas, topic sampling and due-card selection passed.


## Statutory examination framework

- Verified 2. FlGDV section 7 and Annexes 1–2 against official sources. Added practical sample counts, exam components, tolerance/sample distinctions and training-topic map.
- Corrected probe exit reference to the outer edge of the vertebral body.
- No local examination plan was supplied; a national statutory framework is now linked. Remaining audit areas include slaughter technology, hygiene, branch institutions, price-reporting and supplier disclosure rules.
- Latest content check: 30 lessons, 102 questions, 36 cards passed. Browser verification of latest units remains pending.


## Browser verification of latest material

- Preview reload shows 30 lessons. Grundlagen lists seven units including payment models and statutory exam framework.
- OptiGrade lesson renders nine sections, corrected exit-position reference, historical-value table and three full-size image links. DOM confirmed all three reference images loaded successfully.
- Statutory exam unit renders both official annex links and sample-size/tolerance explanations.
- Payment lesson renders the illustrative 180/198-Euro calculation and source-edition label.
- Read-only lesson navigation used the demo account; no completion or answer records were changed in this check.


## Slaughter technology and hygiene

- Added slaughter-line stages, early AutoFOM measurement versus later weighing, data identity, cross-contamination, hygiene-plan responsibilities and separation of measurement checks from hygiene.
- Official administrative hygiene guidance verified; EUR-Lex consolidated full text was blocked by a JavaScript challenge. No unverified numeric disinfection parameters were added.
- Three questions and one card added. Content checks passed at 31 lessons, 105 questions, 37 cards. New hygiene unit browser check remains pending.


## Classifier qualification

- Verified FlG section 4 and 2. FlGDV section 15. Added approval prerequisites, independence, identification/stamp requirements, course durations, continuing-training interval and repeat-examination consequences.
- Added three questions and one card. Current content checks pass: 32 lessons, 108 questions, 38 cards.
- Approval and hygiene units still need rendered browser inspection. No practical approval is claimed by the app.


## Price reporting and visual learning

- Verified 1. FlGDV sections 5–8. Added reporting exemptions, weight-weighted prices, units, reporting periods, correction duty, retention and authority roles.
- User requested illustrations where useful. Added two scalable labelled diagrams to the hygiene lesson: slaughter-line data flow and measurement-check versus hygiene-check comparison. Original source images remain available in device and anatomy lessons.
- Current checks: 33 lessons, 110 questions, 39 cards. New illustrations require visual browser inspection.


- Added and browser-inspected OptiGrade check-mode comparison diagram. Values and labels render without clipping in the current lesson width; diagram can be opened at full size. Saved optigrade-illustration-preview.png.


- Added weighing illustration for Brutto minus Tara equals Netto, using the lesson's 101.2 minus 2.4 equals 98.8 kg example. Browser inspection remains pending.
- Extended content checks to verify all lesson figure files exist and SVG illustrations include a title, description and scalable viewBox. Checks pass.


## Supplier disclosure audit

- Verified FlG section 10 and 1. FlGDV section 11. Added separate applicant deadline, response timing and slaughterhouse price-information duties; corrected the older brochure's simplified 15-day statement in a dedicated lesson.
- Two questions and one card added. Current content checks pass at 34 lessons, 112 questions, 40 cards. Rendered inspection remains pending.


## Latest runtime check

- Isolated smoke checks passed for PWA shell, account registration, invite joining, learner progress, role enforcement, group isolation and practical confirmation.
- Running preview shows 34 lessons and three weighing units. Weighing illustration renders correctly with Brutto/Tara/Netto values, caption and source links. Screenshot saved as weighing-illustration-preview.png.


- Added explicit lesson-question mappings for OptiGrade and six new core lessons. Lesson practice now selects their own relevant questions, while unmapped lessons retain topic practice. Mapping IDs are validated by content checks; browser flow verification pending.


- Browser verified OptiGrade Lektionsfragen starten selects mapped questions and correctly renders checked-answer feedback. One correct demonstration answer was recorded in the demo account. Saved lesson-practice-preview.png.


- Presentation and presentation-error lessons now select seven relevant questions. ZP measurement and ZP calculation lessons each select five relevant questions. Mapping references validated by content check.


- Browser inspected hygiene, personal-approval and price-reporting units: complete numbered sections, source references and lesson-practice controls render. Both hygiene illustrations loaded successfully. Read-only inspection did not record progress.


- Lesson renderer now supports figures after a specific paragraph. Positioned OptiGrade check comparison after evaluation, weighing formula after its example, and hygiene figures after the corresponding process/check explanation. Syntax and content checks pass; browser placement verification pending.


- DOM verified OptiGrade diagram occurs once, immediately after the evaluation paragraph and before software identification. Added bounds checks for every assigned illustration paragraph index; all checks pass.


- All seven equipment units now have explicit relevant practice sets: principles, array identity, morning checks, software, hardware, environment and part-weight calculations. Mapping validation passes.


- Added contextual AutoFOM I/III test-length comparison with inclusive numeric ranges and all-16-head reminder. Illustration position, accessible SVG and file existence validated. Browser visual review pending.


- Browser confirmed the AutoFOM length comparison renders after both device explanations, with readable values and an enlargement link. Equipment cache version advanced to v4 (shell v29).


## Institution coverage

- Added a dedicated branch structure and institutional responsibilities lesson, two targeted questions and one card, addressing the explicit Annex 2 training topic. Official sources distinguish personal recognition, research, metrology and reporting responsibilities. Content checks pass at 35 lessons, 114 questions and 41 cards. Rendered inspection of this new lesson remains pending.

- Browser verified all five sections and official source links of institution-roles. Its practice button opens exactly the two mapped questions (first question: state-authority recognition). No answer or completion record was submitted during this inspection.


## Traceability coverage

- Added live-animal identification, internal origin/measurement/weight linkage, species-specific protocol distinction and Article 18 traceability basics with an identity-break scenario. Official legal sources verified on 4 October 2026. Two questions and one card added; checks pass at 36/116/42. Browser inspection remains pending.


## Food-law coverage and current verification

- Added LFGB health protection and fair food-information basics, distinguishing animal identification, classification and product information. Two targeted questions and one card added.
- Browser verified five food-law sections, source links and practice control. Content and isolated account/PWA smoke checks passed at 37 lessons, 118 questions and 43 cards.
- Remaining completion evidence: rendered traceability and supplier units, final comparison of supplied page topics with lesson IDs, and course/device-specific requirements unavailable from the supplied sources.

- Browser verified all five traceability sections and source links, plus all five supplier-information sections with separated request/response/retention deadlines. No learner answer or completion record was submitted.

- Learning-plan lesson now includes a concrete five-row practical confirmation checklist. Requested a current OptiGrade test printout/approval from the user; historical device examples cannot establish the current installation requirements. This is the first recorded external-evidence blocker audit; other final review work remains possible.

## Final local check — current state

- All four JavaScript syntax checks, content checks (37/118/43) and isolated smoke checks passed again.
- Browser verified the five-row practical confirmation checklist in exam-map.
- User replied that current OptiGrade documents are not available now. The same device/exam-specific evidence gap persists for a second consecutive audit turn. Local tests cannot verify installed-device approval or supervised practical competence. No additional speculative device values were added.

## External confirmation supplied — 8 October 2026

User provided `Klassifizierung_Notizen.pdf` (Schulungsnotizen: Klassifizierung, Geräte und Verwiegung, transcript of 12 lecture sheets dated 7 October 2026).

### Delivered from training notes:
- **38 lessons, 138 multiple-choice questions, and 53 flashcards** across all seven topics.
- **Dedicated lesson**: `schulungsnotizen-oktober-2026` ("Schulungsnotizen: Schnittführung bis Protokolle (Prüfungsfokus)").
- **Concrete correction factors (Blatt 1)**: Gehirn (−100 g / −150 g), Augen (+50 g / +50 g), Ohr (+200 g / +250 g), vet trims (oil, bile, pus, feces, abscesses, fractures), and common cutting mistakes.
- **OptiGrade HCP test values (Blatt 5 & 6)**: Tip 8.5 ± 0.5 mm, reflection sleeve 150 ± 3, test block targets 8.7/60.0 and 20.2/60.0 (± 0.5 mm) with 5 test insertions per side; withdrawal measurement, left half (viewer's right).
- **Auto-FOM III specifications (Blatt 7 & 8)**: Software test with 4 stored pigs (zero tolerance), 16 heads with Etalon (50 ± 1 mm), 3-year frontendboard replacement, splitbox 10 in / 1 out, PTB site-specific approval.
- **Repair markings & scale verification (Blatt 2, 7, 11)**: Red triangle repair marking (state/authority top, repairer ID middle, date bottom); scale verification intervals (>3 t: 3 years, <3 t: 2 years; manufacturer CE verification).
- **Protocol retention & rules (Blatt 4 & 12)**: Weighing log kept until end of complete following calendar year (signed immediately for endless forms / per weigh for single cards); classification log kept ≥6 months; price reporting on 80–110 kg pigs (≥60% weekly).
- **Qualification & thresholds (Blatt 3, 9, 10)**: 3-month KU training, 5-day MRI course per species, 2-year repetition course; boar identification markers (erectile tissue, spermatic cord, mirror cut, belly fat muscle).
- **All checks passed**: `npm run check` and `node check-learning.cjs` (38 lessons, 138 questions, 53 cards) verified. Shell bumped to v38.
