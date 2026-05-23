import { Sparkles, Brain, History } from "lucide-react";

interface HeaderProps {
  onOpenHistory: () => void;
  historyCount: number;
}

export default function Header({ onOpenHistory, historyCount }: HeaderProps) {
  return (
    <header className="border-b border-slate-100 bg-white/70 backdrop-blur-md sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-md shadow-indigo-100 ring-2 ring-white">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5 ml-1">
                Tulisin<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">AI</span>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-xxs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-600/15">
                  Pro
                </span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono ml-1 hidden sm:block">Copywriter Elit Bisnis Online</p>
            </div>
          </div>

          {/* Action Tools / Badges */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-500 mr-2 border-r border-slate-100 pr-4">
              <span className="flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-pink-500" />
                Ditenagai Gemini 3.5 Flash
              </span>
              <span className="flex items-center gap-1">
                ● <span className="text-slate-600">Terintegrasi Aman</span>
              </span>
            </div>

            {/* History Shortcut */}
            <button
              onClick={onOpenHistory}
              className="group relative flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 py-2 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95 cursor-pointer"
            >
              <History className="h-4 w-4 text-slate-500 group-hover:rotate-12 transition-transform" />
              <span>Riwayat</span>
              {historyCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white px-1">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
