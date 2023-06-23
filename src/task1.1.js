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
    function setProductId(newId){
        this.ID = newId;
    }
    this.getReviewById = function(){
        let line = "";
        for(let rev of reviews){
            line = line + rev.ID + " "
        }
        return line;
    }
    function setReviewById(newId){
        this.reviews.ID = newId;
    }
}

function review(ID,author,date,comment,rating){
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;
}

let reviews;
let review1 = new review('10',"Biba",new Date,"not good",{service : 10, price : 8, value : 7, quality : 6});
let review2 = new review('20',"Biba2",new Date,"good",{service : 9, price : 9, value : 9, quality : 9});

reviews = [review1,review2];

let product1 = new Product("1","apple","red",10,"wood",['XS', 'S', 'M', 'L', 'XL', 'XXL'],'S',23,new Date(),reviews,["image1","image2","image3"]);


console.log(product1.getProductID())
console.log(product1.getReviewById())

console.log("output")