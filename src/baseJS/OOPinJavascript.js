
class AbstactProduct {  
}
Object.assign(AbstactProduct.prototype,{
    universalGetterSetter(property,value){
        if (value === undefined){
            return this[property];
        }
        else{
            this[property] = value;
        }
     }
})
Object.assign(AbstactProduct.prototype,{
    ID : undefined,
    name : undefined,
    description : undefined,
    price : undefined,
    quantity : undefined,
    reviews : undefined,
    images : undefined,
    date : undefined,
    brand: undefined,    
})
Object.assign(AbstactProduct.prototype,{
    getProductID (){
        return this.ID;
    },
    setProductId (newId){
        this.ID = newId;
        return this;
    },
    
    getProductName (){
        return this.name;
    },
    setProductName (newName){
        this.name = newName;
        return this;
    },
    
    getProductDescription (){
        return this.description;
    },
    setProductDescription (newDescription){
        this.description = newDescription;
        return this;
    },
    
    getProguctPrice (){
        return this.price;
    },
    setProductPrice (newPrice){
        this.price = newPrice;
        return this;
    },

    getProductBrand (){
        return this.brand;
    },
    setProductBrand  (newBrand){
        this.brand = newBrand;
        return this;
    },


    getProductQuantity (){
        return this.quantity;
    },
    setProductQuantity (newQuantity){
        this.quantity = newQuantity;
        return this;
    },

    getProductDate (){
        return this.date;
    },
    setProductDate (newDate){
        this.date = newDate;
        return this;
    },

    getProductReviews (){
        return this.reviews;
    },
    setProductReviews (newReviews){
        this.reviews = newReviews;
        return this;
    },
    
    getProductImages (){
        return this.images;
    },
    setProductImages(newImages){
        this.images = newImages;
        return this;
    }  
})
Object.assign(AbstactProduct.prototype,{
    getReviewByID(IDofReview){

        for(let review of this.reviews){
            if(review.getID() === IDofReview){
                return review;
            }
        }

        return undefined;
    },

    getImage(index){
        if(index == undefined){
            return images[0];
        }else{
            return images[index];
        }
            
        
    },

    addReview(newReview){
        this.reviews.push(newReview);
    },

    deleteReview(IDreviewForDeleted){
        for(let i = 0; i <= reviews.length;i++){
            
            if(IDreviewForDeleted === reviews[i].getID()){
                let startElements = this.reviews.slice(0,i);
                let endElements = this.reviews.slice(++i,reviews.length);
                this.reviews = startElements.concat(endElements);
                break;
            } 
        }
    },

    getAverageRating(){
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
})
Object.assign(AbstactProduct.prototype,{
    getFullInformation(){
        for(let key in this){
            console.log("===========================================")
            console.log(key + " : " + this[key])
            console.log("===========================================")
        }
    }
})
class Review{
    constructor(ID,author,date,comment,rating){
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;
    }
}

AbstactProduct.prototype.getPriceForQuantity=function(quantity){
    return `$${quantity*this.price}`;
}

class Clothes extends AbstactProduct{
    
    constructor(){
        super();
    }
    

}
Object.assign(Clothes.prototype,{
    material : undefined,
    color : undefined,
    
    
    getColor(){
        return this.color;
    },
    setColor(color){
        this.color = color;
    },

    getMaterial(){
        return this.material;
    },
    setMaterial(material){
        this.material = material;
    },
})

class Electronics extends AbstactProduct{
   constructor(){
    super();
   } 
}
Object.assign(Electronics.prototype,{
    warranty : undefined,
    power : undefined,



    getWarranty(){
        return this.warranty;
    },
    serWarranty(warranty){
        this.warranty = warranty;
    },

    getPower(){
        return this.power;
    },
    setPower(power){
        this.power = power;
    }
})

function searchProducts(products, search){
    search = search.toLowerCase();
    let productsWithKeyWord = [];

    for(let product of products){
        let name = product.getProductName();
        name = name?.toLowerCase();
        let description = product?.getProductDescription();
        description = description?.toLowerCase();
        if(name?.indexOf(search)>=0 || description?.indexOf(search)>=0){
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

let clothe1 = new Clothes();
let clothe2 = new Clothes();
let clothe3 = new Clothes();
let clothe4 = new Clothes();
let clothe5 = new Clothes();
let electronic = new Electronics();
 clothe1.setProductName("aaa").setProductId("5")
/*clothe2.setProductName("aab").setProductId("4")
clothe3.setProductName("aac").setProductId("3")
clothe4.setProductName("aad").setProductId("2")
clothe5.setProductName("oooooo").setProductId("1")
let clothes = [clothe1,clothe2,clothe3,clothe4,clothe5]


console.log(clothes)
sortProducts(clothes,"sortByID")
console.log(clothes)
sortProducts(clothes,"sortByName")
console.log(clothes)

let finded = searchProducts(clothes, 'ooooo') 

console.log(finded) */

