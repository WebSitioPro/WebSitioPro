# Stock Images Integration Guide for WebSitioPro

This guide explains how to implement and use high-quality stock images in your WebSitioPro templates, using Unsplash and other professional image services.

## Overview

WebSitioPro now automatically generates professional stock images for all templates, eliminating dependency on Facebook CDN images and providing consistent, high-quality visuals for every business website.

## Automatic Stock Image Integration

### Current Implementation
- **Hero Images**: Automatically generated based on business category
- **Photo Galleries**: 6 professional images per template
- **Profile Images**: Professional portrait placeholders
- **Category-Specific**: Different image themes for each business type

### Business Categories & Image Themes
1. **Professionals**: `professional` theme
   - Office environments, business settings, professional portraits
   
2. **Restaurants**: `food` theme
   - Food photography, restaurant interiors, dining experiences
   
3. **Tourism**: `travel` theme
   - Destinations, travel experiences, hospitality settings
   
4. **Retail**: `shopping` theme
   - Store fronts, products, shopping experiences
   
5. **Services**: `business` theme
   - General business environments, service delivery

## Using Unsplash Stock Images

### Current Integration
WebSitioPro uses Unsplash's Source API for dynamic, high-quality images:

```
Hero Images: https://source.unsplash.com/1200x600/?[category]
Gallery Images: https://source.unsplash.com/400x300/?[category]
Profile Images: https://source.unsplash.com/400x400/?portrait
```

### Advantages of Unsplash Integration
- **High Quality**: Professional photography
- **Relevant**: Category-matched content
- **Dynamic**: Fresh images for each template
- **Legal**: Free for commercial use
- **Fast Loading**: Optimized delivery
- **No CORS Issues**: Unlike Facebook CDN

## Implementing Custom Stock Images

### Option 1: Unsplash Collections
Create specific Unsplash collections for your business:

1. **Create Account**: Sign up at unsplash.com
2. **Create Collections**: Organize images by business type
3. **Get Collection ID**: From the collection URL
4. **Use Specific URLs**: `https://source.unsplash.com/collection/[ID]/800x600`

### Option 2: Other Stock Image Services

#### Pexels Integration
```javascript
// Example API call for Pexels
const pexelsUrl = `https://api.pexels.com/v1/search?query=${category}&per_page=1`;
// Requires API key and proper handling
```

#### Pixabay Integration
```javascript
// Example for Pixabay
const pixabayUrl = `https://pixabay.com/api/?key=YOUR_KEY&q=${category}&image_type=photo`;
```

## Template Editor Integration

### Hero Image Field
The Hero Image URL field in the template editor:
- **Location**: Basic Info section
- **Purpose**: Main background image for header
- **Recommended Size**: 1200x600px
- **Format**: Direct image URLs
- **Fallback**: Automatic stock image generation

### Photo Gallery
Photo galleries automatically populate with:
- 6 stock images per template
- Category-appropriate themes
- Professional quality images
- Responsive sizing (400x300px)

## Best Practices for Stock Images

### Image Selection Criteria
1. **Professional Quality**: High resolution, good lighting
2. **Brand Appropriate**: Matches business type and style
3. **Cultural Relevance**: Appropriate for Mexican market
4. **Modern Style**: Contemporary photography
5. **Clear Subjects**: Well-defined focus and composition

### Technical Requirements
- **Minimum Resolution**: 800px width for hero images
- **Aspect Ratios**: 
  - Hero: 2:1 (1200x600)
  - Gallery: 4:3 (400x300)
  - Profile: 1:1 (400x400)
- **File Formats**: JPG (preferred), PNG
- **Loading Speed**: Under 500KB for fast load times

### SEO Optimization
- **Alt Text**: Descriptive, keyword-rich
- **File Names**: Business-relevant naming
- **Lazy Loading**: Implemented for performance
- **WebP Support**: Modern format for better compression

## Implementation for Different Business Types

### Restaurants
```javascript
// Hero Image
heroImage: 'https://source.unsplash.com/1200x600/?restaurant,food'

// Gallery Images
gallery: [
  'https://source.unsplash.com/400x300/?food,cuisine',
  'https://source.unsplash.com/400x300/?restaurant,interior',
  'https://source.unsplash.com/400x300/?chef,cooking',
  'https://source.unsplash.com/400x300/?dining,experience',
  'https://source.unsplash.com/400x300/?mexican,food',
  'https://source.unsplash.com/400x300/?restaurant,atmosphere'
]
```

### Professional Services
```javascript
// Hero Image
heroImage: 'https://source.unsplash.com/1200x600/?office,professional'

// Gallery Images
gallery: [
  'https://source.unsplash.com/400x300/?office,workspace',
  'https://source.unsplash.com/400x300/?meeting,business',
  'https://source.unsplash.com/400x300/?team,professional',
  'https://source.unsplash.com/400x300/?consultation,service',
  'https://source.unsplash.com/400x300/?technology,modern',
  'https://source.unsplash.com/400x300/?success,achievement'
]
```

## Troubleshooting Stock Images

### Common Issues & Solutions

1. **Images Not Loading**
   - Check internet connectivity
   - Verify Unsplash service status
   - Use fallback image URLs

2. **Inappropriate Images**
   - Refine category keywords
   - Use more specific search terms
   - Implement content filtering

3. **Slow Loading**
   - Optimize image sizes
   - Implement lazy loading
   - Use image compression

4. **Repetitive Images**
   - Add random parameters
   - Use different category combinations
   - Rotate image sources

### Fallback Strategy
```javascript
function getImageWithFallback(category, width, height) {
  const primaryUrl = `https://source.unsplash.com/${width}x${height}/?${category}`;
  const fallbackUrl = `https://images.unsplash.com/photo-default-${category}.jpg`;
  
  // Try primary, fall back to default if needed
  return primaryUrl;
}
```

## Advanced Features

### Dynamic Image Categories
Automatically adjust image categories based on:
- Business type (from template selection)
- Location (Mexican market focus)
- Time of day (for restaurant images)
- Season (for tourism images)

### Custom Image Pools
Create curated image collections:
1. Pre-select high-quality images
2. Store in custom CDN or service
3. Rotate through approved images
4. Maintain brand consistency

### Analytics Integration
Track image performance:
- Loading times
- User engagement
- Conversion rates
- A/B testing results

## Migration from Facebook CDN

### Why We Switched
- **CORS Restrictions**: Facebook blocks external image loading
- **Reliability**: Inconsistent availability
- **Legal Concerns**: Usage rights unclear
- **Performance**: Slower loading times

### Benefits of Stock Images
- **Reliable Loading**: No CORS issues
- **Professional Quality**: Curated photography
- **Legal Compliance**: Clear usage rights
- **Performance**: Optimized delivery
- **Consistency**: Professional appearance

## Future Enhancements

### Planned Features
1. **AI Image Generation**: Custom business-specific images
2. **Local Photography**: Mexican market-focused content
3. **Brand Customization**: Company color overlays
4. **Dynamic Seasons**: Time-based image rotation
5. **Industry Specialization**: More specific categories

This implementation ensures every WebSitioPro template has professional, relevant imagery that enhances the business presentation while maintaining fast loading times and legal compliance.