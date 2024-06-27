from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_analyze_startup():
    response = client.post(
        "/analyze_startup",
        json={"name": "TestStartup", "description": "A test startup", "industry": "Tech", "funding": "1M", "website": "https://www.example.com"}
    )
    assert response.status_code == 200
    assert "analysis" in response.json()
    assert "website_analysis" in response.json()

def test_analyze_website():
    response = client.post(
        "/analyze_website",
        json={"url": "https://www.example.com"}
    )
    assert response.status_code == 200
    assert "website_analysis" in response.json()

# Add more tests as needed
