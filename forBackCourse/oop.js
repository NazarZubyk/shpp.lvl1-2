function Counter(initialValue = 0){
    this.count = initialValue
}

let cons = new Counter;

Counter.prototype.sout = function(){
    console.log(this.count);
    return this;
}
Counter.prototype.incremet = function(){
    this.count += 1;
    return this;
}

cons.incremet().incremet().sout();


(function(){
    this.soutFunc1 = function(){
        console.log("hy from func 1");
        return this;
    }

    this.soutFunc2 = function(){
        console.log("hy from func 2");
        return this;
    }
}.call(Counter.prototype))


cons.soutFunc1().soutFunc2();


Object.assign(Counter.prototype , {
    soutFuncObjectAssing1(){
        console.log('hy from obj.assign method of prototyping 1');
        return this;
    },

    soutFuncObjectAssing2(){
        console.log('hy from obj.assign method of prototyping 2');
        return this;
    },
    soutFuncObjectAssing3(){
        console.log('hy from obj.assign method of prototyping 3');
        return this;
    }
})


cons.soutFuncObjectAssing1().soutFuncObjectAssing2().soutFuncObjectAssing3();

class CounterClass {
    constructor(initialValue = 0){
        this.count = initialValue;
    }


    incremet(){
        this.count++;
        return this;
    }

    decrement(){
        this.count--;
        return this;
    }

    reset(){
        this.count = 0;
        return this;
    }

    getInfo(){
        console.log(this.count);
        return this;
    }
}

let counterClass = new CounterClass(10);

counterClass.incremet();
counterClass.getInfo();



const log = console.log

class TsC {
  constructor() {
    this.publicInstanceField = 'Публичное поле экземпляра'
    this.#privateInstanceField = 'Приватное поле экземпляра'
  }

  publicInstanceMethod() {
    log('Публичный метод экземпляра')
  }

  // получаем значение приватного поля экземпляра
  getPrivateInstanceField() {
    log(this.#privateInstanceField)
  }

  static publicClassMethod() {
    log('Публичный метод класса')
  }
}

const c = new TsC()

console.log(c.publicInstanceField)