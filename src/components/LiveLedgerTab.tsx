import React, { useState } from 'react';
import { AutoPilotLog, Currency, RevenueBreakdown } from '../types';
import {
  Wallet,
  ArrowUpRight,
  Download,
  Filter,
  Search,
  ShoppingBag,
  Share2,
  Cpu,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck
} from 'lucide-react';

interface LiveLedgerTabProps {
  logs: AutoPilotLog[];
  currency: Currency;
  breakdown: RevenueBreakdown;
  onOpenPayout: () => void;
  onOpenStripeConnect: () => void;
}

export function LiveLedgerTab({
  logs,
  currency,
  breakdown,
  onOpenPayout,
  onOpenStripeConnect
}: LiveLedgerTabProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '£';

  const filteredLogs = logs.filter((log) => {
    const matchesFilter = filterType === 'all' || log.type === filterType;
    const matchesSearch =
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.customerName && log.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Date,Type,Titre,Montant,Devise,Client,Pays,Details\n';
    const rows = logs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.type}","${l.title.replace(/"/g, '""')}","${l.amount}","${currency}","${l.customerName || ''}","${l.customerCountry || ''}","${l.details.replace(/"/g, '""')}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `releve_financier_autorevenue_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'product_sale':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'affiliate_commission':
        return <Share2 className="w-4 h-4 text-teal-400" />;
      case 'saas_subscription':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLogBadge = (type: string) => {
    switch (type) {
      case 'product_sale':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'affiliate_commission':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
      case 'saas_subscription':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Earnings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Revenu Total Cumulé</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {breakdown.totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Depuis l'activation du système
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400 font-medium">Solde Disponible</div>
            <button
              onClick={onOpenPayout}
              className="text-[11px] font-bold text-teal-300 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Retirer</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {breakdown.availableBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium mt-1">
            Prêt pour virement bancaire SEPA
          </div>
        </div>

        {/* Breakdown by source */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Ventes Produits Digitaux</div>
          <div className="text-2xl font-bold text-teal-300 font-mono mt-1">
            {breakdown.digitalProductsRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Marge nette : 96.5%
          </div>
        </div>

        {/* Affiliate & SaaS */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-slate-400 font-medium">Affiliation & Abonnements</div>
          <div className="text-2xl font-bold text-indigo-300 font-mono mt-1">
            {(breakdown.affiliateRevenue + breakdown.saasRevenue).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Revenus passifs automatisés
          </div>
        </div>

      </div>

      {/* Transactions Table & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Journal des Encaissements en Direct ({filteredLogs.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Toutes les transactions confirmées en temps réel par les passerelles Stripe et réseaux partenaires.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-48">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 pl-8 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">Tous les types</option>
              <option value="product_sale">Produits Digitaux</option>
              <option value="affiliate_commission">Commissions Affiliation</option>
              <option value="saas_subscription">Abonnements SaaS</option>
            </select>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-3 pr-4">Horodatage</th>
                <th className="pb-3 pr-4">Type & Source</th>
                <th className="pb-3 pr-4">Désignation</th>
                <th className="pb-3 pr-4">Client / Destination</th>
                <th className="pb-3 text-right">Montant Encaissé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3.5 pr-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 pr-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLogBadge(log.type)}`}>
                        {getLogIcon(log.type)}
                        <span>
                          {log.type === 'product_sale'
                            ? 'Vente Produit'
                            : log.type === 'affiliate_commission'
                            ? 'Affiliation'
                            : 'Abonnement'}
                        </span>
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-medium text-slate-200">
                      <div>{log.title}</div>
                      <div className="text-[11px] text-slate-400">{log.details}</div>
                    </td>
                    <td className="py-3.5 pr-4 text-slate-300 whitespace-nowrap">
                      {log.customerName ? (
                        <span>
                          {log.customerName}{' '}
                          {log.customerCountry && (
                            <span className="text-slate-400">({log.customerCountry})</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-slate-500">Client Anonyme</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right font-mono font-bold text-emerald-400 text-sm whitespace-nowrap">
                      +{log.amount.toFixed(2)} {currencySymbol}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Aucune transaction ne correspond à vos filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
