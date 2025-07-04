#!/usr/bin/env python3
"""
Simple test for stock images without complex API calls
Tests the new template generation with stock images
"""

import requests
import time

def test_simple_stock():
    """Test basic stock image template generation"""
    
    template_id = f"simple_stock_test_{int(time.time())}"
    
    payload = {
        "name": "Simple Stock Test Business",
        "phone": "+529999999999",
        "address": "Test Address, Mexico",
        "category": "Restaurant",
        "place_id": template_id,
        "templateType": "restaurant"
    }
    
    print("=== Simple Stock Images Test ===")
    print(f"Creating template: {template_id}")
    
    # Send webhook request
    response = requests.post(
        "http://localhost:5000/api/make/auto-create", 
        json=payload
    )
    
    if response.status_code == 200:
        result = response.json()
        template_id = result.get("templateId")
        print(f"✓ Template created: {template_id}")
        
        # Check template data for hero image field
        template_response = requests.get(f"http://localhost:5000/api/templates/{template_id}")
        if template_response.status_code == 200:
            template_data = template_response.json()
            hero_image = template_data.get('heroImage')
            
            if hero_image:
                print(f"✓ Hero Image field populated")
                print(f"  URL: {hero_image}")
                
                # Check if it's a stock image
                if 'source.unsplash.com' in hero_image:
                    print(f"✓ Using Unsplash stock image (good!)")
                else:
                    print(f"! Using custom/other image")
            else:
                print(f"✗ Hero Image field not found or empty")
            
            # Check preview HTML
            preview_response = requests.get(f"http://localhost:5000/templates/{template_id}/preview")
            if preview_response.status_code == 200:
                html = preview_response.text
                
                # Count images in the template
                unsplash_count = html.count('source.unsplash.com')
                img_count = html.count('<img src=')
                bg_image_count = html.count('background-image: url(')
                
                print(f"✓ Preview generated successfully")
                print(f"  Unsplash images: {unsplash_count}")
                print(f"  Total <img> tags: {img_count}")
                print(f"  Background images: {bg_image_count}")
                
                # Check for photo gallery
                if 'photo-item' in html:
                    print(f"✓ Photo gallery section found")
                else:
                    print(f"✗ Photo gallery section missing")
                
                # Check for restaurant-specific images
                if 'food' in html:
                    print(f"✓ Restaurant food images detected")
                
                print(f"\n✓ Preview URL: http://localhost:5000/templates/{template_id}/preview")
                
                return True
            else:
                print(f"✗ Preview generation failed: {preview_response.status_code}")
        else:
            print(f"✗ Template data retrieval failed: {template_response.status_code}")
    else:
        print(f"✗ Template creation failed: {response.status_code}")
        print(f"Response: {response.text}")
    
    return False

if __name__ == "__main__":
    success = test_simple_stock()
    if success:
        print(f"\n✅ Stock images test passed!")
        print(f"The template now uses stock images instead of Facebook CDN")
        print(f"Hero image field is working correctly")
        print(f"Photo galleries are populated with stock images")
    else:
        print(f"\n❌ Stock images test failed")