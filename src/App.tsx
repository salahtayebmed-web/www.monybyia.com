import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  DigitalProduct,
  AffiliateCampaign,
  MicroSaaSPlan,
  AutoPilotLog,
  Currency,
  RevenueBreakdown
} from './types';
import {
  INITIAL_DIGITAL_PRODUCTS,
  INITIAL_AFFILIATE_CAMPAIGNS,
  INITIAL_LOGS
} from './data/initialData';
import { Header } from './components/Header';
import { AutoPilotBanner } from './components/AutoPilotBanner';
import { DigitalStoreTab } from './components/DigitalStoreTab';
import { AffiliateEngineTab } from './components/AffiliateEngineTab';
import { MicroSaaSTab } from './components/MicroSaaSTab';
import { LiveLedgerTab } from './components/LiveLedgerTab';
import { RealMonetizationGuideTab } from './components/RealMonetizationGuideTab';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PayoutModal } from './components/PayoutModal';
import { StripeConnectModal } from './components/StripeConnectModal';
import {
  ShoppingBag,
  Share2,
  Cpu,
  Clock,
  BookOpen,
  Sparkles,
  Zap,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'store' | 'affiliate' | 'saas' | 'ledger' | 'guide'>('store');
  const [currency, setCurrency] = useState<Currency>('EUR');

  // Core Data Collections
  const [products, setProducts] = useState<DigitalProduct[]>(INITIAL_DIGITAL_PRODUCTS);
  const [campaigns, setCampaigns] = useState<AffiliateCampaign[]>(INITIAL_AFFILIATE_CAMPAIGNS);
  const [logs, setLogs] = useState<AutoPilotLog[]>(INITIAL_LOGS);
  const [monthlySaaSRevenue, setMonthlySaaSRevenue] = useState(58); // 2 Pro users initial
  const [subscribersCount, setSubscribersCount] = useState(2);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);

  // Auto-Pilot state
  const [autoPilotActive, setAutoPilotActive] = useState(true);
  const [autoPilotSpeed, setAutoPilotSpeed] = useState<'relaxed' | 'fast' | 'turbo'>('fast');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastActionText, setLastActionText] = useState('Moteur actif : surveillance des tunnels de vente et affiliation...');

  // Modals state
  const [checkoutProduct, setCheckoutProduct] = useState<DigitalProduct | null>(null);
  const [inspectProduct, setInspectProduct] = useState<DigitalProduct | null>(null);
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);
  const [isStripeConnectOpen, setIsStripeConnectOpen] = useState(false);

  // Audio synthesizer chime for cashflow events
  const playCashChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.1); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, now + 0.08); // D6
      osc2.frequency.exponentialRampToValueAtTime(1760.00, now + 0.25); // A6

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.08);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {}
  };

  // Aggregated Financial Metrics
  const digitalProductsRevenue = useMemo(() => {
    return products.reduce((acc, p) => acc + p.revenueGenerated, 0);
  }, [products]);

  const affiliateRevenue = useMemo(() => {
    return campaigns.reduce((acc, c) => acc + c.totalCommission, 0);
  }, [campaigns]);

  const saasRevenue = useMemo(() => {
    return monthlySaaSRevenue * 1.5; // Accumulated historical MRR
  }, [monthlySaaSRevenue]);

  const totalRevenue = useMemo(() => {
    return digitalProductsRevenue + affiliateRevenue + saasRevenue;
  }, [digitalProductsRevenue, affiliateRevenue, saasRevenue]);

  const availableBalance = useMemo(() => {
    return Math.max(0, totalRevenue - withdrawnAmount);
  }, [totalRevenue, withdrawnAmount]);

  const todayRevenue = useMemo(() => {
    const todayLogs = logs.filter((l) => l.timestamp.includes('minute') || l.timestamp.includes('seconde') || l.timestamp.includes('heure') || l.timestamp.includes('À l\'instant'));
    return todayLogs.reduce((acc, l) => acc + l.amount, 0);
  }, [logs]);

  const breakdown: RevenueBreakdown = {
    totalRevenue,
    todayRevenue,
    digitalProductsRevenue,
    affiliateRevenue,
    saasRevenue,
    totalTransactionsCount: logs.length,
    availableBalance,
    pendingPayout: 0,
  };

  // Helper to append a transaction log
  const addLog = (
    type: 'product_sale' | 'affiliate_commission' | 'saas_subscription',
    title: string,
    amount: number,
    details: string,
    customerName?: string,
    customerCountry?: string
  ) => {
    const newLog: AutoPilotLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: "À l'instant",
      type,
      title,
      amount,
      details,
      customerName,
      customerCountry
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Keep latest 50
    playCashChime();
  };

  // Handle Manual Product Purchase Simulation from Storefront
  const handleProductPaymentSuccess = (prod: DigitalProduct, buyerName: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === prod.id
          ? {
              ...p,
              totalSales: p.totalSales + 1,
              revenueGenerated: p.revenueGenerated + p.price,
            }
          : p
      )
    );

    addLog(
      'product_sale',
      `Vente directe : ${prod.title}`,
      prod.price,
      `Paiement CB sécurisé validé pour ${buyerName}`,
      buyerName,
      'France'
    );

    setLastActionText(`Nouvelle vente directe enregistrée : ${prod.title} (+${prod.price}€)`);
  };

  // Handle Traffic Simulation on Affiliate Campaign
  const handleSimulateAffiliateTraffic = (campId: string, clicksCount: number) => {
    const targetCamp = campaigns.find((c) => c.id === campId);
    if (!targetCamp) return;

    // Realistic conversion rate between 3% and 6%
    const conversionsGenerated = Math.max(1, Math.floor(clicksCount * (0.04 + Math.random() * 0.03)));
    const commissionEarned = conversionsGenerated * targetCamp.avgEarningsPerSale;

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campId
          ? {
              ...c,
              clicks: c.clicks + clicksCount,
              conversions: c.conversions + conversionsGenerated,
              totalCommission: c.totalCommission + commissionEarned,
            }
          : c
      )
    );

    addLog(
      'affiliate_commission',
      `Commission d'affiliation : ${targetCamp.productName}`,
      commissionEarned,
      `${conversionsGenerated} conversion(s) générée(s) sur ${clicksCount} clics envoyés`,
      'Réseau Partenaire',
      'International'
    );

    setLastActionText(`Commission affilié créditée : ${targetCamp.productName} (+${commissionEarned.toFixed(2)}€)`);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Handle SaaS Subscription
  const handleSubscribeSaaSPlan = (plan: MicroSaaSPlan) => {
    setMonthlySaaSRevenue((prev) => prev + plan.priceMonthly);
    setSubscribersCount((prev) => prev + 1);

    addLog(
      'saas_subscription',
      `Nouvel Abonnement SaaS : ${plan.name}`,
      plan.priceMonthly,
      `Abonnement mensuel récurrent activé (+${plan.credits} crédits)`,
      'Client Pro Entreprise',
      'France'
    );

    setLastActionText(`Nouvel abonné SaaS Pro : +${plan.priceMonthly}€ / mois récurrent`);
  };

  // Execute Auto-Pilot cycle (automated buyer conversion)
  const triggerAutoPilotCycle = () => {
    const randomEvent = Math.random();

    const sampleCustomers = [
      { name: 'Alexandre M.', country: 'France' },
      { name: 'Sophie V.', country: 'Belgique' },
      { name: 'David B.', country: 'Suisse' },
      { name: 'Camille R.', country: 'Canada' },
      { name: 'Julien T.', country: 'France' },
      { name: 'Élodie G.', country: 'Luxembourg' },
      { name: 'Lucas P.', country: 'France' }
    ];
    const customer = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];

    if (randomEvent < 0.55 && products.length > 0) {
      // Digital Product Sale
      const randProd = products[Math.floor(Math.random() * products.length)];
      setProducts((prev) =>
        prev.map((p) =>
          p.id === randProd.id
            ? {
                ...p,
                totalSales: p.totalSales + 1,
                revenueGenerated: p.revenueGenerated + p.price,
              }
            : p
        )
      );

      addLog(
        'product_sale',
        `Vente Autopilot : ${randProd.title}`,
        randProd.price,
        `Tunnel de conversion automatique Stripe - Livré à ${customer.name}`,
        customer.name,
        customer.country
      );

      setLastActionText(`Auto-Pilot : Vente de "${randProd.title}" (+${randProd.price}€)`);
    } else if (randomEvent < 0.85 && campaigns.length > 0) {
      // Affiliate Commission
      const randCamp = campaigns[Math.floor(Math.random() * campaigns.length)];
      const commissionEarned = randCamp.avgEarningsPerSale;

      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === randCamp.id
            ? {
                ...c,
                clicks: c.clicks + 8,
                conversions: c.conversions + 1,
                totalCommission: c.totalCommission + commissionEarned,
              }
            : c
        )
      );

      addLog(
        'affiliate_commission',
        `Commission Partenaire : ${randCamp.productName}`,
        commissionEarned,
        `Conversion générée via le post viral programmé`,
        customer.name,
        customer.country
      );

      setLastActionText(`Auto-Pilot : Commission validée sur ${randCamp.productName} (+${commissionEarned.toFixed(2)}€)`);
    } else {
      // SaaS Subscription Conversion
      setMonthlySaaSRevenue((prev) => prev + 29);
      setSubscribersCount((prev) => prev + 1);

      addLog(
        'saas_subscription',
        `Conversion SaaS : Pro Automator`,
        29,
        `Utilisateur converti après 5 crédits gratuits`,
        customer.name,
        customer.country
      );

      setLastActionText(`Auto-Pilot : Nouvel abonné SaaS converti (+29€/mois)`);
    }
  };

  // Auto-Pilot timer effect
  useEffect(() => {
    if (!autoPilotActive) return;

    const intervalMs = autoPilotSpeed === 'turbo' ? 2200 : autoPilotSpeed === 'fast' ? 4500 : 9000;
    const timer = setInterval(() => {
      triggerAutoPilotCycle();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoPilotActive, autoPilotSpeed, products, campaigns]);

  const handleExecutePayout = (amount: number) => {
    setWithdrawnAmount((prev) => prev + amount);
    setLastActionText(`Virement bancaire de ${amount.toFixed(2)}€ initié vers votre compte.`);
  };

  const handleResetData = () => {
    setProducts(INITIAL_DIGITAL_PRODUCTS);
    setCampaigns(INITIAL_AFFILIATE_CAMPAIGNS);
    setLogs(INITIAL_LOGS);
    setMonthlySaaSRevenue(58);
    setSubscribersCount(2);
    setWithdrawnAmount(0);
    setLastActionText('Données réinitialisées.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Main Navigation Bar */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        totalRevenue={totalRevenue}
        todayRevenue={todayRevenue}
        autoPilotActive={autoPilotActive}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenPayout={() => setIsPayoutOpen(true)}
        onOpenStripeConnect={() => setIsStripeConnectOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Interactive Autonomous Banner */}
        <AutoPilotBanner
          autoPilotActive={autoPilotActive}
          onToggleAutoPilot={() => setAutoPilotActive(!autoPilotActive)}
          speed={autoPilotSpeed}
          setSpeed={setAutoPilotSpeed}
          onManualTrigger={triggerAutoPilotCycle}
          currency={currency}
          todayRevenue={todayRevenue}
          totalTransactions={logs.length}
          lastActionText={lastActionText}
        />

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2 sm:gap-4 no-scrollbar">
          
          <button
            onClick={() => setActiveTab('store')}
            className={`flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'store'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>1. Produits Digitaux & Boutique ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('affiliate')}
            className={`flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'affiliate'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>2. Moteur d'Affiliation & Trafic ({campaigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saas')}
            className={`flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'saas'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>3. Micro-SaaS & Abonnements MRR</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'ledger'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>4. Journal & Retraits ({logs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 pb-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>5. Guide Réel de Monétisation</span>
          </button>

        </div>

        {/* Tab Views */}
        {activeTab === 'store' && (
          <DigitalStoreTab
            products={products}
            currency={currency}
            onAddProduct={(newP) => {
              setProducts((prev) => [newP, ...prev]);
              setLastActionText(`Nouvel actif publié dans votre catalogue : ${newP.title}`);
            }}
            onDeleteProduct={(id) => {
              setProducts((prev) => prev.filter((p) => p.id !== id));
            }}
            onOpenCheckout={(p) => setCheckoutProduct(p)}
            onInspectProduct={(p) => setInspectProduct(p)}
          />
        )}

        {activeTab === 'affiliate' && (
          <AffiliateEngineTab
            campaigns={campaigns}
            currency={currency}
            onAddCampaign={(newC) => {
              setCampaigns((prev) => [newC, ...prev]);
              setLastActionText(`Nouvelle campagne d'affiliation déployée : ${newC.productName}`);
            }}
            onSimulateTraffic={handleSimulateAffiliateTraffic}
          />
        )}

        {activeTab === 'saas' && (
          <MicroSaaSTab
            currency={currency}
            onSubscribePlan={handleSubscribeSaaSPlan}
            monthlySaaSRevenue={monthlySaaSRevenue}
            subscribersCount={subscribersCount}
          />
        )}

        {activeTab === 'ledger' && (
          <LiveLedgerTab
            logs={logs}
            currency={currency}
            breakdown={breakdown}
            onOpenPayout={() => setIsPayoutOpen(true)}
            onOpenStripeConnect={() => setIsStripeConnectOpen(true)}
          />
        )}

        {activeTab === 'guide' && (
          <RealMonetizationGuideTab
            onOpenStripeConnect={() => setIsStripeConnectOpen(true)}
          />
        )}

      </main>

      {/* Global Modals */}
      <CheckoutModal
        product={checkoutProduct}
        currency={currency}
        onClose={() => setCheckoutProduct(null)}
        onPaymentSuccess={handleProductPaymentSuccess}
      />

      <ProductDetailModal
        product={inspectProduct}
        currency={currency}
        onClose={() => setInspectProduct(null)}
        onBuyNow={(p) => {
          setInspectProduct(null);
          setCheckoutProduct(p);
        }}
      />

      <PayoutModal
        isOpen={isPayoutOpen}
        onClose={() => setIsPayoutOpen(false)}
        availableBalance={availableBalance}
        currency={currency}
        onExecutePayout={handleExecutePayout}
      />

      <StripeConnectModal
        isOpen={isStripeConnectOpen}
        onClose={() => setIsStripeConnectOpen(false)}
      />

    </div>
  );
}
