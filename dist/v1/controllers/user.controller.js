"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUser = exports.detail = exports.passwordReset = exports.passwordOtp = exports.passwordForgot = exports.login = exports.register = void 0;
var md5_1 = __importDefault(require("md5"));
var user_model_1 = __importDefault(require("../models/user.model"));
var forgot_password_model_1 = __importDefault(require("../models/forgot-password.model"));
var generateHelper = __importStar(require("../../helpers/generate.helper"));
var sendEmailHelper = __importStar(require("../../helpers/sendmail.helper"));
// [POST] /v1/users/register
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var exitEmail, dataUser, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.findOne({
                    email: req.body.email,
                    deleted: false,
                })];
            case 1:
                exitEmail = _a.sent();
                if (exitEmail) {
                    res.json({
                        "code": 400,
                        message: "Email đã tồn tại!"
                    });
                    return [2 /*return*/];
                }
                dataUser = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: (0, md5_1.default)(req.body.password),
                    token: generateHelper.generateRandomString(20)
                };
                user = new user_model_1.default(dataUser);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                token = user.token;
                res.json({
                    "code": 200,
                    token: token,
                    message: "Đăng ký tài khoản thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.register = register;
// [POST] /v1/users/login
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, exitUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email,
                        deleted: false,
                    })];
            case 1:
                exitUser = _a.sent();
                if (!exitUser) {
                    res.json({
                        "code": 400,
                        message: "Email không tồn tại!"
                    });
                    return [2 /*return*/];
                }
                if ((0, md5_1.default)(password) != exitUser.password) {
                    res.json({
                        "code": 400,
                        message: "Sai mật khẩu!"
                    });
                    return [2 /*return*/];
                }
                token = exitUser.token;
                res.json({
                    "code": 200,
                    token: token,
                    message: "Đăng nhập thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// [POST] /v1/users/password/forgot
var passwordForgot = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, exitUser, otp, objectForgotPassword, forgotPassword, subject, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email,
                        deleted: false,
                    })];
            case 1:
                exitUser = _a.sent();
                if (!exitUser) {
                    res.json({
                        "code": 400,
                        message: "Email không tồn tại!"
                    });
                    return [2 /*return*/];
                }
                otp = generateHelper.generateRandomNumber(6);
                objectForgotPassword = {
                    email: email,
                    otp: otp,
                    expireAt: Date.now() + 3 * 60 * 1000,
                };
                forgotPassword = new forgot_password_model_1.default(objectForgotPassword);
                return [4 /*yield*/, forgotPassword.save()];
            case 2:
                _a.sent();
                subject = "Lấy lại mật khẩu";
                text = "M\u00E3 OTP x\u00E1c th\u1EF1c t\u00E0i kho\u1EA3n c\u1EE7a b\u1EA1n l\u00E0: ".concat(otp, ". \nM\u00E3 OTP c\u00F3 hi\u1EC7u l\u1EF1c trong v\u00F2ng 3 ph\u00FAt. Vui l\u00F2ng kh\u00F4ng cung c\u1EA5p m\u00E3 OTP n\u00E0y cho b\u1EA5t k\u1EF3 ai.");
                sendEmailHelper.sendEmail(email, subject, text);
                res.json({
                    code: 200,
                    message: "OTP đã được gửi qua email!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.passwordForgot = passwordForgot;
// [POST] /v1/users/password/otp
var passwordOtp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, otp, result, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                otp = req.body.otp;
                return [4 /*yield*/, forgot_password_model_1.default.findOne({
                        email: email,
                        otp: otp,
                    })];
            case 1:
                result = _a.sent();
                if (!result) {
                    res.json({
                        code: 400,
                        message: "OTP không hợp lệ!"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.default.findOne({
                        email: email,
                    })];
            case 2:
                user = _a.sent();
                token = "";
                if (user) {
                    token = "".concat(user.token);
                }
                res.json({
                    code: 200,
                    token: token,
                    message: "Xác thực thành công!"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.passwordOtp = passwordOtp;
// [POST] /v1/users/password/otp
var passwordReset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.body.token;
                password = req.body.password;
                return [4 /*yield*/, user_model_1.default.findOne({
                        token: token,
                        deleted: false,
                    })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, user_model_1.default.updateOne({
                        token: token,
                        deleted: false,
                    }, {
                        password: (0, md5_1.default)(password)
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Đổi mật khẩu thành công!"
                });
                return [3 /*break*/, 4];
            case 3:
                res.json({
                    code: 400,
                    message: "Đã xảy ra lỗi!"
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.passwordReset = passwordReset;
// [GET] /v1/users/detail
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({
            code: 200,
            message: "Thông tin người dùng:",
            user: res.locals.user
        });
        return [2 /*return*/];
    });
}); };
exports.detail = detail;
// [GET] /v1/users/list
var listUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.find({
                    deleted: false,
                }).select("fullName email")];
            case 1:
                users = _a.sent();
                res.json({
                    code: 200,
                    message: "Danh sách người dùng do frontend show ra^^",
                    users: users
                });
                return [2 /*return*/];
        }
    });
}); };
exports.listUser = listUser;
