/*
 * @Descripttion: Web-A3
 * @Author: Zhujiayao & Luchenchen
 */
var express = require('express');
var router = express.Router();
var pool    = require('../db/crowdfunding_db');

router.use(express.json()); // 用于解析JSON格式的请求体
// 使用中间件解析URL编码的请求体
router.use(express.urlencoded({ extended: true }));

router.get('/indexbox',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		console.log(connection)
		const query1 = `
		SELECT f.*, c.NAME AS category_name
	   FROM fundraiser f
	   JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
	   WHERE f.ACTIVE = 1
   `;
		connection.query(query1,function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(rows)
			connection.release();
		})
	})
})


router.get('/Search',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		// SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY,f.CONTENT
		let query = `
		SELECT *
		FROM FUNDRAISER f
		LEFT JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
		WHERE 1=1
	`;
		var categoryName = req.query.category
		var organizer = req.query.organizer
		var city = req.query.city
		const params = [];
	    console.log(categoryName,organizer,city)
		if (categoryName) {
			query += ' AND c.NAME = ?';
			params.push(categoryName);
		}
	
		if (organizer) {
			query += ' AND f.ORGANIZER LIKE ?';
			params.push(`%${organizer}%`);
		}
	
		if (city) {
			query += ' AND f.CITY = ?';
			params.push(city);
		}
		connection.query(query,params,function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(rows)
			connection.release();
		})
	})
})


router.get('/queryById', function (req, res, next) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const fundraiserId = req.query.id;
		console.log(fundraiserId);
		const query = `
			 SELECT f.*, c.NAME AS category_name
		FROM fundraiser f
		JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
		WHERE f.ACTIVE = 1 and f.FUNDRAISER_ID = ?
		`;
		connection.query(query, [fundraiserId],function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send(rows[0])
			connection.release();
		})
	})
})

router.post('/donation', function (req, res, next) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const date = req.query.date
		const amount = req.query.amount
		const giver = req.query.giver
		const fundraiserId = req.query.fundraiserId

		// console.log(date, amount, giver, fundraiserId);//测试拿到参数

		if (!date || !amount || !giver || !fundraiserId) {
            // 如果数据不完整，返回400错误
            return res.status(400).send('missing required arguments.');
        }
		// 准备插入数据库的SQL语句
		const query = 'INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)';

		connection.query(query, [date, amount, giver, fundraiserId],function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send("donation insert success")
			connection.release();
		})
	})
})

router.post('/add_fundraiser', function (req, res, next) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const organizer = req.query.organizer
		const caption = req.query.caption
		const targetFunding = req.query.target_funding
		const currentFunding = req.query.current_funding
		const city = req.query.city
		const active = req.query.active
		const categoryID = req.query.category_id

		console.log(targetFunding,currentFunding);//测试拿到参数
		if (!organizer || !caption || !targetFunding || !currentFunding 
			|| !city || !active || !categoryID
		) {
            // 如果数据不完整，返回400错误
            return res.status(400).send('missing required arguments.');
        }
		// 准备插入数据库的SQL语句
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

		connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryID],function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send("fundraiser insert success")
			connection.release();
		})
	})
})



router.put('/api/fundraiser/:id', function (req, res, next) {
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('Connection error')
		}
		const fundraiserId = req.params.id; // 从请求参数中获取筹款人的 ID
		const organizer = req.query.organizer
		const caption = req.query.caption
		const targetFunding = req.query.target_funding
		const currentFunding = req.query.current_funding
		const city = req.query.city
		const active = req.query.active
		const categoryID = req.query.category_id

		console.log(targetFunding,currentFunding);//测试拿到参数
		if (!organizer || !caption || !targetFunding || !currentFunding 
			|| !city || !active || !categoryID
		) {
            // 如果数据不完整，返回400错误
            return res.status(400).send('missing required arguments.');
        }
		// 准备插入数据库的SQL语句
		const query = `
		UPDATE fundraiser SET ORGANIZER = ?,
        CAPTION = ?,
        TARGET_FUNDING = ?,
        CURRENT_FUNDING = ?,
        CITY = ?,
        ACTIVE = ?,
        CATEGORY_ID = ?
		WHERE ID = ?
		`;
		connection.query(query, [organizer, caption, targetFunding, currentFunding, city, active, categoryID, fundraiserId],function(err,rows){
			if (err) {
				console.log(err)
				res.send('Query failure')
			}
			res.send("fundraiser insert success")
			connection.release();
		})
	})
})


;



module.exports = router;
