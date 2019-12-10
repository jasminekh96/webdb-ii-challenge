exports.up = function(knex) {
	return knex.schema.createTable('cars', (tbl) => {
		tbl.increments();
		tbl.integer('vin', 100).notNullable().unique().index();
		tbl.string('make', 128).notNullable().unique().index();
		tbl.string('model', 128).notNullable().index();
		tbl.float('mileage');
		tbl.boolean('automatic_transmission');
		tbl.string('status_of_title', 128).notNullable().index();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('cars');
};
