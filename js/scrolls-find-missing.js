var allScrollsDeck = {};
var allScrolls = {};

$('#theInput').val('{"deck":"","author":"Qowface","types":[318,278,297,117,314,319,188,42,39,157,306,70,25,222,381,166,74,343,373,364,68,357,311,542,356,54,21,34,316,194,226,59,355,75,382,286,38,1,199,217,254,296,294,363,173,299,288,307,347,266,204,367,218,304,354,348,215,48,90,245,213,246,210,366,119,187,196,300,280,352,29,82,284,376,123,122,32,133,180,200,271,153,27,22,147,168,353,65,261,360,206,154,315,61,332,370,238,58,243,295,87,374,178,223,113,224,55,190,377,383,379,321,341,241,51,227,107,112,76,128,127,308,137,177,287,362,169,282,186,170,540,322,309,203,229,351,247,185,19,44,155,79,258,345,312,35,143,195,92,118,172,337,175,130,77,277,91,344,214,333,270,385,320,81,80,302,372,255,33,192,109,116,30,211,78,236,149,160,24,256,375,335,212,183,293,285,152,264,272,207,267,541,384,111,298,305,237,253,63,161,292,97,257,310,251,159,62,150,20,131,263,208,358,67,174,273,350,53,250,184,342,313,359,193,275,145,230,100,57,141,86,262,201,221,140,289,120,378,371,265,102,151,279,228,85,148,235,162,108,181,219,41,50,142,249,3,244,115,281,96,365,4,368,83,248,37,84,340,36,234,334,209,103,93,60,56,182,317,361,291,303,121,158,146,276,290,15,26,338,231,269,252,104,138,268,16,216,171,239,88,301,156,98,110,105,369,380,52,179,197,126,242,139,349,124,191,49,99,95,47,274,94,73,164,165,43,40,114,18,163,101,202,2,71,89,135,13,134,260,205,45,125,66,336,23,129,64,69,17,259,189,346,198,283,176,232,278,117,314,188,42,39,157,306,70,25,222,166,74,343,373,364,68,357,311,356,54,21,34,316,194,226,59,355,75,382,38,1,199,217,254,296,294,173,307,367,218,304,354,348,215,48,90,245,246,210,366,119,280,352,29,82,284,376,123,122,32,133,180,200,271,153,27,22,147,168,353,65,261,360,206,154,315,61,332,370,238,58,295,87,374,178,223,113,224,55,190,377,383,379,321,341,241,51,107,112,76,128,127,308,137,177,287,362,169,282,170,540,322,309,203,229,351,185,19,44,155,79,345,312,35,143,195,92,118,172,337,130,77,277,91,344,214,333,270,385,320,80,302,372,255,33,192,109,78,149,160,24,256,375,212,183,285,152,272,207,267,384,111,298,305,237,63,161,292,97,251,159,62,150,20,131,208,358,67,174,273,350,53,250,184,342,313,359,193,275,145,100,57,141,86,221,289,120,378,371,102,151,279,228,85,148,235,162,108,181,219,41,50,142,249,3,244,115,281,96,365,4,83,37,84,340,36,234,334,209,93,60,182,317,361,291,303,121,146,276,290,15,26,338,231,269,104,138,268,16,216,171,239,88,301,156,98,110,105,369,52,179,197,126,242,139,349,124,191,49,99,95,47,274,73,164,165,43,40,114,18,163,101,202,2,71,89,135,13,205,45,125,66,23,64,69,17,259,189,198,283,176,232,278,42,39,157,222,74,373,68,357,311,356,54,21,34,194,355,75,38,1,199,217,296,294,173,307,367,218,354,348,215,48,90,245,246,210,366,280,29,82,376,123,122,32,271,153,27,22,147,353,65,360,206,154,61,332,295,87,374,178,223,113,224,55,190,377,379,341,241,51,107,112,128,127,308,137,177,287,362,282,170,540,322,309,351,185,44,155,79,345,312,35,143,195,92,172,337,130,77,91,333,270,385,80,302,372,255,33,192,109,78,149,160,24,212,183,285,152,272,267,111,298,305,237,63,292,97,251,62,150,20,208,358,67,273,350,53,342,359,275,145,100,57,141,86,221,289,120,378,371,102,151,279,228,85,235,162,108,181,219,41,50,142,249,3,244,115,281,96,365,4,83,37,84,340,36,234,334,209,93,60,317,361,303,121,146,276,15,26,231,269,104,268,16,171,239,88,301,156,98,110,105,52,179,197,126,242,139,349,124,191,49,99,95,274,73,164,165,40,114,18,163,101,202,2,71,89,135,13,205,45,125,66,23,64,69,17,259,189,198,283,176,232]}');

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
