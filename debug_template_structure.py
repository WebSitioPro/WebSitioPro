#!/usr/bin/env python3
"""
Debug the template data structure to understand why heroImage isn't working
"""

import requests
import json

def debug_template_structure():
    """Debug the latest template data structure"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Get the latest Mexpat template
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751629876300"
    
    print(f"=== Debugging Template Structure ===")
    print(f"Template ID: {template_id}")
    
    try:
        response = requests.get(f"{base_url}/api/templates/{template_id}", timeout=30)
        if response.status_code == 200:
            template_data = response.json()
            
            print(f"\n=== Template Data Analysis ===")
            print(f"Template has {len(template_data.keys())} top-level fields")
            
            # Check for image-related fields
            image_fields = {}
            for key, value in template_data.items():
                if 'image' in key.lower() or 'cover' in key.lower() or 'hero' in key.lower() or 'photo' in key.lower():
                    if isinstance(value, str):
                        image_fields[key] = value[:80] + "..." if len(str(value)) > 80 else value
                    else:
                        image_fields[key] = type(value).__name__
            
            print(f"\n=== Image-Related Fields ===")
            for key, value in image_fields.items():
                print(f"{key}: {value}")
            
            # Check specific fields the template generator looks for
            generator_fields = ['coverImage', 'heroImage', 'profileImage', 'logo']
            print(f"\n=== Template Generator Expected Fields ===")
            for field in generator_fields:
                if field in template_data:
                    value = template_data[field]
                    if isinstance(value, str) and len(value) > 80:
                        print(f"✓ {field}: {value[:80]}...")
                    else:
                        print(f"✓ {field}: {value}")
                else:
                    print(f"✗ {field}: NOT FOUND")
            
            # Check if it's in the old format (as stored by Make webhook)
            print(f"\n=== Make Webhook Fields Check ===")
            make_fields = ['name', 'phone', 'address', 'place_id', 'facebook_url']
            for field in make_fields:
                if field in template_data:
                    print(f"✓ {field}: Found (Make webhook format)")
                else:
                    print(f"✗ {field}: Not found")
            
            # Show full structure for debugging
            print(f"\n=== Full Template Data Keys ===")
            keys = list(template_data.keys())
            keys.sort()
            for i, key in enumerate(keys):
                value_type = type(template_data[key]).__name__
                if isinstance(template_data[key], str) and len(template_data[key]) > 50:
                    preview = f"{template_data[key][:50]}..."
                elif isinstance(template_data[key], (list, dict)):
                    if isinstance(template_data[key], list):
                        preview = f"Array with {len(template_data[key])} items"
                    else:
                        preview = f"Object with {len(template_data[key])} keys"
                else:
                    preview = str(template_data[key])
                    
                print(f"{i+1:2d}. {key} ({value_type}): {preview}")
            
            return True
            
        else:
            print(f"✗ Failed to get template data: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    debug_template_structure()