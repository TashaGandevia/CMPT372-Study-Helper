// Selectors (SYS-1) — pure functions that derive values from game state.
//
// Keeping derivation here (rather than storing computed values) means there's
// one source of truth (e.g. player.xp) and no risk of stored copies drifting.

// Baseline leveling curve from the GDD §3.2: the XP needed to advance FROM
// level n is 100 * n^1.5. SYS-3 owns the full leveling experience (level-up
// banner, cosmetic unlocks); this provides the derived numbers the UI needs.
export function xpForLevel(n) {
  return Math.floor(100 * Math.pow(n, 1.5));
}

// Derives current level + progress toward the next level from total XP.
// Returns { level, xpIntoLevel, xpForNext, progress } where progress is 0–1.
export function selectLevelProgress(state) {
  const totalXp = state.player.xp;
  let level = 1;
  let cumulative = 0;
  // Walk up levels while the player can still afford the next one.
  while (cumulative + xpForLevel(level) <= totalXp) {
    cumulative += xpForLevel(level);
    level += 1;
  }
  const xpIntoLevel = totalXp - cumulative;
  const xpForNext = xpForLevel(level);
  return {
    level,
    xpIntoLevel,
    xpForNext,
    progress: xpForNext > 0 ? xpIntoLevel / xpForNext : 0,
  };
}

// Ids of all currently unlocked zones, in declared order.
export function selectUnlockedZones(state) {
  return Object.entries(state.zones)
    .filter(([, zone]) => zone.unlocked)
    .map(([id]) => id);
}

// Stack-completion fraction (completed zones / total) — the headline overworld
// metric in the GDD.
export function selectStackCompletion(state) {
  const all = Object.values(state.zones);
  if (all.length === 0) return 0;
  const done = all.filter((z) => z.completed).length;
  return done / all.length;
}

// Accuracy of the active run (0–1); 0 when no run or no answers yet.
export function selectRunAccuracy(state) {
  const run = state.run;
  if (!run || run.total === 0) return 0;
  return run.correct / run.total;
}
