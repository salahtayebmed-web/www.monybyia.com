import React, { useState } from 'react';
import { DigitalProduct, Currency } from '../types';
import {
  X,
  CreditCard,
  Lock,
  CheckCircle2,
  Download,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  product: DigitalProduct | null;
  currency: Currency;
  onClose: () => void;
  onPaymentSuccess: (product: DigitalProduct, buyerName: string) => void;
}

export function CheckoutModal({
  product,
  currency,
  onClose,
  onPaymentSuccess
}: CheckoutModalProps) {
  if (!product) return null;

  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [buyerName, setBuyerName] = useState('Jean Dupont');
  const [buyerEmail, setBuyerEmail] = useState('jean.dupont@example.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onPaymentSuccess(product, buyerName);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 1200);
  };

  const handleDownloadFile = () => {
    const fileContent = `=== ${product.title.toUpperCase()} ===\n${product.subtitle}\n\nPrix d'achat : ${product.price} ${currencySymbol}\nLivré à : ${buyerEmail}\nDate : ${new Date().toLocaleDateString('fr-FR')}\nLicence : Licence Commerciale Individuelle\n\n------------------------------------\nTABLE DES MATIÈRES :\n${product.tableOfContents.join('\n')}\n\n------------------------------------\nCONTENU COMPLET DU PRODUIT :\n${product.contentPreview}\n\n------------------------------------\nMerci pour votre confiance !`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.title.replace(/\s+/g, '_').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Paiement Sécurisé SSL 256-bit</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePay} className="p-6 space-y-5">
            {/* Product Summary */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {product.category}
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                  {product.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Livraison numérique instantanée</p>
              </div>
              <div className="text-right shrink-0 pl-3">
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  {product.price} {currencySymbol}
                </div>
                <div className="text-[11px] text-slate-400">TTC</div>
              </div>
            </div>

            {/* Buyer Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nom complet du client</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email pour la livraison immédiate</label>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Numéro de carte bancaire (Simulation Stripe)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white pl-10 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Expiration</label>
                  <input
                    type="text"
                    defaultValue="12/28"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">CVC</label>
                  <input
                    type="text"
                    defaultValue="888"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantie 30 jours satisfait ou remboursé. Accès immédiat 24h/24.</span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Validation du paiement Stripe...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Payer {product.price} {currencySymbol} & Débloquer l'accès</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Paiement Validé avec Succès !</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                Le montant de <strong className="text-emerald-400">{product.price} {currencySymbol}</strong> a été crédité sur votre solde AutoRevenue. Le produit a été délivré à <strong>{buyerEmail}</strong>.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Transaction ID :</span>
                <span className="font-mono text-slate-200">ch_3N{Math.random().toString(36).substring(2, 9)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Produit :</span>
                <span className="text-slate-200 font-semibold">{product.title}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Statut de livraison :</span>
                <span className="text-emerald-400 font-semibold">Téléchargement Prêt</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadFile}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le Fichier</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
