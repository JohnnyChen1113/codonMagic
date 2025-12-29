# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Codon Magic (密码子谜题生成器)

A web app that converts text into DNA codon sequences. Users can generate biology puzzles by encoding messages into codons that biology students can decode using the codon table.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

```
src/
├── app/
│   ├── page.tsx       # Main page with tabs (presets/custom encoder)
│   ├── layout.tsx     # Root layout with metadata
│   └── globals.css    # Global styles with dark theme
├── components/
│   ├── Encoder.tsx    # Custom text → codon encoder with decode mode
│   ├── FlashCard.tsx  # Large flip card for single message display
│   └── PresetCard.tsx # Small flip card for preset gallery
└── lib/
    ├── codon.ts       # Codon translation logic (amino acid ↔ DNA)
    └── presets.ts     # Predefined messages with categories
```

## Key Concepts

- **Codon**: 3-nucleotide sequence (A/T/G/C) encoding one amino acid
- **Amino acids** have single-letter codes (e.g., M=Methionine, E=Glutamic acid)
- Letters B, J, O, U, X, Z cannot be encoded (no corresponding amino acid)
- Each amino acid can be encoded by multiple codons (degeneracy)

## Deployment

Ready for Vercel deployment - just connect the repository.
