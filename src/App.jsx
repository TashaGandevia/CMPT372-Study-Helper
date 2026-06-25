// Root component.
//
// For INF-1 this is just a placeholder confirming the scaffold runs. INF-4 will
// replace this body with the flow state machine (TITLE → ONBOARDING → OVERWORLD
// → ...) and the context providers from M1.
export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-2 bg-slate-900 text-slate-100">
      <h1 className="text-3xl font-bold">Full-Stack Quest</h1>
      <p className="text-slate-400">Scaffold is up. Game flow lands in INF-4.</p>
    </main>
  );
}
