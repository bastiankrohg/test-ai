import os
import requests
from typing import Dict, Any, List
from dotenv import load_dotenv
import urllib.request
from bs4 import BeautifulSoup

class ClaudeWrapper:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        self.base_url = "https://api.anthropic.com/v1"
        self.headers = {
            "Content-Type": "application/json",
            "X-API-Key": self.api_key,
        }

    def _send_request(self, endpoint: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Send a request to the Claude API."""
        response = requests.post(f"{self.base_url}/{endpoint}", json=data, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def analyze_startup(self, startup_info: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze a startup using Claude."""
        prompt = self._construct_startup_analysis_prompt(startup_info)
        response = self._send_request("chat/completions", {
            "model": "claude-3-sonnet-20240229",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1000,
        })
        return self._parse_startup_analysis(response)

    def analyze_website(self, url: str) -> Dict[str, Any]:
        """Analyze a startup's website using Claude."""
        website_content = self._fetch_website_content(url)
        prompt = self._construct_website_analysis_prompt(url, website_content)
        response = self._send_request("chat/completions", {
            "model": "claude-3-sonnet-20240229",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1500,
        })
        return self._parse_website_analysis(response)

    def _fetch_website_content(self, url: str) -> str:
        """Fetch and parse website content."""
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        # Extract text content from the website
        text_content = soup.get_text(separator=' ', strip=True)
        # Limit content to first 10000 characters to avoid exceeding API limits
        return text_content[:10000]

    def _construct_website_analysis_prompt(self, url: str, content: str) -> str:
        """Construct a prompt for website analysis."""
        return f"""Analyze the following startup website:
        URL: {url}
        Content: {content}

        Please provide:
        1. An overview of the startup based on their website
        2. Analysis of their positioning and value proposition
        3. Evaluation of their target market
        4. Suggestions for potential pivots or improvements
        5. Assessment of their competitive advantage
        """

    def _parse_website_analysis(self, response: Dict[str, Any]) -> Dict[str, Any]:
        """Parse the website analysis response from Claude."""
        content = response['choices'][0]['message']['content']
        # Here you would implement logic to structure Claude's response
        # For simplicity, we're returning the raw content
        return {"website_analysis": content}

    # ... (keep other existing methods)

