const _ = require("lodash")

const dummy = (blogs) => {
	return 1
}

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
	let blogWithMostLikes = { likes : -1 }
	for (let blog of blogs) {
		blogWithMostLikes = blog.likes < blogWithMostLikes.likes ? blogWithMostLikes : blog
	}
	return blogWithMostLikes.likes === -1 ? undefined : blogWithMostLikes
}

const mostBlogs = blogs => {
	let authorsAndBlogCounts = _.map(_.countBy(blogs, "author"), (val, key) => ({ author: key, blogs: val}))

	let authorWithMostBlogs = _.head(_.orderBy(authorsAndBlogCounts, ["blogs"], ["desc"]))

	return authorWithMostBlogs
}

const mostLikes = blogs => {
	let authorAndLikesMapped = _.map(blogs, (blog) => {
		return { author: blog.author, likes: blog.likes}
	})

	let authorsReducedByLikes = authorAndLikesMapped.reduce((array, entry) => {
		let entryInArrayIndex = _.findIndex(array, { "author": entry.author })
		if (entryInArrayIndex !== -1) {
			array[entryInArrayIndex].likes += entry.likes
		} else {
			array = array.concat(entry)
		}
		return array
	}, [])

	return _.last(_.sortBy(authorsReducedByLikes, "likes"))
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}