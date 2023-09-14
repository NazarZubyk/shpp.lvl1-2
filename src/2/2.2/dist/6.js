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
const urlIP2 = "https://api.ipify.org/?format=json";
let getIp3 = function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(url);
            let data = yield response.json();
            return data.ip;
        }
        catch (error) {
            console.error("Error", error);
        }
    });
};
let funcAwaitOfIPwithCallBack = function (callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        let ip = yield getIp3(urlIP2);
        callBack(ip);
    });
};
function soutIP(ip) {
    console.log(ip);
}
function starter() {
    return __awaiter(this, void 0, void 0, function* () {
        yield funcAwaitOfIPwithCallBack(soutIP);
        console.log("then I");
    });
}
starter();
