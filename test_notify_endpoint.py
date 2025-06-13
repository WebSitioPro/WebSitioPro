#!/usr/bin/env python3
"""
Test /api/notify endpoint with specified payload
"""

import requests
import json

def test_notify_endpoint():
    """Test the /api/notify endpoint with the specified payload"""
    
    # Test both local and external URLs
    urls = [
        "http://localhost:5000/api/notify",
        "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev/api/notify"
    ]
    
    payload = {
        "place_id": "tulum_bakery_001",
        "status": "added_to_sheets"
    }
    
    headers = {"Content-Type": "application/json"}
    
    print("=== Testing /api/notify Endpoint ===")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    print(f"Headers: {json.dumps(headers, indent=2)}")
    print(f"Expected Response: {{'status': 'notified', 'place_id': 'tulum_bakery_001'}}")
    
    for i, url in enumerate(urls, 1):
        print(f"\nTest {i}: {url}")
        
        try:
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            # Try to parse as JSON
            try:
                json_response = response.json()
                print(f"JSON Response: {json.dumps(json_response, indent=2)}")
                
                # Check if response matches expected format
                if "status" in json_response and "place_id" in json_response:
                    if json_response.get("status") == "notified" and json_response.get("place_id") == "tulum_bakery_001":
                        print("✓ SUCCESS: Response matches expected format")
                    else:
                        print("⚠ WARNING: Response format differs from expected")
                        print(f"Expected: {{'status': 'notified', 'place_id': 'tulum_bakery_001'}}")
                        print(f"Received: {json_response}")
                else:
                    print("⚠ WARNING: Response missing expected fields (status, place_id)")
                
            except Exception as json_error:
                print(f"JSON Parse Error: {json_error}")
                print(f"Raw Response: {response.text}")
            
            if response.status_code == 200:
                print("✓ SUCCESS: Endpoint returned 200")
            else:
                print(f"✗ ERROR: Status code {response.status_code}")
                
        except Exception as e:
            print(f"✗ CONNECTION ERROR: {e}")
        
        print("-" * 50)

if __name__ == "__main__":
    test_notify_endpoint()