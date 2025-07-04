#!/usr/bin/env python3
"""
Debug why the latest test website has no images at all
"""

import requests
import re

def debug_no_images():
    """Debug the latest test template to understand why images are missing"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "cover_test_1751627360_1751627360662"
    
    print(f"=== Debugging No Images Issue ===")
    print(f"Template ID: {template_id}")
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Template loaded ({len(html_content)} characters)")
        
        # Check for header element and its attributes
        header_match = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
        if header_match:
            header_element = header_match.group(0)
            print(f"\nHeader element found:")
            print(header_element)
            
            # Check specifically for style attribute
            if 'style=' in header_element:
                style_match = re.search(r'style="([^"]*)"', header_element)
                if style_match:
                    style_content = style_match.group(1)
                    print(f"\nStyle attribute content:")
                    print(f"'{style_content}'")
                    
                    if 'background-image' in style_content:
                        print("✓ background-image found in style")
                        
                        if 'scontent' in style_content:
                            print("✓ Facebook CDN URL found in background-image")
                        else:
                            print("✗ No Facebook CDN URL in background-image")
                    else:
                        print("✗ No background-image in style attribute")
                else:
                    print("✗ Could not parse style attribute")
            else:
                print("✗ No style attribute found")
                
            # Check for data-cover-url
            if 'data-cover-url=' in header_element:
                data_url_match = re.search(r'data-cover-url="([^"]*)"', header_element)
                if data_url_match:
                    data_url = data_url_match.group(1)
                    print(f"\ndata-cover-url found:")
                    print(f"'{data_url[:80]}...'")
                else:
                    print("✗ Could not parse data-cover-url")
            else:
                print("✗ No data-cover-url attribute found")
        else:
            print("✗ Header element with id='home' not found")
            
        # Check for profile image in navbar
        navbar_img_match = re.search(r'<img[^>]*src="[^"]*scontent[^"]*"[^>]*>', html_content)
        if navbar_img_match:
            print(f"\nProfile image found in navbar:")
            print(navbar_img_match.group(0)[:100] + "...")
        else:
            print("\n✗ No profile image found in navbar")
            
        # Check for any images at all
        all_images = re.findall(r'<img[^>]*src="([^"]*)"[^>]*>', html_content)
        print(f"\nTotal images found: {len(all_images)}")
        for i, img_src in enumerate(all_images[:3]):  # Show first 3
            print(f"  {i+1}. {img_src[:60]}...")
            
        # Check for Facebook CDN URLs anywhere
        facebook_urls = re.findall(r'https://scontent[^"\s]*', html_content)
        print(f"\nFacebook CDN URLs found: {len(facebook_urls)}")
        for i, url in enumerate(facebook_urls[:3]):  # Show first 3
            print(f"  {i+1}. {url[:60]}...")
            
        # Check for JavaScript console logs
        if 'console.log' in html_content:
            print("\n✓ JavaScript debugging code found")
        else:
            print("\n✗ No JavaScript debugging code found")
            
        return True
        
    except Exception as e:
        print(f"✗ Error debugging template: {e}")
        return False

if __name__ == "__main__":
    debug_no_images()