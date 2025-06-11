
import requests
import json

def test_make_webhook():
    """Test the Make.com webhook with a simple payload"""
    url = "https://hook.us2.make.com/6mcqk72uclcv86i1rtkao3bm2hhq3vh6"
    payload = {"message": "Test Webhook"}
    headers = {"Content-Type": "application/json"}

    print("🔧 Testing Make.com Webhook")
    print(f"URL: {url}")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    print("-" * 50)

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        print(f"✅ Status Code: {response.status_code}")
        print(f"📝 Response: {response.text}")
        
        if response.status_code == 200:
            print("🎉 Webhook test successful!")
        else:
            print("⚠️ Webhook returned non-200 status")
            
    except requests.exceptions.Timeout:
        print("❌ Error: Request timed out")
    except requests.exceptions.ConnectionError:
        print("❌ Error: Connection failed")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_business_data_webhook():
    """Test with realistic business data format"""
    url = "https://hook.us2.make.com/6mcqk72uclcv86i1rtkao3bm2hhq3vh6"
    
    # Test with business data similar to your WebSitioPro format
    business_payload = {
        "Place_ID": "test_make_123",
        "Name": "Test Business for Make",
        "Phone": "+52-987-654-3210",
        "Address": "Test Address, Chetumal",
        "Facebook_URL": "https://facebook.com/testbusiness",
        "Template_Type": "Professionals",
        "Date_Created": "2025-01-16"
    }
    
    headers = {"Content-Type": "application/json"}

    print("\n🏢 Testing Make.com Webhook with Business Data")
    print(f"URL: {url}")
    print(f"Business Payload: {json.dumps(business_payload, indent=2)}")
    print("-" * 50)

    try:
        response = requests.post(url, json=business_payload, headers=headers, timeout=10)
        print(f"✅ Status Code: {response.status_code}")
        print(f"📝 Response: {response.text}")
        
        if response.status_code == 200:
            print("🎉 Business data webhook test successful!")
        else:
            print("⚠️ Business data webhook returned non-200 status")
            
    except requests.exceptions.Timeout:
        print("❌ Error: Business data request timed out")
    except requests.exceptions.ConnectionError:
        print("❌ Error: Business data connection failed")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    # Run both tests
    test_make_webhook()
    test_business_data_webhook()
    
    print("\n" + "="*60)
    print("📋 Test Summary:")
    print("- Simple webhook test completed")
    print("- Business data webhook test completed")
    print("- Check Make.com scenario for received data")
