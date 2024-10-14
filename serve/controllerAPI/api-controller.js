const express = require('express');
const router = express.Router();
const dbcon = require("../crowdfunding_db");
const connection = dbcon.getConnection();

// Connect to db
connection.connect();

//get active fundraisers
router.get('/fundraisers', function (req, res) {

		console.log(connection)
		// sql
		const query = `
		SELECT f.*, c.NAME AS category_name
	   FROM fundraiser f
	   JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
	   WHERE f.ACTIVE = 1
   		`;
		connection.query(query, function (err, results) {
			if (err) {
				console.log(err)
				// string to json format
				res.send(JSON.stringify({ message: 'Query Failure' }))
			}
			res.send(results)
			connection.release();
		})
})

//get all_fundraisers
router.get('/all_fundraisers', function (req, res) {
	
		const query = `
		SELECT f.*, c.NAME AS category_name
	   FROM fundraiser f
	   JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
	   ORDER BY ACTIVE DESC;
   `;
		connection.query(query, function (err, results) {
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ message: 'Query Failure' }))
			}
			res.send(results)
			connection.release();
		})
})

//search fundraisers
router.get('/search', function (req, res) {
	
		//get parameter from request query
		const organizer = req.query.organizer;
		const city = req.query.city;
		const categoryName = req.query.category;

		let query = `
		  SELECT *,name as CATEGORY_NAME 
		  FROM fundraiser f 
		  LEFT JOIN category c 
		  ON f.CATEGORY_ID = c.CATEGORY_ID
		  WHERE f.ACTIVE = 1 and
		`;

		console.log(organizer, city, categoryName)

		let conditions = [];
		let params = [];

		if (organizer) {
			conditions.push('organizer LIKE ?');
			params.push(`%${organizer}%`);
		}
		if (city) {
			conditions.push('city LIKE ?');
			params.push(`%${city}%`);
		}
		if (categoryName) {
			conditions.push('name = ?');
			params.push(categoryName);
		}

		query += conditions.join(' AND ');
		query += ' '

		connection.query(query, params, (err, results) => {
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ message: 'Query Failure' }))
			}
			res.send(results)
			connection.release();
		});
})

//query active fundraiser by id
router.get('/fundraiser/:id', function (req, res) {
	
		//get id from request url
		const fundraiserId = req.params.id;
		console.log(fundraiserId);
		const query = `
			 SELECT f.*, c.NAME AS category_name
		FROM fundraiser f
		JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
		WHERE f.ACTIVE = 1 and f.FUNDRAISER_ID = ?
		`;
		connection.query(query, [fundraiserId], function (err, results) {
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ message: 'Query Failure' }))
			}
			res.send(results[0])
			connection.release();
		})
})

//add donation
router.post('/donation', function (req, res) {
	
		//get parameters from request body
		const date = req.body.date
		const amount = req.body.amount
		const giver = req.body.giver
		const fundraiserId = req.body.fundraiserId

		console.log(date, amount, giver, fundraiserId);//test
		//Check data integrity
		if (!date || !amount || !giver || !fundraiserId) {
			// If the data is incomplete, a 400 error is returned
			return res.status(400).send('missing required arguments.');
		}
		// sql statements for insertion into the database
		const query = 'INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)';

		connection.query(query, [date, amount, giver, fundraiserId], function (err, results) {
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ message: 'Query failure' }))
			}
			res.send(JSON.stringify({ message: 'donation insert success' }))
			connection.release();
		})
})

// add fundraiser
router.post('/add_fundraiser', function (req, res) {
	
		// Get parameters from request body
		//const fundraiserId = req.body.FUNDRAISER_ID;  //fid automatically generated
		const organizer = req.body.ORGANIZER
		const caption = req.body.CAPTION
		const targetFunding = req.body.TARGET_FUNDING
		const currentFunding = req.body.CURRENT_FUNDING
		const city = req.body.CITY
		const active = req.body.ACTIVE
		const categoryID = req.body.Category

		console.log(targetFunding, currentFunding);//test

		//Check data integrity
		if (!organizer || !caption || !targetFunding || !currentFunding
			|| !city || !active || !categoryID
		) {
			// If the data is incomplete, a 400 error is returned
			return res.status(400).send('missing required arguments.');
		}
		// sql
		const query = `
		INSERT INTO fundraiser (
		ORGANIZER, 
		CAPTION, 
		TARGET_FUNDING, 
		CURRENT_FUNDING, 
		CITY, 
		ACTIVE, 
		CATEGORY_ID
		) VALUES (?, ?, ?, ?, ?, ?, ?)
 		`;

		connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryID], function (err, results) {
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(JSON.stringify({ message: 'fundraiser add success' }))
			connection.release();
		})
})


//update fundraiser
router.put('/fundraiser/:id', function (req, res) {
	
		// Get parameters from request body
		const fundraiserId = req.body.FUNDRAISER_ID;
		const organizer = req.body.ORGANIZER
		const caption = req.body.CAPTION
		const targetFunding = req.body.TARGET_FUNDING
		const currentFunding = req.body.CURRENT_FUNDING
		const city = req.body.CITY
		const active = req.body.ACTIVE
		const categoryID = req.body.CATEGORY_ID

		console.log(fundraiserId + "\n", req.query);

		//Check data integrity
		if (!organizer || !caption || !targetFunding || !currentFunding
			|| !city || !active || !categoryID
		) {
			// If the data is incomplete, a 400 error is returned
			return res.status(400).send(
				organizer + '  ' + caption + '  ' + targetFunding + '  ' + currentFunding
				+ '  ' + city + '  ' + active + '  ' + categoryID + '  '
				+ 'missing required arguments.');
		}
		// sql
		const query = `
		UPDATE fundraiser 
		SET ORGANIZER = ?,
			CAPTION = ?,
			TARGET_FUNDING = ?,
			CURRENT_FUNDING = ?,
			CITY = ?,
			ACTIVE = ?,
			CATEGORY_ID = ?
		WHERE FUNDRAISER_ID = ?
		`;
		connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryID, fundraiserId], function (err, results) {
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(JSON.stringify({ message: 'fundraiser update success' }))
			connection.release();
		})
})

router.delete('/fundraiser/:id', function (req, res) {
	
		const fundraiserId = req.params.id;
		console.log(fundraiserId);
		const query = 'SELECT COUNT(*) AS donationCount FROM DONATION WHERE FUNDRAISER_ID = ?';
		// const result = connection.query(query, [fundraiserId])
		connection.query(query, [fundraiserId], function (err, results) {
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			if (results.donationCount > 0) {
				// there is already a donation, sent error message
				return res.status(400).json({ message: 'Cannot delete a fundraiser that has received donations' });
			}
			//  no donations,  delete operation
			const deleteQuery = 'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
			connection.query(deleteQuery, [fundraiserId], function (err, results) {
				if (err) {
					console.log(err)
					res.send('Query failure')
				}
				//sucess msg
				res.send(JSON.stringify({ message: 'fundraiser delete success' }))
				connection.release();
			})

		});

});


// Export API routes
module.exports = router;