Is it possible to manipulate this:

```
  "content_scripts": [
    {
      "matches": [
        "https://www.google.com/*"
      ],
      "js": [
        "src/inject/inject.js"
      ]
    }
  ]
```
...via the settings menu?


Great source for examples: http://extensionizr.com


Perhaps needed:

"content_security_policy": "default-src 'self'  chrome-extension-resource: ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval';  connect-src *; frame-src *;",
"web_accessible_resources": [
  "*"
]


Similar:
