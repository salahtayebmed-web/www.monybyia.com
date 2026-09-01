import React, { useState } from 'react';
import { AffiliateCampaign, Currency } from '../types';
import {
  Share2,
  Sparkles,
  Link,
  Copy,
  Check,
  MousePointerClick,
  TrendingUp,
  Mail,
  Twitter,
  Linkedin,
  FileText,
  DollarSign,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AffiliateEngineTabProps {
  campaigns: AffiliateCampaign[];
  currency: Currency;
  onAddCampaign: (c: AffiliateCampaign) => void;
  onSimulateTraffic: (campaignId: string, clicksCount: number) => void;
}

export function AffiliateEngineTab({
  campaigns,
  currency,
  onAddCampaign,
  onSimulateTraffic
}: AffiliateEngineTabProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState('Logiciels SaaS & Intelligence Artificielle');
  const [selectedProductType, setSelectedProductType] = useState('Outil d\'IA Copywriting & Marketing');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateCampaign = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-affiliate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: selectedNiche, productType: selectedProductType }),
      });
      const data = await res.json();

      if (data.success && data.campaign) {
        const c = data.campaign;
        const newCamp: AffiliateCampaign = {
          id: `aff-${Date.now()}`,
          niche: selectedNiche,
          productName: c.productName || 'Outil SaaS Partenaire',
          network: 'Impact / PartnerStack Pro',
          commissionRate: c.commissionRate || '40% mensuel récurrent',
          avgEarningsPerSale: c.avgEarningsPerSale || 45,
          trackingLink: `https://partner.affiliatehub.io/ref=autorevenue_${Math.random().toString(36).substring(2, 7)}`,
          clicks: 0,
          conversions: 0,
          totalCommission: 0,
          status: 'active',
          seoArticle: c.seoArticle || {
            title: `Avis & Test Complet ${selectedNiche} 2026`,
            metaDescription: "Test complet et analyse détaillée des tarifs et fonctionnalités.",
            summary: "Une solution clé en main hautement recommandée.",
            content: "Article comparatif complet prêt à être publié sur votre blog ou Medium."
          },
          socialPosts: c.socialPosts || [
            { platform: 'Twitter / X', content: `🔥 Découvrez le meilleur outil pour ${selectedNiche} !` }
          ],
          emailSequence: c.emailSequence || [
            { subject: "Comment automatiser vos résultats dès cette semaine", body: "Bonjour, découvrez cette solution..." }
          ]
        };

        onAddCampaign(newCamp);
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.7 }
          });
        } catch (e) {}
      }
    } catch (err) {
      console.error('Error generating affiliate kit:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Campaign Generator Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 mb-2">
              <Share2 className="w-3.5 h-3.5" /> Moteur d'Affiliation & Trafic Récurrent
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Générateur de Campagnes d'Affiliation Haute Rémunération
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Sélectionnez une niche rémunératrice. L'IA rédige instantanément le kit de promotion complet : article SEO, posts viraux X/LinkedIn et emails de vente avec vos liens partenaires.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Niche à fort taux de commission</label>
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="Logiciels SaaS & Intelligence Artificielle">🤖 Logiciels SaaS & Intelligence Artificielle (40% récurrent)</option>
              <option value="Hébergement Cloud & Performance Web">⚡️ Hébergement Cloud & Cyber-sécurité (75€/vente)</option>
              <option value="Finance Personnelle & Investissement">💰 Outils Bourse & Finance Personnelle (50€/lead)</option>
              <option value="E-commerce & Logistique">📦 Outils E-commerce & Logistique (30% récurrent)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Type de service partenaire</label>
            <input
              type="text"
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
              placeholder="Ex: Outil de prospection IA, Plateforme d'automatisation..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={handleGenerateCampaign}
              disabled={isGenerating}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Rédaction des contenus...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Créer la Campagne d'Affiliation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Active Affiliate Campaigns */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Link className="w-5 h-5 text-teal-400" />
              Campagnes Actives & Liens Partenaires ({campaigns.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulez du trafic ou copiez les contenus pour les publier sur vos canaux et générer des commissions.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6"
            >
              {/* Campaign Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                      {camp.niche}
                    </span>
                    <span className="text-xs text-slate-400">Réseau : {camp.network}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{camp.productName}</h4>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">
                    Commission : {camp.commissionRate} (~{camp.avgEarningsPerSale} {currencySymbol} / vente)
                  </div>
                </div>

                {/* Metrics & Traffic Simulation */}
                <div className="flex flex-wrap items-center gap-4 bg-slate-850 p-3 rounded-xl border border-slate-800">
                  <div className="text-center px-2">
                    <div className="text-[11px] text-slate-400">Clics envoyés</div>
                    <div className="text-sm font-bold text-white font-mono">{camp.clicks}</div>
                  </div>
                  <div className="h-6 w-px bg-slate-700" />
                  <div className="text-center px-2">
                    <div className="text-[11px] text-slate-400">Ventes générées</div>
                    <div className="text-sm font-bold text-teal-300 font-mono">{camp.conversions}</div>
                  </div>
                  <div className="h-6 w-px bg-slate-700" />
                  <div className="text-center px-2">
                    <div className="text-[11px] text-slate-400">Commissions encaissées</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">
                      {camp.totalCommission.toFixed(2)} {currencySymbol}
                    </div>
                  </div>

                  <div className="flex gap-1.5 pl-2">
                    <button
                      onClick={() => onSimulateTraffic(camp.id, 25)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title="Envoyer 25 clics organiques"
                    >
                      <MousePointerClick className="w-3.5 h-3.5 text-teal-400" />
                      <span>+25 Clics</span>
                    </button>
                    <button
                      onClick={() => onSimulateTraffic(camp.id, 100)}
                      className="px-2.5 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                      title="Envoyer 100 clics ciblés"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>+100 Clics</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tracking Link Box */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Link className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-xs text-slate-400 shrink-0">Lien d'affiliation unique :</span>
                  <span className="text-xs font-mono text-emerald-300 truncate">{camp.trackingLink}</span>
                </div>
                <button
                  onClick={() => handleCopy(camp.trackingLink, `link-${camp.id}`)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedId === `link-${camp.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `link-${camp.id}` ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>

              {/* Generated Content Assets (SEO, Social, Email) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* SEO Review Article */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" /> Article SEO de Test
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-white mt-2 line-clamp-2">
                      {camp.seoArticle.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                      {camp.seoArticle.content}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(camp.seoArticle.content, `seo-${camp.id}`)}
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedId === `seo-${camp.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === `seo-${camp.id}` ? 'Article Copié' : 'Copier l\'Article'}</span>
                  </button>
                </div>

                {/* Social Posts Kit */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Twitter className="w-3.5 h-3.5 text-sky-400" /> Posts Réseaux Sociaux
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono mt-2 line-clamp-4 leading-relaxed whitespace-pre-wrap bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      {camp.socialPosts[0]?.content || 'Post viral prêt à publier.'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(camp.socialPosts[0]?.content || '', `social-${camp.id}`)}
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedId === `social-${camp.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === `social-${camp.id}` ? 'Post Copié' : 'Copier le Post Viral'}</span>
                  </button>
                </div>

                {/* Email Nurturing Sequence */}
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-400" /> Email de Vente
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-2 truncate">
                      Objet : {camp.emailSequence[0]?.subject || 'Recommandation'}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                      {camp.emailSequence[0]?.body || 'Corps de l\'email'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(`${camp.emailSequence[0]?.subject}\n\n${camp.emailSequence[0]?.body}`, `email-${camp.id}`)}
                    className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedId === `email-${camp.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === `email-${camp.id}` ? 'Email Copié' : 'Copier la Séquence Email'}</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
