/**
 * Dictionnaire de correspondances et synonymes bilingues (FR/EN)
 * pour le domaine métier de Metis (Réservation voyage, multi-modal, back-office).
 */

export const DOMAIN_SYNONYMS: Record<string, string[]> = {
  // Folder / Dossier
  folder: ["dossier", "folder", "booking", "reservation", "order", "pnr"],
  dossier: ["folder", "dossier", "booking", "reservation", "order", "pnr"],
  dossiers: ["folders", "dossiers", "bookings", "reservations"],
  folders: ["dossiers", "folders", "bookings", "reservations"],

  // Creation / modification
  create: ["create", "créer", "creer", "creation", "création", "add", "ajouter", "new", "nouveau"],
  creation: ["create", "créer", "creer", "creation", "création", "add", "ajouter"],
  update: ["update", "modifier", "modification", "maj", "edit", "changer", "change"],
  modify: ["update", "modifier", "modification", "maj", "edit", "changer", "change"],
  modifier: ["update", "modifier", "modification", "maj", "edit", "changer", "change"],

  // Flight / Aérien
  flight: ["vol", "flight", "aerial", "aérien", "aerien", "segment", "journey", "itineraire"],
  vol: ["flight", "vol", "aerial", "aérien", "aerien", "segment", "journey"],
  flights: ["vols", "flights", "aerial"],
  vols: ["flights", "vols", "aerial"],
  aerial: ["aérien", "aerien", "vol", "flight", "plane", "avion"],

  // Hotel / Hébergement
  hotel: ["hotel", "hôtel", "hebergement", "hébergement", "room", "chambre", "webbeds", "nuitee"],
  hebergement: ["hotel", "hôtel", "hebergement", "hébergement", "room", "chambre"],
  room: ["chambre", "room", "hebergement", "hotel"],

  // Rail / Train
  train: ["train", "rail", "sncf", "trainline", "gare", "station", "ter", "tgv"],
  rail: ["train", "rail", "sncf", "trainline", "gare", "station"],

  // Car / Location
  car: ["car", "voiture", "vehicule", "véhicule", "auto", "location", "rental"],
  voiture: ["car", "voiture", "vehicule", "véhicule", "location", "rental"],

  // Passenger / Voyageur
  passenger: ["passenger", "pax", "traveler", "voyageur", "client", "profile", "profil"],
  passengers: ["passengers", "paxs", "travelers", "voyageurs"],
  voyageur: ["traveler", "passenger", "voyageur", "pax", "profil", "profile"],
  voyageurs: ["travelers", "passengers", "voyageurs", "pax"],
  traveler: ["voyageur", "passenger", "traveler", "pax", "profile"],
  pax: ["passenger", "traveler", "voyageur", "pax"],

  // Ticket / Billet
  ticket: ["ticket", "billet", "issuance", "émission", "emission", "coupon", "tst", "emd"],
  billet: ["ticket", "billet", "issuance", "émission", "emission", "coupon"],
  issuance: ["emission", "émission", "issuance", "issue", "ticketing", "billet", "ticket"],
  emission: ["issuance", "émission", "emission", "ticketing", "billet", "ticket"],

  // Cancellation / Refund / Void
  cancel: ["cancel", "annuler", "annulation", "void", "refund", "remboursement"],
  cancellation: ["annulation", "cancel", "void", "refund", "remboursement"],
  annuler: ["cancel", "annuler", "annulation", "void", "refund"],
  annulation: ["cancel", "cancellation", "annuler", "annulation", "void", "refund"],
  refund: ["refund", "rembourser", "remboursement", "avoir", "credit"],
  remboursement: ["refund", "rembourser", "remboursement", "credit"],
  void: ["void", "annuler", "annulation", "ticket_reversal"],

  // Payment / Tarification
  price: ["price", "prix", "fare", "tarif", "amount", "montant", "cost", "cout"],
  pricing: ["price", "tarification", "pricing", "fare", "tarif", "cotation"],
  tarif: ["fare", "tarif", "price", "prix", "cotation"],
  payment: ["payment", "paiement", "pay", "payer", "carte", "card", "tpp", "easypay"],
  paiement: ["payment", "paiement", "pay", "payer", "carte", "card"],

  // Search / Recherche
  search: ["search", "chercher", "recherche", "find", "trouver", "lookup", "query"],
  recherche: ["search", "chercher", "recherche", "find", "trouver", "lookup"],
};

/**
 * Prend une requête (ex: "create folder") et l'étend avec les synonymes pertinents.
 */
export function expandQueryWithSynonyms(query: string): string[] {
  const words = query
    .toLowerCase()
    .split(/[\s,._\-/]+/)
    .filter((w) => w.length > 1);

  const expandedSet = new Set<string>(words);

  for (const word of words) {
    const synonyms = DOMAIN_SYNONYMS[word];
    if (synonyms) {
      for (const syn of synonyms) {
        expandedSet.add(syn);
      }
    }
  }

  return Array.from(expandedSet);
}
