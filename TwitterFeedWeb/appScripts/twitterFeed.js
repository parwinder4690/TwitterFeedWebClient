
// twitterFeed widget hanlde access to api and filter the tweets
$(document).ready(function () {
        $.widget("ui.twitterFeed", {
            options: {
                data: [],
                filterText: '',
                template: ''
            },
            _init: function ()
            {
                var self = this;

                var urlTemplate = "/appScripts/feedContent.html";
                $.when($.get(urlTemplate)).then(function (_html) {
                    self.options.template = _html;

                    self.load();
                    self.setInterval();
                });
 
            },
            setInterval: function (_self)
            {
                setInterval(function () {
                    _self.load();
                }, 1000 * 60 );
            },
            load: function ()
            {
                var self = this;
                //var url = "http://localhost:61989/api/TimeLineFeed";
                var url ="http://35.184.238.128/TwitterFeedAPI/api/TimeLineFeed"
                $.when($.getJSON(url)).then(function (_data) {
                    self.options.data = _data;
                    self.renderTweets();
                });
            },
            renderTweets: function ()
            {
                var self = this;
                var el = self.element;
                var data = self.options.data;
                //Set filter if any filter text in filterText 
                if (self.options.filterText != '')
                {
                    data = data.filter(function (tweetData, index) {
                        return tweetData.Text.includes(self.options.filterText);
                    });
                }
                var divContent = document.createElement("div");
                data.forEach(function (value, index) {
                    $(self.options.template).tmpl(value).appendTo(divContent);
                });
   

                el.html(divContent);
            },
            setFilter: function (_filterText) {
                var self = this;
                self.options.filterText = _filterText;
                self.renderTweets();
            }
        });

        
      
    });
