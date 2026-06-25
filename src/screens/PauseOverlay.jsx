// PauseOverlay (INF-4 stub) — the PAUSED overlay. Built out in UI-9 (settings:
// sound, reduced motion). Closing resumes the suspended screen underneath.
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import Overlay from './Overlay.jsx';

export default function PauseOverlay() {
  const { closePause } = useFlow();
  return (
    <Overlay title="Paused" onClose={closePause}>
      <p className="text-text-muted">Settings live here (UI-9).</p>
      <Button onClick={closePause}>Resume</Button>
    </Overlay>
  );
}
