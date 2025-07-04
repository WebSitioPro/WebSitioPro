#!/usr/bin/env python3
"""
Check if the JavaScript image loading function is actually in the HTML
"""

import requests

def check_javascript():
    """Check for specific JavaScript functions in the template"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751626655994"
    
    print(f"=== Checking JavaScript in Template ===")
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        html_content = response.text
        
        # Check for specific functions and elements
        checks = [
            ("loadCoverImage function", "loadCoverImage"),
            ("addEventListener for DOMContentLoaded", "addEventListener('DOMContentLoaded'"),
            ("img.onload function", "img.onload"),
            ("img.onerror function", "img.onerror"),
            ("header-image.loading CSS", ".header-image.loading"),
            ("header-image.error CSS", ".header-image.error"),
            ("JavaScript code block", "<script>"),
            ("Background image style", "background-image"),
            ("Cover URL assignment", "headerElement.style.backgroundImage")
        ]
        
        for name, search_term in checks:
            if search_term in html_content:
                print(f"✓ {name} found")
            else:
                print(f"✗ {name} missing")
                
        # Show actual JavaScript content
        script_start = html_content.find('<script>')
        if script_start != -1:
            script_end = html_content.find('</script>', script_start)
            if script_end != -1:
                script_content = html_content[script_start:script_end + 9]
                print(f"\nJavaScript content found ({len(script_content)} characters)")
                
                # Check specifically for cover image loading
                if 'loadCoverImage' in script_content:
                    print("✓ loadCoverImage function is in JavaScript")
                else:
                    print("✗ loadCoverImage function not found in JavaScript")
            else:
                print("\nJavaScript block incomplete")
        else:
            print("\nNo JavaScript block found")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_javascript()