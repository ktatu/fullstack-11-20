let testUser = {
	username: "testUser",
	name: "testName",
	password: "testPassword"
}

let userWithFieldRemoved = (user, field) => {
	let userToReturn = { ...user }
	delete userToReturn[field]
	return userToReturn
}

module.exports = {
	testUser,
	userWithFieldRemoved
}