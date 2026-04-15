#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

files_to_fix = [
    r'c:\Users\user\Code\everbloo\metis\front-reservation\src\components\booking\flight\SelectPax.vue',
    r'c:\Users\user\Code\everbloo\metis\front-reservation\src\components\sbt\booking\flight\SelectPax.vue'
]

replacements = {
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã ': 'à',
    'Ã´': 'ô',
    'Ã§': 'ç',
    'Ã¬': 'ì',
    'Ã®': 'î',
    'Ã¹': 'ù',
    'Ã»': 'û',
    'Ã¼': 'ü',
    'Ã ªtre': 'être',
    'Ãªtre': 'être',
    'Ã ª': 'ê',
    'Ãª': 'ê',
    'Ã©dÃ©': 'édé',
    'Ã©dÃ©jÃ ': 'éd éjà',
    'dÃ©jÃ ': 'déjà',
    'dÃ©jÃ': 'déjà',
    'sociÃ©tÃ©': 'société',
    'rÃ©': 'ré',
    'Ã ': 'à',
    'Ã©dÃ©': 'édé',
    'Ã©jÃ ': 'éjà',
    'Ã©lÃ©': 'élé',
    'Ã©lÃ©ment': 'élément',
    'diffÃ©rer': 'différer',
    'affichÃ©': 'affiché',
    'propÃ©tÃ©s': 'propriétés',
    'mÃªme': 'même',
    'com pÃª': 'compê',
    'Ã"': 'Ö',
    'Ã›': 'Û',
    'emoji': '',
}

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        print(f"Fichier non trouvé: {filepath}")
        continue
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        original_content = content
        
        # Faire tous les remplacements
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Écrire le fichier corrigé
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        if content != original_content:
            print(f"✓ Fichier corrigé: {filepath}")
        else:
            print(f"- Aucun changement: {filepath}")
    
    except Exception as e:
        print(f"✗ Erreur pour {filepath}: {e}")

print("\nCorrection terminée!")
