
/**
 * 
 * @param {String} ID 
 * @param {String} name 
 * @param {String} description 
 * @param {Float} price 
 * @param {String} brand 
 * @param {Array of string} sizes 
 * @param {String} activeSize 
 * @param {Integer} quantity 
 * @param {Date} date 
 * @param {Array of odject} reviews 
 * @param {Array<String>} images 
 */
function Product(ID,name,description,price,brand,sizes,activeSize,quantity,date,reviews,images){
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
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

    this.getProductSizes = function(){
        return this.sizes;
    }
    this.setProductSizes = function(newSizes){
        this.sizes = newSizes;
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

    this.getReviewByID = function(IDofReview){

        for(let review of this.reviews){
            if(review.getID() === IDofReview){
                return review;
            }
        }

        return undefined;
    }

    this.getImage = function(index){
        if(index == undefined){
            return images[0];
        }else{
            return images[index];
        }
            
        
    }

    this.addSize = function(size){
        this.sizes.push(size);
    }

    this.deleteSize = function(key){
        let startElements = this.sizes.slice(0,key);
        let endElements = this.sizes.slice(++key,sizes.length);
        this.sizes = startElements.concat(endElements);
    }

    this.addReview = function(newReview){
        this.reviews.push(newReview);
    }

    this.deleteReview = function(IDreviewForDeleted){
        for(let i = 0; i <= reviews.length;i++){
            
            if(IDreviewForDeleted === reviews[i].getID()){
                let startElements = this.reviews.slice(0,i);
                let endElements = this.reviews.slice(++i,reviews.length);
                this.reviews = startElements.concat(endElements);
                break;
            } 
        }
    }

    this.getAverageRating = function(){
        let quantityOfMarks = 0;
        let summOfMarks = 0;
        for(let review of this.reviews){
            let rating = review.getRating();
            for(let mark in rating){
                summOfMarks += rating[mark];
                quantityOfMarks++;
            }
        }
        console.log(summOfMarks);
        console.log(quantityOfMarks);
        return summOfMarks/quantityOfMarks;
    }
}
    
    
/**
 * 
 * @param {String} ID 
 * @param {String} author 
 * @param {Date} date 
 * @param {string} comment 
 * @param {Array<key : value>} rating 
 */
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

let product1 = new Product("111","b","red",10,"wood",['XS', 'S', 'M', 'L', 'XL', 'XXL'],'S',23,new Date(),reviews,["image1","image2","image3"]);
let product2 = new Product("444","aanana","yellow",12,"wood",['XS', 'S', 'M', 'L', 'XL', 'XXL'],'L',20,new Date(),reviews,["image4","image5","image6"]);
let product3 = new Product("13","banana","yellow",12,"wood",['XS', 'S', 'M', 'L', 'XL', 'XXL'],'L',20,new Date(),reviews,["image4","image5","image6"]);
let product4 = new Product("985","banana","yellow",12,"wood",['XS', 'S', 'M', 'L', 'XL', 'XXL'],'L',20,new Date(),reviews,["image4","image5","image6"]);

let products = [product4,product3,product2,product1];


function searchProducts(products, search){
    search = search.toLowerCase();
    let productsWithKeyWord = [];

    for(let product of products){
        let name = product.getProductName();
        name = name.toLowerCase();
        let description = product.getProductDescription();
        description = description.toLowerCase();
        if(name.indexOf(search)>=0 || description.indexOf(search)>=0){
            productsWithKeyWord.push(product);
        }
    }

    return productsWithKeyWord;
}

/**
 * Sorts your products array by rule
 * @param {Array of Product} products 
 * @param {String} sortRule you can use 'sortByID' 'sortByName' or 'sortByPrice'
 */
function sortProducts(products,sortRule){
    let func;

    /**
     * Function for gets specified parameter of Product
     * @param {number} index of cell of array 
     * @returns 
     */
    function funcID(index){
        return products[index].getProductID();
    }
    function funcName(index){
        return products[index].getProductName();
    }
    function funcPrice(index){
        return products[index].getProductName();
    }
    /**
     * Choose function for sorting by specific rule
     */
    switch(sortRule){
        case 'sortByID' :
            func = funcID;
            break;
        case 'sortByName':
            func = funcName;
            break;
        case 'sortByPrice':
            func = funcPrice;
            break;
    }
    
    sorting(products,func)


    /**
     * Recursion sorting algorithm
     * @param {Array of Produc} products 
     * @param {*} func 
     */
    function sorting(products,func){
        let first, second;
        let flag = true;

        for(let i = 0; i < products.length-1; i++){

            first = products[i];
            second = products[i+1];

            if(func != undefined && func(i)>func(i+1)){
                products[i] = second;
                products[i+1] = first;
                flag = false;
            }
            
        }

        if (!flag){
            sorting(products,func)
        }
    }
}

sortProducts(products,"sortByName");

console.log(products[0].getProductID());
console.log(products[1].getProductID());
console.log(products[2].getProductID());
console.log(products[3].getProductID());


/* console.log(product1.getReviewByID('10'))
console.log(product1.getReviewByID('20'))
console.log(product1.getReviewByID('0')) */

/* console.log(product1.getImage());
console.log(product1.getImage(1));
console.log(product1.getImage("fff")); */

/* console.log(product1.getProductSizes());
product1.addSize("newSize");
console.log(product1.getProductSizes());
product1.addSize();
console.log(product1.getProductSizes()); */


/* console.log(product1.getProductSizes());
product1.deleteSize(1);
console.log(product1.getProductSizes());
product1.deleteSize(1);
console.log(product1.getProductSizes());
product1.deleteSize(100);
console.log(product1.getProductSizes());
product1.deleteSize(-100);
console.log(product1.getProductSizes());
product1.deleteSize(NaN);
console.log(product1.getProductSizes()); */


/* product1.addReview(new review('30',"Shurik",Date,"so so",{service : 8, price : 8, value : 8, quality : 8}));
console.log(product1.getReviewByID('30')); */

/* console.log(product1.reviews.length + ' start length');
product1.deleteReview('10')
console.log(product1.reviews.length + ' end length'); */

/* console.log(product1.getAverageRating());
 */

/* console.log(searchProducts(products,"apple"))
console.log(searchProducts(products, "a"))
console.log(searchProducts(products,"1")) */