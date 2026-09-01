import React, { useState } from 'react';
import { Currency } from '../types';
import {
  X,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Building2,
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  currency: Currency;
  onExecutePayout: (amount: number) => void;
}

export function PayoutModal({
  isOpen,
  onClose,
  availableBalance,
  currency,
  onExecutePayout
}: PayoutModalProps) {
  if (!isOpen) return null;

  const [amount, setAmount] = useState(availableBalance > 0 ? availableBalance.toFixed(2) : '50.00');
  const [payoutMethod, setPayoutMethod] = useState<'stripe' | 'iban' | 'paypal'>('iban');
  const [iban, setIban] = useState('FR76 3000 4000 5000 6000 7000 899');
  const [beneficiary, setBeneficiary] = useState('Salah Tayeb');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawVal = parseFloat(amount);
    if (isNaN(withdrawVal) || withdrawVal <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      onExecutePayout(withdrawVal);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Retrait des Revenus Générés</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!success ? (
          <form onSubmit={handleWithdraw} className="p-6 space-y-4">
            
            {/* Balance Badge */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Solde disponible immédiatement :</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                  {availableBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAmount(availableBalance.toFixed(2))}
                className="text-xs text-teal-400 hover:underline font-semibold bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/30"
              >
                Tout retirer
              </button>
            </div>

            {/* Method Picker */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Méthode de virement</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutMethod('iban')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    payoutMethod === 'iban'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Virement SEPA</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod('stripe')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    payoutMethod === 'stripe'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Stripe Instant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutMethod('paypal')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                    payoutMethod === 'paypal'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Amount input */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Montant à transférer ({currencySymbol})</label>
              <input
                type="number"
                step="0.01"
                min="1"
                max={Math.max(availableBalance, 100000)}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Beneficiary */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Titulaire du compte</label>
              <input
                type="text"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* IBAN / Account */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {payoutMethod === 'paypal' ? 'Adresse Email PayPal' : 'Numéro IBAN / Compte Bancaire'}
              </label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <Clock className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Délai standard : 24h à 48h ouvrées. Aucun frais de transfert retenu.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || parseFloat(amount) <= 0}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Traitement de l'ordre de virement...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Confirmer le Virement de {parseFloat(amount || '0').toFixed(2)} {currencySymbol}</span>
                </>
              )}
            </button>

          </form>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Demande de Virement Transmise !</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                Le virement de <strong className="text-emerald-400">{parseFloat(amount).toFixed(2)} {currencySymbol}</strong> vers le compte de <strong>{beneficiary}</strong> a été ordonné avec succès.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Référence Virement :</span>
                <span className="text-slate-200">PAY-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination :</span>
                <span className="text-slate-200">{iban.slice(0, 8)} ••••</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Statut :</span>
                <span className="text-emerald-400 font-sans font-semibold">Validé & En cours d'acheminement</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Fermer la fenêtre
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
