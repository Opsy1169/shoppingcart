
initButtons()

var addToCart = function(e){
    console.log("asd");
    
    let position =   $('<div ><h2></h2><p></p><p></p></div>');
    position.children().eq(0).text() = $(this).siblings().eq(1).text();
    position.children().eq(1).text() = $(this).siblings().eq(2).text();
    position.children().eq(2).text() = $(this).siblings().eq(3).text();
    let cart = $('.cart').append(position);
}

function initButtons() {
    let button = $('<button>');
    button.addClass('btn btn-labeled btn-info');
    let span = $('<span class="btn-label"><i class="glyphicon glyphicon-shopping-cart"></i></span>Add to cart</button>');
    span.appendTo(button);
    button.on('click', function(){
        let position =   $('<div ><h2></h2><p></p><p></p></div>');
        position.children().eq(0).text($(this).siblings().eq(1).text());
        position.children().eq(1).text( $(this).siblings().eq(2).text());
        position.children().eq(2).text($(this).siblings().eq(3).text());
        console.log( $(this).siblings().eq(1).text());
        
        let cart = $('.cart').append(position);
    });
    $('.col-xs-12').append(button);
}


