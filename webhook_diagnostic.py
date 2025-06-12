#!/usr/bin/env python3
"""
Make.com Webhook Data Structure Diagnostic
Analyzes why webhook data structure resets in Make.com
"""

import requests
import json
import time
from datetime import datetime

def test_webhook_variations():
    """Test different payload formats to identify Make.com data structure issues"""
    
    webhook_url = "https://hook.us2.make.com/vlcril6b6o88s994ov4uqytoi22a61h8"
    
    # Test 1: Standard JSON payload (current format)
    print("=== Test 1: Standard JSON Format ===")
    payload1 = {
        "name": "Tulum Bakery",
        "address": "Calle Saturno 789", 
        "phone": "+529834567890",
        "category": "Professionals",
        "place_id": "tulum_bakery_001",
        "facebook_url": "https://facebook.com/tulumbakery"
    }
    
    headers1 = {
        "Content-Type": "application/json",
        "User-Agent": "WebSitioPro/1.0"
    }
    
    print(f"Payload: {json.dumps(payload1, indent=2)}")
    print(f"Headers: {json.dumps(headers1, indent=2)}")
    
    try:
        response1 = requests.post(webhook_url, json=payload1, headers=headers1, timeout=30)
        print(f"Status Code: {response1.status_code}")
        print(f"Response: {response1.text}")
        print(f"Response Headers: {dict(response1.headers)}")
    except Exception as e:
        print(f"Error: {e}")
    
    time.sleep(2)
    
    # Test 2: Form-encoded data
    print("\n=== Test 2: Form-Encoded Format ===")
    payload2 = {
        "name": "Tulum Bakery Form",
        "address": "Calle Saturno 789",
        "phone": "+529834567890", 
        "category": "Professionals",
        "place_id": "tulum_bakery_form_001",
        "facebook_url": "https://facebook.com/tulumbakeryform"
    }
    
    headers2 = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    print(f"Payload: {payload2}")
    print(f"Headers: {json.dumps(headers2, indent=2)}")
    
    try:
        response2 = requests.post(webhook_url, data=payload2, headers=headers2, timeout=30)
        print(f"Status Code: {response2.status_code}")
        print(f"Response: {response2.text}")
        print(f"Response Headers: {dict(response2.headers)}")
    except Exception as e:
        print(f"Error: {e}")
    
    time.sleep(2)
    
    # Test 3: Nested JSON structure
    print("\n=== Test 3: Nested JSON Structure ===")
    payload3 = {
        "data": {
            "name": "Tulum Bakery Nested",
            "address": "Calle Saturno 789",
            "phone": "+529834567890",
            "category": "Professionals", 
            "place_id": "tulum_bakery_nested_001",
            "facebook_url": "https://facebook.com/tulumbakernested"
        },
        "timestamp": datetime.now().isoformat(),
        "source": "diagnostic_test"
    }
    
    headers3 = {
        "Content-Type": "application/json",
        "X-Webhook-Source": "WebSitioPro-Diagnostic"
    }
    
    print(f"Payload: {json.dumps(payload3, indent=2)}")
    print(f"Headers: {json.dumps(headers3, indent=2)}")
    
    try:
        response3 = requests.post(webhook_url, json=payload3, headers=headers3, timeout=30)
        print(f"Status Code: {response3.status_code}")
        print(f"Response: {response3.text}")
        print(f"Response Headers: {dict(response3.headers)}")
    except Exception as e:
        print(f"Error: {e}")
    
    time.sleep(2)
    
    # Test 4: Array format
    print("\n=== Test 4: Array Format ===")
    payload4 = [{
        "name": "Tulum Bakery Array",
        "address": "Calle Saturno 789",
        "phone": "+529834567890",
        "category": "Professionals",
        "place_id": "tulum_bakery_array_001", 
        "facebook_url": "https://facebook.com/tulumbakeryarray"
    }]
    
    headers4 = {
        "Content-Type": "application/json"
    }
    
    print(f"Payload: {json.dumps(payload4, indent=2)}")
    print(f"Headers: {json.dumps(headers4, indent=2)}")
    
    try:
        response4 = requests.post(webhook_url, json=payload4, headers=headers4, timeout=30)
        print(f"Status Code: {response4.status_code}")
        print(f"Response: {response4.text}")
        print(f"Response Headers: {dict(response4.headers)}")
    except Exception as e:
        print(f"Error: {e}")

def analyze_make_com_issues():
    """Analyze common Make.com webhook data structure issues"""
    
    print("\n" + "="*60)
    print("MAKE.COM DATA STRUCTURE RESET ANALYSIS")
    print("="*60)
    
    print("""
COMMON CAUSES FOR DATA STRUCTURE RESET:

1. INCONSISTENT PAYLOAD STRUCTURE
   - Make.com expects consistent JSON structure across requests
   - Field types must remain consistent (string vs number)
   - Missing fields in subsequent requests cause reset

2. CONTENT-TYPE HEADER ISSUES
   - Must be 'application/json' for JSON parsing
   - Mixed content types cause confusion
   - Missing Content-Type defaults to form-encoded

3. WEBHOOK EXECUTION TIMING
   - Make.com samples first successful request for structure
   - If first request has different structure, it locks that format
   - Scenario must be re-saved after structure changes

4. NESTED DATA STRUCTURES
   - Deep nesting can cause parsing issues
   - Make.com prefers flat JSON structures
   - Complex objects may not map correctly to {{1.data}}

5. SPECIAL CHARACTERS IN FIELD NAMES
   - Underscores, hyphens in field names
   - Reserved keywords as field names
   - Non-ASCII characters in values

RECOMMENDED FIXES:

✓ CONSISTENT PAYLOAD FORMAT
  - Always send identical JSON structure
  - Use same field names and types
  - Include all fields in every request

✓ PROPER HEADERS
  - Always use Content-Type: application/json
  - Add User-Agent for identification
  - Avoid custom headers that might interfere

✓ FLAT JSON STRUCTURE
  - Keep JSON structure simple and flat
  - Avoid deep nesting
  - Use consistent field naming (camelCase or snake_case)

✓ WEBHOOK RESET PROCEDURE
  1. Clear webhook data structure in Make.com
  2. Send test payload with correct format
  3. Verify green checkmark appears
  4. Save scenario immediately
  5. Test with identical payload format

✓ DEBUGGING STEPS
  - Check Make.com History tab for execution details
  - Verify webhook receives data correctly
  - Ensure JSON Parse module maps {{1.data}} correctly
  - Test with simplified payload first
    """)

if __name__ == "__main__":
    test_webhook_variations()
    analyze_make_com_issues()