// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page    
      $("#articles").append('<div class="card mb-3"><div class=card-body><h4>' + data[i].title + '</h4><p>' + data[i].summary + '</p><a href=' + data[i].link + ' target=blank>Link To Article</a></div><button type=button class="btn btn-dark" id="add-comment" data-id=' + data[i]._id + '>Comment</button><p> COMMENTS: ' + data[i].comment + '</p></div>');


    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "#add-comment", function() {
    // Empty the comments from the comment section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    console.log($(this).attr("data-id"));
    
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the comment information to the page
      .then(function(data) {
        console.log("This is get id response" + JSON.stringify(data));
        // The title of the article
        $("#comments").append("<h5>" + data.title + "</h5>");
        // An input to enter a new title
        $("#comments").append("<input id='titleinput' name='title' >");
        // A textarea to add a new comment body
        $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new comment, with the id of the article saved to it
        $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
  
        // If there's a comment in the article
        if (data.comment) {
          // Place the title of the comment in the title input
          $("#titleinput").val(data.comment.title);
          // Place the body of the comment in the body textarea
          $("#bodyinput").val(data.comment.body);
        }
      });
  });
  
  // When you click the savecomment button
  $(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the comment, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from comment textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the comments section
        $("#comments").empty();
      });
  
    // Also, remove the values entered in the input and textarea for comment entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  