//Any app config variables go here
var config = {
    API_URL: "http://localhost:8080/api"
};

//Loads content from views
function loadContent(path, success) {
    $("#content").load("views/" + path, success);
}

//Routes go here
var app = $.sammy("#content", function() {
    //Home Page
    this.get("#/", function(context) {
        loadContent("about.html");
    });

    //Browse Page
    this.get("#/browse", function(context) {
        loadContent("browse.html", browseSuccess);
    });

    //Post ideas
    this.get("#/post", function(context) {
        loadContent("post.html")
    });
});

//Starts the app on page load
$(function() {
    app.run("#/");
});


//Callback functions go here
var browseSuccess = function() {
    $("#results").append(config.API_URL);
}