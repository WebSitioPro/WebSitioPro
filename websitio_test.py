#!/usr/bin/env python3
"""
WebSitioPro Make.com Webhook Test Script
Tests JSON payload delivery to resolve timeout issues and populate variable picker
"""

import requests
import json
import time

def test_make_webhook():
    webhook_url = "https://hook.us2.make.com/6mcqk72uclcv86i1rtkao3bm2hhq3vh6"
    headers = {"Content-Type": "application/json"}
    
    # Test payloads
    payloads = [
        {
            "name": "Simple Test",
            "data": {"message": "Test Webhook"},
            "description": "Basic connectivity test"
        },
        {
            "name": "Business Test", 
            "data": {
                "name": "Chetumal Vet",
                "address": "Av. Héroes 123",
                "phone": "+529831234567",
                "category": "Professionals",
                "place_id": "chetumal_vet_001",
                "facebook_url": "https://facebook.com/chetumalvet"
            },
            "description": "Full business data payload"
        }
    ]
    
    print("=== WebSitioPro Make.com Webhook Test ===")
    print(f"Target URL: {webhook_url}")
    print()
    
    for i, payload in enumerate(payloads, 1):
        print(f"Test {i}: {payload['name']}")
        print(f"Description: {payload['description']}")
        print(f"Payload: {json.dumps(payload['data'], indent=2)}")
        
        try:
            # Send request with 30 second timeout
            response = requests.post(
                webhook_url,
                json=payload['data'],
                headers=headers,
                timeout=30
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            # Try to parse response as JSON, fallback to text
            try:
                response_data = response.json()
                print(f"Response JSON: {json.dumps(response_data, indent=2)}")
            except:
                print(f"Response Text: {response.text}")
                
        except requests.exceptions.Timeout:
            print("ERROR: Request timed out (30s)")
        except requests.exceptions.ConnectionError:
            print("ERROR: Connection failed")
        except requests.exceptions.RequestException as e:
            print(f"ERROR: Request failed - {e}")
        except Exception as e:
            print(f"UNEXPECTED ERROR: {e}")
            
        print("-" * 50)
        
        # Small delay between requests
        if i < len(payloads):
            time.sleep(2)
    
    print("=== Test Complete ===")

if __name__ == "__main__":
    test_make_webhook()