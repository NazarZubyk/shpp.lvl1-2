console.log("imput");

function Product(ID,name,description,price,brand,size,activeSize,quantity,date,reviews,images){
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.size = size;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    this.getProductID = function(){
        return this.ID;
    }
    this.setProductId = function(newId){
        this.ID = newId;
    }
    
    this.getProductName = function(){
        return this.name;
    }
    this.setProductName = function(newName){
        this.name = newName
    }
    
    this.getProductDescription = function(){
        return this.description;
    }
    this.setProductDescription = function(newDescription){
        this.description = newDescription;
    }
    
    this.getProguctPrice = function(){
        return this.price;
    }
    this.setProductPrice = function(newPrice){
        this.price = newPrice;
    }

    this.getProductBrand = function(){
        return this.brand;
    }
    this.setProductBrand = function (newBrand){
        this.brand = newBrand;
    }

    this.getProductSize = function(){
        return this.size;
    }
    this.setProductSize = function(newSize){
        this.size = newSize;
    }

    this.getProductActiveSize = function(){
        return this.activeSize;
    }
    this.setProductActiveSize = function(newActiveSize){
        this.activeSize = newActiveSize;
    }

    this.getProductQuantity = function(){
        return this.quantity;
    }
    this.setProductQuantity = function(newQuantity){
        this.quantity = newQuantity;
    }

    this.getProductDate = function(){
        return this.date;
    }
    this.setProductDate = function(newDate){
        this.date = newDate;
    }

    this.getProductReviews = function(){
        return this.reviews;
    }
    this.setProductReviews = function(newReviews){
        this.reviews = newReviews;
    }
    
    this.getProductImages = function(){
        return this.images;
    }
    this.setProductImages = function(newImages){
        this.images = newImages;
    }

    this.getReviewByID = function(){

    }
}

function review(ID,author,date,comment,rating){
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;

    this.getID = function(){
        return this.ID;
    }
    this.setID = function(newRevID){
        this.ID = newRevID;
    }
    this.getAuthor = function(){
        return this.author;
    }
    this.setAutor = function(newAuthor){
        this.author = newAuthor;
    }
    this.getDate = function(){
        return this.date;
    }
    this.setDate = function(newRevDate){
        this.date = newRevDate;
    }
    this.getComment = function(){
        return this.comment
    }
    this.setComment = function(newComment){
        this.comment = newComment;
    }
    this.getRating = function(){
        return this.rating; 
    }
    this.setRating = function(newRating){
        this.rating = newRating;
    }
}


let review1 = new review('10',"Biba",new Date,"not good",{service : 10, price : 8, value : 7, quality : 6});
let review2 = new review('20',"Biba2",new Date,"good",{service : 9, price : 9, value : 9, quality : 9});

 let reviews = [review1,review2];

let product1 = new Product("1","apple","red",10,"wood",['XS', 'S', 'M', 'L', 'XL', 'XXL'],'S',23,new Date(),reviews,["image1","image2","image3"]);


console.log(product1.getProductID())
console.log(product1.getReviewById())

console.log("output")