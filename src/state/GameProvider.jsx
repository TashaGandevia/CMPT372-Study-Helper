// GameProvider (SYS-1) — owns the global game state and exposes the action API.
//
// Runs gameReducer via useReducer and publishes, through context, the current
// state plus named action helpers. It does NOT expose raw dispatch: mini-games
// receive only the gameplay helpers (answer/completeRun) as their
// onAnswer/onComplete callbacks, so the reducer stays the sole mutator — a
// one-directional data flow (and itself a teachable React pattern).
import { useMemo, useReducer } from 'react';
import { EVENT } from './flowMachine.js';
import { GAME_ACTION, gameReducer, initialGameState } from './gameReducer.js';
import { GameContext } from './gameContext.js';

export default function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  // Action helpers, memoized so the context value stays stable across renders.
  const value = useMemo(() => {
    const fire = (type, extra) => dispatch({ type, ...extra });
    return {
      ...state,

      // --- Flow / navigation (delegated to the flow machine) ---
      startNew: () => fire(EVENT.START_NEW),
      continueGame: () => fire(EVENT.CONTINUE),
      finishOnboarding: () => fire(EVENT.FINISH_ONBOARDING),
      selectZone: (zoneId) => fire(EVENT.SELECT_ZONE, { zoneId }),
      startZone: () => fire(EVENT.START_ZONE),
      startBoss: () => fire(EVENT.START_BOSS),
      winBoss: () => fire(EVENT.WIN_BOSS),
      retryBoss: () => fire(EVENT.RETRY_BOSS),
      finishResults: () => fire(EVENT.FINISH_RESULTS),
      replayZone: () => fire(EVENT.REPLAY_ZONE),
      startCapstone: () => fire(EVENT.START_CAPSTONE),
      finishCapstone: () => fire(EVENT.FINISH_CAPSTONE),
      exitEnd: () => fire(EVENT.EXIT_END),
      openPause: () => fire(EVENT.OPEN_PAUSE),
      closePause: () => fire(EVENT.CLOSE_PAUSE),
      openProfile: () => fire(EVENT.OPEN_PROFILE),
      closeProfile: () => fire(EVENT.CLOSE_PROFILE),

      // --- Gameplay (the only way mini-games affect state) ---
      // Start a round. opts: { isBoss?, queue? }
      startRun: (zoneId, opts = {}) =>
        fire(GAME_ACTION.START_RUN, { zoneId, ...opts }),
      // onAnswer callback. result: { correct, challengeId?, difficulty? }
      answer: (result) => fire(GAME_ACTION.ANSWER, result),
      // onComplete callback.
      completeRun: () => fire(GAME_ACTION.COMPLETE_RUN),
      abandonRun: () => fire(GAME_ACTION.ABANDON_RUN),
      setSetting: (key, val) => fire(GAME_ACTION.SET_SETTING, { key, value: val }),
    };
  }, [state]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
