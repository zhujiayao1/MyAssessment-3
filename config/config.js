/*
 * @Descripttion: A3-ionic
 * @Author: Zhujiayao & Chengshuhan
 */
// This is the configuration file for the database
module.exports = {
	// Host Name Host name of the computer where the database is located
	host:'localhost',
	user:'root',
	password:'root',
	database:'crowdfunding_db',
	port:'3306',
	connectionLimit : 20,
	waitForConnections: false
}
