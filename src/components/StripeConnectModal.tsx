import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Key,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Lock,
  ArrowRight,
  Code
} from 'lucide-react';

interface StripeConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StripeConnectModal({ isOpen, onClose }: StripeConnectModalProps) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'guide' | 'webhook' | 'providers'>('guide');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Passerelle de Paiement Réelle & Encaissement</h3>
              <p className="text-xs text-slate-400">Comment encaisser de vrais euros/dollars sur votre compte bancaire</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900 px-6 pt-3 gap-3 text-xs">
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 font-semibold transition-all border-b-2 ${
              activeTab === 'guide'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Étapes de Connexion Stripe
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`pb-2.5 font-semibold transition-all border-b-2 ${
              activeTab === 'providers'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Passerelles Recommandées
          </button>
          <button
            onClick={() => setActiveTab('webhook')}
            className={`pb-2.5 font-semibold transition-all border-b-2 ${
              activeTab === 'webhook'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Webhook & Livraison Auto
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-emerald-300 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white text-xs mb-1">Architecture 100% Conforme & Sécurisée</strong>
                  L'application dispose déjà de la logique de checkout, génération de fichiers numériques et calculs de marges. Pour basculer en mode production réel, suivez les 3 étapes ci-dessous.
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Créez votre compte Stripe (ou LemonSqueezy)</h4>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Rendez-vous sur dashboard.stripe.com, complétez la vérification d'identité et associez votre IBAN personnel ou professionnel pour recevoir les virements automatiques quotidiens.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Activez les Paiements en 1 Clic (Apple Pay, CB, Klarna)</h4>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Stripe active par défaut Apple Pay, Google Pay et toutes les cartes bancaires internationales pour un taux de conversion maximal sur mobile et desktop.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Renseignez vos clés API dans les Secrets</h4>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      Copiez votre clé secrète Stripe (ex: <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">sk_live_...</code>) dans le menu Paramètres/Secrets de l'application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'providers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Stripe Checkout</h4>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-semibold">Standard Mondial</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Le leader mondial des paiements en ligne. Commissions les plus basses (1.4% + 0.25€) et virements directs sur votre compte bancaire.
                </p>
                <div className="text-[11px] text-emerald-400 font-medium pt-1">
                  ✓ Idéal pour : Abonnements SaaS, Produits digitaux directs.
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">LemonSqueezy</h4>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">Merchant of Record</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Prend en charge la gestion globale de la TVA et de la conformité fiscale internationale à votre place.
                </p>
                <div className="text-[11px] text-emerald-400 font-medium pt-1">
                  ✓ Idéal pour : Vendre des ebooks et templates dans le monde entier.
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Impact / PartnerStack</h4>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-semibold">Affiliation SaaS</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Réseau d'affiliation partenaire vous versant des commissions mensuelles récurrentes allant de 30% à 50% sur chaque client référé.
                </p>
                <div className="text-[11px] text-emerald-400 font-medium pt-1">
                  ✓ Idéal pour : Revenus passifs sans support client.
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">PayPal Commerce</h4>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">Reconnu Partout</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Option de paiement secondaire très rassurante pour les clients qui ne souhaitent pas renseigner leur carte bancaire.
                </p>
                <div className="text-[11px] text-emerald-400 font-medium pt-1">
                  ✓ Idéal pour : Augmenter la conversion des réticents de +15%.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webhook' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Exemple d'écouteur Webhook Stripe pour livraison automatique :</span>
                <button
                  onClick={() => handleCopy(`// Endpoint /api/stripe-webhook\napp.post('/api/stripe-webhook', async (req, res) => {\n  const event = req.body;\n  if (event.type === 'checkout.session.completed') {\n    const session = event.data.object;\n    await sendProductDeliveryEmail(session.customer_email, session.metadata.productId);\n    await registerRevenueToLedger(session.amount_total / 100);\n  }\n  res.json({ received: true });\n});`, 'webhook_code')}
                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                >
                  {copiedKey === 'webhook_code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'webhook_code' ? 'Copié !' : 'Copier le code'}</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">
{`// Endpoint /api/stripe-webhook
app.post('/api/stripe-webhook', async (req, res) => {
  const event = req.body;
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // 1. Livraison automatique de l'actif numérique
    await sendProductDeliveryEmail(session.customer_email, session.metadata.productId);
    // 2. Crédit instantané des fonds
    await registerRevenueToLedger(session.amount_total / 100);
  }
  res.json({ received: true });
});`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer"
          >
            J'ai Compris
          </button>
        </div>

      </div>
    </div>
  );
}
