"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlRandomName = void 0;
const urlRandomName = "https://random-data-api.com/api/name/random_name";
exports.urlRandomName = urlRandomName;
function method1() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let responses = yield Promise.all([
                fetch(urlRandomName),
                fetch(urlRandomName),
                fetch(urlRandomName)
            ]);
            let jsonResponses = yield Promise.all(responses.map(response => response.json()));
            jsonResponses.forEach(element => {
                console.log(element.name);
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
function method2() {
    return __awaiter(this, void 0, void 0, function* () {
        let response1 = yield fetch(urlRandomName);
        let response2 = yield fetch(urlRandomName);
        let response3 = yield fetch(urlRandomName);
        let responseJson1 = yield response1.json();
        let responseJson2 = yield response2.json();
        let responseJson3 = yield response3.json();
        console.log(responseJson1.name);
        console.log(responseJson2.name);
        console.log(responseJson3.name);
    });
}
function method3() {
    return __awaiter(this, void 0, void 0, function* () {
        const promis1 = new Promise((resolve, reject) => {
            resolve(fetch(urlRandomName));
        });
        const promis2 = new Promise((resolve, reject) => {
            resolve(fetch(urlRandomName));
        });
        const promis3 = new Promise((resolve, reject) => {
            resolve(fetch(urlRandomName));
        });
        promis1
            .then((result) => { return result.json(); })
            .then((result) => console.log(result.name));
        promis2
            .then((result) => { return result.json(); })
            .then((result) => console.log(result.name));
        promis3
            .then((result) => { return result.json(); })
            .then((result) => console.log(result.name));
    });
}
//method1().then(()=>{console.log("1--------------------------")});
//method2().then(()=>{console.log("2--------------------------")});
method3().then(() => { console.log("3--------------------------"); });
