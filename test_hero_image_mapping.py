#!/usr/bin/env python3
"""
Test the hero image mapping fix
"""

import requests
import time

def test_hero_image_mapping():
    """Test that coverImage is properly mapped to heroImage"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a new template to test the hero image mapping
    timestamp = int(time.time())
    payload = {
        "name": f"Hero Mapping Test {timestamp}",
        "phone": "+529999999999", 
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": f"hero_test_{timestamp}",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/hero_test_profile.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/hero_test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print(f"=== Testing Hero Image Mapping Fix ===")
    print(f"Creating template: hero_test_{timestamp}")
    
    # Create template
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Check webhook response
    print(f"\n1. Checking webhook response...")
    if 'heroImage' in template_data:
        hero_image_response = template_data.get('heroImage', '')
        cover_image_response = template_data.get('coverImage', '')
        print(f"✓ Hero image in response: {hero_image_response[:60]}...")
        print(f"✓ Cover image in response: {cover_image_response[:60]}...")
        
        if hero_image_response == cover_image_response:
            print("✓ Hero image correctly mapped to cover image in response")
        else:
            print("✗ Hero image not properly mapped in response")
    else:
        print("✗ No hero image field in webhook response")
    
    # Wait for template to be ready
    time.sleep(2)
    
    # 2. Check stored template JSON data
    print("\n2. Checking stored template JSON data...")
    try:
        response = requests.get(f"{base_url}/api/templates/{template_id}", timeout=30)
        if response.status_code == 200:
            template_json = response.json()
            print(f"✓ Template data loaded")
            
            profile_image = template_json.get('profileImage', 'NOT FOUND')
            cover_image = template_json.get('coverImage', 'NOT FOUND')
            hero_image = template_json.get('heroImage', 'NOT FOUND')
            
            print(f"  Profile Image: {profile_image[:60]}...")
            print(f"  Cover Image: {cover_image[:60]}...")
            print(f"  Hero Image: {hero_image[:60]}...")
            
            if hero_image != 'NOT FOUND' and 'hero_test_cover.jpg' in hero_image:
                print("✓ Hero image field correctly populated with cover image URL")
            else:
                print("✗ Hero image field not properly populated")
                
            if cover_image != 'NOT FOUND' and 'hero_test_cover.jpg' in cover_image:
                print("✓ Cover image field correctly populated")
            else:
                print("✗ Cover image field not properly populated")
                
        else:
            print(f"✗ Failed to get template data: {response.status_code}")
    except Exception as e:
        print(f"✗ Error getting template data: {e}")
        
    # 3. Check preview HTML header
    print("\n3. Testing preview HTML header...")
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for header with background-image
        import re
        header_match = re.search(r'<header[^>]*style="[^"]*background-image[^"]*"[^>]*>', html_content)
        if header_match:
            header_element = header_match.group(0)
            print(f"✓ Header with background-image found")
            
            # Check if it has the test cover image URL
            if 'hero_test_cover.jpg' in header_element:
                print("✓ Correct cover image URL found in header background")
            else:
                print("✗ Test cover image URL not found in header")
                
        else:
            print("✗ No header with background-image found")
            
        print(f"\n✓ Test the template at:")
        print(f"   {base_url}/templates/{template_id}/preview")
        print(f"\nExpected behavior:")
        print(f"- Cover image should be visible in hero section header background")
        print(f"- Profile image should be in about/contact sections")
        print(f"- Template editor should show Hero Image field populated")
        
        return True
        
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_hero_image_mapping()
    
    if success:
        print(f"\n✓ Hero image mapping test completed")
        print(f"The cover image should now be properly mapped to heroImage field")
        print(f"Try running your Make scenario again to test with real data")
    else:
        print(f"\n✗ Hero image mapping test failed")