#!/usr/bin/env python3
"""
Test Facebook CDN image loading with the Make webhook
"""

import requests
import json

def test_facebook_cdn_image():
    """Test with the actual Facebook CDN URL that was having issues"""
    
    url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev/api/make/auto-create"
    
    payload = {
        "name": "The Mexpat Experience Test",
        "phone": "+529999999999",
        "address": "Blvd. Kukulcan Km 10.5, Punta Cancun, Zona Hotelera, 77500 Cancún, Q.R., Mexico",
        "category": "Podcast",
        "place_id": "facebook_cdn_test_001",
        "facebook_url": "https://www.facebook.com/574366972421485",
        "profileImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-1/475207077_632106479259766_5242282030479994086_n.jpg?stp=c274.0.732.732a_cp0_dst-jpg_s50x50_tt6&_nc_cat=105&ccb=1-7&_nc_sid=f907e8&_nc_ohc=hstZ8fXcpNsQ7kNvwHB0-2Y&_nc_oc=AdltUa0xvT9YkqSZWGUOT4xObTPb3B0UqqlAkZlIVsl9NFRvDHrGDv4Mzh1rPcyRc5g&_nc_zt=24&_nc_ht=scontent-iad3-2.xx&edm=AJdBtusEAAAA&_nc_gid=YZS5p-sfHbsSROt0ZZ-2IQ&oh=00_AfN586wMKS-lr9_uhKmgsTI1ACCO-gsiv2Uam3XzNRwaTA&oe=686C8009",
        "coverImage": "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/475653267_122093636456756139_2141971188755740555_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dc4938&_nc_ohc=Ismw1O8IUOQQ7kNvwEwLZVL&_nc_oc=AdlTlcM0qZoV4MGDE2xI6hy0p-SVszytdZizPHy3uSOcFz3foliyeWgE8m-tMvbNxHU&_nc_zt=23&_nc_ht=scontent-iad3-2.xx&edm=AJdBtusEAAAA&_nc_gid=YZS5p-sfHbsSROt0ZZ-2IQ&oh=00_AfNhWLEx9MFheR_btPR3fsLxNHK7yifDCR95gLTTpQwNmg&oe=686C65E5"
    }
    
    headers = {"Content-Type": "application/json"}
    
    print("=== Testing Facebook CDN Image Loading Fix ===")
    print(f"URL: {url}")
    print(f"Cover Image URL: {payload['coverImage'][:100]}...")
    print(f"Profile Image URL: {payload['profileImage'][:100]}...")
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            json_response = response.json()
            print(f"Response: {json.dumps(json_response, indent=2)}")
            
            template_id = json_response.get('templateId')
            if template_id:
                print(f"\n✓ Template created successfully: {template_id}")
                print(f"Preview URL should show Facebook CDN cover image")
                print(f"Check browser console for image loading logs")
                return template_id
            else:
                print("✗ No template ID in response")
                
        else:
            print(f"✗ Error: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"✗ Request failed: {e}")
    
    return None

if __name__ == "__main__":
    template_id = test_facebook_cdn_image()
    
    if template_id:
        print(f"\nTo test the fix:")
        print(f"1. Open: https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev/templates/{template_id}/preview")
        print(f"2. Check browser console for Facebook CDN loading logs")
        print(f"3. Verify cover image displays correctly or gracefully falls back to gradient")