import React from 'react';
import { Currency } from '../types';
import {
  Sparkles,
  Zap,
  TrendingUp,
  CreditCard,
  Volume2,
  VolumeX,
  RefreshCw,
  Wallet,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  totalRevenue: number;
  todayRevenue: number;
  autoPilotActive: boolean;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  onOpenPayout: () => void;
  onOpenStripeConnect: () => void;
  onResetData: () => void;
}

export function Header({
  currency,
  setCurrency,
  totalRevenue,
  todayRevenue,
  autoPilotActive,
  soundEnabled,
  setSoundEnabled,
  onOpenPayout,
  onOpenStripeConnect,
  onResetData
}: HeaderProps) {
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-lg backdrop-blur-md bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
              <Zap className="w-5 h-5 text-slate-950 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  AutoRevenue
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" /> Moteur Autonome
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                Générateur & Système d'Automatisation de Revenus Digitaux
              </p>
            </div>
          </div>

          {/* Center Revenue Ticker */}
          <div className="hidden lg:flex items-center gap-6 bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs text-slate-400">Total Encaissé :</div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
              </div>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Aujourd'hui :</span>
              <span className="font-semibold text-teal-300 font-mono">
                +{todayRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              title="Devise"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border text-xs transition-colors ${
                soundEnabled
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'
              }`}
              title={soundEnabled ? 'Sons des ventes activés' : 'Sons désactivés'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Stripe Connect Button */}
            <button
              onClick={onOpenStripeConnect}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Passerelle Réelle</span>
            </button>

            {/* Payout Cashout Button */}
            <button
              onClick={onOpenPayout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Wallet className="w-4 h-4" />
              <span>Retirer</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
