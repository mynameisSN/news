require ('ignore-styles');

require ('@babel/register') ({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties'],
});

require ('./server.js');

// npm install @babel/register @babel/preset-env @babel/preset-react ignore-styles express
// above packages for jsx support from server side
