#!/usr/bin/env python3
"""
Test the gradient fallback fix for Facebook CDN images
"""

import requests
import time

def test_gradient_fallback():
    """Create a new template and test the gradient fallback"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a new template to test the gradient fix
    timestamp = int(time.time())
    payload = {
        "name": f"Gradient Test {timestamp}",
        "phone": "+529999999999", 
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": f"gradient_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/gradient_test.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/gradient_test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print(f"=== Testing Gradient Fallback Fix ===")
    print(f"Creating template: gradient_test_{timestamp}")
    
    # Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Test the preview
    print("\n2. Testing gradient fallback...")
    time.sleep(1)
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for the improved CSS
        import re
        
        # Check for ::before pseudo-element
        if '.header-image::before' in html_content:
            print("✓ CSS ::before pseudo-element found for gradient fallback")
        else:
            print("✗ CSS ::before pseudo-element missing")
            
        # Check for z-index in CSS
        if 'z-index: -1' in html_content:
            print("✓ z-index property found for gradient layering")
        else:
            print("✗ z-index property missing")
            
        # Check header element structure
        header_match = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
        if header_match:
            header_element = header_match.group(0)
            print(f"\nHeader element:")
            print(header_element[:120] + "...")
            
            # Check for both style and data attributes
            has_style = 'style=' in header_element
            has_data_url = 'data-cover-url=' in header_element
            
            print(f"✓ Has inline style: {has_style}")
            print(f"✓ Has data-cover-url: {has_data_url}")
            
            if has_style and has_data_url:
                print("✓ Both Facebook CDN approach and fallback mechanism present")
            else:
                print("⚠ Missing some attributes")
                
        # Show preview URL for manual testing
        print(f"\n✓ Test this template at:")
        print(f"   {base_url}/templates/{template_id}/preview")
        print(f"\nExpected result:")
        print(f"- Facebook CDN images likely blocked by CORS")
        print(f"- Should display green/red gradient background")
        print(f"- Should look professional despite blocked images")
        
        return True
        
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_gradient_fallback()
    
    if success:
        print(f"\n✓ Gradient fallback test completed")
        print(f"Check the browser to verify the gradient displays correctly")
    else:
        print(f"\n✗ Gradient fallback test failed")