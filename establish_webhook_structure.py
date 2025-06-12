#!/usr/bin/env python3
"""
Establish webhook data structure for Make.com
Sends consistent payloads to detect field structure
"""

import requests
import json
import time

def test_webhook_structure():
    webhook_url = "https://hook.us2.make.com/w6qv7b5bqcd9lyigl48hbhtvkey86qlo"
    
    # Primary test payload
    payload = {
        "name": "Tulum Bakery",
        "address": "Calle Saturno 789",
        "phone": "+529834567890",
        "category": "Proximity",
        "place_id": "tulum_bakery_001",
        "facebook_url": "https://facebook.com/tulumbakery"
    }
    
    headers = {"Content-Type": "application/json"}
    
    print("Testing webhook structure establishment...")
    print(f"URL: {webhook_url}")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✓ SUCCESS: Webhook accepted payload")
            return True
        else:
            print(f"Status indicates: {response.text}")
            return False
            
    except Exception as e:
        print(f"Error: {e}")
        return False

def send_structure_payloads():
    webhook_url = "https://hook.us2.make.com/w6qv7b5bqcd9lyigl48hbhtvkey86qlo"
    
    payloads = [
        {
            "name": "Tulum Bakery",
            "address": "Calle Saturno 789",
            "phone": "+529834567890",
            "category": "Proximity",
            "place_id": "tulum_bakery_001",
            "facebook_url": "https://facebook.com/tulumbakery"
        },
        {
            "name": "Cancun Restaurant",
            "address": "Avenida Kukulkan 123",
            "phone": "+529876543210",
            "category": "Proximity",
            "place_id": "cancun_restaurant_002",
            "facebook_url": "https://facebook.com/cancunrestaurant"
        },
        {
            "name": "Playa Hotel",
            "address": "Boulevard Costero 456",
            "phone": "+529555666777",
            "category": "Proximity",
            "place_id": "playa_hotel_003",
            "facebook_url": "https://facebook.com/playahotel"
        }
    ]
    
    headers = {"Content-Type": "application/json"}
    
    print("\nSending multiple payloads to establish structure...")
    
    for i, payload in enumerate(payloads, 1):
        print(f"\nPayload {i}: {payload['name']}")
        
        try:
            response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
            print(f"Status: {response.status_code} - {response.text}")
            
        except Exception as e:
            print(f"Error: {e}")
        
        time.sleep(2)
    
    print("\nStructure establishment complete")
    print("Check Make.com webhook module for green checkmark with fields:")
    print("- name, address, phone, category, place_id, facebook_url")

if __name__ == "__main__":
    test_webhook_structure()
    send_structure_payloads()