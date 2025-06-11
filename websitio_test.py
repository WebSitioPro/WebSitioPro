import requests

url = "https://hook.us2.make.com/6mcqk72uclcv86i1rtkao3bm2hhq3vh6"
payloads = [
    {"message": "Test Webhook"},
    {
        "name": "Chetumal Vet",
        "address": "Av. Héroes 123",
        "phone": "+529831234567",
        "category": "Professionals",
        "place_id": "chetumal_vet_001",
        "facebook_url": "https://facebook.com/chetumalvet"
    }
]
headers = {"Content-Type": "application/json"}

for payload in payloads:
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        print(f"Payload: {payload}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}\n")
    except Exception as e:
        print(f"Error for payload {payload}: {e}\n")