#!/usr/bin/env python3
"""
WebSitioPro Endpoint Audit Test
Comprehensive testing of /api/make/auto-create endpoint for Make.com integration
"""

import requests
import json
import time
import os

def test_local_endpoint():
    """Test the local Replit endpoint"""
    local_url = "http://localhost:5000/api/make/auto-create"
    headers = {"Content-Type": "application/json"}
    
    # Test payload as specified in audit request
    test_payload = {
        "name": "Cancun Cafe",
        "address": "Av. Tulum 456", 
        "phone": "+529832345678",
        "category": "Professionals",
        "place_id": "cancun_cafe_001",
        "facebook_url": "https://facebook.com/cancuncafe"
    }
    
    print("=== LOCAL ENDPOINT TEST ===")
    print(f"Testing: {local_url}")
    print(f"Payload: {json.dumps(test_payload, indent=2)}")
    
    try:
        response = requests.post(local_url, json=test_payload, headers=headers, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            print("✓ SUCCESS - Template created")
            print(f"Template ID: {response_data.get('templateId', 'N/A')}")
            print(f"Place ID: {response_data.get('place_id', 'N/A')}")
            
            # Check if template file exists
            template_files = [f for f in os.listdir('templates') if f.startswith('cancun_cafe_001_')]
            if template_files:
                print(f"✓ Template file created: {template_files[-1]}")
            else:
                print("⚠ Warning: Template file not found")
                
            return True
        else:
            print(f"✗ FAILED - Status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        return False

def test_make_webhook():
    """Test the Make.com webhook"""
    webhook_url = "https://hook.us2.make.com/6mcqk72uclcv86i1rtkao3bm2hhq3vh6"
    headers = {"Content-Type": "application/json"}
    
    test_payload = {
        "name": "Cancun Cafe",
        "address": "Av. Tulum 456",
        "phone": "+529832345678", 
        "category": "Professionals",
        "place_id": "cancun_cafe_001",
        "facebook_url": "https://facebook.com/cancuncafe"
    }
    
    print("\n=== MAKE.COM WEBHOOK TEST ===")
    print(f"Testing: {webhook_url}")
    print(f"Payload: {json.dumps(test_payload, indent=2)}")
    
    try:
        response = requests.post(webhook_url, json=test_payload, headers=headers, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✓ Make.com webhook accepting data")
            return True
        else:
            print("⚠ Make.com webhook issue")
            return False
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        return False

def audit_endpoint_code():
    """Audit the endpoint implementation"""
    print("\n=== CODE AUDIT ===")
    
    issues = []
    recommendations = []
    
    # Check if server/routes.ts exists and has the endpoint
    try:
        with open('server/routes.ts', 'r') as f:
            content = f.read()
            if '/api/make/auto-create' in content:
                print("✓ Endpoint exists in server/routes.ts")
                if 'POST' in content and 'req.body' in content:
                    print("✓ POST method and request body handling present")
                else:
                    issues.append("POST method or request body handling missing")
            else:
                issues.append("Endpoint not found in server/routes.ts")
    except FileNotFoundError:
        issues.append("server/routes.ts file not found")
    
    # Check templates directory
    if os.path.exists('templates'):
        print("✓ Templates directory exists")
        template_files = os.listdir('templates')
        print(f"  - {len(template_files)} template files found")
    else:
        issues.append("Templates directory missing")
        
    # Check websitio_test.py
    if os.path.exists('websitio_test.py'):
        print("✓ websitio_test.py exists")
        with open('websitio_test.py', 'r') as f:
            content = f.read()
            if 'hook.us2.make.com' in content:
                print("✓ Make.com webhook URL configured")
            if 'Content-Type' in content and 'application/json' in content:
                print("✓ Proper headers configured")
    else:
        issues.append("websitio_test.py missing")
    
    if issues:
        print("\n⚠ ISSUES FOUND:")
        for issue in issues:
            print(f"  - {issue}")
    
    recommendations.extend([
        "Add error logging for template file creation failures",
        "Implement rate limiting for the endpoint",
        "Add request validation schema",
        "Consider adding health check endpoint status"
    ])
    
    print("\n💡 RECOMMENDATIONS:")
    for rec in recommendations:
        print(f"  - {rec}")
    
    return len(issues) == 0

def main():
    print("WebSitioPro Endpoint Audit")
    print("=" * 50)
    
    # Run tests
    local_success = test_local_endpoint()
    make_success = test_make_webhook()
    code_audit_pass = audit_endpoint_code()
    
    # Final report
    print("\n" + "=" * 50)
    print("AUDIT SUMMARY")
    print("=" * 50)
    
    if local_success:
        print("✓ Local endpoint: READY")
    else:
        print("✗ Local endpoint: ISSUES")
        
    if make_success:
        print("✓ Make.com webhook: READY") 
    else:
        print("⚠ Make.com webhook: CHECK CONFIGURATION")
        
    if code_audit_pass:
        print("✓ Code audit: PASSED")
    else:
        print("⚠ Code audit: ISSUES FOUND")
        
    overall_ready = local_success and code_audit_pass
    
    print(f"\nOVERALL STATUS: {'READY FOR MAKE.COM INTEGRATION' if overall_ready else 'NEEDS FIXES'}")
    
    return overall_ready

if __name__ == "__main__":
    main()