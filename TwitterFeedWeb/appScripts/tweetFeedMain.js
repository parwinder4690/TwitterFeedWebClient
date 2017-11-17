
$(document).ready(function () {
    var tweetControl = $("#divTweets").twitterFeed();

    $("#txtSearchText").on('change keyup copy paste cut', function () {
        $("#divTweets").twitterFeed("setFilter", $('#txtSearchText').val());
    });
});