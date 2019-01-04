const server = require('./server');
const router = new server();

// You can use `setRoute` to define new route
router.setRoute('/', 'GET', (req, res) => {
   return res.json({
      message: 'success'
   });
});

// Our you can use [method] to define new route
router.get('/test', (req, res) => {
   return res.send('Hello from mars');
});


router.post('/test', (req, res) => {
   return res.send('Hello from mars');
});

// To start our server
router.listen(3000);