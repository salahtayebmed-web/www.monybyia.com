import React, { useState } from 'react';
import { DigitalProduct, ProductCategory, Currency } from '../types';
import {
  Sparkles,
  ShoppingBag,
  Plus,
  ArrowUpRight,
  BookOpen,
  Layers,
  Terminal,
  FileCode,
  DollarSign,
  Eye,
  CheckCircle2,
  Trash2,
  Download,
  Flame,
  Star
} from 'lucide-react';

interface DigitalStoreTabProps {
  products: DigitalProduct[];
  currency: Currency;
  onAddProduct: (product: DigitalProduct) => void;
  onDeleteProduct: (id: string) => void;
  onOpenCheckout: (product: DigitalProduct) => void;
  onInspectProduct: (product: DigitalProduct) => void;
}

export function DigitalStoreTab({
  products,
  currency,
  onAddProduct,
  onDeleteProduct,
  onOpenCheckout,
  onInspectProduct
}: DigitalStoreTabProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState("L'Intelligence Artificielle & la Productivité");
  const [category, setCategory] = useState<ProductCategory>('ebook');
  const [targetAudience, setTargetAudience] = useState("Entrepreneurs & Freelances");
  const [customPrice, setCustomPrice] = useState(29);
  const [showManualForm, setShowManualForm] = useState(false);

  // Manual creation state
  const [manualTitle, setManualTitle] = useState('');
  const [manualSubtitle, setManualSubtitle] = useState('');
  const [manualDesc, setManualDesc] = useState('');
  const [manualPrice, setManualPrice] = useState(29);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, topic, targetAudience }),
      });
      const data = await res.json();

      if (data.success && data.product) {
        const p = data.product;
        const newProduct: DigitalProduct = {
          id: `prod-${Date.now()}`,
          title: p.title || `Guide Pratique : ${topic}`,
          subtitle: p.subtitle || `Comment automatiser ses revenus dans ${topic}`,
          category: (p.category as ProductCategory) || category,
          price: customPrice || p.suggestedPrice || 29,
          description: p.description || "Un produit digital complet prêt à être vendu.",
          features: p.features || [
            "Contenu immédiatement actionnable",
            "Mises à jour à vie incluses",
            "Support et communauté privée",
            "Fichiers sources et templates téléchargeables"
          ],
          tableOfContents: p.tableOfContents || [
            "Module 1 : Introduction et Fondamentaux",
            "Module 2 : Mise en Place Pratique",
            "Module 3 : Stratégies Avancées",
            "Module 4 : Automatisation et Échelle"
          ],
          contentPreview: p.contentPreview || `Contenu complet de votre nouvel actif digital sur le thème : ${topic}.`,
          salesHook: p.salesHook || `Découvrez le système éprouvé pour maîtriser ${topic}.`,
          deliveryFormat: p.deliveryFormat || "Fichiers PDF / Notion prêts à l'emploi",
          totalSales: 0,
          revenueGenerated: 0,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'active',
          rating: 5.0,
          badge: 'Généré par IA'
        };

        onAddProduct(newProduct);
      }
    } catch (err) {
      console.error('Error generating product with AI:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const newProduct: DigitalProduct = {
      id: `prod-${Date.now()}`,
      title: manualTitle,
      subtitle: manualSubtitle || 'Actif numérique haute valeur',
      category: category,
      price: manualPrice,
      description: manualDesc || 'Description personnalisée de votre actif numérique.',
      features: [
        "Accès instantané 24h/24",
        "Garantie satisfait ou remboursé 30 jours",
        "Formats éditables et adaptables"
      ],
      tableOfContents: [
        "Partie 1 : Concepts Clés",
        "Partie 2 : Plan d'Action & Exécution",
        "Partie 3 : Ressources & Fichiers Clés"
      ],
      contentPreview: `Contenu de : ${manualTitle}\n\nVotre produit numérique prêt à être téléchargé par vos clients.`,
      salesHook: `Accédez dès maintenant à : ${manualTitle}`,
      deliveryFormat: "Téléchargement Numérique Direct",
      totalSales: 0,
      revenueGenerated: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      rating: 5.0
    };

    onAddProduct(newProduct);
    setManualTitle('');
    setManualSubtitle('');
    setManualDesc('');
    setShowManualForm(false);
  };

  const getCategoryIcon = (cat: ProductCategory) => {
    switch (cat) {
      case 'ebook':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'prompt_pack':
        return <Terminal className="w-4 h-4 text-teal-400" />;
      case 'templates':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'code_toolkit':
        return <FileCode className="w-4 h-4 text-amber-400" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* AI Product Generator Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Usine à Produits Digitaux (0€ de Coût Marginal)
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Générer un Nouvel Actif Numérique à Vendre en Automatique
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              L'IA génère en 5 secondes un produit digital complet (titre, modules, table des matières, contenu intégral prêt au téléchargement et argumentaire de vente).
            </p>
          </div>

          <button
            onClick={() => setShowManualForm(!showManualForm)}
            className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer shrink-0"
          >
            {showManualForm ? 'Fermer le mode manuel' : '+ Créer manuellement'}
          </button>
        </div>

        {!showManualForm ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Format de l'actif</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="ebook">📖 Ebook / Guide PDF Pratique</option>
                <option value="prompt_pack">⚡️ Pack de Prompts IA Rentables</option>
                <option value="templates">📁 Pack Templates Notion & Canva</option>
                <option value="code_toolkit">💻 Toolkit de Scripts & Automations</option>
              </select>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Thème / Problème résolu</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Automatisation IA, Devenir Freelance, Bourse..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Cible d'acheteurs</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ex: Créateurs de contenu, Développeurs, PME..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Price & Generate Action */}
            <div className="flex flex-col justify-end">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Prix de vente ({currencySymbol})</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max="499"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-20 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Génération...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Générer le Produit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        ) : (
          <form onSubmit={handleManualCreate} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Titre du produit</label>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="Ex: Formation Express Copywriting"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sous-titre accrocheur</label>
                <input
                  type="text"
                  value={manualSubtitle}
                  onChange={(e) => setManualSubtitle(e.target.value)}
                  placeholder="Ex: La formule en 3 étapes pour doubler vos ventes"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea
                value={manualDesc}
                onChange={(e) => setManualDesc(e.target.value)}
                placeholder="Décrivez brièvement les bénéfices de ce produit pour le client..."
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-300">Prix ({currencySymbol}) :</label>
                <input
                  type="number"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(Number(e.target.value))}
                  className="w-20 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Publier le Produit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Catalog & Live Storefront Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              Catalogue d'Actifs Digitaux Actifs ({products.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Chaque actif est prêt à être acheté immédiatement ou converti en arrière-plan par le mode Auto-Pilot.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {getCategoryIcon(product.category)}
                    <span>{product.category}</span>
                  </span>

                  {product.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      {product.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {product.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Rating & Sales stats */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-slate-200">{product.rating}</span>
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-slate-200 font-mono">{product.totalSales}</strong> ventes
                  </div>
                  <div className="text-teal-400 font-mono font-semibold ml-auto">
                    {product.revenueGenerated.toLocaleString('fr-FR')} {currencySymbol}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onInspectProduct(product)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Inspecter le contenu et télécharger le fichier"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Supprimer ce produit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Buy Button */}
                <button
                  onClick={() => onOpenCheckout(product)}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer ml-auto"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Acheter ({product.price} {currencySymbol})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
