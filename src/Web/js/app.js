//Any app config variables go here
var config = {
	API_URL: "http://localhost:8080/api/",
	TEMPLATES: "templates/",
	SERVICES: {
		BROWSE: "getAllIdeas",
		GET: "getIdea",
		ADD: "newIdea",
		SEARCH: "Search for an idea in the database",
		IGNORE: "No API data required"
	},
	LOADSPINNER: "<div id='spinner'><i class='fa fa-spinner fa-pulse fa-5x'></i></div>"
};

//Routes go here
var app = $.sammy("#content", function() {
	//Home Page
	this.get("#/", function(context) {
		Idea.loadContent("about.html");
	});

	//Browse Page
	this.get("#/browse", function(context) {
		Idea.loadContent("browse.html");
	});

	//Post ideas
	this.get("#/post", function(context) {
		Idea.loadContent("post.html")
	});
});

//Starts the Sammy app on page load
$(function() {
	app.run("#/");
});


//Library of custom functions is in this namespace
var Idea = Idea || {};

//Loads content from views
Idea.loadContent = function(path) {

	//Showing a load spinner till all ajax is completed	
	$("#content").html(config.LOADSPINNER);

	//Getting html from template file
	var templateHtml;

	//Get data for template.
	var templateData;

	//We will either use browse service or none at all. This is only needed for browse page.
	var service = "";
	if (path.indexOf("browse") > -1) {
		service = config.SERVICES.BROWSE;
	}

	//Getting template
	$.get(config.TEMPLATES + path, function(html) {
			templateHtml = html;
		}, "html")
		.done(function() {
			if (service != null && service != "") {
				//Getting template data
				$.getJSON(config.API_URL + service, function() {
						console.log("AJAX get on service: " + service);
					})
					.done(function(data) {
						console.log("Data retrieved successfully from service: " + service);
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
						console.log("AJAX get failed on service: " + service);
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
		})
		.fail(function() {
			console.log("Could not find template.");
		});
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
	var service = config.SERVICES.GET + "/" + id;

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
		Idea.loadContent("browse.html");
		return;
	}

	$("#results").html(config.LOADSPINNER);

	//Getting html from template file
	var templateHtml;

	//Get data for template.
	var templateData;

	//Name of service.
	var service = config.SERVICES.SEARCH + "/" + searchText;

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

Idea.newIdea = function() {

	//Getting form data
	var vTitle = $("#title").val();
	var vDetails = $("#details").val();

	//Creating data object to send to service.
	var data = {
		title: vTitle,
		details: vDetails
	};

	//var data = $("#newIdeaForm").serialize();

	//Posting data to server.
	$.post(config.API_URL + config.SERVICES.ADD, data, function(response, status) {

			//Showing load spinner while I do data post.
			$("#content").html(config.LOADSPINNER);

			var msg = ""
			if (status != "success") {
				msg = "There was an error while connecting to server"
			} else if (response.error != "") {
				msg = response.error;
			} else {
				msg = "Your Idea has been added!";
			}

			$("#content").html(msg);
		})
		.done(function() {
			console.log("Posted data to service suucessfully.")
		})
		.fail(function() {
			console.log("Data Post Failed.")
		});
};