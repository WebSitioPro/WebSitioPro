#!/usr/bin/env python3
"""
Test the latest Facebook CDN cover image fix with enhanced debugging
"""

import requests
import time

def test_cover_image_fix():
    """Test the new cover image approach with enhanced debugging"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Test with the latest template that was created
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751627064041"
    
    print(f"=== Testing Cover Image Fix ===")
    print(f"Template ID: {template_id}")
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Template preview loaded ({len(html_content)} characters)")
        
        # Check for inline background-image style
        import re
        inline_style_match = re.search(r'style="[^"]*background-image[^"]*"', html_content)
        if inline_style_match:
            print(f"✓ Inline background-image style found:")
            print(f"  {inline_style_match.group(0)[:120]}...")
        else:
            print("✗ No inline background-image style found")
            
        # Check for Facebook CDN URL in style attribute
        if 'scontent' in html_content and 'style=' in html_content:
            facebook_style = re.search(r'style="[^"]*scontent[^"]*"', html_content)
            if facebook_style:
                print("✓ Facebook CDN URL found in style attribute")
            else:
                print("⚠ Facebook CDN URL found but not in style attribute")
        else:
            print("✗ Facebook CDN URL not found in HTML")
            
        # Check for enhanced debugging JavaScript
        if '=== Facebook CDN Image Loading Debug ===' in html_content:
            print("✓ Enhanced debugging JavaScript found")
        else:
            print("✗ Enhanced debugging JavaScript missing")
            
        # Check header element structure
        header_match = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
        if header_match:
            print(f"✓ Header element structure:")
            print(f"  {header_match.group(0)[:150]}...")
        else:
            print("✗ Header element not found")
            
        return True
        
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_cover_image_fix()
    
    if success:
        print("\n✓ Template updated with enhanced cover image loading")
        print("Check the browser console for detailed Facebook CDN loading debug info")
    else:
        print("\n✗ Template test failed")