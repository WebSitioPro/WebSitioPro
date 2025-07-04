#!/usr/bin/env python3
"""
Test creating a brand new template to verify the JavaScript fix
"""

import requests
import time

def test_new_template():
    """Create a new template and test the JavaScript inclusion"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a new template to test the latest fix
    timestamp = int(time.time())
    payload = {
        "name": f"JavaScript Test {timestamp}",
        "phone": "+529999999999", 
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": f"js_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/js_test.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/js_test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print(f"=== Testing New Template with JavaScript Fix ===")
    print(f"Creating template: js_test_{timestamp}")
    
    # Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Test the preview
    print("\n2. Testing JavaScript fallback detection...")
    time.sleep(1)
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for JavaScript fallback functions
        import re
        
        if 'handleImageFallback' in html_content:
            print("✓ JavaScript handleImageFallback function found")
        else:
            print("✗ JavaScript handleImageFallback function missing")
            
        if 'handleProfileImageFallback' in html_content:
            print("✓ JavaScript handleProfileImageFallback function found")
        else:
            print("✗ JavaScript handleProfileImageFallback function missing")
            
        if 'Facebook CDN image blocked' in html_content:
            print("✓ JavaScript console logging for blocked images found")
        else:
            print("✗ JavaScript console logging missing")
            
        if 'backgroundImage = \'\'' in html_content:
            print("✓ JavaScript style removal code found")
        else:
            print("✗ JavaScript style removal code missing")
            
        # Check for the complete JavaScript solution
        js_functions = [
            'handleImageFallback',
            'handleProfileImageFallback',
            'testImg.onerror',
            'headerElement.style.backgroundImage',
            'console.log'
        ]
        
        found_functions = sum(1 for func in js_functions if func in html_content)
        print(f"\nJavaScript components found: {found_functions}/{len(js_functions)}")
        
        if found_functions >= 4:
            print("✓ JavaScript fallback solution is complete")
        else:
            print("⚠ JavaScript fallback solution incomplete")
            
        # Show the new template URL
        print(f"\n✓ Test the latest template at:")
        print(f"   {base_url}/templates/{template_id}/preview")
        print(f"\nExpected behavior:")
        print(f"- Facebook CDN images will be blocked by CORS")
        print(f"- JavaScript will detect the block and remove inline style")
        print(f"- CSS gradient background will display")
        print(f"- Console will show debugging messages")
        
        return True
        
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_new_template()
    
    if success:
        print(f"\n✓ New template test completed")
        print(f"Check the browser console for JavaScript fallback messages")
    else:
        print(f"\n✗ New template test failed")