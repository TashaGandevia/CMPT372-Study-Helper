// Flow context + hook (INF-4).
//
// Split out from FlowProvider so the provider file exports only a component
// (keeps React Fast Refresh working). Components call useFlow() to read the
// current flow/overlay/zone and to fire transition actions.
import { createContext, useContext } from 'react';

export const FlowContext = createContext(null);

// Returns { flow, overlay, zoneId, ...actions }. Throws if used outside the
// provider so misuse fails loudly instead of silently no-op'ing.
export function useFlow() {
  const ctx = useContext(FlowContext);
  if (ctx === null) {
    throw new Error('useFlow must be used within a <FlowProvider>');
  }
  return ctx;
}
