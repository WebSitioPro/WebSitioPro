#!/usr/bin/env python3
"""
Test the template generator directly to see what HTML is being produced
"""

import requests
import json

def test_template_generator():
    """Test the template generator by generating and examining the HTML"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Create a fresh test template
    payload = {
        "name": "Template Generator Test",
        "phone": "+529999999999",
        "address": "Test Address",
        "category": "Restaurant",
        "place_id": "template_gen_test",
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/test_profile.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print("=== Testing Template Generator ===")
    
    # Step 1: Create template
    print("1. Creating template...")
    response = requests.post(f"{base_url}/api/make/auto-create", json=payload, timeout=30)
    if response.status_code != 200:
        print(f"✗ Template creation failed: {response.status_code}")
        return False
        
    template_data = response.json()
    template_id = template_data.get('templateId')
    print(f"✓ Template created: {template_id}")
    
    # Step 2: Generate static files
    print("\n2. Generating static files...")
    response = requests.post(f"{base_url}/api/generate-static", json={"templateId": template_id}, timeout=30)
    if response.status_code != 200:
        print(f"✗ Static generation failed: {response.status_code} - {response.text}")
        return False
    
    generation_data = response.json()
    print(f"✓ Static files generated: {generation_data}")
    
    # Step 3: Check if we can access the static files
    print("\n3. Checking static file access...")
    try:
        response = requests.get(f"{base_url}/static/{template_id}/index.html", timeout=30)
        if response.status_code == 200:
            html_content = response.text
            print(f"✓ Static HTML accessible ({len(html_content)} characters)")
            
            # Check for data-cover-url
            if 'data-cover-url' in html_content:
                print("✓ data-cover-url found in static HTML")
                # Extract and display the URL
                import re
                match = re.search(r'data-cover-url="([^"]*)"', html_content)
                if match:
                    print(f"Cover URL: {match.group(1)[:80]}...")
            else:
                print("✗ data-cover-url missing from static HTML")
                
            # Check for JavaScript
            if 'loadCoverImage' in html_content:
                print("✓ JavaScript image loading code found")
            else:
                print("✗ JavaScript image loading code missing")
                
        else:
            print(f"✗ Static HTML not accessible: {response.status_code}")
            
    except Exception as e:
        print(f"✗ Error accessing static files: {e}")
    
    # Step 4: Test the template preview route
    print("\n4. Testing template preview route...")
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code == 200:
            html_content = response.text
            print(f"✓ Template preview accessible ({len(html_content)} characters)")
            
            # Check for data-cover-url
            if 'data-cover-url' in html_content:
                print("✓ data-cover-url found in preview HTML")
                # Extract and display the URL
                import re
                match = re.search(r'data-cover-url="([^"]*)"', html_content)
                if match:
                    print(f"Cover URL: {match.group(1)[:80]}...")
            else:
                print("✗ data-cover-url missing from preview HTML")
                
        else:
            print(f"✗ Template preview not accessible: {response.status_code}")
            
    except Exception as e:
        print(f"✗ Error accessing template preview: {e}")
        
    return True

if __name__ == "__main__":
    test_template_generator()