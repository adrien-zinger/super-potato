## checkXLSX.js

To use it create a config.js:

```javascript
export default {
  sheetignore: [],
  limits: {
    default: ["A", "Z", 0, 24],
  },
}
```

And add a file input.xlsx

run yarn xlsx