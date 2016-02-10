'require strict'

import request from 'superagent'

let path = 'http://localhost:3000/'
let id = 'table_0_0'

export const getBoard = (id) => {
	request
		.get(path + id)
		.end((err, res) => {
			if (err) { console.log('(AJAX) Error retriving board from server'); return }
			console.log('res', res)
		})
}
