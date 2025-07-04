#!/usr/bin/env python3
"""
Test the hero image fix for the latest Mexpat template
"""

import requests
import re

def test_hero_fix():
    """Test if the hero image is now working in the template preview"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751629876300"
    
    print(f"=== Testing Hero Image Fix ===")
    print(f"Template ID: {template_id}")
    
    try:
        # Test template preview
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Preview loaded ({len(html_content)} characters)")
        
        # Check for header with background-image containing the cover image URL
        header_match = re.search(r'<header[^>]*style="[^"]*background-image[^"]*url\([\'"]?([^\'")]+)[\'"]?\)[^"]*"[^>]*>', html_content)
        if header_match:
            bg_image_url = header_match.group(1)
            print(f"✓ Header with background-image found")
            print(f"  Background URL: {bg_image_url[:80]}...")
            
            # Check if it's the correct Mexpat cover image
            expected_cover_url = "475653267_122093636456756139_2141971188755740555_n.jpg"
            if expected_cover_url in bg_image_url:
                print("✓ Correct Mexpat cover image found in header background")
                
                # Check if it's the Facebook CDN URL
                if 'scontent-iad3-2.xx.fbcdn.net' in bg_image_url:
                    print("✓ Facebook CDN URL correctly used")
                else:
                    print("⚠ Not using Facebook CDN URL")
                    
                return True
            else:
                print(f"✗ Wrong image in header background")
                print(f"  Expected: {expected_cover_url}")
                print(f"  Found: {bg_image_url}")
                return False
        else:
            print("✗ No header with background-image found")
            
            # Check if header exists at all
            header_check = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
            if header_check:
                print("✓ Header element found but no background-image style")
                header_element = header_check.group(0)
                print(f"  Header: {header_element[:200]}...")
            else:
                print("✗ No header element found at all")
            
            return False
            
    except Exception as e:
        print(f"✗ Error testing template: {e}")
        return False

if __name__ == "__main__":
    success = test_hero_fix()
    
    if success:
        print(f"\n✓ Hero image fix successful!")
        print(f"The Mexpat cover image is now displaying in the hero section")
    else:
        print(f"\n✗ Hero image fix failed")
        print(f"The cover image is still not displaying correctly")