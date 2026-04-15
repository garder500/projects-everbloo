#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

files_to_fix = [
    r'c:\Users\user\Code\everbloo\metis\front-reservation\src\components\booking\flight\SelectPax.vue',
    r'c:\Users\user\Code\everbloo\metis\front-reservation\src\components\sbt\booking\flight\SelectPax.vue'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        # Replace all Ã  (with trailing space) patterns
        content = re.sub(r'Ã\s+', 'à ', content)
        # Replace all remaining Ã 
        content = content.replace('Ã ', 'à')
        # Replace remaining patterns
        content = content.replace('Ã©', 'é')
        content = content.replace('déjÃ ', 'déjà')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"OK: {os.path.basename(filepath)}")
    except Exception as e:
        print(f"ERROR: {e}")

print("Done!")
