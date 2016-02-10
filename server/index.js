'use strict'

let fs = require('fs')
let path = require('path')
let express = require('express')

let app = express()
let tablePath = path.join(__dirname, "../data/table-data.json")

	app.get('/', function (rep, res) {
		console.log('server res', res)
		fs.readFile(filePath, 'utf8', function (err, data) {
			console.log('server data', data)
			if (err) { console.log('Failed to read table data'); return null }
			var json = JSON.parse(data)
			console.log(res.json)
			res.json
		})
	})



	// 	fs.writeFile(filePath, JSON.stringify(json), function (err, data) {
	// }