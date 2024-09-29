"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = void 0;
var generateRandomString = function (length) {
    var character = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    var result = '';
    for (var i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
var generateRandomNumber = function (length) {
    var character = "0123456789";
    var result = '';
    for (var i = 0; i < length; i++) {
        result += character.charAt(Math.floor(Math.random() * character.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
