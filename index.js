var app = require('./server')

var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Server running on port %d', port)
})
