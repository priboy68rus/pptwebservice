const app = require('./app');
const { BrowserHandler } = require('./utils/browser_handler');

const port = process.env.PORT || 8080;

if (require.main === module) {
  app.listen(port, () => {
    console.log('listening on port 8080');
  })
}