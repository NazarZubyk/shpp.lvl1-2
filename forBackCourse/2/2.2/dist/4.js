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
const urlRandomName2 = "https://random-data-api.com/api/users/random_user";
let counter1 = 0;
let counter2 = 0;
let getGender = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        const promis4 = new Promise((resolve, reject) => {
            resolve(fetch(url));
        });
        return promis4
            .then(result => {
            return result.json();
        })
            .then(result => {
            return result.gender;
        });
    });
};
let getFemale = function () {
    getGender(urlRandomName2).then(result => {
        if (result !== "Female") {
            counter1++;
            getFemale();
        }
        else
            (console.log(`
                ${result}
                attempts - ${counter1}
                `));
    });
};
getFemale();
let getGenderAwaitAsync = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        let responseJson = yield response.json();
        return responseJson === null || responseJson === void 0 ? void 0 : responseJson.gender;
    });
};
let getFemaleAwaitAsync = function () {
    getGenderAwaitAsync(urlRandomName2).then(result => {
        if (result !== "Female") {
            counter2++;
            getFemaleAwaitAsync();
        }
        else
            (console.log(`
                ${result}
                attempts - ${counter2}
                `));
    });
};
getFemaleAwaitAsync();
