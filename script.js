function Pizza(size, crust, toppings){
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
}

Pizza.prototype.sizes = {
    small: 500,
    medium: 800,
    large: 1000
};
Pizza.prototype.crusts = {
  crispy: 200,
  extraCheese: 250,
  chilly: 300
};
Pizza.prototype.toppingsList = {
  extraCheese: 200,
  bacon: 200,
  onions: 100,
  pepperoni: 200,
  pineapples: 100,
  sausage: 150
};

Pizza.prototype.price = function(){
  var crustPrice = this.crusts[this.crust];
  var sizePrice = this.sizes[this.size];

  var toppingsTotal = crustPrice + sizePrice;


  var findPrice = function(topping, allToppings){
    return allToppings[topping];
  }
  
  this.toppings.forEach((topping)=>{
    var tot = findPrice(topping, this.toppingsList);
    toppingsTotal += tot;
  });  

  return toppingsTotal;
}

function Order(pizzas){
    this.pizzas = pizzas;
    this.price = 0;
}

Order.prototype.calculateTotal = function(){
    var total = 0;
    this.pizzas.forEach((pizza)=>{
        total += pizza.price();
        console.log(total);
    });
    return total;
}

Order.prototype.delete = function(pizza){
    delete pizza.size;
    delete pizza.crust;
    delete pizza.toppings;

}
Order.prototype.show = function(){
    this.pizzas.forEach((pizza)=>{

        console.log(pizza);
    });
}
Order.prototype.get = function(id){
    return this.pizzas[id];
}
var topps1 = ['bacon', 'onions'];
var topps2 = ['pepperoni', 'pineapples' 'sausage'];
var mypiza = new Pizza('small', 'extracheese',topps1 );
var mypiza2 = new Pizza('large', 'chilly',topps2);

var myOrder = new Order([mypiza, mypiza2]);

console.log('Next is total price');
console.log(myOrder.calculateTotal());

console.log('Next is all the pizzas in the order');
myOrder.show();

console.log('Next is the to be deleted pizza');
var toDelete = myOrder.get(1);
console.log(toDelete);
myOrder.delete(toDelete);

console.log('The deleted pizza');
console.log(toDelete);
console.log('Next is the order after deleting');
myOrder.show();


$(document).ready(()=>{

    $('.varieties').click(()=>{
        $('html, body').animate({
            scrollTop: $(".about").offset().top
          }, 1000)
    });

    //Toggle the sections
    $('.one-title, .buyMore').click(()=>{
        $('.one-div').toggle();
        $('.two-div').hide('slow');
        $('.three-div').hide('slow');
        $('.total-div').hide('slow');
        $('.jumbotron').hide('slow');
    });
    $('.two-title, .sendOne').click(()=>{
        $('.two-div').toggle();
        $('.one-div').hide();
        $('.three-div').hide(); 
    });
    $('.three-title, .sendTwo').click(()=>{
        $('.three-div').toggle();
        $('.one-div').hide();
        $('.two-div').hide(); 
    });    


     //Section one handle the image toggle.
     $('.crispy-io').click(()=>{
        $('.crispy-img').hide();
        $('.extracheese-img').hide();
        $('.chilly-img').show();
    });
    $('.stuffed-io').click(()=>{
        $('.extracheese-img').hide();
        $('.chilly-img').hide();
        $('.crispy-img').show();
    });
    $('.chilly-io').click(()=>{
        $('.chilly-img').hide();
        $('.crispy-img').hide();
        $('.extracheese-img').show();
    });

    $('.total-title').click(()=>{
        $('.total-div').toggle();
        $('.one-div').hide();
        $('.two-div').hide(); 
        $('.three-div').hide(); 
    });

    var allPizzas = [];
    $('.complete').click(()=>{
        
        $('.total-div').toggle();
        $('.one-div').hide();
        $('.two-div').hide(); 
        $('.three-div').hide(); 
        var arr = $('.toppingsClass:checked').map(function () {
            
            return this.value;
        }).get();
        if(arr.length == 0){
            $('.total-div').hide();
            $('.one-div').hide();
            $('.two-div').hide(); 
            $('.three-div').toggle(); 
            $('.alert-danger').toggle();
            return;
        }
        $('.alert-danger').hide();

        var selectedSize = $('input[name="size"]:checked').val(); 
        var selectedCrust = $('input[name="crust"]:checked').val();
        
        console.log(arr);
        console.log(selectedCrust);
        console.log(selectedSize);
        $('.toppingsClass').prop('checked', false);
        $('#small').prop('checked', false);
        $('#medium').prop('checked', false);
        $('#stuffed').prop('checked', false);
        $('#chilly').prop('checked', false);

        var newPizza = new Pizza(selectedSize, selectedCrust, arr);
        allPizzas.push(newPizza);
        console.log(allPizzas);
        
        $('.howManyAdd').append('<p>1</p>');
        $('.sizeAdd').append('<p>'+newPizza.size+'</p>');
        $('.crustAdd').append('<p>'+newPizza.crust+'</p>');
        $('.toppingsAdd').append('<p>'+newPizza.toppings+'</p>');
        $('.totalAdd').append('<p>'+newPizza.price()+'</p>');
    });

    $('.checkout').click(()=>{
        var grandTotal = 0;
        allPizzas.forEach((pizza)=>{
            grandTotal += pizza.price();
        });
        console.log(grandTotal);
        $('.jumbotron').show();
        $('.jumbotron > p').html("");
        $('.jumbotron').append('<p>Total Order is Ksh. '+grandTotal+'</p>');
        $('.check-keep-div').hide();
        $('.delivery').show();
    });

    $('.cancel').click(()=>{
        $('.homeLocation').val("");
        $('.delivery').hide();
    });
    $('.homeDelivery').click(()=>{
        $('.delivery').hide();
        $('.time').show();
    })


});