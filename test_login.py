import requests
import json

url = "http://localhost:8000/login"
payload = {
    "email": "admin@aibi.com",
    "password": "admin123"
}

try:
    print(f"📡 Sending test login to {url}...")
    response = requests.post(url, json=payload, timeout=5)
    print(f"📥 Status Code: {response.status_code}")
    print(f"📥 Response: {response.text}")
except Exception as e:
    print(f"❌ Request failed: {e}")
