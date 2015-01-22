var GitHubApi = require("github");
var sugar = require("sugar");
var async = require("async");

var github = new GitHubApi({
	// required
	version: "3.0.0",
	// optional
	//debug: true,
	protocol: "https",
	timeout: 5000,
	headers: {
		"user-agent": "github-issues-importer", // GitHub is happy with a unique user agent
	}
});

// lets authorize
github.authenticate({
	type: "basic",
	username: "yetithefoot",
	password: "" // put your password here
});

// read tasks from file
var config = require('./issues.json');

// github have rate limits 20 reqs per minute, so we need to create delay
// https://developer.github.com/v3/search/#rate-limit
function buildDelayTask() { 
	return function(callback) { 
		setTimeout(function() { callback(null, {}); }, 3210);
	};
}

// issue create task
var buildCreateIssueTask = function(issue) {

	return function(callback){

		// labels is required, will concat with global labels
		issue.labels = (issue.labels || []).union(config.labels || []) || [];

		if(!issue.user) issue.user = config.user;
		if(!issue.repo) issue.repo = config.repo;
		if(!issue.assignee) issue.assignee = config.assignee;

		github.issues.create(issue, function(err, result){
			if(err) console.log(err);
			else console.log('Task #%d created. -> %s', result.number, result.url);
			callback(err, result)
		});
	}
}

// run all tasks with delay to respect API limits
var tasks = [];
config.issues.each(function(issue){
	tasks.push(buildCreateIssueTask(issue));
	tasks.push(buildDelayTask());
})

async.series(tasks, function(err, results){
	console.log('Done.')
});




