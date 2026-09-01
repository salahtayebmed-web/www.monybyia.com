import React, { useState } from 'react';
import { DigitalProduct, Currency } from '../types';
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Sparkles,
  BookOpen,
  DollarSign,
  Tag
} from 'lucide-react';

interface ProductDetailModalProps {
  product: DigitalProduct | null;
  currency: Currency;
  onClose: () => void;
  onBuyNow: (p: DigitalProduct) => void;
}

export function ProductDetailModal({
  product,
  currency,
  onClose,
  onBuyNow
}: ProductDetailModalProps) {
  if (!product) return null;

  const [copied, setCopied] = useState(false);
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const handleCopyContent = () => {
    navigator.clipboard.writeText(
      `TITRE: ${product.title}\n\nSOUS-TITRE: ${product.subtitle}\n\nDESCRIPTION:\n${product.description}\n\nTABLE DES MATIÈRES:\n${product.tableOfContents.join('\n')}\n\nCONTENU:\n${product.contentPreview}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = `=== ${product.title} ===\n${product.subtitle}\n\nPrix conseillé : ${product.price} ${currencySymbol}\nFormat : ${product.deliveryFormat}\n\n--- DESCRIPTION COMMERCIALE ---\n${product.description}\n\n--- BÉNÉFICES CLÉS ---\n${product.features.map((f) => `- ${f}`).join('\n')}\n\n--- TABLE DES MATIÈRES ---\n${product.tableOfContents.map((t, idx) => `${idx + 1}. ${t}`).join('\n')}\n\n--- CONTENU COMPLET ---\n${product.contentPreview}\n\n--- ACCROCHE DE VENTE ---\n${product.salesHook}\n`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_complet.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-xs text-slate-400">
              Actif Numérique Déployé
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{product.title}</h3>
            <p className="text-sm text-slate-300 mt-1">{product.subtitle}</p>
          </div>

          {/* Pricing & Performance Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl p-4">
            <div>
              <div className="text-xs text-slate-400">Prix de Vente :</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                {product.price} {currencySymbol}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Ventes Réalisées :</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {product.totalSales} unités
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Revenus Générés :</div>
              <div className="text-lg font-bold text-teal-300 font-mono mt-0.5">
                {product.revenueGenerated.toLocaleString()} {currencySymbol}
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Bénéfices & Contenu Inclus
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table of contents */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Structure & Modules
            </h4>
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              {product.tableOfContents.map((item, idx) => (
                <div key={idx} className="text-xs text-slate-300 font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] shrink-0 font-sans">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Aperçu du Fichier Prêt à Livrer
              </h4>
              <button
                onClick={handleCopyContent}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier tout le texte'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
              {product.contentPreview}
            </pre>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-850 flex items-center justify-between gap-3">
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exporter le Fichier (.txt)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBuyNow(product);
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <DollarSign className="w-4 h-4" />
            <span>Tester l'Achat ({product.price} {currencySymbol})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
