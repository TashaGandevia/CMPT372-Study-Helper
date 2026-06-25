// PlayingScreen (INF-4 stub) — flow state PLAYING (the mini-game rounds). The
// real playfield is the MiniGameShell + per-zone mini-games (UI-5, M3). Here it
// just lets you advance to the boss or open the pause overlay.
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function PlayingScreen() {
  const { zoneId, startBoss, openPause } = useFlow();
  return (
    <ScreenStub
      title="Playing"
      subtitle={`Zone ${zoneId ?? '?'} mini-game rounds (UI-5 / M3)`}
    >
      <Button onClick={startBoss}>Go to boss</Button>
      <Button variant="ghost" onClick={openPause}>
        Pause
      </Button>
    </ScreenStub>
  );
}
