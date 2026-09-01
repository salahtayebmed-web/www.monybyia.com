import { DigitalProduct, AffiliateCampaign, MicroSaaSPlan, AutoPilotLog } from '../types';

export const INITIAL_DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod-1',
    title: "Le Guide Ultime de l'Automatisation par IA",
    subtitle: "Comment générer 3 000 €/mois en vendant des micro-services et infoproduits automatisés",
    category: 'ebook',
    price: 29,
    description: "Manuel complet de 140 pages avec études de cas réelles, tunnels de conversion prêts à déployer et templates de prospection.",
    features: [
      "140 pages de stratégies actionnables sans bla-bla",
      "5 tunnels de vente pré-configurés pour Stripe",
      "Scripts de prospection automatisée à 28% de réponse",
      "Mises à jour à vie et workbook Notion inclus"
    ],
    tableOfContents: [
      "Chapitre 1 : Les Fondations de l'Économie des Produits Numériques",
      "Chapitre 2 : Créer un Actif Digital en Moins de 24 Heures avec l'IA",
      "Chapitre 3 : Mettre en Place une Passerelle de Paiement Sans Friction",
      "Chapitre 4 : Générer du Trafic Organique et des Ventes en Autopilot",
      "Chapitre 5 : Systèmes d'Upsell et Abonnements Récurrents"
    ],
    contentPreview: `# Guide Ultime : Monétisation & Automatisation par IA

## Introduction : La Révolution des Actifs Digitaux
Dans l'ancien modèle économique, gagner de l'argent nécessitait d'échanger son temps contre un salaire horaire. Dans l'économie des actifs numériques, vous créez la valeur **une seule fois** et vous la distribuez **à l'infini** avec un coût marginal proche de zéro.

### Les 3 Piliers du Système :
1. **La Friction Zéro** : Page de capture épurée, paiement en 1 clic (Apple Pay, Google Pay, Carte Bancaire).
2. **La Valeur Immédiate** : Le client résout un problème précis en moins de 30 minutes après le téléchargement.
3. **L'Automatisation Post-Achat** : Facturation instantanée, email de bienvenue et proposition d'un produit complémentaire (upsell).`,
    salesHook: "Arrêtez d'échanger votre temps contre un salaire fixe. Bâtissez un catalogue d'actifs digitaux qui travaillent pour vous 24h/24.",
    deliveryFormat: "PDF Haute Résolution + Notions Workspaces + Fichiers JSON",
    totalSales: 42,
    revenueGenerated: 1218,
    createdAt: '2026-08-15',
    status: 'active',
    rating: 4.9,
    badge: 'Best-Seller'
  },
  {
    id: 'prod-2',
    title: "Master Pack 750+ Prompts Rentables pour Entreprises",
    subtitle: "La boîte à outils secrète pour automatiser le marketing, le closing commercial et le SEO",
    category: 'prompt_pack',
    price: 19,
    description: "Une bibliothèque ultra-qualifiée de prompts testés pour générer des pages de vente, des séquences email et des campagnes publicitaires à fort ROI.",
    features: [
      "750 prompts classés par objectifs financiers",
      "Frameworks de copywriting : AIDA, PAS, StoryBrand",
      "Générateur d'offres irrésistibles et lead magnets",
      "Export direct Notion, Excel et Google Sheets"
    ],
    tableOfContents: [
      "Module 1 : Prompts de Copywriting & Pages de Vente",
      "Module 2 : Prompts de Prospection B2B & Cold Emailing",
      "Module 3 : Prompts de Création de Contenu Viral (LinkedIn/X/TikTok)",
      "Module 4 : Prompts de Stratégie et Analyse Concurrentielle"
    ],
    contentPreview: `# Extrait du Pack de Prompts Rentables

### Prompt Master #14 : L'Offre Irrésistible d'Alex Hormozi
"Agis comme un stratège en monétisation d'élite. Mon produit est : [Insérer Produit] au prix de [Insérer Prix].
Rédige une proposition de valeur qui combine :
- Le résultat rêvé par mon client idéal
- La réduction du délai perçu pour obtenir le résultat
- La suppression complète de l'effort et du sacrifice
- Une garantie 'Satisfait ou Remboursé + 50€ pour le temps perdu'."`,
    salesHook: "Transformez vos modèles IA en machine à générer des ventes et du contenu viral en 1 clic.",
    deliveryFormat: "Dashboard Notion Filtrable + Fichier CSV Master",
    totalSales: 89,
    revenueGenerated: 1691,
    createdAt: '2026-08-20',
    status: 'active',
    rating: 4.8,
    badge: 'Coup de Cœur'
  },
  {
    id: 'prod-3',
    title: "Système Notion OS Tout-en-Un : Freelance & Créateur",
    subtitle: "Le cockpit complet pour gérer ses devis, clients, revenus récurrents et trésorerie",
    category: 'templates',
    price: 39,
    description: "Espace de travail complet avec synchronisation financière, CRM clients, générateur de factures et suivi d'objectifs de chiffre d'affaires.",
    features: [
      "Dashboard financier avec calcul automatique des taxes et bénéfices",
      "Pipeline de vente et CRM commercial interactif",
      "Portail client partageable clé en main",
      "Tutoriel vidéo pas-à-pas de configuration en 10 minutes"
    ],
    tableOfContents: [
      "1. Espace Finance & Facturation Automatisée",
      "2. CRM Prospects & Suivi des Devis",
      "3. Gestion de Projets & Livrables Clients",
      "4. Bibliothèque de Ressources & Contrats Juridiques"
    ],
    contentPreview: `# Notion OS - Instructions d'installation rapide

1. Ouvrez le lien du template fourni après commande.
2. Cliquez sur 'Dupliquer' en haut à droite pour importer l'espace dans votre compte Notion.
3. Renseignez votre devise et votre taux de TVA dans les paramètres globaux.
4. Votre système de gestion financière automatisé est prêt à l'emploi.`,
    salesHook: "Gagnez 10 heures par semaine et professionnalisez votre activité dès aujourd'hui.",
    deliveryFormat: "Template Notion Duplicable en 1 Clic + Vidéos d'Onboarding",
    totalSales: 31,
    revenueGenerated: 1209,
    createdAt: '2026-08-25',
    status: 'active',
    rating: 4.95,
    badge: 'Nouveau'
  }
];

export const INITIAL_AFFILIATE_CAMPAIGNS: AffiliateCampaign[] = [
  {
    id: 'aff-1',
    niche: 'Outils SaaS & Intelligence Artificielle',
    productName: 'CopyGenius Pro AI',
    network: 'Impact / PartnerStack',
    commissionRate: '40% mensuel récurrent',
    avgEarningsPerSale: 39.6,
    trackingLink: 'https://partner.copygenius.io/ref=autorevenue_vip',
    clicks: 342,
    conversions: 18,
    totalCommission: 712.8,
    status: 'active',
    seoArticle: {
      title: "Test Complet CopyGenius Pro 2026 : Pourquoi c'est l'outil indispensable ?",
      metaDescription: "Découvrez notre avis détaillé sur CopyGenius Pro. Tarifs, fonctionnalités de génération, comparatif et notre code promo exclusif.",
      summary: "Une plateforme qui remplace 3 outils marketing coûteux et permet d'automatiser 90% de la création de contenu.",
      content: `Après plus de 30 jours de tests quotidiens en conditions réelles, CopyGenius Pro s'impose comme la référence incontournable de l'automatisation de contenu marketing.\n\nPourquoi nous le recommandons :\n• Génération de pages de capture complètes en 45 secondes\n• Intégration native avec WordPress, Shopify et Stripe\n• Taux de conversion moyen constaté en hausse de +34%\n\nEn profitant de l'offre d'essai partenaire, vous bénéficiez de 14 jours gratuits et de 20% de remise à vie.`
    },
    socialPosts: [
      {
        platform: 'Twitter / X',
        content: `⚡️ 9 créateurs sur 10 galèrent à rédiger leurs pages de vente.\n\nJ'ai testé @CopyGeniusPro pendant 1 mois pour automatiser mes tunnels. Résultat : +3 400 € de ventes en 3 semaines.\n\n👉 Lien d'essai gratuit + bonus exclusif : https://partner.copygenius.io/ref=autorevenue_vip`
      },
      {
        platform: 'LinkedIn',
        content: `Comment une simple automatisation IA peut vous faire économiser 1 500 € par mois en prestataires ?\n\nJ'ai analysé en détail les métriques d'adoption de CopyGenius Pro. Les entreprises de notre réseau constatent un gain de 15h de travail par collaborateur.\n\nJe vous partage le test complet et l'accès d'essai en commentaire !`
      }
    ],
    emailSequence: [
      {
        subject: "L'erreur qui vous fait perdre 4h par jour sur votre marketing",
        body: "Bonjour,\n\nVous passez encore vos soirées à chercher des idées de posts ou à peaufiner vos descriptions produits ?\n\nIl existe une méthode beaucoup plus rapide. En utilisant le moteur de CopyGenius Pro, vous pouvez générer l'ensemble de vos campagnes marketing du mois en moins d'une heure.\n\nTestez l'outil gratuitement pendant 14 jours via notre lien partenaire privilégié :\nhttps://partner.copygenius.io/ref=autorevenue_vip\n\nÀ votre réussite !"
      }
    ]
  },
  {
    id: 'aff-2',
    niche: 'Hébergement Cloud & Performance Web',
    productName: 'CloudSpeed Ultra',
    network: 'CJ Affiliate',
    commissionRate: '75 € par vente confirmée',
    avgEarningsPerSale: 75.0,
    trackingLink: 'https://cloudspeed.net/go?aff=autorevenue_prime',
    clicks: 215,
    conversions: 11,
    totalCommission: 825.0,
    status: 'active',
    seoArticle: {
      title: "Hébergement Web Haute Performance : Guide et Avis CloudSpeed 2026",
      metaDescription: "Faites passer le temps de chargement de votre site sous la barre des 0,8 seconde avec CloudSpeed Ultra. Test de vitesse et benchmark complet.",
      summary: "L'hébergeur le plus rapide du marché pour les boutiques e-commerce et sites à fort trafic.",
      content: `La vitesse d'un site est directement corrélée à son taux de conversion. Chaque seconde de temps de chargement supplémentaire fait chuter vos ventes de 7%.\n\nCloudSpeed Ultra propose des serveurs NVMe de dernière génération avec CDN mondial intégré.`
    },
    socialPosts: [
      {
        platform: 'Twitter / X',
        content: `🚀 Site lent = clients perdus.\n\nEn migrant sur CloudSpeed Ultra, mon temps de chargement est passé de 3.2s à 0.6s. Mes conversions ont bondi de +22% dès le premier week-end.\n\nProfitez de -60% sur le premier abonnement ici : https://cloudspeed.net/go?aff=autorevenue_prime`
      }
    ],
    emailSequence: [
      {
        subject: "Votre site web est-il en train de faire fuir vos clients ?",
        body: "Bonjour,\n\nSaviez-vous que plus de 50% des visiteurs mobiles quittent une page si elle met plus de 3 secondes à s'afficher ?\n\nPour remédier à ce problème sans compétences techniques, nous vous conseillons l'infrastructure CloudSpeed.\n\nProfitez de l'offre spéciale partenaire avec migration offerte :"
      }
    ]
  }
];

export const MICRO_SAAS_PLANS: MicroSaaSPlan[] = [
  {
    id: 'plan-free',
    name: 'Découverte',
    priceMonthly: 0,
    credits: 5,
    features: [
      "5 générations de copywriting IA par mois",
      "Export texte standard",
      "Support communautaire"
    ]
  },
  {
    id: 'plan-pro',
    name: 'Pro Automator',
    priceMonthly: 29,
    credits: 250,
    popular: true,
    features: [
      "250 générations IA haute conversion / mois",
      "Export PDF, CSV et formats réseaux sociaux",
      "Générateur d'accroches publicitaires A/B",
      "Accès API illimité et Webhooks Stripe",
      "Support prioritaire 24/7"
    ]
  },
  {
    id: 'plan-business',
    name: 'Business Scale',
    priceMonthly: 79,
    credits: 1000,
    features: [
      "1 000 générations IA mensuelles",
      "Marque blanche (White-label)",
      "Multi-comptes et gestion d'équipe",
      "Intégration personnalisée avec votre CRM",
      "Conseiller dédié à la rentabilité"
    ]
  }
];

export const INITIAL_LOGS: AutoPilotLog[] = [
  {
    id: 'log-1',
    timestamp: 'Il y a 3 minutes',
    type: 'product_sale',
    title: 'Vente Ebook : Guide Ultime Automatisation IA',
    amount: 29,
    details: 'Paiement Stripe confirmé via Apple Pay',
    customerName: 'Thomas L.',
    customerCountry: 'France'
  },
  {
    id: 'log-2',
    timestamp: 'Il y a 14 minutes',
    type: 'affiliate_commission',
    title: 'Commission Affilié : CopyGenius Pro',
    amount: 39.6,
    details: 'Abonnement annuel validé par le partenaire',
    customerName: 'Marc D.',
    customerCountry: 'Belgique'
  },
  {
    id: 'log-3',
    timestamp: 'Il y a 42 minutes',
    type: 'saas_subscription',
    title: 'Nouvel Abonné Pro Automator',
    amount: 29,
    details: 'Paiement récurrent mensuel activé',
    customerName: 'Studio Nova',
    customerCountry: 'Canada'
  },
  {
    id: 'log-4',
    timestamp: 'Il y a 1 heure',
    type: 'product_sale',
    title: 'Vente Pack : 750+ Prompts Rentables',
    amount: 19,
    details: 'Livraison automatique effectuée par email',
    customerName: 'Sarah K.',
    customerCountry: 'Suisse'
  }
];
