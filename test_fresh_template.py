#!/usr/bin/env python3
"""
Create a completely fresh template to test the inline background-image fix
"""

import requests
import time

def test_fresh_template():
    """Create a new template and test the inline background-image style"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a brand new template
    timestamp = int(time.time())
    payload = {
        "name": f"Cover Image Test {timestamp}",
        "phone": "+529999999999", 
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": f"cover_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/test_profile.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f907e8",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/test_cover.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dc4938"
    }
    
    print(f"=== Testing Fresh Template with Inline Background ===")
    print(f"Creating new template: cover_test_{timestamp}")
    
    # Step 1: Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Step 2: Test the preview immediately
    print("\n2. Testing fresh template preview...")
    time.sleep(1)  # Small delay
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for inline background-image style
        import re
        inline_bg_match = re.search(r'style="[^"]*background-image:\s*url\([^)]*\)[^"]*"', html_content)
        if inline_bg_match:
            print("✓ Inline background-image style found:")
            print(f"  {inline_bg_match.group(0)[:100]}...")
            
            # Check if it contains Facebook CDN URL
            if 'scontent' in inline_bg_match.group(0):
                print("✓ Facebook CDN URL found in inline style")
            else:
                print("⚠ Background style found but no Facebook CDN URL")
        else:
            print("✗ No inline background-image style found")
            
            # Check if the header element exists at all
            header_match = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
            if header_match:
                print(f"Header element found: {header_match.group(0)[:120]}...")
            else:
                print("✗ Header element not found")
        
        # Check for data-cover-url attribute
        if 'data-cover-url=' in html_content:
            print("✓ data-cover-url attribute found")
        else:
            print("✗ data-cover-url attribute missing")
            
        # Check for enhanced debugging
        if '=== Facebook CDN Image Loading Debug ===' in html_content:
            print("✓ Enhanced debugging JavaScript included")
        else:
            print("✗ Enhanced debugging JavaScript missing")
            
        # Show some raw HTML for debugging
        header_start = html_content.find('<header')
        if header_start != -1:
            header_end = html_content.find('>', header_start) + 1
            header_tag = html_content[header_start:header_end]
            print(f"\nHeader tag HTML: {header_tag}")
        
        return True
        
    except Exception as e:
        print(f"✗ Error testing preview: {e}")
        return False

if __name__ == "__main__":
    success = test_fresh_template()
    
    if success:
        print("\n✓ Fresh template test completed")
    else:
        print("\n✗ Fresh template test failed")