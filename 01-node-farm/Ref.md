# Notes to revisit

## 1

```typescript
const fs = require("fs");
const path = require("path");

const textIn = fs.readFileSync(
  path.join(__dirname, "..", "01-node-farm", "txt", "input.txt"),
  "utf-8"
);

const textOut = `This is what we know about avocado:${textIn}\nCreated on ${new Date().toDateString()}`;
fs.writeFileSync(
  path.join(__dirname, "..", "01-node-farm", "txt", "output.txt"),
  textOut
);
console.log("written successfully");
```
