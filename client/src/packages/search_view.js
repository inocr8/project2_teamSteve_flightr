var SearchView = function(){
    var self = this;

    self.departureAirport = document.querySelector('#departure-airport');
    self.arrivalAirport = document.querySelector('#arrival-airport');

    self.searchButton = document.querySelector('#search-button');

    self.searchButton.onclick = function(){
        var departure = self.departureAirport.value;
        var arrival = self.arrivalAirport.value;

        console.log('departure', departure);
        console.log('arrival', arrival);
    };
};

SearchView.prototype = {

};

module.exports = SearchView;