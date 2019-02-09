
const goods = [
    {
        id: 0,
        productName: 'Bread',
        price: 0.99,
        img: 'https://5.imimg.com/data5/YY/HP/MY-44365243/white-bread-250x250.jpg'
    },
    {
        id: 1,
        productName: 'Milk',
        price: 3.50,
        img: 'http://vapezames.ru/image/cache/catalog/dairy%20milk-250x250.jpg'
    },
    {
        id: 2,
        productName: 'Meat',
        price: 7,
        img: 'http://2.imimg.com/data2/UB/AP/MY-3056074/lamb-chest-meat-250x250.jpg'
    },
    {
        id: 3,
        productName: 'Beef',
        price: 7,
        img: 'http://2.imimg.com/data2/UB/AP/MY-3056074/lamb-chest-meat-250x250.jpg'
    }
]


initGoods()
initButtons()

function addGood(){
   
        let goodId = $(this).parent().attr('data-good-id');
        let cart = $('.cart');
        if(cart.children('.position').length == 0){
            let costHeaders = $('<div><p>Subtotal: </p><p>Tax: </p><p>Total: </p></div>');
            let costSummary = $('<div><p class = "subtotal">$0</p><p class = "tax">$0</p><p class = "total">$0</p></div>');
            let div = $('<div>');
            div.addClass('summary');
            costSummary.find('.subtotal').attr('cost', 0);
            costSummary.find('.total').attr('cost', 0);
            costSummary.find('.tax').attr('cost', 0);
            costHeaders.addClass('summary-numbers left-part');
            costSummary.addClass('summary-numbers right-part');
            div.append(costHeaders);
            div.append(costSummary);
            cart.prepend(div);
        }
             if(cart.children('div[data-good-id =' + goodId + ']').length == 0){
                 
                let position =   $('<div>');
                let priceAndName = $('<div class = "price-and-name "><p class = "nameholder"></p><p class = "priceholder"></p></div>');
                let quanAndBut = $('<div class = "quantity-and-buttons "><p class="button quan"></p><button class=" plus button btn btn-labeled btn-info" ><i class="glyphicon glyphicon-plus"></i></button>'
                + '<button class="minus button btn btn-labeled btn-info" ><i class="glyphicon glyphicon-minus"></i></button>'
                + '<button class="trash button btn btn-labeled btn-info" ><i class="glyphicon glyphicon-trash"></i></button> </div>')
                position.append(priceAndName);
                position.append(quanAndBut);
                position.attr('data-good-id', goodId);
                position.attr('quan', '1');
                quanAndBut.children('p').text('1');
                position.addClass('position');
                let id = parseInt($(this).closest('.col').attr('data-good-id'));
                priceAndName.find('.nameholder').text(goods[id].productName);
                priceAndName.find('.priceholder').text('$' + goods[id].price);
                cart.append(position);
                quanAndBut.find('.plus').click(increaseQuan);
                quanAndBut.find('.minus').click(decreaseQuan);
                quanAndBut.find('.trash').click(removeGood);
                countCost(goods[id].price)
             }
}

function countCost(price){
    let summary = $('.summary');
    let subtotal = summary.find('.subtotal');
    let tax = summary.find('.tax');
    let total = summary.find('.total');
    let subt = parseFloat(subtotal.attr('cost')) + price;
    let tx = subt * 0.1;
    let ttl = subt + tx;
    subtotal.attr('cost', subt);
    tax.attr('cost',  tx);
    total.attr('cost',  ttl);
    subtotal.text('$' +  subt.toFixed(2));
    total.text('$' + ttl.toFixed(2));
    tax.text('$' + tx.toFixed(2));
}
function increaseQuan(){
   let position = $(this).closest('.position');
   let id = position.attr('data-good-id');
   position.attr('quan', parseInt(position.attr('quan')) + 1);
   countCost(goods[id].price);
   $(this).siblings('.quan').text(position.attr('quan'));

}
function decreaseQuan(){
    let position = $(this).closest('.position');
   let id = position.attr('data-good-id');
   if(parseInt(position.attr('quan')) == 1){
       removeGood();
       return;
   }
   position.attr('quan', parseInt(position.attr('quan')) - 1);
   $(this).siblings('.quan').text(position.attr('quan'));
   countCost(-goods[id].price);
}
function removeGood(){
    let position = $(this).closest('.position');
    let id = position.attr('data-good-id');
    let quan = parseInt(position.attr('quan'));
    countCost(- goods[id].price * quan);
    position.remove();
    if($('.position').length == 0){
        $('.summary').remove();
    }
}
function initGoods(){
    goods.map(function(good){
        let goodholder = $('<div>');
        let imageholder = $('<div>');
        let image = $('<img>');
        let pName = $('<p>');
        let pPrice = $('<p>');
        pPrice.text('$' + good.price);
        pName.text(good.productName);
        image.prop('src', good.img);
        goodholder.attr('data-good-id', good.id);
        goodholder.addClass('col col-xs-12 col-md-6 col-lg-4')
        imageholder.append(image);
        goodholder.append(imageholder);
        goodholder.append(pName);
        goodholder.append(pPrice);
        let row = $('.row');
        
        goodholder.appendTo(row.eq(1));
        // row.append(goodholder);
    })
    
}
function initButtons() {
    let button = $('<button>');
    button.addClass('btn btn-labeled btn-info');
    let span = $('<span class="btn-label"><i class="glyphicon glyphicon-shopping-cart"></i></span>Add to cart</button>');
    span.appendTo(button);
    button.click(addGood);
    $('.col-xs-12').append(button);
}



