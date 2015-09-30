//(function($) {
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

            $("#results").append()
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

//}) (jQuery);