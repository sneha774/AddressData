
function loadData() {

    function getGoogleAPIKey(){
      return "AIzaSyApYWIDWREP_0Qi1JPxdN1sg194QhKCJ20";
    }

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val();
    var city = $("#city").val();
    var imgLink = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + street + "," + city + "&key=" + getGoogleAPIKey();
    var img = '<img class="bgimg" src="' + imgLink + '"/>';
    $body.append(img);
    return false;
};

$('#form-container').submit(loadData);
