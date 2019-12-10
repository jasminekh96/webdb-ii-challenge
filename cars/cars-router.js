const express = require('express');
const knex = require('knex');

const db = knex({
	client           : 'sqlite3',
	connection       : {
		filename : './data/car-dealer.db3',
	},
	useNullAsDefault : true,
});

const router = express.Router();

router.get('/', (req, res) => {
	db
		.select('*')
		.from('cars')
		.then((cars) => {
			res.status(500).json(cars);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: 'Failed to retrieve cars' });
		});
});

router.post('/', (req, res) => {
	const carData = req.body;
	db('cars')
		.insert(carData)
		.then((ids) => {
			db('cars').where({ id: ids[0] }).then((newCarEntry) => {
				res.status(201).json(newCarEntry);
			});
		})
		.catch((err) => {
			console.log('POST error', err);
			res.status(500).json({ message: 'Failed to store data' });
		});
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db('cars')
		.where({ id: id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ message: `${count} record(s) updated` });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'error updating records' });
		});
});

router.delete('/:id', (req, res) => {
	db('cars')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: `${count} record(s) deleted` });
			} else {
				res.status(404).json({ message: 'id does not exist' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'could not delete the car' });
		});
});

module.exports = router;
