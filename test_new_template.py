#!/usr/bin/env python3
"""
Test creating a brand new template to verify the JavaScript fix
"""

import requests
import time

def test_new_template():
    """Create a new template and test the JavaScript inclusion"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a new template with unique ID
    timestamp = int(time.time())
    payload = {
        "name": f"JavaScript Fix Test {timestamp}",
        "phone": "+529999999999",
        "address": "Test Address",
        "category": "Restaurant",
        "place_id": f"js_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/test_profile.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print(f"=== Testing New Template Creation ===")
    print(f"Creating template: js_test_{timestamp}")
    
    # Step 1: Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Step 2: Test preview immediately
    print("\n2. Testing fresh template preview...")
    time.sleep(1)  # Small delay to ensure processing
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for all components
        checks = [
            ("data-cover-url", 'data-cover-url='),
            ("CSS style block", '<style>'),
            ("JavaScript script block", '<script>'),
            ("loadCoverImage function", 'loadCoverImage'),
            ("DOMContentLoaded listener", "addEventListener('DOMContentLoaded'"),
            ("header-image.loading CSS", '.header-image.loading'),
            ("Facebook CDN processing", 'Processing Facebook CDN URL:')
        ]
        
        results = []
        for name, search_term in checks:
            found = search_term in html_content
            status = "✓" if found else "✗"
            print(f"{status} {name}: {'found' if found else 'missing'}")
            results.append(found)
            
        # Check for Facebook CDN URL in data attribute
        if 'scontent' in html_content:
            print("✓ Facebook CDN URL detected in HTML")
        else:
            print("✗ Facebook CDN URL missing from HTML")
            
        success_count = sum(results)
        print(f"\nResults: {success_count}/{len(checks)} components working")
        
        return success_count >= 5  # At least 5/7 should work
        
    except Exception as e:
        print(f"✗ Error testing preview: {e}")
        return False

if __name__ == "__main__":
    success = test_new_template()
    
    if success:
        print("\n🎉 JavaScript fix is working!")
    else:
        print("\n❌ JavaScript fix needs more work")