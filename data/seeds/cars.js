exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('cars').truncate().then(function() {
		// Inserts seed entries
		return knex('cars').insert([
			{
				vin                    : '123',
				make                   : 'doggo',
				model                  : 'doggo',
				mileage                : '4567',
				automatic_transmission : 'true',
				status_of_title        : 'clean',
			},
			{
				vin                    : '4567',
				make                   : 'Toyota',
				model                  : 'Prius',
				mileage                : '1234567',
				automatic_transmission : 'true',
				status_of_title        : '',
			},
			{
				vin                    : '8910',
				make                   : 'Honda',
				model                  : 'Civic',
				mileage                : '1234567',
				automatic_transmission : 'true',
				status_of_title        : '',
			},
		]);
	});
};

// The critical information for each car is the VIN, make, model, and mileage.
// - They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.

// ## Stretch Problems
