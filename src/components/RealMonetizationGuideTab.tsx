import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Zap,
  DollarSign
} from 'lucide-react';

interface RealMonetizationGuideTabProps {
  onOpenStripeConnect: () => void;
}

export function RealMonetizationGuideTab({ onOpenStripeConnect }: RealMonetizationGuideTabProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Une application peut-elle générer de l'argent 'toute seule' sans rien vendre ?",
      a: "Non, et méfiez-vous de quiconque prétend le contraire : en économie réelle, l'argent provient toujours d'un échange de valeur (un client qui achète une solution à son problème, une entreprise qui paie pour un abonnement ou un annonceur qui rémunère du trafic). En revanche, une application peut AUTOMATISER 95% du travail : création des produits, pages de vente, encaissement bancaire par carte/Apple Pay, livraison des fichiers et relances marketing 24h/24 sans intervention humaine."
    },
    {
      q: "Combien puis-je espérer gagner concrètement avec les actifs digitaux et l'affiliation ?",
      a: "Avec un catalogue de 3 à 5 produits digitaux bien ciblés vendus entre 19€ et 49€, générer seulement 2 ventes par jour rapporte entre 1 140€ et 2 940€ par mois, avec une marge nette supérieure à 95% (car un fichier numérique ne coûte rien à reproduire)."
    },
    {
      q: "Comment recevoir légalement les gains sur mon compte bancaire ?",
      a: "En reliant votre passerelle Stripe ou LemonSqueezy à votre IBAN. Les fonds encaissés lors de chaque commande sont automatiquement transférés vers votre compte bancaire en 24h à 48h. En France et en Europe, vous pouvez débuter avec un simple statut de micro-entreprise (auto-entrepreneur) déclaré en ligne en 15 minutes."
    },
    {
      q: "Pourquoi le modèle SaaS et affiliation récurrente est-il le plus puissant ?",
      a: "Parce qu'il crée un revenu cumulatif prévisible (MRR). Si vous amenez 50 abonnés à un logiciel partenaire à 40€/mois avec 40% de commission, vous encaissez 800€ CHAQUE MOIS de manière automatique, même si vous ne travaillez pas ce mois-ci."
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-3">
          <Lightbulb className="w-3.5 h-3.5" /> Guide Stratégique & Réalité Économique
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Comment un Logiciel Génère RÉELLEMENT de l'Argent en 2026
        </h3>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Comprendre la mécanique exacte pour transformer du code et de l'intelligence artificielle en flux de revenus récurrents et automatisés sur votre compte bancaire.
        </p>

        {/* Reality check disclaimer box */}
        <div className="mt-6 bg-slate-850 border border-slate-700/80 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block text-sm mb-0.5">Le Principe Fondamental de l'Automatisation Financière :</strong>
            Une application rentable est un <em>distributeur automatique numérique</em>. Vous concevez la machine (produits digitaux, liens affiliés, outils SaaS), vous la branchez à une passerelle de paiement (Stripe), et elle encaisse pour vous pendant que vous dormez.
          </div>
        </div>
      </div>

      {/* The 4 Proven Monetization Pillars */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white tracking-tight">
          Les 4 Piliers Éprouvés Intégrés dans AutoRevenue :
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Pillar 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h5 className="font-bold text-white text-base">Actifs Numériques & Infoproduits (Marges 97%)</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ebooks, packs de prompts IA, templates Notion, codes sources. Vous créez l'actif une seule fois (ou le faites générer par l'IA), et vous pouvez le vendre 10 000 fois sans aucun coût de stock ni logistique.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
              ⚡️ Prêt à l'emploi dans l'onglet "Produits Digitaux"
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h5 className="font-bold text-white text-base">Affiliation Partenaire & Commissions Récurrentes</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Recommander des logiciels et outils réputés. Vous touchez de 30% à 50% de commission chaque mois tant que le client reste abonné, sans jamais avoir à gérer de support client.
            </p>
            <div className="text-[11px] text-teal-400 font-semibold bg-teal-500/10 p-2 rounded-lg border border-teal-500/20">
              ⚡️ Prêt à l'emploi dans l'onglet "Moteur d'Affiliation"
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h5 className="font-bold text-white text-base">Micro-SaaS & Accès API Monétisé</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Proposer un utilitaire IA qui fait gagner du temps (générateur de textes, analyseurs de données, assistants spécialisés) avec un paiement par abonnement mensuel (ex: 29€/mois) ou crédits à l'usage.
            </p>
            <div className="text-[11px] text-indigo-400 font-semibold bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/20">
              ⚡️ Prêt à l'emploi dans l'onglet "Micro-SaaS"
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h5 className="font-bold text-white text-base">Système Pilote Automatique (Auto-Pilot)</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Des scripts et webhooks exécutent les cycles de relance, confirmation de paiement, livraison par email et enregistrement dans le journal comptable en continu.
            </p>
            <div className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
              ⚡️ Activable directement depuis la bannière supérieure
            </div>
          </div>

        </div>
      </div>

      {/* 4-Step Launch Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Plan d'Action Immédiat (Pour vos premiers 1 000 € réels)
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 bg-slate-850 p-3.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">1</span>
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Générez 2 ou 3 actifs dans "Produits Digitaux"</strong>
              Utilisez le bouton de génération IA pour créer par exemple un Ebook de productivité, un Pack de Prompts et un Template Notion.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-850 p-3.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">2</span>
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Associez votre compte Stripe Réel</strong>
              Cliquez sur "Passerelle Réelle" en haut pour suivre les 3 étapes simples et brancher votre clé Stripe secrète afin d'encaisser des paiements CB et Apple Pay.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-850 p-3.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">3</span>
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Publiez les kits de promotion sur vos réseaux</strong>
              Copiez les articles SEO et posts viraux créés dans l'onglet "Moteur d'Affiliation" pour drainer du trafic qualifié vers vos liens.
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-850 p-3.5 rounded-xl border border-slate-800">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">4</span>
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white block mb-0.5">Activez le mode Auto-Pilot</strong>
              Laissez le moteur gérer l'orchestration des flux et suivez vos gains dans l'onglet "Journal & Retraits".
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onOpenStripeConnect}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span>Configurer ma Passerelle Stripe Réelle</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-teal-400" /> Foire Aux Questions (Sans Filtre)
        </h4>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-850 border border-slate-800 rounded-xl overflow-hidden text-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-semibold text-white flex items-center justify-between gap-3 hover:text-emerald-300 transition-colors"
              >
                <span>{item.q}</span>
                <span className="text-slate-400 text-sm shrink-0">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
