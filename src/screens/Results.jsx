// Results (INF-4 stub) — flow state RESULTS. Built out in UI-7 (XP, accuracy,
// stars, new badges, weakest-concept callout).
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function Results() {
  const { zoneId, finishResults, replayZone } = useFlow();
  return (
    <ScreenStub
      title="Zone Results"
      subtitle={`Zone ${zoneId ?? '?'} — XP, accuracy, stars (UI-7)`}
    >
      <Button onClick={finishResults}>Continue</Button>
      <Button variant="secondary" onClick={replayZone}>
        Replay zone
      </Button>
    </ScreenStub>
  );
}
