
initButtons()

// var addToCart = function(e){
//     console.log("asd");
    
//     let position =   $('<div><h2></h2><p></p><p></p></div>'); 
//     position.addClass('position');
//     position.children().eq(0).text() = $(this).siblings().eq(1).text();
//     position.children().eq(1).text() = $(this).siblings().eq(2).text();
//     position.children().eq(2).text() = $(this).siblings().eq(3).text();
   
//     let cart = $('.cart').append(position);
// }

function initButtons() {
    let button = $('<button>');
    button.addClass('btn btn-labeled btn-info');
    let span = $('<span class="btn-label"><i class="glyphicon glyphicon-shopping-cart"></i></span>Add to cart</button>');
    span.appendTo(button);
    button.on('click', function(){
        let goodId = $(this).parent().attr('data-good-id');
        let cart = $('.cart');
        if(cart.children('div[data-good-id =' + goodId + ']').length == 0){
            let position =   $('<div>');
            let priceAndName = $('<div class = "price-and-name "><p class = "nameholder"></p><p class = "priceholder"></p></div>');
            let quanAndBut = $('<div class = "quantity-and-buttons "><p class="button"></p><button class=" plus button btn btn-labeled btn-info" ><i class="glyphicon glyphicon-plus"></i></button>'
            + '<button class="button btn btn-labeled btn-info" ><i class="glyphicon glyphicon-minus"></i></button>'
            + '<button class="button btn btn-labeled btn-info" ><i class="glyphicon glyphicon-trash"></i></button> </div>')
            position.append(priceAndName);
            position.append(quanAndBut);
            position.attr('data-good-id', goodId);
            position.attr('quan', '1');
            quanAndBut.children('p').text('1');
            position.addClass('position');
            let buttons = quanAndBut.children('button');
            buttons.eq(0).click(function (e) {
                console.log("add");
                
                let quant  = parseInt($(this).closest('.position').attr('quan'), 10);
                console.log(quant);
                quant += 1;
                console.log(quant);
                $(this).closest('.position').attr('quan', quant)
                $(this).siblings('p').text(quant);
            })
            buttons.eq(2).click(function (e) {
                console.log("delete");
                $(this).closest('.position').remove();
            })
            buttons.eq(1).click(function (e) {
                console.log("decrement");
                let quant  = parseInt($(this).closest('.position').attr('quan'), 10);
                console.log(quant);
                quant -= 1;
                if( quant <= 0){
                    buttons.eq(2).click();
                }
                $(this).closest('.position').attr('quan', quant)
                $(this).siblings('p').text(quant);
            })

        
        // position.attr('data-good-id', goodId);
        // position.children().eq(0).text($(this).siblings().eq(1).text());
        priceAndName.children('.nameholder').text( $(this).siblings().eq(2).text());
        console.log(priceAndName.children('nameholder'));
        
        // position.children().eq(0).addClass('price-and-name')
        priceAndName.children('.priceholder').text($(this).siblings().eq(3).text());
        // position.children().eq(1).addClass('price-and-name')
        console.log( $(this).siblings().eq(1).text());
        position.addClass('position');
        cart.append(position);
        }
        else{
            console.log("already added");
            cart.children('div[data-good-id =' + goodId + ']').find('.plus').click();
        }
        
    });
    $('.col-xs-12').append(button);
}


