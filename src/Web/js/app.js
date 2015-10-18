//Any app config variables go here
var config = {
	API_URL: "http://0.0.0.0:8080/api/",
	TEMPLATES: "templates/",
	CONSTANTS: {
		BROWSE: "Get All Ideas in database.",
		GET: "Get one idea from database.",
		ADD: "Add a new idea to the database.",
		SEARCH: "Search for an idea in the database",
		IGNORE: "No API data required"
	}
};


//Loads content from views
function loadContent(path) {
	//Getting html from template file
	var templateHtml;

	//TODO: get data for template.
	var templateData = Idea.getTemplateData(path);

	//Getting template
	$.get(config.TEMPLATES + path, function(html) {
			templateHtml = html;
		}, "html")
		.done(function() {
			//Compiling template.
			var template = Handlebars.compile(templateHtml);

			//Adding html to my web page
			$("#content").html(template(templateData));
		});
}

//Routes go here
var app = $.sammy("#content", function() {
	//Home Page
	this.get("#/", function(context) {
		loadContent("about.html");
	});

	//Browse Page
	this.get("#/browse", function(context) {
		loadContent("browse.html");
	});

	//Post ideas
	this.get("#/post", function(context) {
		loadContent("post.html")
	});
});

//Starts the Sammy app on page load
$(function() {
	app.run("#/");
});


//Library of custom functions is here
var Idea = Idea || {};
Idea.getTemplateData = function(path) {
	var service = Idea.getServiceConstant(path);

	switch (service) {
		case config.CONSTANTS.BROWSE:
			return Idea.api.getData("getAllIdeas").data;
			break;
		default:
			return null;
	}
};

Idea.getServiceConstant = function(path) {
	if (path.indexOf("browse") > -1) {
		return config.CONSTANTS.BROWSE;
	}
};

//API calls go here
Idea.api = Idea.api || {};
Idea.api.getData = function(serviceURI) {
	var results;

	$.getJSON(config.API_URL + serviceURI, function() {
			console.log("Ajax success while getting all ideas");
		})
		.done(function(data) {
			console.log("Data retrieved successfully while getting all ideas");
			results = data;
			return results;
		})
		.fail(function() {
			console.log("Ajax request failed while getting ideas.");
			results = {
				"status": 400,
				"error": "Ajax request failed"
			};
			return results;
		});
};