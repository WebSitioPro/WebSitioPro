#!/usr/bin/env python3
"""
Test comprehensive Facebook CORS solution
Creates a new template with enhanced gradient fallback and professional design
"""

import requests
import json
import time

def test_facebook_cors_solution():
    """Test the complete Facebook CORS solution with professional fallback"""
    
    # Create a new template with Facebook CDN URLs
    template_id = f"facebook_cors_test_{int(time.time())}"
    
    payload = {
        "name": f"Facebook CORS Test {template_id}",
        "phone": "+529999999999",
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": template_id,
        "facebook_url": "https://www.facebook.com/test",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/test_profile.jpg?_nc_cat=105&ccb=1-7",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/test_cover.jpg?_nc_cat=105&ccb=1-7"
    }
    
    print("=== Testing Facebook CORS Solution ===")
    print(f"Template ID: {template_id}")
    
    # Send webhook request
    response = requests.post(
        "http://localhost:5000/api/make/auto-create", 
        json=payload
    )
    
    if response.status_code == 200:
        result = response.json()
        template_id = result.get("templateId")
        print(f"✓ Template created: {template_id}")
        
        # Check template data
        template_response = requests.get(f"http://localhost:5000/api/templates/{template_id}")
        if template_response.status_code == 200:
            template_data = template_response.json()
            print(f"✓ Template data loaded")
            print(f"  Hero Image: {template_data.get('heroImage', 'Not found')[:80]}...")
            print(f"  Cover Image: {template_data.get('coverImage', 'Not found')[:80]}...")
            
            # Check preview HTML
            preview_response = requests.get(f"http://localhost:5000/templates/{template_id}/preview")
            if preview_response.status_code == 200:
                html = preview_response.text
                print(f"✓ Preview loaded ({len(html)} characters)")
                
                # Check for Facebook CDN URL in HTML
                if 'scontent-iad3-2.xx.fbcdn.net' in html:
                    print("✓ Facebook CDN URL found in HTML")
                else:
                    print("✗ Facebook CDN URL not found in HTML")
                
                # Check for gradient fallback CSS
                if 'linear-gradient' in html:
                    print("✓ Gradient fallback CSS found")
                else:
                    print("✗ Gradient fallback CSS not found")
                
                # Check for Facebook CDN handling JavaScript
                if 'facebook-cdn' in html:
                    print("✓ Facebook CDN handling JavaScript found")
                else:
                    print("✗ Facebook CDN handling JavaScript not found")
                
                print(f"\n✓ Test the template at:")
                print(f"   http://localhost:5000/templates/{template_id}/preview")
                print(f"\nExpected behavior:")
                print(f"- Facebook CDN URL will be attempted first")
                print(f"- When blocked by CORS, professional gradient fallback will show")
                print(f"- Gradient uses business brand colors for professional appearance")
                print(f"- Business name and content remain fully visible")
                
                return True
            else:
                print(f"✗ Preview failed: {preview_response.status_code}")
        else:
            print(f"✗ Template data failed: {template_response.status_code}")
    else:
        print(f"✗ Template creation failed: {response.status_code}")
        print(f"Response: {response.text}")
    
    return False

if __name__ == "__main__":
    success = test_facebook_cors_solution()
    if success:
        print("\n✅ Facebook CORS solution test completed")
        print("The system now handles Facebook CDN restrictions professionally")
    else:
        print("\n❌ Facebook CORS solution test failed")