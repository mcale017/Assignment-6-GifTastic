// Initialize array of sports
var sports = ["football", "ice hockey", "soccer", "baseball", "basketball", "volleyball"]


// displaySports function renders the HTML
function displaySport() {
    // Store the data-name attribute of the button clicked
    var sport = $(this).attr("data-name");

    // Update the queryURL with the correct sport
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + sport + '&api_key=geIvRT3pmBulEx73snik2cGpLMo8dNKL&limit=10'

    // AJAX call for when the button is clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(mySport) {
        // For loop for all 10 gifs
        for (var i = 0; i < 10; i++) {
            // Creating a div to hold that sport's gifs
            var sportDiv = $("<div class='sport'>");

            // Storing the rating of the gif
            var rating = mySport.data[i].rating;

            // Creating an element to have the rating displayed
            var sportDivrating = $("<p>").text("Rating: " + rating);

            // Appending the rating to sportDiv
            sportDiv.append(sportDivrating);

            // Storing the still gif
            var gifStillURL = mySport.data[i].images.original_still.url;

            // Storing the animating gif
            var gifAnimatingURL = mySport.data[i].images.original.url;

            // Creating an element to hold the gif
            var gif = $("<img>").attr({
                src: gifStillURL,
                "data-still": gifStillURL,
                "data-animate": gifAnimatingURL,
                "data-state": "still",
                class: "gif",
            });

            // Appending the gif to sportDiv
            sportDiv.append(gif);

            // Putting the entire sportDiv above the previous sports
            $("#gifs").prepend(sportDiv);
        }
    });
}

// Function for displaying sport data
function renderButtons() {
    // Deleting the sports prior to adding new sports
    $("#gif-buttons").empty();

    // Looping through the array of sports
    for (var i = 0; i < sports.length; i++) {
        // Dynamically generating buttons for each sport
        var a = $("<button>");

        // Adding a class of sport-button to the button
        a.addClass("sport-button");

        // Adding a data-attribute of data-name
        a.attr("data-name", sports[i]);

        // Providing the initial button's text
        a.text(sports[i]);

        // Adding the button to the gif-buttons div
        $("#gif-buttons").append(a);
    }
}

// This function handles events where a sport button is clicked
$("#add-sport").on("click", function(event) {
    // Preventing the form button's default function to override
    event.preventDefault();

    // Grabbing the input from the textbox
    var sport = $("#sport-input").val().trim();

    // Adding that sport from the textbox to the array
    sports.push(sport);

    // Calling renderButtons to process the array through the function
    renderButtons();
});

// Adding a click event listener to all elements with a class of sport-button
$(document).on("click", ".sport-button", displaySport);

// Adding a click event listener to all elements with a class of gif
$("#gifs").on("click", ".gif", function(event) {
    // Storing the state of the gif
    var state = $(this).attr("data-state");

    // If the gif is in still data-state
    if (state === "still") {
        // Setting the data-state to animate
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    // If the gif is in animate data-state
    else {
        // Setting the data-state to still
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Calling renderButtons to display the initial buttons
renderButtons();
