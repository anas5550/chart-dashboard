// generate-structure.js
const fs = require('fs');
const path = require('path');

const folders = [
  'public',
  'src/assets',
  'src/components/Button',
  'src/features/Auth',
  'src/hooks',
  'src/layouts',
  'src/pages',
  'src/routes',
  'src/services',
  'src/store',
  'src/styles',
  'src/utils',
];

const files = {
  'public/index.html':
    '<!DOCTYPE html><html><head><title>React App</title></head><body><div id="root"></div></body></html>',

  'src/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`,

  'src/react-app-env.d.ts': `/// <reference types="react-scripts" />`,

  'src/App.tsx': `import AppRouter from './routes/AppRouter';

function App() {
  return <AppRouter />;
}

export default App;
`,

  'src/routes/AppRouter.tsx': `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
`,

  'src/pages/Home.tsx': `const Home = () => {
  return <div>Home Page</div>;
};

export default Home;
`,

  'src/pages/NotFound.tsx': `const NotFound = () => {
  return <div>404 - Page Not Found</div>;
};

export default NotFound;
`,

  'src/components/Button/Button.tsx': `const Button = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
`,

  'src/components/Button/Button.module.css': `button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
}
`,

  '.eslintrc.js': `module.exports = {
  extends: [
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    // custom rules can go here
  },
};
`,

  '.prettierrc': `{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}
`,

  '.gitignore': `node_modules
build
dist
.env
`,
};

function createStructure() {
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log('Created folder:', folder);
    }
  });

  for (const [filePath, content] of Object.entries(files)) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim());
      console.log('Created file:', filePath);
    }
  }

  console.log('\n✅ Project structure created successfully.');
}

createStructure();
