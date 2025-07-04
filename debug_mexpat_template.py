#!/usr/bin/env python3
"""
Debug the Mexpat Experience template that was just created
"""

import requests
import re

def debug_mexpat_template():
    """Debug the Mexpat Experience template"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "ChIJI0Jqhp0rTI8RydmtO71J-k4_1751627883177"
    
    print(f"=== Debugging Mexpat Template ===")
    print(f"Template ID: {template_id}")
    print(f"URL: {base_url}/templates/{template_id}/preview")
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Template loaded ({len(html_content)} characters)")
        
        # Check header element structure
        header_match = re.search(r'<header[^>]*id="home"[^>]*>', html_content)
        if header_match:
            header_element = header_match.group(0)
            print(f"\nHeader element:")
            print(header_element)
            
            # Check for style attribute
            if 'style=' in header_element:
                style_match = re.search(r'style="([^"]*)"', header_element)
                if style_match:
                    style_content = style_match.group(1)
                    print(f"\nInline style content:")
                    print(f"'{style_content}'")
                    
                    if 'background-image' in style_content:
                        print("✓ background-image found in style")
                        
                        # Extract the background image URL
                        url_match = re.search(r'background-image:\s*url\([\'"]?([^\'")]+)[\'"]?\)', style_content)
                        if url_match:
                            bg_url = url_match.group(1)
                            print(f"Background image URL: {bg_url[:80]}...")
                            
                            if 'scontent' in bg_url:
                                print("✓ Facebook CDN URL found in background-image")
                            else:
                                print("✗ No Facebook CDN URL in background-image")
                        else:
                            print("✗ Could not extract background-image URL")
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
                    print(f"\ndata-cover-url: {data_url[:80]}...")
                else:
                    print("✗ Could not parse data-cover-url")
            else:
                print("✗ No data-cover-url attribute found")
        else:
            print("✗ Header element with id='home' not found")
            
        # Check for CSS gradient classes
        print("\n=== CSS Analysis ===")
        
        # Find CSS section
        css_match = re.search(r'<style>(.*?)</style>', html_content, re.DOTALL)
        if css_match:
            css_content = css_match.group(1)
            
            # Look for header-image class
            if '.header-image' in css_content:
                print("✓ .header-image CSS class found")
                
                # Extract the header-image CSS
                header_css_match = re.search(r'\.header-image\s*\{[^}]+\}', css_content)
                if header_css_match:
                    header_css = header_css_match.group(0)
                    print(f"Header CSS: {header_css[:200]}...")
                    
                    if 'linear-gradient' in header_css:
                        print("✓ CSS gradient fallback found")
                    else:
                        print("✗ No CSS gradient fallback")
                else:
                    print("✗ Could not extract header-image CSS")
            else:
                print("✗ .header-image CSS class not found")
                
            # Check for ::before pseudo-element
            if '.header-image::before' in css_content:
                print("✓ ::before pseudo-element found")
            else:
                print("✗ ::before pseudo-element missing")
        else:
            print("✗ No CSS <style> section found")
            
        # Check for JavaScript functions
        print("\n=== JavaScript Analysis ===")
        
        js_functions = [
            'handleImageFallback',
            'handleProfileImageFallback',
            'testImg.onerror',
            'backgroundImage = \'\'',
            'Facebook CDN image blocked'
        ]
        
        found_js = []
        for func in js_functions:
            if func in html_content:
                found_js.append(func)
                print(f"✓ {func}")
            else:
                print(f"✗ {func}")
                
        print(f"\nJavaScript components: {len(found_js)}/{len(js_functions)}")
        
        # Check for profile image
        print("\n=== Profile Image Analysis ===")
        profile_img_matches = re.findall(r'<img[^>]*src="([^"]*)"[^>]*>', html_content)
        print(f"Total img tags: {len(profile_img_matches)}")
        
        facebook_profile_images = [img for img in profile_img_matches if 'scontent' in img]
        print(f"Facebook profile images: {len(facebook_profile_images)}")
        
        if facebook_profile_images:
            print(f"Profile image URL: {facebook_profile_images[0][:80]}...")
            
        return True
        
    except Exception as e:
        print(f"✗ Error debugging template: {e}")
        return False

if __name__ == "__main__":
    debug_mexpat_template()