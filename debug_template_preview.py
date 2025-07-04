#!/usr/bin/env python3
"""
Debug the exact template preview to see what's happening with the cover image
"""

import requests
import re

def debug_template_preview():
    """Debug the specific template that was just created"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751626655994"
    
    print(f"=== Debugging Template Preview ===")
    print(f"Template ID: {template_id}")
    
    # Get the template preview
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Template preview loaded ({len(html_content)} characters)")
        
        # Search for header element
        header_match = re.search(r'<header[^>]*>', html_content)
        if header_match:
            print(f"Header element: {header_match.group(0)}")
        else:
            print("✗ No header element found")
            
        # Search for data-cover-url
        data_cover_match = re.search(r'data-cover-url="([^"]*)"', html_content)
        if data_cover_match:
            print(f"✓ data-cover-url found: {data_cover_match.group(1)[:80]}...")
        else:
            print("✗ data-cover-url attribute missing")
            
        # Search for style attribute with background-image
        style_match = re.search(r'style="[^"]*background-image[^"]*"', html_content)
        if style_match:
            print(f"Style with background-image: {style_match.group(0)[:100]}...")
        else:
            print("✗ No inline style with background-image found")
            
        # Search for Facebook CDN URLs anywhere in the HTML
        fb_cdn_matches = re.findall(r'https://scontent[^"\s]*', html_content)
        if fb_cdn_matches:
            print(f"✓ Found {len(fb_cdn_matches)} Facebook CDN URLs in HTML:")
            for i, url in enumerate(fb_cdn_matches[:3]):  # Show first 3
                print(f"  {i+1}. {url[:80]}...")
        else:
            print("✗ No Facebook CDN URLs found in HTML")
            
        # Search for JavaScript image loading code
        if 'loadCoverImage' in html_content:
            print("✓ JavaScript image loading function found")
        else:
            print("✗ JavaScript image loading function missing")
            
        # Search for CSS classes
        if 'header-image.loading' in html_content:
            print("✓ CSS fallback classes found")
        else:
            print("✗ CSS fallback classes missing")
            
        return True
        
    except Exception as e:
        print(f"✗ Error debugging template: {e}")
        return False

if __name__ == "__main__":
    debug_template_preview()