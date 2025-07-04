#!/usr/bin/env python3
"""
Debug the exact template preview to see what's happening with the cover image
"""

import requests
import re

def debug_template_preview():
    """Debug the specific template that was just created"""
    
    base_url = "https://59f44953-d964-4fb9-91a2-34cac2c67ba7-00-3h7lcr3fuh1mq.picard.replit.dev"
    template_id = "gradient_test_1751627592_1751627592830"
    
    print(f"=== Debugging Template Preview ===")
    print(f"Template ID: {template_id}")
    print(f"URL: {base_url}/templates/{template_id}/preview")
    
    try:
        response = requests.get(f"{base_url}/templates/{template_id}/preview", timeout=30)
        
        if response.status_code != 200:
            print(f"✗ Preview failed: {response.status_code}")
            return False
            
        html_content = response.text
        print(f"✓ Template loaded ({len(html_content)} characters)")
        
        # Extract and analyze the header CSS
        print("\n=== CSS Analysis ===")
        
        # Find the CSS section
        css_match = re.search(r'<style>(.*?)</style>', html_content, re.DOTALL)
        if css_match:
            css_content = css_match.group(1)
            
            # Look for header-image class
            header_css_match = re.search(r'\.header-image\s*{[^}]+}', css_content)
            if header_css_match:
                print("Header CSS found:")
                print(header_css_match.group(0))
            else:
                print("✗ No .header-image CSS found")
                
            # Look for ::before pseudo-element
            before_css_match = re.search(r'\.header-image::before\s*{[^}]+}', css_content)
            if before_css_match:
                print("\n::before CSS found:")
                print(before_css_match.group(0))
            else:
                print("✗ No .header-image::before CSS found")
                
            # Look for CSS variables
            if '--primary' in css_content:
                primary_match = re.search(r'--primary:\s*([^;]+);', css_content)
                if primary_match:
                    print(f"\nPrimary color: {primary_match.group(1)}")
            
            if '--secondary' in css_content:
                secondary_match = re.search(r'--secondary:\s*([^;]+);', css_content)
                if secondary_match:
                    print(f"Secondary color: {secondary_match.group(1)}")
        else:
            print("✗ No CSS <style> section found")
            
        # Extract and analyze the header HTML
        print("\n=== HTML Analysis ===")
        
        header_match = re.search(r'<header[^>]*id="home"[^>]*>.*?</header>', html_content, re.DOTALL)
        if header_match:
            header_html = header_match.group(0)
            print("Header HTML structure:")
            
            # Extract header opening tag
            header_tag_match = re.search(r'<header[^>]*>', header_html)
            if header_tag_match:
                header_tag = header_tag_match.group(0)
                print(f"Header tag: {header_tag}")
                
                # Check for class
                if 'class="' in header_tag:
                    class_match = re.search(r'class="([^"]*)"', header_tag)
                    if class_match:
                        classes = class_match.group(1)
                        print(f"Classes: {classes}")
                        if 'header-image' in classes:
                            print("✓ header-image class present")
                        else:
                            print("✗ header-image class missing")
                else:
                    print("✗ No class attribute")
                    
                # Check for style
                if 'style="' in header_tag:
                    style_match = re.search(r'style="([^"]*)"', header_tag)
                    if style_match:
                        style_content = style_match.group(1)
                        print(f"Inline style: {style_content[:100]}...")
                        if 'background-image' in style_content:
                            print("✓ background-image in inline style")
                        else:
                            print("✗ No background-image in inline style")
                else:
                    print("✗ No inline style")
        else:
            print("✗ No header element found")
            
        # Check for profile image
        print("\n=== Profile Image Analysis ===")
        profile_img_matches = re.findall(r'<img[^>]*src="([^"]*)"[^>]*>', html_content)
        print(f"Total img tags found: {len(profile_img_matches)}")
        
        facebook_images = [img for img in profile_img_matches if 'scontent' in img]
        print(f"Facebook CDN images: {len(facebook_images)}")
        
        for i, img_url in enumerate(facebook_images):
            print(f"  {i+1}. {img_url[:60]}...")
            
        return True
        
    except Exception as e:
        print(f"✗ Error debugging template: {e}")
        return False

if __name__ == "__main__":
    debug_template_preview()