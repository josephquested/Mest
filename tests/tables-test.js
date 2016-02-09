'use strict'

let test = require('tape')
let app = require('../server')
let request = require('supertest')

test('Read Table Data', function (t) {
  request(app)
  .get('/')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function (err, res) {
  	t.equal(res.type, 'application/json')
  	t.equal(res.status, 200)
  	t.ok(res.body.length > 0)
  	t.end()
  })
})
