#!/usr/bin/env python3
"""
Test /api/test endpoint with specified payload
"""

import requests
import json

def test_api_endpoint():
    """Test the /api/test endpoint with the specified payload"""
    
    # Test both local and external URLs
    urls = [
        "http://localhost:5000/api/test",
        "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev/api/test"
    ]
    
    payload = {
        "name": "Tulum Bakery",
        "address": "Calle Saturno 789",
        "phone": "+529834567890",
        "category": "Proximity",
        "place_id": "tulum_bakery_001",
        "facebook_url": "https://facebook.com/tulumbakery"
    }
    
    headers = {"Content-Type": "application/json"}
    
    print("=== Testing /api/test Endpoint ===")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    print(f"Headers: {json.dumps(headers, indent=2)}")
    
    for i, url in enumerate(urls, 1):
        print(f"\nTest {i}: {url}")
        
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            # Try to parse as JSON first
            try:
                json_response = response.json()
                print(f"JSON Response: {json.dumps(json_response, indent=2)}")
            except:
                print(f"Text Response: {response.text[:200]}...")
            
            if response.status_code == 200:
                print("✓ SUCCESS: Endpoint is working")
            else:
                print(f"✗ ERROR: Status code {response.status_code}")
                
        except Exception as e:
            print(f"✗ CONNECTION ERROR: {e}")
        
        print("-" * 50)

if __name__ == "__main__":
    test_api_endpoint()