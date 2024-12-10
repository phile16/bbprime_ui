

## Build the Component

npm run build


## Start the Backend Server to process analytics data

node src/server.js 


## Example Usage

```
import React from 'react';
import { Forager2 } from 'forager2';
const App = () => (
  <div>
    <h1>Web Analysis Demo</h1>
    <HoverAnalyticsDisplay />
  </div>
);
export default App;
```

## From Scratch

### Initialize

```
npm init -y
npm install react react-dom prop-types
npm install --save-dev webpack babel-loader @babel/core @babel/preset-env @babel/preset-react
npm install mongoose express cors
```

### Fodler Structure

``
forager2/
├── src/
│   ├── components/
│   │   ├── HoverTracker.js
│   │   └── HoverAnalyticsDisplay.js
│   ├── index.js
├── dist/
├── package.json
├── webpack.config.js
├── .babelrc
```