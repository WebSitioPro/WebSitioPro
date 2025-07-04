#!/usr/bin/env python3
"""
Test template regeneration with fixed Facebook CDN image mapping
"""

import requests
import json
import re

def test_regenerate_template():
    """Test regenerating the template with Facebook CDN image fixes"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "facebook_cdn_complete_test_1751626468167"
    
    print(f"=== Testing Template Regeneration ===")
    print(f"Template ID: {template_id}")
    
    # Step 1: Regenerate template
    print("\n1. Regenerating template with Facebook CDN fixes...")
    try:
        response = requests.post(f"{base_url}/api/templates/{template_id}/generate", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Regeneration failed: {response.status_code} - {response.text}")
            return False
            
        print("✓ Template regenerated successfully")
        
    except Exception as e:
        print(f"✗ Regeneration failed: {e}")
        return False
    
    # Step 2: Test the preview
    print("\n2. Testing updated template preview...")
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        
        # Check if Facebook CDN URL is now in data-cover-url
        if 'data-cover-url' in html_content:
            # Extract the data-cover-url value
            data_cover_match = re.search(r'data-cover-url="([^"]*)"', html_content)
            if data_cover_match:
                cover_url = data_cover_match.group(1)
                print(f"✓ Cover URL found: {cover_url[:80]}...")
                
                # Check if essential Facebook CDN parameters are preserved
                if 'scontent' in cover_url and '_nc_cat' in cover_url:
                    print("✓ Facebook CDN URL properly preserved")
                else:
                    print("⚠ Facebook CDN URL may not be complete")
                    
                # Check if JavaScript loading code is present
                if 'loadCoverImage' in html_content:
                    print("✓ Facebook CDN image loading JavaScript present")
                else:
                    print("✗ Facebook CDN image loading JavaScript missing")
                    
            else:
                print("✗ data-cover-url value not found")
                return False
        else:
            print("✗ data-cover-url attribute still missing")
            return False
            
        # Check for CSS classes
        if 'header-image.loading' in html_content:
            print("✓ CSS fallback classes present")
        else:
            print("⚠ CSS fallback classes missing")
            
        print(f"✓ Template preview: {base_url}/templates/{template_id}/preview")
        
    except Exception as e:
        print(f"✗ Preview test failed: {e}")
        return False
    
    print("\n=== Regeneration Test Complete ===")
    return True

if __name__ == "__main__":
    success = test_regenerate_template()
    
    if success:
        print("\n🎉 Template regeneration successful!")
        print("Facebook CDN image loading should now work properly")
    else:
        print("\n❌ Template regeneration had issues")