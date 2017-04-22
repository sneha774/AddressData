
function loadData() {

    function getGoogleAPIKey(){
      return "AIzaSyApYWIDWREP_0Qi1JPxdN1sg194QhKCJ20";
    }

    function getNYtAPIKey(){
      return "8cf8397b04a94b93976edb2992ad71e5";
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
    var address = street + "," + city;
    var imgLink = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + "&key=" + getGoogleAPIKey();
    var img = '<img class="bgimg" src="' + imgLink + '"/>';
    $body.append(img);

    $greeting.text("So, you are interested in " + address + "? Here it goes..");

    //load NY Times articles
    var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    nytURL += $.param({
      'api-key':getNYtAPIKey(),
      'q':city
    });
    $.getJSON(nytURL, function(data) {
      if( data.response && data.response.docs && data.response.docs.length ){
        $nytHeaderElem.text("New York Times articles about " + city );
        $.each(data.response.docs, function(i, article ){
          if( article.web_url && article.lead_paragraph && article.snippet && article.type_of_material != "Paid Death Notice"){
            var li = '<li class="article">';
            li += '<a target="_blank" href="' + article.web_url + '">' + article.snippet + '</a>';
            li += '<p>' + article.lead_paragraph + '</p>';
            li += '</li>';
            $nytElem.append(li);
          }
        });
      }
      else {
        $nytHeaderElem.text("New York Times Articles could not be loaded");
      }
    }).error(function(){
      $nytHeaderElem.text("New York Times Articles could not be loaded");
    });
    return false;
};

$('#form-container').submit(loadData);
