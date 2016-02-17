// var Mustache = require('mustache');

// var PackageSummaryView = function(package,localStorageManager){
//   this.localStorageManager = localStorageManager;
//   this.package = package;
//   this.itinerary = package.itinerary;
//   this.outboundFlightElement = document.querySelector('#package-summary-outbound-flight');
//   this.returnFlightElement = document.querySelector('#package-summary-return-flight');
//   this.packageSummaryHotel = document.querySelector('#package-summary-hotel');
//   this.packageSummaryButton = document.querySelector('#package-summary-button')
//   console.log("Package Summary View Created")

//     var self = this;

//     this.package.optionsUpdatedSummary = function(){
//         self.rebuildPackageSummary();
//     };
//     this.package.outboundFlightUpdatedSummary = function(){
//         self.rebuildOutboundFlight();
//     };
//     this.package.returnFlightUpdatedSummary = function(){
//         self.rebuildReturnFlight();
//     };
//     this.package.hotelUpdatedSummary = function(){
//         self.rebuildHotel();
//     };

// }

// PackageSummaryView.prototype = {

// rebuildPackageSummary: function(){
//   this.rebuildOutboundFlight();
//   this.rebuildReturnFlight();
//   this.rebuildHotel();
//   this.buildSaveButton();
// },

// buildSaveButton: function(){
//   var button = document.createElement('button');
//   button.innerText = 'Save Package';

//     var self = this;
//   button.onclick = function(){
//       self.localStorageManager.savePackage(self.package);
//   };
//   this.packageSummaryButton.appendChild(button);
// },

//     rebuildOutboundFlight: function(){
//         this.outboundFlightElement.innerHTML = this.rebuildFlight(this.package.outboundFlight);
//     },

//     rebuildReturnFlight: function(){
//         this.returnFlightElement.innerHTML = this.rebuildFlight(this.package.returnFlight);
//     },

//     rebuildFlight: function(flight){
//         var view = {
//             flight: flight,
//             numberOfPersons: this.itinerary.numberOfPersons
//         };

//        return Mustache.render(
//             '<div class="package-flight">'
//         +       '<span class="date">{{flight.displayDates.departing.date}}</span>'
//         +       '<span class="from">{{flight.departure}}</span>'
//         +       '<span class="to">to {{flight.arrival}}</span>'
//         +       '<span class="time">Dep {{flight.displayDates.departing.time}} - Arr {{flight.displayDates.arriving.time}}</span>'
//         +       '<span class="price">{{numberOfPersons}} x £{{flight.price}}</span'
//         +   '</div>', view);
//     },

//    rebuildHotel: function(){
//         var hotel = this.package.hotel;

//         var dateOptions = {
//             weekday: 'short',
//             day: 'numeric',
//             month: 'short',
//             year: 'numeric'
//         };

//         var view = {
//             hotel: hotel,

//             display: {
//                 numberOfPersons: this.itinerary.numberOfPersons,
//                 numberOfNights: this.itinerary.numberOfNights,

//                 checkin: this.itinerary.checkin.toLocaleDateString('en-GB', dateOptions),
//                 checkout: this.itinerary.checkout.toLocaleDateString('en-GB', dateOptions),

//                 stars: hotel.stars > 1 ? 'stars' : 'star',
//                 nights: this.itinerary.numberOfNights > 1 ? 'nights' : 'night',
//                 persons: this.itinerary.numberOfPersons > 1 ? 'persons' : 'person'
//             }
//         };

//                 var output =  Mustache.render(
//             '<div class="package-hotel">'
//         +       '<span class="date">{{display.checkin}} - {{display.checkout}}</span>'
//         +       '<span class="name">{{hotel.name}}</span>'
//         +       '<span class="stars">{{hotel.stars}} {{display.stars}}</span>'
//         +       '<span class="price">{{display.numberOfNights}} {{display.nights}} x {{display.numberOfPersons}} {{display.persons}} x £{{hotel.pricePerPerson}}</span'
//         +   '</div>', view);

//         this.packageSummaryHotel.innerHTML = output;
//     }

// };

// module.exports = PackageSummaryView;