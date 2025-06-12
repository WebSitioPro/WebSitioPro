#!/usr/bin/env python3
"""
Make.com Webhook Structure Test
Tests webhook connectivity and provides structure establishment guidance
"""

import requests
import json
import time

def test_webhook_connectivity():
    """Test both webhook URLs to determine active endpoint"""
    
    webhooks = [
        "https://hook.us2.make.com/w6qv7b5bqcd9lyigl48hbhtvkey86qlo",  # New URL
        "https://hook.us2.make.com/vlcril6b6o88s994ov4uqytoi22a61h8"   # Previous URL
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
    
    print("=== Webhook Connectivity Test ===")
    print(f"Test Payload: {json.dumps(payload, indent=2)}")
    print(f"Headers: {json.dumps(headers, indent=2)}")
    
    active_webhook = None
    
    for i, webhook_url in enumerate(webhooks, 1):
        print(f"\nTesting Webhook {i}: {webhook_url}")
        
        try:
            response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            if response.status_code == 200 and "Accepted" in response.text:
                print("✓ SUCCESS: Webhook is active and accepting requests")
                active_webhook = webhook_url
                break
            elif response.status_code == 400:
                print("✗ ERROR: No scenario listening on this webhook")
            elif "Webhook not found" in response.text:
                print("✗ ERROR: Webhook endpoint not found")
            else:
                print(f"✗ ERROR: Unexpected response - {response.status_code}")
                
        except Exception as e:
            print(f"✗ CONNECTION ERROR: {e}")
    
    return active_webhook

def send_structure_establishment_payloads(webhook_url):
    """Send multiple consistent payloads to establish data structure"""
    
    if not webhook_url:
        print("No active webhook found - cannot establish structure")
        return False
    
    print(f"\n=== Establishing Data Structure on: {webhook_url} ===")
    
    # Multiple consistent payloads with same structure
    test_payloads = [
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
            "name": "Playa Cafe",
            "address": "Boulevard Costero 456",
            "phone": "+529555666777",
            "category": "Proximity",
            "place_id": "playa_cafe_003",
            "facebook_url": "https://facebook.com/playacafe"
        }
    ]
    
    headers = {"Content-Type": "application/json"}
    success_count = 0
    
    for i, payload in enumerate(test_payloads, 1):
        print(f"\nSending payload {i}/3:")
        print(f"Business: {payload['name']}")
        
        try:
            response = requests.post(webhook_url, json=payload, headers=headers, timeout=30)
            print(f"Status: {response.status_code} - {response.text}")
            
            if response.status_code == 200:
                success_count += 1
            else:
                print(f"✗ Failed on payload {i}")
                
        except Exception as e:
            print(f"✗ Error on payload {i}: {e}")
        
        time.sleep(2)  # Brief pause between requests
    
    if success_count == len(test_payloads):
        print(f"\n✓ All {success_count} payloads sent successfully")
        print("Data structure should now be established in Make.com")
        return True
    else:
        print(f"\n⚠ Only {success_count}/{len(test_payloads)} payloads succeeded")
        return False

def provide_make_com_guidance():
    """Provide step-by-step guidance for Make.com setup"""
    
    print("\n" + "="*60)
    print("MAKE.COM SETUP GUIDANCE")
    print("="*60)
    
    print("""
SCENARIO SETUP STEPS:

1. CREATE NEW SCENARIO (if needed)
   - Go to Make.com dashboard
   - Click "Create a new scenario"
   - Add "Custom Webhook" module as trigger

2. WEBHOOK CONFIGURATION
   - Click on the webhook module
   - Copy the generated webhook URL
   - Ensure scenario is saved and activated (green toggle)

3. DATA STRUCTURE ESTABLISHMENT
   - After running this test, check webhook module
   - Look for green checkmark indicating detected fields
   - Fields should show: name, address, phone, category, place_id, facebook_url
   - If no green checkmark, click "Redetermine data structure"

4. VARIABLE ACCESS
   - Use direct field references: {{1.name}}, {{1.address}}, etc.
   - DO NOT use {{1.data.name}} - this is for nested structures
   - The payload is flat JSON, so fields are accessed directly

5. HTTP MODULE SETUP (for Replit integration)
   - Add HTTP "Make a request" module after webhook
   - URL: https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev/api/make/auto-create
   - Method: POST
   - Headers: Content-Type: application/json
   - Body Type: Raw
   - Body Content: Map webhook fields to JSON structure

6. TESTING
   - Use "Run once" to test scenario
   - Check History tab for execution details
   - Verify data flows from webhook → HTTP module → Replit

TROUBLESHOOTING:

✗ "No scenario listening" → Scenario not activated or wrong URL
✗ "Webhook not found" → Webhook URL changed or deleted
✗ Green checkmark disappears → Send consistent payloads, save immediately
✗ {{1.data}} not available → Use direct fields {{1.name}}, {{1.address}}
✗ Purple "Play" button missing → Data structure not established
    """)

if __name__ == "__main__":
    # Test webhook connectivity
    active_webhook = test_webhook_connectivity()
    
    # If active webhook found, establish data structure
    if active_webhook:
        success = send_structure_establishment_payloads(active_webhook)
        if success:
            print("\n✓ NEXT STEP: Check your Make.com scenario for the green checkmark")
    else:
        print("\n✗ NO ACTIVE WEBHOOK FOUND")
    
    # Provide setup guidance
    provide_make_com_guidance()