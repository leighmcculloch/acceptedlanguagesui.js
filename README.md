# acceptedlanguagesui.js

A simple JavaScript library that asks the visitor if they'd like to view the current page in one of it's alternate languages, if the their browser indicates another language is preferred.

This library does not translate your website, but offers the alternate versions of your website, as defined by `<link rel="alternate" hreflang="es" href="..." />` tags in the `<head>` of your web page.

Uses [acceptedlanguages.js](https://github.com/leighmcculloch/acceptedlanguages.js) to discover the users accepted languages and the pages alternate languages.

## Why

Language dropdowns are often placed below the fold or in inconspicuous locations. Include this library and your visitors will be invited to switch to their preferred language without requiring them to discover the language drop down.

## Example

See the [example](example/) or see it in use on [Great Stories](https://greatstories.cn/the_lost_son).

<img src="README-screenshot-1.png" width="350" />
<img src="README-screenshot-2.png" width="350" />

## Install

### Bower

```bash
bower install acceptedlangaugesui
```

### NPM

```bash
npm install acceptedlanguagesui --save
```

### Manual

Download [acceptedlanguages.min.js](https://github.com/leighmcculloch/acceptedlanguages.js/blob/master/dist/acceptedlanguages.min.js) and [acceptedlanguagesui.min.js](dist/acceptedlanguagesui.min.js).

## Usage

### Globals

Include `acceptedlanguages.js` and `acceptedlanguagesui.js` into the page and call `init`.

```html
<html lang="en">
  <head>
    <link rel="alternate" hreflang="pt-BR" href="..." />
    <link rel="alternate" hreflang="es" href="..." />
    <link rel="alternate" hreflang="en" href="..." />
    <script src="acceptedlanguages.js"></script>
    <script src="acceptedlanguagesui.js"></script>
    <script type="text/javascript">
      window.onload = function() {
        acceptedlanguagesui.init();
      };
    </script>
  </head>
  <body>
  </body>
</html>
```

If the visitor is viewing the `en` version of the page, and the browser is configured with the languages `pt, zh-Hans, en-US`, they will be offered to switch to `pt-BR`.

### RequireJS

Include the library and then use as a dependency:

```javascript
define(['acceptedlanguagesui'], function(acceptedLanguagesUI) {
  acceptedlanguagesui.init();
});
```

## Analytics

It's possible to hook in analytics to track when acceptedlanguagesui is displaying and being used/discarded. Use the `onShow`, `onYes`, and `onNo` callbacks and then trigger your analytics library with the event. Here's an example of how to integrate with Google Analytics.

```javascript
acceptedlanguagesui.init({
  insertElementIntoSelector: '.side-menu-view-container',
  onShow: function(element, currentLanguage, relevantLanguage) {
    ga('send', 'event', 'acceptedlanguagesui', 'show', currentLanguage + '→' + relevantLanguage, {'nonInteraction': 1});
  },
  onYes: function(ev, currentLanguage, relevantLanguage) {
    ga('send', 'event', 'acceptedlanguagesui', 'yes', currentLanguage + '→' + relevantLanguage);
  },
  onNo: function(ev, currentLanguage, relevantLanguage) {
    ga('send', 'event', 'acceptedlanguagesui', 'no', currentLanguage + '→' + relevantLanguage);
  },
});
```

## Browser Compatibility

All browsers supporting ECMAScript 5: Chrome, Safari, Firefox, IE9, etc. If you need to support older browsers use [es5-shims](https://github.com/es-shims/es5-shim) to get the following:
* `Array.forEach`
* `Array.filter`
* `Array.map`

## Why not just redirect?

Redirections are an easy way to get a user to what you think is their preferred language, but can result in confusing or frustrating your visitors. Auto-redirects act on assumptions about the visitor, where-as acceptedlanguagesui.js looks at the assumptions and educates the user that the website is available in their language.

## Why not just serve the page in the different language on the same URL?

Google and other search engines will index your page based on it's URL. If you serve your content in multiple languages on the same URL, then Google will store one but unlikely all of them. You may only be reaching one language worth of your visitors via search engines in this case. See [Google's article](https://support.google.com/webmasters/answer/189077) about how to setup a multilanguage website for the best search outcome.
