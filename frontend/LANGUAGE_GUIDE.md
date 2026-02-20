# Hindi Language Support Guide

## Overview
This application now supports both English and Hindi languages. Users can switch between languages using the language switcher in the header.

## Features
- ✅ Language switcher in header (desktop and mobile)
- ✅ Persistent language preference (saved in localStorage)
- ✅ Smooth language switching without page reload
- ✅ Comprehensive translations for all UI elements
- ✅ Accessible (updates HTML lang attribute)

## How to Use Translations in Components

### 1. Import the useLanguage hook
```javascript
import { useLanguage } from '../contexts/LanguageContext';
```

### 2. Use the hook in your component
```javascript
const MyComponent = () => {
  const { t, language, toggleLanguage, isHindi } = useLanguage();
  
  return (
    <div>
      <h1>{t('header.home')}</h1>
      <p>{t('home.hero.title')}</p>
      <button onClick={toggleLanguage}>
        Switch to {isHindi ? 'English' : 'Hindi'}
      </button>
    </div>
  );
};
```

### 3. Available hook properties
- `t(key)` - Translation function. Pass a dot-notation key (e.g., 'header.home')
- `language` - Current language code ('en' or 'hi')
- `toggleLanguage()` - Function to switch between languages
- `setLanguage(lang)` - Function to set a specific language
- `isHindi` - Boolean indicating if current language is Hindi

## Adding New Translations

### 1. Open the translations file
File: `frontend/src/translations/index.js`

### 2. Add your translation keys
```javascript
export const translations = {
  en: {
    mySection: {
      title: 'My Title',
      description: 'My Description'
    }
  },
  hi: {
    mySection: {
      title: 'मेरा शीर्षक',
      description: 'मेरा विवरण'
    }
  }
};
```

### 3. Use in your component
```javascript
<h1>{t('mySection.title')}</h1>
<p>{t('mySection.description')}</p>
```

## Translation Structure

The translations are organized by sections:
- `header` - Header navigation and branding
- `home` - Home page content
- `footer` - Footer content
- `booking` - Booking form labels and messages
- `services` - Service names and descriptions
- `pricing` - Pricing information
- `common` - Common UI elements (buttons, labels, etc.)

## Example: Updating a Page Component

```javascript
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const MyPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">{t('myPage.title')}</h1>
      <p className="text-lg">{t('myPage.description')}</p>
      <button className="btn-primary">
        {t('common.submit')}
      </button>
    </div>
  );
};

export default MyPage;
```

## Best Practices

1. **Use descriptive keys**: Use dot notation to organize translations logically
   - Good: `booking.personalInfo.name`
   - Bad: `name1`

2. **Keep translations consistent**: Use the same terminology across the app

3. **Test both languages**: Always test your changes in both English and Hindi

4. **Handle dynamic content**: For content with variables, you may need to create helper functions

5. **Fallback**: If a translation key is not found, the key itself is returned

## Language Switcher UI

The language switcher appears in two places:
1. **Desktop Header**: Icon button with language name
2. **Mobile Menu**: Full-width button with icon and text

## Persistence

The selected language is automatically saved to `localStorage` and restored when the user returns to the site.

## Future Enhancements

Potential improvements:
- Add more languages (e.g., Marathi, Bengali)
- RTL support for languages that need it
- Translation management system
- Automatic translation detection based on browser settings

