#!/usr/bin/env python3
"""
Make.com Integration Test for WebSitioPro
Tests the complete workflow: webhook -> Make.com -> Replit endpoint
"""

import requests
import json
import time

def test_tulum_bakery():
    """Test with Tulum Bakery payload as specified"""
    webhook_url = "https://hook.us2.make.com/6mcqk72uclcv86i1rtkao3bm2hhq3vh6"
    headers = {"Content-Type": "application/json"}
    
    # Test payload as specified in instructions
    payload = {
        "name": "Tulum Bakery",
        "address": "Calle Saturno 789",
        "phone": "+529834567890",
        "category": "Professionals", 
        "place_id": "tulum_bakery_001",
        "facebook_url": "https://facebook.com/tulumbakery"
    }
    
    print("=== WebSitioPro Make.com Integration Test ===")
    print(f"Webhook URL: {webhook_url}")
    print(f"Test Payload: {json.dumps(payload, indent=2)}")
    print()
    
    try:
        print("Sending payload to Make.com webhook...")
        response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✓ SUCCESS: Make.com webhook received payload")
            print()
            print("Expected Make.com scenario flow:")
            print("1. Custom Webhook receives payload")
            print("2. HTTP module sends to Replit endpoint")
            print("3. Replit generates template and responds")
            print("4. Make.com receives templateId and success confirmation")
            print()
            print("Check Make.com History tab for execution details")
        else:
            print(f"✗ FAILED: Webhook returned {response.status_code}")
            
    except requests.exceptions.Timeout:
        print("✗ TIMEOUT: Request took longer than 30 seconds")
    except Exception as e:
        print(f"✗ ERROR: {e}")

if __name__ == "__main__":
    test_tulum_bakery()