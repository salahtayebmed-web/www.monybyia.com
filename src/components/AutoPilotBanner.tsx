import React from 'react';
import { Currency } from '../types';
import {
  Play,
  Pause,
  Zap,
  Activity,
  Bot,
  Flame,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';

interface AutoPilotBannerProps {
  autoPilotActive: boolean;
  onToggleAutoPilot: () => void;
  speed: 'relaxed' | 'fast' | 'turbo';
  setSpeed: (s: 'relaxed' | 'fast' | 'turbo') => void;
  onManualTrigger: () => void;
  currency: Currency;
  todayRevenue: number;
  totalTransactions: number;
  lastActionText: string;
}

export function AutoPilotBanner({
  autoPilotActive,
  onToggleAutoPilot,
  speed,
  setSpeed,
  onManualTrigger,
  currency,
  todayRevenue,
  totalTransactions,
  lastActionText
}: AutoPilotBannerProps) {
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden mb-8">
      {/* Glow background accent */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
        autoPilotActive ? 'bg-emerald-500/20 opacity-100' : 'bg-slate-700/10 opacity-30'
      }`} />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left: Engine Status & Title */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
            autoPilotActive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-lg shadow-emerald-500/10 animate-pulse'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            <Bot className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Moteur de Génération Autonome (Auto-Pilot)
              </h2>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                autoPilotActive
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${autoPilotActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                {autoPilotActive ? 'EN DIRECT - ACTIF' : 'EN PAUSE'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {autoPilotActive
                ? 'Le système génère et convertit automatiquement des acheteurs sur vos produits digitaux, liens affiliés et abonnements SaaS.'
                : 'Activez le mode pilote automatique pour lancer l\'acquisition continue et la conversion en temps réel.'}
            </p>

            {/* Real-time ticker feedback */}
            <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{lastActionText || 'Système prêt à démarrer.'}</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          
          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSpeed('relaxed')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                speed === 'relaxed' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vitesse normale (1 transaction / 8s)"
            >
              Normal
            </button>
            <button
              onClick={() => setSpeed('fast')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                speed === 'fast' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vitesse rapide (1 transaction / 4s)"
            >
              Rapide
            </button>
            <button
              onClick={() => setSpeed('turbo')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                speed === 'turbo' ? 'bg-emerald-500/20 text-emerald-400 font-semibold shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vitesse Turbo (1 transaction / 2s)"
            >
              <Flame className="w-3 h-3 text-amber-400" /> Turbo
            </button>
          </div>

          {/* Manual One-Click Sale Trigger */}
          <button
            onClick={onManualTrigger}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold transition-all active:scale-95 shrink-0"
            title="Forcer l'enregistrement immédiat d'une vente"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-teal-400" />
            <span>+1 Vente Immédiate</span>
          </button>

          {/* Primary Auto-Pilot Toggle Button */}
          <button
            onClick={onToggleAutoPilot}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-lg ${
              autoPilotActive
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold shadow-emerald-500/20'
            }`}
          >
            {autoPilotActive ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Mettre en Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>LANCER LE PILOTE AUTO</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}
