//Loads content from views
function loadContent(path) {
    $("#content").load("views/" + path);
}

//Routes go here
var app = $.sammy("#content", function() {

    //Home Page
    this.get("#/", function(context) {
        loadContent("about.html");
    });

    //Browse Page
    this.get("#/browse", function(context) {
        loadContent("browse.html")
    });
});

//Starts the app on page load
$(function() {
    app.run("#/");
});

