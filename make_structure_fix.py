#!/usr/bin/env python3
"""
Make.com Data Structure Fix
Sends consistent payload format to establish stable webhook structure
"""

import requests
import json
import time

def send_structure_payload():
    """Send consistent payload to establish Make.com data structure"""
    
    webhook_url = "https://hook.us2.make.com/vlcril6b6o88s994ov4uqytoi22a61h8"
    
    # Standardized payload format for Make.com structure detection
    payload = {
        "name": "Tulum Bakery",
        "address": "Calle Saturno 789",
        "phone": "+529834567890",
        "category": "Professionals",
        "place_id": "tulum_bakery_001",
        "facebook_url": "https://facebook.com/tulumbakery"
    }
    
    # Essential headers for proper JSON parsing
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    print("=== Make.com Structure Establishment Test ===")
    print(f"Webhook URL: {webhook_url}")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    print(f"Headers: {json.dumps(headers, indent=2)}")
    print("\nSending payload...")
    
    try:
        response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            print("✓ SUCCESS: Webhook accepted payload")
            print("\nIMPORTANT: In Make.com:")
            print("1. Check if green checkmark appears on webhook module")
            print("2. Verify fields are detected: name, address, phone, category, place_id, facebook_url")
            print("3. Save scenario immediately after green checkmark appears")
            print("4. Use {{1.name}}, {{1.address}}, etc. in JSON Parse module")
            return True
        else:
            print(f"✗ ERROR: Unexpected status code {response.status_code}")
            return False
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        return False

def send_multiple_consistent_payloads():
    """Send multiple identical payloads to reinforce structure"""
    
    webhook_url = "https://hook.us2.make.com/vlcril6b6o88s994ov4uqytoi22a61h8"
    
    payloads = [
        {
            "name": "Test Business 1",
            "address": "Test Address 1",
            "phone": "+529111111111",
            "category": "Professionals",
            "place_id": "test_001",
            "facebook_url": "https://facebook.com/test1"
        },
        {
            "name": "Test Business 2", 
            "address": "Test Address 2",
            "phone": "+529222222222",
            "category": "Professionals",
            "place_id": "test_002",
            "facebook_url": "https://facebook.com/test2"
        },
        {
            "name": "Test Business 3",
            "address": "Test Address 3", 
            "phone": "+529333333333",
            "category": "Professionals",
            "place_id": "test_003",
            "facebook_url": "https://facebook.com/test3"
        }
    ]
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    print("\n=== Sending Multiple Consistent Payloads ===")
    
    for i, payload in enumerate(payloads, 1):
        print(f"\nTest {i}/3:")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        try:
            response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
            print(f"Status: {response.status_code} - {response.text}")
            
            if response.status_code != 200:
                print(f"✗ Failed on payload {i}")
                return False
                
        except Exception as e:
            print(f"✗ Error on payload {i}: {e}")
            return False
            
        time.sleep(2)  # Brief pause between requests
    
    print("\n✓ All payloads sent successfully")
    print("This should establish consistent data structure in Make.com")
    return True

if __name__ == "__main__":
    # First, send the original structure payload
    if send_structure_payload():
        print("\n" + "="*50)
        # Then send multiple consistent payloads to reinforce structure
        send_multiple_consistent_payloads()
        
        print("\n" + "="*50)
        print("NEXT STEPS IN MAKE.COM:")
        print("1. Open your scenario")
        print("2. Click on the webhook module")
        print("3. Check for green checkmark and field detection")
        print("4. If green checkmark is present, SAVE scenario immediately")
        print("5. In JSON Parse module, use: {{1.name}}, {{1.address}}, etc.")
        print("6. Test the scenario with another identical payload")