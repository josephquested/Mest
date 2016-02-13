'use strict'

import request from 'supertest'
import test from 'tape'
import getBoard from '../client/ajax.js'

console.log(getBoard)

test('Read Table Data', function (t) {
  request(getBoard)
    .get('http://localhost:3000/table_0_0')
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
