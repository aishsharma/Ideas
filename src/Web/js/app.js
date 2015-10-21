//Any app config variables go here
var config = {
	API_URL: "http://localhost:8080/api/",
	TEMPLATES: "templates/",
	CONSTANTS: {
		BROWSE: "Get All Ideas in database.",
		GET: "Get one idea from database.",
		ADD: "Add a new idea to the database.",
		SEARCH: "Search for an idea in the database",
		IGNORE: "No API data required"
	},
	LOADSPINNER: "<div id='spinner'><i class='fa fa-spinner fa-pulse fa-5x'></i></div>"
};


//Loads content from views
function loadContent(path) {
	//Showing a load spinner till all ajax is completed	
	$("#content").html(config.LOADSPINNER);

	//Getting html from template file
	var templateHtml;

	//Get data for template.
	var templateData;

	//Get name of service.
	var service = Idea.getService(path);

	//Getting template
	$.get(config.TEMPLATES + path, function(html) {
			templateHtml = html;
		}, "html")
		.done(function() {
			if (service != null) {
				//Getting template data
				$.getJSON(config.API_URL + service, function() {
						console.log("Ajax success while getting all ideas");
					})
					.done(function(data) {
						console.log("Data retrieved successfully while getting all ideas");
						templateData = data;

						//Compiling template.
						var template = Handlebars.compile(templateHtml);

						//Adding html to my web page
						$("#content").html(template(templateData));

						if (templateData.error != null || templateData.error != "") {
							$("#lblError").hide();
						}

					})
					.fail(function() {
						console.log("Data could not be retrieved failed while getting ideas.");
						results = {
							"status": 400,
							"error": "Ajax request failed"
						};

						templateData = results;

						//Compiling template.
						var template = Handlebars.compile(templateHtml);

						//Adding html to my web page
						$("#content").html(template(templateData));

					});
			} else {
				//No service needed. Just return HTML from view.
				//Compiling template.
				var template = Handlebars.compile(templateHtml);

				//Adding html to my web page
				$("#content").html(template(templateData));
			}
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

//Returns REST service name
Idea.getService = function(path) {
	var service = Idea.getServiceConstant(path);

	switch (service) {
		case config.CONSTANTS.BROWSE:
			return "getAllIdeas";
		case config.CONSTANTS.SEARCH:
			return "search/";
		case config.CONSTANTS.GET:
			return "getIdea/";
		case config.CONSTANTS.ADD:
			return "newIdea";
		default:
			return null;
	}
};

Idea.getServiceConstant = function(path) {
	if (path.indexOf("browse") > -1) {
		return config.CONSTANTS.BROWSE;
	} else if (path.indexOf("search") > -1) {
		return config.CONSTANTS.SEARCH;
	} else {
		return config.CONSTANTS.IGNORE;
	}
};

//Getting idea information as a modal for the calling page.
Idea.getIdea = function(id) {

	//Remove old modal.
	var modal = $("#ideaModal");
	if (modal != null) {
		modal.remove();
	}

	//Getting html from template file
	var templateHtml;

	//Get data for template.
	var templateData;

	//Name of service.
	var service = "getIdea/" + id;

	//Getting template
	$.get(config.TEMPLATES + "idea.html", function(html) {
			templateHtml = html;
		}, "html")
		.done(function() {
			//Getting template data
			$.getJSON(config.API_URL + service, function() {
					console.log("Ajax success while getting all ideas");
				})
				.done(function(data) {
					console.log("Data retrieved successfully while getting all ideas");
					templateData = data.data;

					//Compiling template.
					var template = Handlebars.compile(templateHtml);

					//Adding html to my web page
					$("#content").append(template(templateData));

					//Idea Modal Options
					var options = {
						"backdrop": "static",
						"keyboard": "true",
						"show": "true"
					};

					//Show modal
					$("#ideaModal").modal(options);
				})
				.fail(function() {
					console.log("Data could not be retrieved failed while getting ideas.");
					results = {
						"title": "Error",
						"details": "Could not retreive the idea."
					};

					templateData = results;

					//Compiling template.
					var template = Handlebars.compile(templateHtml);

					//Adding html to my web page
					$("#content").append(template(templateData));

					//Idea Modal Options
					var options = {
						"backdrop": "static",
						"keyboard": "true",
						"show": "true"
					};

					//Show modal
					$("#ideaModal").modal(options);
				})
		});
};

//Searching for an Idea
Idea.search = function() {
	var searchText = $("#search").val();
	
	if (searchText === "") {
		loadContent("browse.html");
		return;
	}

	$("#results").html(config.LOADSPINNER);

	//Getting html from template file
	var templateHtml;

	//Get data for template.
	var templateData;

	//Name of service.
	var service = "search/" + searchText;

	//Getting template
	$.get(config.TEMPLATES + "search_results.html", function(html) {
			templateHtml = html;
		}, "html")
		.done(function() {
			//Getting template data
			$.getJSON(config.API_URL + service, function() {
					console.log("Ajax success while getting all ideas");
				})
				.done(function(data) {
					console.log("Data retrieved successfully while getting all ideas");
					templateData = data;

					//Compiling template.
					var template = Handlebars.compile(templateHtml);

					//Adding html to my web page
					$("#results").html(template(templateData));
					
					if (templateData.error != null || templateData.error != "") {
							$("#lblError").hide();
						}
				})
				.fail(function() {
					console.log("Data could not be retrieved failed while getting ideas.");
					results = {
						"status": 400,
						"error": "Ajax request, could not retrieve search results."
					};

					templateData = results;

					//Compiling template.
					var template = Handlebars.compile(templateHtml);

					//Adding html to my web page
					$("#results").html(template(templateData));

				})
		});
};