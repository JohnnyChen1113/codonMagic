// Codon to Amino Acid mapping (DNA codons)
// Each amino acid has a single-letter code

export const AMINO_ACID_TO_CODONS: Record<string, string[]> = {
  A: ['GCT', 'GCC', 'GCA', 'GCG'],           // Alanine
  C: ['TGT', 'TGC'],                          // Cysteine
  D: ['GAT', 'GAC'],                          // Aspartic acid
  E: ['GAA', 'GAG'],                          // Glutamic acid
  F: ['TTT', 'TTC'],                          // Phenylalanine
  G: ['GGT', 'GGC', 'GGA', 'GGG'],           // Glycine
  H: ['CAT', 'CAC'],                          // Histidine
  I: ['ATT', 'ATC', 'ATA'],                   // Isoleucine
  K: ['AAA', 'AAG'],                          // Lysine
  L: ['TTA', 'TTG', 'CTT', 'CTC', 'CTA', 'CTG'], // Leucine
  M: ['ATG'],                                  // Methionine (Start codon)
  N: ['AAT', 'AAC'],                          // Asparagine
  P: ['CCT', 'CCC', 'CCA', 'CCG'],           // Proline
  Q: ['CAA', 'CAG'],                          // Glutamine
  R: ['CGT', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'], // Arginine
  S: ['TCT', 'TCC', 'TCA', 'TCG', 'AGT', 'AGC'], // Serine
  T: ['ACT', 'ACC', 'ACA', 'ACG'],           // Threonine
  V: ['GTT', 'GTC', 'GTA', 'GTG'],           // Valine
  W: ['TGG'],                                  // Tryptophan
  Y: ['TAT', 'TAC'],                          // Tyrosine
};

// Stop codons (not used for encoding but shown for completeness)
export const STOP_CODONS = ['TAA', 'TAG', 'TGA'];

// Letters that cannot be encoded (no corresponding amino acid)
export const INVALID_LETTERS = ['B', 'J', 'O', 'U', 'X', 'Z'];

// Build reverse lookup: codon -> amino acid
export const CODON_TO_AMINO_ACID: Record<string, string> = {};
for (const [aa, codons] of Object.entries(AMINO_ACID_TO_CODONS)) {
  for (const codon of codons) {
    CODON_TO_AMINO_ACID[codon] = aa;
  }
}

// Encode text to DNA sequence
export function textToCodon(text: string): { codon: string; valid: boolean; invalidChars: string[] } {
  const upperText = text.toUpperCase();
  const invalidChars: string[] = [];
  let codon = '';

  for (const char of upperText) {
    if (char === ' ' || char === '\n') {
      continue; // Skip spaces and newlines
    }

    const codons = AMINO_ACID_TO_CODONS[char];
    if (codons) {
      // Randomly pick one of the possible codons for variety
      const randomCodon = codons[Math.floor(Math.random() * codons.length)];
      codon += randomCodon;
    } else if (/[A-Z]/.test(char)) {
      invalidChars.push(char);
    }
    // Ignore non-letter characters
  }

  return {
    codon,
    valid: invalidChars.length === 0,
    invalidChars: [...new Set(invalidChars)],
  };
}

// Decode DNA sequence to amino acid text
export function codonToText(dna: string): string {
  const cleanDna = dna.toUpperCase().replace(/[^ATGC]/g, '');
  let result = '';

  for (let i = 0; i < cleanDna.length; i += 3) {
    const codon = cleanDna.slice(i, i + 3);
    if (codon.length === 3) {
      const aa = CODON_TO_AMINO_ACID[codon];
      if (aa) {
        result += aa;
      } else if (STOP_CODONS.includes(codon)) {
        result += '*'; // Stop codon marker
      } else {
        result += '?'; // Unknown codon
      }
    }
  }

  return result;
}

// Get amino acid full name
export const AMINO_ACID_NAMES: Record<string, string> = {
  A: 'Alanine',
  C: 'Cysteine',
  D: 'Aspartic acid',
  E: 'Glutamic acid',
  F: 'Phenylalanine',
  G: 'Glycine',
  H: 'Histidine',
  I: 'Isoleucine',
  K: 'Lysine',
  L: 'Leucine',
  M: 'Methionine',
  N: 'Asparagine',
  P: 'Proline',
  Q: 'Glutamine',
  R: 'Arginine',
  S: 'Serine',
  T: 'Threonine',
  V: 'Valine',
  W: 'Tryptophan',
  Y: 'Tyrosine',
};
