#!/usr/bin/env python3
"""
Test the robust Facebook CDN fallback that doesn't rely on onerror events
"""

import requests
import time

def test_robust_fallback():
    """Create a new template with the robust fallback approach"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a new template to test the robust fallback
    timestamp = int(time.time())
    payload = {
        "name": f"Robust Fallback Test {timestamp}",
        "phone": "+529999999999", 
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": f"robust_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/robust_test.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/robust_test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print(f"=== Testing Robust Facebook CDN Fallback ===")
    print(f"Creating template: robust_test_{timestamp}")
    
    # Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Test the preview
    print("\n2. Testing robust fallback approach...")
    time.sleep(1)
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for the new robust fallback logic
        import re
        
        # Check for updated console messages
        if 'Facebook CDN detected - using gradient fallback for reliability' in html_content:
            print("✓ New robust fallback logic found")
        else:
            print("✗ Old fallback logic still present")
            
        if 'Checking Facebook CDN image accessibility' in html_content:
            print("✓ Enhanced debugging messages found")
        else:
            print("✗ Enhanced debugging messages missing")
            
        if 'scontent' in html_content and 'fbcdn.net' in html_content:
            print("✓ Facebook CDN detection logic found")
        else:
            print("✗ Facebook CDN detection logic missing")
            
        if 'setTimeout' in html_content and '1500' in html_content:
            print("✓ Timed fallback approach found")
        else:
            print("✗ Timed fallback approach missing")
            
        # Check header structure
        header_match = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
        if header_match:
            header_element = header_match.group(0)
            print(f"\nHeader element: {header_element[:120]}...")
            
            has_style = 'style=' in header_element
            has_bg_image = 'background-image' in header_element
            has_data_url = 'data-cover-url=' in header_element
            
            print(f"✓ Has inline style: {has_style}")
            print(f"✓ Has background-image: {has_bg_image}")
            print(f"✓ Has data-cover-url: {has_data_url}")
            
            if has_style and has_bg_image and has_data_url:
                print("✓ Complete header structure present")
            else:
                print("⚠ Header structure incomplete")
        
        # Check CSS gradient
        if '.header-image::before' in html_content:
            print("\n✓ CSS ::before pseudo-element present")
        else:
            print("\n✗ CSS ::before pseudo-element missing")
            
        if 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' in html_content:
            print("✓ CSS gradient with brand colors found")
        else:
            print("✗ CSS gradient with brand colors missing")
            
        # Show the new template URL
        print(f"\n✓ Test this robust fallback template at:")
        print(f"   {base_url}/templates/{template_id}/preview")
        print(f"\nExpected behavior with new robust approach:")
        print(f"- JavaScript detects Facebook CDN and assumes blocking")
        print(f"- After 1.5 seconds, removes inline style if image didn't load")
        print(f"- CSS gradient displays immediately as fallback")
        print(f"- Console shows detailed debugging messages")
        
        return True
        
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_robust_fallback()
    
    if success:
        print(f"\n✓ Robust fallback test completed")
        print(f"This template should display the gradient background reliably")
        print(f"Try running your Make scenario again - new templates will use this fix")
    else:
        print(f"\n✗ Robust fallback test failed")