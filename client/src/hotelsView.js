var HotelsView = function(packageOptions){
    this.packageOptions = packageOptions;
    // this.map = map;
    this.element = document.querySelector('#hotels');
};

HotelsView.prototype = {

    rebuildHotelsOptions: function(){
        this.element.innerHTML = Mustache.render('<p>{{itinerarary.destination}} Hotels</p>', this.packageOptions);
        
    }

};