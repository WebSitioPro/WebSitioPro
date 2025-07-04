#!/usr/bin/env python3
"""
Test stock images integration and hero image field functionality
Creates templates with different business types to verify stock image categories
"""

import requests
import json
import time

def test_stock_images():
    """Test stock images with different business categories"""
    
    test_businesses = [
        {
            "name": "Professional Services Test",
            "templateType": "professionals",
            "category": "Professional Services"
        },
        {
            "name": "Restaurant Test",
            "templateType": "restaurant", 
            "category": "Restaurant"
        },
        {
            "name": "Tourism Test",
            "templateType": "tourism",
            "category": "Tourism"
        },
        {
            "name": "Retail Test",
            "templateType": "retail",
            "category": "Retail"
        },
        {
            "name": "General Services Test",
            "templateType": "services",
            "category": "Services"
        }
    ]
    
    print("=== Testing Stock Images Integration ===")
    
    for business in test_businesses:
        template_id = f"stock_test_{business['templateType']}_{int(time.time())}"
        
        payload = {
            "name": business["name"],
            "phone": "+529999999999",
            "address": "Test Address, Mexico",
            "category": business["category"],
            "place_id": template_id,
            "templateType": business["templateType"]
        }
        
        print(f"\n--- Testing {business['name']} ---")
        
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
                    print(f"✓ Hero Image field populated: {hero_image[:50]}...")
                    
                    # Check if it's a stock image
                    if 'source.unsplash.com' in hero_image:
                        print(f"✓ Using Unsplash stock image")
                    else:
                        print(f"! Using custom image: {hero_image[:50]}...")
                else:
                    print(f"✗ Hero Image field not found or empty")
                
                # Check preview HTML for images
                preview_response = requests.get(f"http://localhost:5000/templates/{template_id}/preview")
                if preview_response.status_code == 200:
                    html = preview_response.text
                    
                    # Count stock images in gallery
                    unsplash_count = html.count('source.unsplash.com')
                    print(f"✓ Preview loaded with {unsplash_count} Unsplash images")
                    
                    # Check for specific business category images
                    if business['templateType'] == 'restaurant' and 'food' in html:
                        print(f"✓ Restaurant-specific food images detected")
                    elif business['templateType'] == 'tourism' and 'travel' in html:
                        print(f"✓ Tourism-specific travel images detected")
                    elif business['templateType'] == 'professionals' and 'professional' in html:
                        print(f"✓ Professional-specific images detected")
                    
                    print(f"   Preview URL: http://localhost:5000/templates/{template_id}/preview")
                else:
                    print(f"✗ Preview generation failed")
            else:
                print(f"✗ Template data retrieval failed")
        else:
            print(f"✗ Template creation failed: {response.status_code}")
    
    print(f"\n=== Stock Images Test Complete ===")
    print(f"All templates should now have:")
    print(f"- Hero Image field populated with appropriate stock images")
    print(f"- Photo galleries with 6 stock images each")
    print(f"- Business-category specific image themes")
    print(f"- No Facebook CDN dependencies")

def test_stock_api():
    """Test the stock image API endpoint"""
    print(f"\n=== Testing Stock Image API ===")
    
    test_categories = ['business', 'food', 'travel', 'professional', 'office']
    
    for category in test_categories:
        response = requests.get(f"http://localhost:5000/api/stock-image?category={category}&width=800&height=600")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ {category}: {data['imageUrl']}")
        else:
            print(f"✗ {category}: Failed ({response.status_code})")

if __name__ == "__main__":
    test_stock_api()
    test_stock_images()