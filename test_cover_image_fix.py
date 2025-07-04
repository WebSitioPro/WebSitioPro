#!/usr/bin/env python3
"""
Test the latest Facebook CDN cover image fix with enhanced debugging
"""

import requests
import time

def test_cover_image_fix():
    """Test the new cover image approach with enhanced debugging"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a new template to test the cover image fix
    timestamp = int(time.time())
    payload = {
        "name": f"Cover Image Test {timestamp}",
        "phone": "+529999999999", 
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": f"cover_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/cover_test.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/cover_test_hero.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print(f"=== Testing Cover Image Fix ===")
    print(f"Creating template: cover_test_{timestamp}")
    
    # Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Wait for template to be ready
    time.sleep(2)
    
    # 1. Check template JSON data
    print("\n1. Checking template JSON data...")
    try:
        response = requests.get(f"{base_url}/api/templates/{template_id}", timeout=30)
        if response.status_code == 200:
            template_json = response.json()
            print(f"✓ Template data loaded")
            print(f"  Profile Image: {template_json.get('profileImage', 'NOT FOUND')[:60]}...")
            print(f"  Cover Image: {template_json.get('coverImage', 'NOT FOUND')[:60]}...")
            print(f"  Hero Image: {template_json.get('heroImage', 'NOT FOUND')[:60]}...")
        else:
            print(f"✗ Failed to get template data: {response.status_code}")
    except Exception as e:
        print(f"✗ Error getting template data: {e}")
        
    # 2. Check preview HTML
    print("\n2. Testing preview HTML...")
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for inline background-image style
        import re
        
        # Look for header with background-image
        header_match = re.search(r'<header[^>]*style="[^"]*background-image[^"]*"[^>]*>', html_content)
        if header_match:
            header_element = header_match.group(0)
            print(f"✓ Header with background-image found:")
            print(f"  {header_element[:120]}...")
            
            # Check if it has the test cover image URL
            if 'cover_test_hero.jpg' in header_element:
                print("✓ Correct cover image URL found in header")
            else:
                print("✗ Test cover image URL not found in header")
                
            # Check if it has the profile image URL (should NOT be in header)
            if 'cover_test.jpg' in header_element:
                print("⚠ Profile image URL found in header (should be cover image)")
            else:
                print("✓ Profile image URL correctly NOT in header")
                
        else:
            print("✗ No header with background-image found")
            
        # Check for profile image in img tags
        profile_img_matches = re.findall(r'<img[^>]*src="[^"]*cover_test\.jpg[^"]*"[^>]*>', html_content)
        if profile_img_matches:
            print(f"✓ Profile image found in {len(profile_img_matches)} img tag(s)")
        else:
            print("✗ Profile image not found in any img tags")
            
        # Check for gradient fallback CSS
        if 'linear-gradient' in html_content and 'var(--primary)' in html_content:
            print("✓ CSS gradient fallback found")
        else:
            print("✗ CSS gradient fallback missing")
            
        # Check for JavaScript fallback
        if 'Facebook CDN detected - using gradient fallback for reliability' in html_content:
            print("✓ JavaScript fallback for Facebook CDN found")
        else:
            print("✗ JavaScript fallback for Facebook CDN missing")
            
        print(f"\n✓ Test the template at:")
        print(f"   {base_url}/templates/{template_id}/preview")
        print(f"\nExpected behavior:")
        print(f"- Cover image should be in header background (may show gradient if blocked)")
        print(f"- Profile image should be in about/contact section")
        print(f"- Console should show fallback messages")
        
        return True
        
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_cover_image_fix()
    
    if success:
        print(f"\n✓ Cover image fix test completed")
        print(f"The cover image should now appear in the header background")
    else:
        print(f"\n✗ Cover image fix test failed")