class Food{
  constructor(){
    this.Foodstock=0;
    this.lastFed;
    this.image =loadImage("Milk.png");
  } 
  
  getFoodStock(){
     /*var foodStockref = database.ref('Food');
         foodStockref.on("value",function(data){
         foodStockref = data.val();
         })*/
         return this.Foodstock;
    }


  updateFoodStock(stock){
    console.log("in food update fn"+stock)
      database.ref('/').update({
      Food: stock
    });
   }

  deductFood(){
    if(this.Foodstock >0){
      this.Foodstock--
    }
   
   } 
   
   display(){
     var x = 80, y = 100;
     
     imageMode(CENTER);
     //image(this.image, 120, 50, 50, 70);
      var foodStockref = database.ref('Food');
         foodStockref.on("value",function(data){
         foodStockref = data.val();
         })
    
     if(foodStockref!= 0){
      //console.log("n of bottles "+foodStockref +"x"+x)
        for(var i = 0;i<foodStockref;i++){
           image(this.image, x, y, 50, 50);
           x = x+30;
           
        }
     }
   }
}