"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasesController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const puppeteer_1 = __importDefault(require("puppeteer"));
function getCountryData() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: true,
            args: ["--no-sandbox"],
            ignoreDefaultArgs: ["--disable-extensions"],
        });
        const page = yield browser.newPage();
        yield page.goto("https://www.mohfw.gov.in/");
        const countryTodayData = yield page.$$eval("#site-dashboard > div > div > div:nth-child(1) > div.col-xs-8.site-stats-count > ul > li > span", (pt) => {
            return pt.map((x) => x.textContent);
        });
        const countryTodayDataRes = [];
        for (let i = 0; i < countryTodayData.length; i = i + 3) {
            let obj = {
                status: countryTodayData[i],
                patientInPercent: (_a = countryTodayData[i + 1]) === null || _a === void 0 ? void 0 : _a.slice(1, -2),
                patientInNumber: (_c = (_b = countryTodayData[i + 2]) === null || _b === void 0 ? void 0 : _b.slice(0, -1)) === null || _c === void 0 ? void 0 : _c.split("("),
            };
            countryTodayDataRes.push(obj);
        }
        return countryTodayDataRes;
    });
}
function stateWise() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: true,
            args: ["--no-sandbox"],
            ignoreDefaultArgs: ["--disable-extensions"],
        });
        const page = yield browser.newPage();
        yield page.goto("https://www.mohfw.gov.in/");
        const stateWiseData = yield page.$$eval("#state-data > div > div > div > div > table > tbody > tr > td", (pt) => {
            return pt.map((x) => x.textContent);
        });
        const stateWiseDataRes = [];
        for (let i = 0; i < 360; i = i + 10) {
            let obj = {
                sno: stateWiseData[i],
                stateName: stateWiseData[i + 1],
                activeCases: stateWiseData[i + 2],
                activeChangeSinceYesterday: stateWiseData[i + 3],
                curedCases: stateWiseData[i + 4],
                curedChangeSinceYesterday: stateWiseData[i + 5],
                deathCases: stateWiseData[i + 6],
                deathDuringDay: stateWiseData[i + 7],
                deathReconciled: stateWiseData[i + 8],
                deathTotal: stateWiseData[i + 9],
            };
            stateWiseDataRes.push(obj);
        }
        // fs.writeFile(
        //   "../corona-case-tracking/images/state.js",
        //   JSON.stringify(stateWiseDataRes),
        //   (err) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log("File written successfully\n");
        //     }
        //   }
        // );
        return stateWiseDataRes;
    });
}
let CasesController = class CasesController {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return getCountryData();
        });
    }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stateWise();
        });
    }
    helloWorld() {
        return { message: "Hello World! ✔" };
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/country"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/state"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CasesController.prototype, "getText", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "helloWorld", null);
CasesController = __decorate([
    (0, routing_controllers_1.JsonController)()
], CasesController);
exports.CasesController = CasesController;
