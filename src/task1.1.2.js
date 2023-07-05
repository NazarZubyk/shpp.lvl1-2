class AbstactProduct { 
     universalGetterSetter(propertyName){
        return this.propertyName;
     }
}
Object.assign(AbstactProduct.prototype,{
    ID :null,
    name : null,
    description : null,
    price : null,
    quantity : null,
    reviews : null,
    images : null,
    date : null,
    brand: null,    
})
Object.assign(AbstactProduct.prototype,{
    getProductID (){
        return this.ID;
    },
    setProductId (newId){
        this.ID = newId;
    },
    
    getProductName (){
        return this.name;
    },
    setProductName (newName){
        this.name = newName
    },
    
    getProductDescription (){
        return this.description;
    },
    setProductDescription (newDescription){
        this.description = newDescription;
    },
    
    getProguctPrice (){
        return this.price;
    },
    setProductPrice (newPrice){
        this.price = newPrice;
    },

    getProductBrand (){
        return this.brand;
    },
    setProductBrand  (newBrand){
        this.brand = newBrand;
    },


    getProductQuantity (){
        return this.quantity;
    },
    setProductQuantity (newQuantity){
        this.quantity = newQuantity;
    },

    getProductDate (){
        return this.date;
    },
    setProductDate (newDate){
        this.date = newDate;
    },

    getProductReviews (){
        return this.reviews;
    },
    setProductReviews (newReviews){
        this.reviews = newReviews;
    },
    
    getProductImages (){
        return this.images;
    },
    setProductImages(newImages){
        this.images = newImages;
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
        return Object.getPrototypeOf(this);
        
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
    material;
    color;
    constructor(material,color){
        super();
        this.material = material;
        this.color = color;
    }
    
    getColor(){
        return this.color;
    }
    setColor(color){
        this.color = color;
    }

    getMaterial(){
        return this.material;
    }
    setMaterial(material){
        this.material = material;
    }

}

class Electronics extends AbstactProduct{
    warranty;
    power;
    constructor(warranty,power){
        super();
        this.power = power;
        this.warranty = warranty;
    }

    getWarranty(){
        return this.warranty;
    }
    serWarranty(warranty){
        this.warranty = warranty;
    }

    getPower(){
        return this.power;
    }
    setPower(power){
        this.power = power;
    }
}

let clothe = new Clothes("cotton",'red');


console.log(clothe.universalGetterSetter(color));