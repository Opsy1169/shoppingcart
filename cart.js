
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
        if(cart.children('.position').length == 0){
            let costHeaders = $('<div><p>Subtotal: </p><p>Tax: </p><p>Total: </p></div>');
            let costSummary = $('<div><p class = "subtotal">0</p><p class = "tax">0</p><p class = "total">0</p></div>');
            let div = $('<div>');
            div.addClass('summary');
            costHeaders.addClass('summary-numbers left-part');
            costSummary.addClass('summary-numbers right-part');
            div.append(costHeaders);
            div.append(costSummary);
            cart.prepend(div);
            console.log("added");
        }
    
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
                let quant  = parseInt($(this).closest('.position').attr('quan'), 10);
                let price = priceAndName.find('.priceholder');
                quant += 1;

                $(this).closest('.position').attr('quan', quant)
                $(this).siblings('p').text(quant);
                let subtotalstr = priceAndName.find('.priceholder').text();
                let subtotal = parseFloat(subtotalstr, 10);                
                let tax = subtotal*0.1;
                let total = subtotal + tax;
                let summary = $('.summary-numbers.right-part');
                summary.find('.subtotal').text((parseFloat(summary.find('.subtotal').text()) + subtotal).toFixed(2));
                summary.find('.tax').text((parseFloat(summary.find('.tax').text()) + tax).toFixed(2));
                summary.find('.total').text((parseFloat(summary.find('.total').text()) + total).toFixed(2));
            })
            buttons.eq(2).click(function (e) {
                let position = $(this).closest('.position');
               
                let price = parseFloat(position.find('.priceholder').text());
                console.log("price" + position.find('.priceholder').text());
                
                let multiplier = parseInt(position.attr('quan'));
                console.log(multiplier);
                
                let subtotalstr = priceAndName.find('.priceholder').text();
                let subtotal = price*multiplier;                
                let tax = subtotal*0.1;
                let total = subtotal + tax;

                let summary = $('.summary-numbers.right-part');
                summary.find('.subtotal').text((parseFloat(summary.find('.subtotal').text()) - subtotal).toFixed(2));
                summary.find('.tax').text((parseFloat(summary.find('.tax').text()) - tax).toFixed(2));
                summary.find('.total').text((parseFloat(summary.find('.total').text()) - total).toFixed(2));
                position.remove();
                if($('.position').length == 0){
                    $('.summary').remove();
                }
            })
            buttons.eq(1).click(function (e) {
                console.log("decrement");
                let quant  = parseInt($(this).closest('.position').attr('quan'), 10);
                console.log(quant);
                quant -= 1;
                if( quant <= 0){
                    buttons.eq(2).click();
                    return;
                }
                $(this).closest('.position').attr('quan', quant)
                $(this).siblings('p').text(quant);

                let subtotalstr = priceAndName.find('.priceholder').text();
                let subtotal = parseFloat(subtotalstr, 10);                
                let tax = subtotal*0.1;
                let total = subtotal + tax;
                let summary = $('.summary-numbers.right-part');
                summary.find('.subtotal').text((parseFloat(summary.find('.subtotal').text()) - subtotal).toFixed(2));
                summary.find('.tax').text((parseFloat(summary.find('.tax').text()) - tax).toFixed(2));
                summary.find('.total').text((parseFloat(summary.find('.total').text()) - total).toFixed(2));
            })

        
        priceAndName.children('.nameholder').text( $(this).siblings().eq(2).text());
        console.log(priceAndName.children('nameholder'));        
        priceAndName.children('.priceholder').text($(this).siblings().eq(3).text());
        console.log( $(this).siblings().eq(1).text());
        position.addClass('position');
        let subtotalstr = priceAndName.find('.priceholder').text();
        let subtotal = parseFloat(subtotalstr, 10);      
        let tax = subtotal*0.1;
        let total = subtotal + tax;
        let summary = $('.summary-numbers.right-part');
       
        summary.find('.subtotal').text((parseFloat(summary.find('.subtotal').text()) + subtotal).toFixed(2));
        summary.find('.tax').text((parseFloat(summary.find('.tax').text()) + tax).toFixed(2));
        summary.find('.total').text((parseFloat(summary.find('.total').text()) + total).toFixed(2));

        cart.append(position);
        }
        else{
            console.log("already added");
            cart.children('div[data-good-id =' + goodId + ']').find('.plus').click();
        }
        
    });
    $('.col-xs-12').append(button);
}

function evalAndRenderSummary(){
            let price = parseInt($('.summary').find('.priceholder').text(), 10);
            let tax = price*0.1;
            let subtotal = price + tax;
            let summary = $('.summary-numbers right-part');
            summary.find('.subtotal').text(subtotal);
            summary.find('.tax').text(tax);
            summary.find('.total').text(total);
}


