import React, { useState } from 'react';
import { MicroSaaSPlan, Currency } from '../types';
import { MICRO_SAAS_PLANS } from '../data/initialData';
import {
  Cpu,
  Zap,
  Sparkles,
  Check,
  Lock,
  Flame,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Layers,
  Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MicroSaaSTabProps {
  currency: Currency;
  onSubscribePlan: (plan: MicroSaaSPlan) => void;
  monthlySaaSRevenue: number;
  subscribersCount: number;
}

export function MicroSaaSTab({
  currency,
  onSubscribePlan,
  monthlySaaSRevenue,
  subscribersCount
}: MicroSaaSTabProps) {
  const [credits, setCredits] = useState(5);
  const [productTitle, setProductTitle] = useState("Guide Automatisation par IA");
  const [goal, setGoal] = useState("Vendre un ebook en 24h");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const handleGenerateHook = async () => {
    if (credits <= 0) {
      setIsPaywallOpen(true);
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai-tool/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productTitle, goal }),
      });
      const data = await res.json();
      if (data.success && data.hooks) {
        setGeneratedHooks(data.hooks);
        setCredits((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error generating hook:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectPlan = (plan: MicroSaaSPlan) => {
    if (plan.priceMonthly > 0) {
      setCredits((prev) => prev + plan.credits);
      onSubscribePlan(plan);
      setIsPaywallOpen(false);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top SaaS Health & Revenue Metric */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 mb-2">
            <Cpu className="w-3.5 h-3.5" /> Micro-SaaS & Monétisation d'API
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Modèle par Abonnement Récurrent (MRR)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Découvrez comment un micro-service IA monétise chaque appel API via un système de crédits et d'abonnements mensuels récurrents.
          </p>
        </div>

        {/* Live MRR box */}
        <div className="flex items-center gap-6 bg-slate-850 border border-slate-700/80 rounded-xl p-4 w-full md:w-auto justify-around">
          <div>
            <div className="text-xs text-slate-400">Revenus Récurrents (MRR) :</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
              {monthlySaaSRevenue.toLocaleString('fr-FR')} {currencySymbol} <span className="text-xs text-slate-400 font-sans">/ mois</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div>
            <div className="text-xs text-slate-400">Abonnés Payants :</div>
            <div className="text-xl font-bold text-indigo-300 font-mono mt-0.5">
              {subscribersCount} clients
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Live Paywalled Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Functional AI Tool */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Générateur d'Accroches Marketing IA</h4>
                <p className="text-[11px] text-slate-400">Outil micro-SaaS monétisé à l'usage</p>
              </div>
            </div>

            {/* User Credits Badge */}
            <div className="flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-xl border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white">{credits}</span>
              <span className="text-[11px] text-slate-400">crédits restants</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nom du produit / Offre à promouvoir</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Ex: Formation Crypto, Ebook Notion..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Objectif marketing</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Ex: Doubler le taux de clic sur la page de vente"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={handleGenerateHook}
              disabled={isGenerating}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-md ${
                credits > 0
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white shadow-indigo-500/20'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Génération de l'accroche IA (1 crédit)...</span>
                </>
              ) : credits > 0 ? (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Générer (Consomme 1 crédit)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Crédits épuisés - Débloquer le Plan Pro</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Display */}
          {generatedHooks.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Accroches Haute Conversion Générées :
              </div>
              <div className="space-y-2">
                {generatedHooks.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed"
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: SaaS Pricing Tiers */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" /> Grille Tarifaire SaaS & Abonnements
          </h4>

          <div className="space-y-3">
            {MICRO_SAAS_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-slate-900 border rounded-2xl p-4 transition-all ${
                  plan.popular
                    ? 'border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-sm text-white">{plan.name}</h5>
                      {plan.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                          Plus Populaire
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{plan.credits} crédits / mois</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-white font-mono">
                      {plan.priceMonthly} {currencySymbol}
                    </div>
                    <div className="text-[10px] text-slate-400">/ mois</div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-98 cursor-pointer ${
                    plan.priceMonthly === 0
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  }`}
                >
                  {plan.priceMonthly === 0 ? 'Plan Actuel' : `S'abonner (${plan.priceMonthly} ${currencySymbol}/mois)`}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
