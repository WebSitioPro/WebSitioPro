#!/usr/bin/env python3
"""
Debug the exact template preview to see what's happening with the cover image
"""

import requests
import json
import re

def debug_template_preview():
    """Debug the specific template that was just created"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    
    # Get the template ID from the latest creation
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751628287644"
    
    print(f"=== Debugging Template Preview ===")
    print(f"Template ID: {template_id}")
    
    # 1. Get the template data
    print("\n1. Getting template data...")
    try:
        response = requests.get(f"{base_url}/api/templates/{template_id}", timeout=30)
        if response.status_code == 200:
            template_data = response.json()
            print(f"✓ Template data loaded")
            
            # Check image URLs in template data
            print(f"\n--- Template Data Analysis ---")
            print(f"Profile Image URL: {template_data.get('profileImage', 'NOT FOUND')}")
            print(f"Hero Image URL: {template_data.get('heroImage', 'NOT FOUND')}")
            print(f"Cover Image URL: {template_data.get('coverImage', 'NOT FOUND')}")
            
            # Check photos array
            photos = template_data.get('photos', [])
            print(f"Number of photos: {len(photos)}")
            
            if photos:
                for i, photo in enumerate(photos):
                    print(f"Photo {i+1}: {photo.get('url', 'NO URL')[:80]}...")
            
            # Check if cover image is in photos instead of heroImage
            cover_url = "https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/475653267_122093636456756139_2141971188755740555_n.jpg"
            
            hero_image = template_data.get('heroImage', '')
            if cover_url in hero_image:
                print("✓ Cover image found in heroImage field")
            else:
                print("✗ Cover image NOT found in heroImage field")
                
            # Check if it's in photos
            cover_in_photos = any(cover_url in photo.get('url', '') for photo in photos)
            if cover_in_photos:
                print("⚠ Cover image found in photos array instead of heroImage")
            else:
                print("✗ Cover image not found in photos array either")
                
        else:
            print(f"✗ Failed to get template data: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"✗ Error getting template data: {e}")
        return False
    
    # 2. Get the preview HTML
    print("\n2. Getting preview HTML...")
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        if response.status_code == 200:
            html_content = response.text
            print(f"✓ Preview HTML loaded ({len(html_content)} characters)")
            
            # Check header section
            header_match = re.search(r'<header[^>]*id="home"[^>]*>.*?</header>', html_content, re.DOTALL)
            if header_match:
                header_content = header_match.group(0)
                print(f"\n--- Header Section Analysis ---")
                print(f"Header length: {len(header_content)} characters")
                
                # Check for background-image in header
                style_match = re.search(r'style="([^"]*)"', header_content)
                if style_match:
                    style_content = style_match.group(1)
                    print(f"Header style: {style_content[:100]}...")
                    
                    if 'background-image' in style_content:
                        print("✓ background-image found in header")
                        
                        # Check what URL is being used
                        if '475653267_122093636456756139' in style_content:
                            print("✓ Correct cover image URL found in header background")
                        else:
                            print("✗ Wrong image URL in header background")
                    else:
                        print("✗ No background-image in header style")
                else:
                    print("✗ No style attribute in header")
            else:
                print("✗ Header section not found")
                
            # Check photos section
            photos_match = re.search(r'<section[^>]*class="[^"]*photos[^"]*"[^>]*>.*?</section>', html_content, re.DOTALL)
            if photos_match:
                photos_content = photos_match.group(0)
                print(f"\n--- Photos Section Analysis ---")
                print(f"Photos section length: {len(photos_content)} characters")
                
                # Count images in photos section
                img_matches = re.findall(r'<img[^>]*src="([^"]*)"[^>]*>', photos_content)
                print(f"Images in photos section: {len(img_matches)}")
                
                for i, img_url in enumerate(img_matches):
                    print(f"  Photo {i+1}: {img_url[:60]}...")
                    
                    if '475653267_122093636456756139' in img_url:
                        print("  ⚠ Cover image found in photos section (should be in header)")
            else:
                print("✗ Photos section not found")
                
        else:
            print(f"✗ Failed to get preview HTML: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"✗ Error getting preview HTML: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = debug_template_preview()
    
    if success:
        print(f"\n✓ Template preview debugging completed")
        print(f"Check the analysis above to identify the data mapping issue")
    else:
        print(f"\n✗ Template preview debugging failed")