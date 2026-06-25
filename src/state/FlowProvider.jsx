// FlowProvider (INF-4) — owns the flow-machine state and exposes a friendly API.
//
// It runs flowReducer via useReducer and publishes, through context, both the
// current state (flow/overlay/zoneId) and a set of named action helpers so
// screens read like the GDD flow (e.g. `selectZone('z1')`, `startBoss()`)
// instead of dispatching raw event strings.
import { useMemo, useReducer } from 'react';
import {
  EVENT,
  flowReducer,
  initialFlowState,
} from './flowMachine.js';
import { FlowContext } from './flowContext.js';

export default function FlowProvider({ children }) {
  const [state, dispatch] = useReducer(flowReducer, initialFlowState);

  // Named helpers wrapping dispatch. Memoized so the context value is stable.
  const value = useMemo(() => {
    const fire = (type, extra) => dispatch({ type, ...extra });
    return {
      ...state,
      // Flow transitions
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
      // Overlays
      openPause: () => fire(EVENT.OPEN_PAUSE),
      closePause: () => fire(EVENT.CLOSE_PAUSE),
      openProfile: () => fire(EVENT.OPEN_PROFILE),
      closeProfile: () => fire(EVENT.CLOSE_PROFILE),
    };
  }, [state]);

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}
