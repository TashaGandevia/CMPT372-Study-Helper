// BossScreen (INF-4 stub) — flow state BOSS. Real boss encounters arrive in M3.
// Winning advances to RESULTS; failing retries the boss (not the whole zone),
// per the GDD lives rule.
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function BossScreen() {
  const { zoneId, winBoss, retryBoss, openPause } = useFlow();
  return (
    <ScreenStub
      title="Boss"
      subtitle={`Zone ${zoneId ?? '?'} boss encounter (M3)`}
    >
      <Button onClick={winBoss}>Defeat boss</Button>
      <Button variant="secondary" onClick={retryBoss}>
        Fail / retry
      </Button>
      <Button variant="ghost" onClick={openPause}>
        Pause
      </Button>
    </ScreenStub>
  );
}
