#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

files_to_fix = [
    r'c:\Users\user\Code\everbloo\metis\front-reservation\src\components\booking\flight\SelectPax.vue',
    r'c:\Users\user\Code\everbloo\metis\front-reservation\src\components\sbt\booking\flight\SelectPax.vue'
]

# Comprehensive map of malformed UTF-8 sequences to correct UTF-8
replacements = {
    'Ã©': 'é', 'Ã¨': 'è', 'Ã ': 'à', 'Ã´': 'ô', 'Ã§': 'ç',
    'Ã¬': 'ì', 'Ã®': 'î', 'Ã¹': 'ù', 'Ã»': 'û', 'Ã¼': 'ü',
    'Ã ªtre': 'être', 'Ãªtre': 'être', 'Ã ª': 'ê', 'Ãª': 'ê',
    'Ã«': 'ë', 'Ã¡': 'á', 'Ã¢': 'â', 'Ã£': 'ã', 'Ã¥': 'å',
    'Ã': 'À', 'Â': 'Â', 'Ã‰': 'É', 'Ã': 'È',
    'arrÃªte': 'arrête', 'Ã©tÃ©': 'été', 'dÃ©jÃ ': 'déjà',
    'mÃªme': 'même', 'â†'': '→', 'ðŸ': '🟘',
}

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"❌ Fichier non trouvé: {filepath}")
        continue
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original_size = len(content)
        
        # Apply all replacements
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Write corrected file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Fichier corrigé: {filepath}")
    
    except Exception as e:
        print(f"❌ Erreur pour {filepath}: {e}")

print("\n✨ Correction complète!")
