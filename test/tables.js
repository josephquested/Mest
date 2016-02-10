'use strict'

import request from 'supertest'

let test = require('tape')
let app = require('../client/ajax.js')

test('Read Table Data', function (t) {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) { console.log('(TEST) Error retriving board from server'); return }
      console.log('result', res)
      t.equal(res.type, 'application/json')
      t.equal(res.status, 200)
      // t.ok(res.body.length > 0)
      t.end()
    })
})
