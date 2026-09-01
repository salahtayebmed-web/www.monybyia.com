import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Endpoint: Generate a digital product
  app.post('/api/generate-product', async (req, res) => {
    try {
      const { category = 'ebook', topic = 'IA et Productivité', targetAudience = 'Freelances et Créateurs' } = req.body;
      const ai = getAI();

      if (ai) {
        const prompt = `Tu es un expert mondial en création de produits digitaux rentables (eBooks, Templates, Packs de Prompts, Micro-formations, Outils no-code).
Crée un produit digital complet et immédiatement vendable sur le thème "${topic}" dans la catégorie "${category}" pour la cible "${targetAudience}".
Réponds EXCLUSIVEMENT sous forme d'un objet JSON valide (sans balises markdown supplémentaires si possible, ou pur JSON) avec les clés suivantes :
{
  "title": "Titre accrocheur et vendeur",
  "subtitle": "Sous-titre percutant axé sur le résultat",
  "category": "${category}",
  "suggestedPrice": 29,
  "description": "Courte description persuasive (2-3 phrases)",
  "features": ["Bénéfice clé 1", "Bénéfice clé 2", "Bénéfice clé 3", "Bénéfice clé 4"],
  "tableOfContents": ["Module 1: ...", "Module 2: ...", "Module 3: ...", "Module 4: ...", "Module 5: ..."],
  "contentPreview": "Texte complet et riche du premier chapitre ou guide complet prêt à l'emploi (environ 300-500 mots de contenu concret, haute valeur ajoutée)",
  "salesHook": "Phrase d'accroche pour la page de vente",
  "deliveryFormat": "PDF Haute Définition + Fichiers Modifiables"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        try {
          const parsed = JSON.parse(text);
          return res.json({ success: true, product: parsed });
        } catch (parseErr) {
          console.warn('JSON parse error from Gemini, parsing substring:', parseErr);
        }
      }

      // Fallback generator with high quality if Gemini key not set or on parse error
      const fallbackProducts: Record<string, any> = {
        ebook: {
          title: `Le Guide Ultime : Monétiser l'${topic}`,
          subtitle: "La méthode étape par étape pour générer ses premiers 2 500 € par mois en automatique",
          category: "ebook",
          suggestedPrice: 27,
          description: `Un manuel complet et actionnable destiné à ${targetAudience} pour maîtriser ${topic} et créer des flux de revenus pérennes.`,
          features: [
            "120 pages de frameworks et cas d'études concrets",
            "Modèles de tunnels de vente prêts à copier-coller",
            "Liste des 35 meilleurs outils d'automatisation",
            "Plan d'action jour par jour sur 30 jours"
          ],
          tableOfContents: [
            "Chapitre 1 : Les Fondations Psychologiques de la Vente Automatisée",
            "Chapitre 2 : Trouver une Niche Ultra-Rentable en Moins de 48h",
            "Chapitre 3 : Création Express d'un Produit Digital Haute Valeur",
            "Chapitre 4 : Configuration du Tunnel de Paiement et Upsells",
            "Chapitre 5 : Acquisition de Trafic Organique et Payant en Autopilot"
          ],
          contentPreview: `Bienvenue dans votre guide complet sur ${topic}.\n\nPour réussir à générer des revenus automatisés, 3 lois fondamentales s'appliquent :\n1. La loi de l'utilité perçue : Votre solution doit résoudre un problème douloureux et urgent.\n2. La loi de friction zéro : Le processus d'achat doit comporter moins de 2 clics avec paiement sécurisé instantané.\n3. La loi du levier : Construire une fois, vendre 10 000 fois sans coût marginal.\n\nDans les modules suivants, nous implémentons pas à pas chaque composant.`,
          salesHook: `Arrêtez d'échanger votre temps contre de l'argent. Découvrez le système éprouvé pour monétiser ${topic} dès cette semaine.`,
          deliveryFormat: "Ebook PDF interactif + Notion Workbook"
        },
        templates: {
          title: `Pack Pro Templates & Workflows : ${topic}`,
          subtitle: "30+ templates Notion, Canva et automations Make prêts à l'emploi",
          category: "templates",
          suggestedPrice: 39,
          description: `Gagnez 40 heures de travail dès la première semaine avec ce bundle clé en main conçu pour ${targetAudience}.`,
          features: [
            "15 Dashboards Notion pré-configurés",
            "10 Scénarios d'automatisation Make & Zapier",
            "5 Modèles de contrats et devis professionnels",
            "Mises à jour gratuites à vie"
          ],
          tableOfContents: [
            "Section A : Système de Gestion Financière & Facturation",
            "Section B : Pipeline de Prospection & CRM Automatisé",
            "Section C : Calendrier Éditorial & Générateur de Contenu",
            "Section D : Tableau de Bord KPI & Revenus Récurrents"
          ],
          contentPreview: `Instructions d'utilisation du Pack Templates ${topic} :\n1. Cliquez sur le lien d'importation Notion pour dupliquer votre espace de travail en 1 clic.\n2. Activez les webhooks dans vos scénarios d'automatisation pour synchroniser Stripe avec votre base de données.\n3. Personnalisez votre identité visuelle et commencez à encaisser vos premières transactions en quelques minutes.`,
          salesHook: "Ne réinventez pas la roue. Déployez en 5 minutes le système utilisé par les top créateurs.",
          deliveryFormat: "Espace Notion Pro + Fichiers JSON Automations"
        },
        prompt_pack: {
          title: `Master Pack 500+ Prompts Rentables : ${topic}`,
          subtitle: "La bibliothèque secrète de prompts testés pour automatiser business, copywriting et ventes",
          category: "prompt_pack",
          suggestedPrice: 19,
          description: `Exploitez la puissance des modèles IA de pointe pour générer du contenu, des pages de vente et des offres irresistibles en quelques secondes.`,
          features: [
            "500 Prompts structurés par objectifs business",
            "Guides de réglages de température et tokens",
            "Formules secrètes de copywriting (AIDA, PAS, StoryBrand)",
            "Bonus : Guide d'automatisation avec API"
          ],
          tableOfContents: [
            "Catégorie 1 : Rédaction de Pages de Vente & Landing Pages",
            "Catégorie 2 : Emails de Lancement et Campagnes d'Affiliation",
            "Catégorie 3 : Création de Contenu Viral (LinkedIn, Twitter, TikTok)",
            "Catégorie 4 : Idéation & Validation de Produits Digitaux"
          ],
          contentPreview: `Extrait Prompt #01 - Le Générateur d'Offre Irrésistible :\n[ROLE] Tu es un copywriter d'élite spécialiste des offres high-ticket.\n[CONTEXTE] Produit : ${topic}. Cible : ${targetAudience}.\n[TÂCHE] Rédige une proposition de valeur en 3 phrases qui met en avant le bénéfice immédiat, supprime le risque principal avec une garantie en béton et intègre une urgence légitime.\n[FORMAT] Rends le résultat avec 3 variantes de titres A/B/C.`,
          salesHook: "Transformez l'IA en votre meilleur vendeur 24h/24 sans jamais manquer d'inspiration.",
          deliveryFormat: "Fichier CSV / Excel + Dashboard Notion filtrable"
        }
      };

      const selected = fallbackProducts[category] || fallbackProducts.ebook;
      res.json({ success: true, product: selected });
    } catch (err: any) {
      console.error('Error generating product:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // AI Endpoint: Generate an affiliate marketing kit
  app.post('/api/generate-affiliate', async (req, res) => {
    try {
      const { niche = 'Logiciels SaaS & Productivité', productType = 'Outil d IA Marketing' } = req.body;
      const ai = getAI();

      if (ai) {
        const prompt = `Tu es un expert en marketing d'affiliation et création de revenus passifs.
Génère une campagne complète et hautement rentable pour promouvoir une offre d'affiliation dans la niche "${niche}" (Produit: "${productType}").
Réponds EXCLUSIVEMENT en JSON valide avec la structure :
{
  "productName": "Nom attractif du service/logiciel partenaire",
  "commissionRate": "40% récurrent / mois",
  "avgEarningsPerSale": 48,
  "seoArticle": {
    "title": "Titre SEO optimisé pour attirer des acheteurs chauds",
    "metaDescription": "Description SEO 150 caractères",
    "summary": "Résumé des points forts et verdict",
    "content": "Article de blog comparatif complet (300 mots) intégrant des appels à l'action stratégiques"
  },
  "socialPosts": [
    { "platform": "Twitter/X", "content": "Post court accrocheur avec hook puissant et lien" },
    { "platform": "LinkedIn", "content": "Post professionnel axé ROI et gain de temps avec appel à l'action" }
  ],
  "emailSequence": [
    { "subject": "Email 1 : Le problème invisible qui vous coûte cher", "body": "Corps de l'email court et persuasif" },
    { "subject": "Email 2 : L'étude de cas (Comment X a fait Y en 7 jours)", "body": "Preuve sociale et offre partenaire" }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        try {
          const parsed = JSON.parse(text);
          return res.json({ success: true, campaign: parsed });
        } catch (e) {
          console.warn('JSON parse fallback for affiliate:', e);
        }
      }

      // Fallback campaign
      const fallbackCampaign = {
        productName: `AutoScale AI - Plateforme SaaS dans ${niche}`,
        commissionRate: "40% de commission mensuelle récurrente",
        avgEarningsPerSale: 38,
        seoArticle: {
          title: `Avis & Test Complet ${niche} 2026 : Pourquoi tout le monde en parle ?`,
          metaDescription: `Découvrez notre test complet et sans concession du meilleur outil pour ${niche}. Analyse des tarifs, fonctionnalités et verdict.`,
          summary: "Une solution révolutionnaire qui automatise 80% des tâches répétitives avec un ROI mesurable dès le premier mois.",
          content: `Si vous cherchez à maximiser vos revenus dans ${niche}, l'efficacité opérationnelle est le facteur numéro 1.\n\nAprès 3 semaines de tests intensifs, nous avons mesuré un gain moyen de 14 heures de travail par semaine et une augmentation des conversions de +28%.\n\nPoints forts :\n• Interface intuitive et prise en main en moins de 10 minutes\n• Intégrations natives avec Stripe, Zapier et WordPress\n• Support réactif 7j/7\n\nVerdict : Un investissement incontournable pour quiconque souhaite automatiser son activité.`
        },
        socialPosts: [
          {
            platform: "Twitter/X",
            content: `🔥 90% des créateurs perdent 3h par jour sur des tâches manuelles.\n\nVoici l'outil exact que j'utilise pour automatiser tout mon flux dans ${niche} :\n\n👉 Testez l'essai gratuit de 14 jours via mon lien partenaire : [LIEN_AFFILIE]`
          },
          {
            platform: "LinkedIn",
            content: `Comment doubler sa productivité dans ${niche} sans embaucher ?\n\nLa clé n'est pas de travailler plus, mais d'automatiser les processus à faible valeur ajoutée.\n\nJ'ai testé cette solution pendant 30 jours, et les résultats parlent d'eux-mêmes : +45% de leads qualifiés générés en automatique.\n\nLe lien d'accès exclusif avec 20% de remise est en commentaire.`
          }
        ],
        emailSequence: [
          {
            subject: "Arrêtez de perdre du temps sur des tâches manuelles",
            body: "Bonjour,\n\nCombien d'heures avez-vous passées cette semaine sur des tâches répétitives ?\n\nSi la réponse est 'trop', il existe aujourd'hui un outil qui prend en charge tout cela en arrière-plan pendant que vous vous concentrez sur la croissance.\n\nDécouvrez la démo vidéo en 2 minutes ici : [LIEN_AFFILIE]\n\nÀ votre succès,\nVotre Nom"
          },
          {
            subject: "[Étude de cas] De 0 à 1 200€/mois avec ce simple système",
            body: "Bonjour,\n\nHier, je vous parlais d'automatisation. Aujourd'hui, je voulais partager les résultats concrets obtenus par nos utilisateurs.\n\nEn branchant ce logiciel, ils ont pu générer leurs premières ventes en moins de 72 heures.\n\nProfitez de la remise spéciale réservée à notre communauté avant ce soir : [LIEN_AFFILIE]"
          }
        ]
      };

      res.json({ success: true, campaign: fallbackCampaign });
    } catch (err: any) {
      console.error('Error generating affiliate kit:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Micro-SaaS AI Tool Demo Endpoint
  app.post('/api/ai-tool/generate', async (req, res) => {
    try {
      const { productTitle = '', goal = 'Augmenter les ventes' } = req.body;
      const ai = getAI();

      if (ai) {
        const prompt = `Génère 3 accroches publicitaires percutantes et ultra-vendeuses pour le produit : "${productTitle}". Objectif : "${goal}". Réponds en format JSON : { "hooks": ["Accroche 1", "Accroche 2", "Accroche 3"] }`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        const text = response.text || '';
        try {
          const parsed = JSON.parse(text);
          return res.json({ success: true, hooks: parsed.hooks });
        } catch (e) {}
      }

      res.json({
        success: true,
        hooks: [
          `💡 Ne laissez plus l'argent sur la table : Boostez vos résultats avec ${productTitle || 'cette solution'} dès aujourd'hui !`,
          `🚀 Le secret des top 1% pour transformer ${productTitle || 'leur activité'} en machine à cash automatique.`,
          `⚡ Obtenez des résultats concrets en moins de 48 heures : Garantie satisfait ou remboursé à 100%.`
        ]
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoRevenue Server running on http://localhost:${PORT}`);
  });
}

startServer();
