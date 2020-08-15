//variables
  var happyDoggy, Dog, Foodstock, stock,name1,nameButton,showName,showvalue
  var database, foodObj, canvas, milk;
  var feedButton, addButton;
  var fedTime, lastFed;

function preload(){
//Images
  //happyDoggy =loadImage("images/dogImg.png");
  //Doggy = loadImage("images/dogImg1.png");

  happyDoggy =loadImage("dogImg.png");
  Doggy = loadImage("dogImg1.png");
  //milk = loadImage("images/Milk.png");
}

function setup() {
  canvas = createCanvas(900, 600);
//  canvas.x = 250;
  //canvas.y = 250;
  
//database initailizing  
database = firebase.database();

//creating food
foodObj = new Food();
//foodObj.addImage(milk);


//dog sprite 
  Dog = createSprite(340, 340, 250, 250);
  Dog.addImage(Doggy);
  Dog.scale = 0.5; 

//stockpiling  
  stock = database.ref('Food');
  stock.on("value", readStock);

//buttons making
  feedButton = createButton('Feed the dog');
  feedButton.position(370, 90);
  feedButton.mousePressed(feedDog);

  addButton = createButton('Add Food');
  addButton.position(500, 90);
  addButton.mousePressed(addFood);
 
 name1 = createInput("PetName");
 name1.position(350,400);
 nameButton =createButton("Submit");
 nameButton.style("fontSize : 20px");
 nameButton.position(350,500);
 nameButton.mousePressed(function(){
   name1.hide();
   nameButton.hide();
   namevalue=name1.value();
   showName =createElement("h3");
   showName.html(namevalue);
   showName.style("color : red");
showName.position(450,400)
 });

}


function draw() { 
  background(rgb(46, 139, 87)); 
  
  feedTime = database.ref('feedTime');
  feedTime.on("value", function (data){
  lastFed = data.val();
  }); 

  foodObj.display();

//texting
  textSize(25);
  fill("brown");
  stroke(255);
  //text("Food Left:" + food, 225, 50);
  //text("Note: Press the up arrow key to feed your dog", 40, 100);

  if(lastFed >= 12){
     text("Last Feed:"+ lastFed % 12 + "PM", 500, 30);
  }else if(lastFed === 0){
     text("Last Feed: 12 AM", 350, 30);
  }else{
     text("Last Feed:"+ lastFed + "AM", 500, 30);
  }
  drawSprites();
}

function readStock(data){
   stock1 = data.val();
   foodObj.updateFoodStock(stock1);
}
/*
function writeStock(x){
  if(x <= 0){
     x = 0;
  }else{
    x = x - 1;
  }
   database.ref('/').update({
   Food:x
   })

}*/

function addFood(){
  Dog.addImage(Doggy);
  stock1++;
  database.ref('/').update({
    Food:stock1
  })
  console.log(stock1);
 
}

function feedDog(){
   Dog.addImage(happyDoggy);

   //console.log("feed stck"+stock1);
   
  foodObj.updateFoodStock(stock1-1);
 foodObj.deductFood();

   database.ref('/').update({
      feedTime:hour()
   })
}
