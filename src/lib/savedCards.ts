// Saved cards management using localStorage

export interface SavedCard {
  id: string;
  text: string;
  codon: string;
  createdAt: number;
}

const STORAGE_KEY = 'codon-magic-saved-cards';

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get all saved cards
export function getSavedCards(): SavedCard[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Save a new card
export function saveCard(text: string, codon: string): SavedCard {
  const cards = getSavedCards();

  // Check if card with same text already exists
  const existing = cards.find(c => c.text.toUpperCase() === text.toUpperCase());
  if (existing) {
    return existing;
  }

  const newCard: SavedCard = {
    id: generateId(),
    text: text.toUpperCase().replace(/[^A-Z]/g, ''),
    codon,
    createdAt: Date.now(),
  };

  cards.unshift(newCard); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));

  return newCard;
}

// Delete a card by ID
export function deleteCard(id: string): void {
  const cards = getSavedCards();
  const filtered = cards.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// Check if a card exists
export function cardExists(text: string): boolean {
  const cards = getSavedCards();
  return cards.some(c => c.text.toUpperCase() === text.toUpperCase().replace(/[^A-Z]/g, ''));
}
