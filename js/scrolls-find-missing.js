var allScrollsDeck = {};
var allScrolls = {};

function findMissingScrolls() {
    var object1 = parseDeckString($('#theInput').val().toString());

    //console.clear();
    console.log('=== INPUTS ===');
    console.log(object1);

    var result = diff(object1, allScrollsDeck);

    display(result);
}

function parseDeckString(deckString) {
    deck = JSON.parse(deckString);
    types = deck.types;
    var output = {};
    
    for (i in types) {
        item = output[types[i]];
        if (!item) {
            item = 1;
        } else {
            item += 1;
        }
        output[types[i]] = item;
    }
    
    return output;
}

function diff(obj1, obj2) {
    var left = {};
    var right = {};
    var both = {};
    
    for (k in obj1) {
        if (!(k in obj2)) {
            left[k] = obj1[k];
            delete obj1[k];
        } else if (k in obj2) {
            if (obj1[k] == obj2[k]) {
                both[k] = obj1[k];
                delete obj1[k];
                delete obj2[k];
            } else {
                var one = obj1[k];
                var two = obj2[k];
                if (one < two) {
                    both[k] = one;
                    right[k] = two - one;
                } else {
                    both[k] = two;
                    left[k] = one - two;
                }
                delete obj1[k];
                delete obj2[k];
            }
        }
    }
    for (k in obj2) {
        right[k] = obj2[k];
        delete obj2[k];
    }
    
    console.log('=== OUTPUTS ===');
    console.log('Left');
    console.log(left);
    console.log('Right');
    console.log(right);
    console.log('Both');
    console.log(both);
    
    console.log('=== INPUTS NOW ===');
    console.log(obj1);
    console.log(obj2);
    
    return {
        left: left,
        right: right,
        both: both
    }
}

function display(result) {
    $('#results div').html('');
    $('#placeholder').html('');

    for (item in result.right) {
        $('#results div').append('<h4><a href="#scrolls">' + allScrolls[item].name + '</a> x' + result.right[item] + '</h4>');
    }

    scrolldier();
}

$('#theButton').click(function() {
    $.ajax({
        url: 'http://a.scrollsguide.com/scrolls?norules',
        success: function(response) {
            var scrollsData = response.data;
            for (item in scrollsData) {
                var theItem = scrollsData[item];
                allScrollsDeck[theItem.id] = 3;
                allScrolls[theItem.id] = theItem;
            }
            console.log(allScrollsDeck);
            console.log(allScrolls);
            findMissingScrolls();
        }
    });
});
