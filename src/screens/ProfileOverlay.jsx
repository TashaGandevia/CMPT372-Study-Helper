// ProfileOverlay (INF-4 stub) — the PROFILE overlay. Built out in UI-8 (level,
// total XP, badge shelf, per-zone accuracy, review-queue size). Closing resumes
// the screen underneath.
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import Overlay from './Overlay.jsx';

export default function ProfileOverlay() {
  const { closeProfile } = useFlow();
  return (
    <Overlay title="Profile" onClose={closeProfile}>
      <p className="text-text-muted">Badges & stats live here (UI-8).</p>
      <Button onClick={closeProfile}>Close</Button>
    </Overlay>
  );
}
