'use strict'

let fs = require('fs')
let path = require('path')
let express = require('express')

let tablePath = path.join(__dirname, "../data/table-data.json")
let app = express()

	app.get('/', function (rep, res) {
		fs.readFile(filePath, 'utf8', function (err, data) {
			if (err) { console.log('Failed to read table data'); return null }
			var json = JSON.parse(data)
			console.log(res.json)
			res.json
		})
	})



	// 	fs.writeFile(filePath, JSON.stringify(json), function (err, data) {
	// }