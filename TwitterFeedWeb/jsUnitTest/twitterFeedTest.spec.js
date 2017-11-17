describe('test twitterFeed widget', function () {
        it("widget should create object and load the data", function () {
        var fixture = setFixtures('<div id="divTweets"></div>');

        spyOn($, 'getJSON').and.callFake(function () {
            var ajaxMock = $.Deferred();

            var data = [
                {
                    "Id": 930200837934211074,
                    "UserName": "Salesforce",
                    "ScreenName": "salesforce",
                    "ProfileImageUrl": "",
                    "Text": "@Markus64 Hi Mark, if you fill out our form someone",
                    "RetweetCount": 0,
                    "CreatedAtxt": "2017-11-13T17:28:56-05:00"
                },
                {
                    "Id": 930193594727780352,
                    "UserName": "Salesforce",
                    "ScreenName": "salesforce",
                    "ProfileImageUrl": "",
                    "Text": "🥁 Tada! THE top 10 moments fro",
                    "RetweetCount": 4,
                    "CreatedAtxt": "2017-11-13T17:00:09-05:00"
                }
            ];
            ajaxMock.resolve(data);
            return ajaxMock.promise();
        });

        var tweetControl = $("#divTweets").twitterFeed();

        expect($(".feedContent").length).toBe(2);
    });
    
 });