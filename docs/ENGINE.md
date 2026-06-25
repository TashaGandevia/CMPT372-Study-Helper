## Full-Stack Quest — Systems Built So Far (M0 + M1)

What exists today is a **complete, content-agnostic gamified learning engine** — everything except the actual mini-games and screens. The defining design choice (GDD pillar #4) is that **content is data, logic is code, and they never mix**. That separation is exactly what makes it reusable for any course material.

### The engine, in layers

**Foundation (M0)**
- **Flow machine** ([flowMachine.js](src/state/flowMachine.js)) — a declarative state table driving navigation: `TITLE → ONBOARDING → OVERWORLD → ZONE_INTRO → PLAYING → BOSS → RESULTS` (+ `CAPSTONE → END`), with pause/profile overlays.
- **Design tokens + motion** — themeable color system (5 zone palettes, light/dark), shared primitives (`Button`/`Card`/`Pill`/`ProgressBar`), and animation presets with a reduced-motion guard.

**Core systems (M1)** — all pure, tested functions feeding a single reducer:
- **One source of truth** ([gameReducer.js](src/state/gameReducer.js)) — `player / zones / run / badges / reviewQueue / settings`. Mini-games can *only* touch it via `onAnswer`/`onComplete` (no direct mutation).
- **Progression** — XP = base × difficulty × combo; level curve `100·n^1.5`; combo multiplier capped at ×2; boss lives; accuracy → stars (70/85/95%).
- **Retention** — a **review queue** with spaced repetition (miss → must answer correctly twice to clear) that feeds back into round generation.
- **Motivation** — data-driven **badges** with `test(run)` predicates.
- **Persistence** — versioned localStorage save/restore with export/reset.
- **The content contract** ([schema.js](src/data/challenges/schema.js), [buildRun.js](src/lib/buildRun.js), [registry.js](src/minigames/registry.js)) — a challenge schema, a `buildRun()` that assembles rounds (difficulty curve + review bias), and a `type → component` router.

### How to repurpose it for other course material

The engine knows nothing about HTTP, React, or SQL. To retarget it to **any** subject, you change **data, not logic**:

| To teach a new subject | Change this | Leave untouched |
|---|---|---|
| New topics/units | [zones.js](src/data/zones.js) (rename zones, set order/colors) | All of `state/`, `lib/` |
| New questions | `data/challenges/*.js` (objects matching the schema) | `buildRun`, reducer, scoring |
| New interaction styles | Add a mini-game + register its `type` | The router auto-resolves it |
| New achievements | `data/badges.js` `test(run)` predicates | Unlock logic |

Concretely, the **same XP/combo/lives/stars/review-queue/persistence machinery** would work for:
- **A different CS course** — swap challenge banks for algorithms, OS, or networking content.
- **Language learning** — vocabulary/grammar as challenges; the review queue *is* spaced-repetition flashcards already.
- **Med/law/cert exam prep** — case scenarios as "boss" encounters; stars track mastery per topic.
- **Onboarding/compliance training** — zones become modules, the capstone a final assessment.

The reusable kernel is roughly: **`reducer + selectors + lib/{leveling, combo, scoring, reviewQueue, buildRun, rng} + persistence`**. Anything subject-specific lives in `data/` and `minigames/`. Tune the feel without touching content via the knobs in `lib/` (`BASE_XP`, `DIFFICULTY_MULT`, `COMBO_CAP`, `STAR_THRESHOLDS`, `REQUIRED_CORRECT`, level curve).
