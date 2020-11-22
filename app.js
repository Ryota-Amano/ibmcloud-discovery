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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var readline_1 = __importDefault(require("readline"));
var discovery_1 = require("./src/discovery");
var chalk_1 = require("chalk");
var fs_1 = __importDefault(require("fs"));
var readUserInput = function (question) {
    var rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(function (resolve, reject) {
        rl.question(question, function (answer) {
            resolve(answer);
            rl.close();
        });
    });
};
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var url, apikey, environmentid, collectionid, resquery, matching_results, results, deleteId, _i, results_1, key, resdelete, ok_count, errdocumentId, _a, resdelete_1, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    //UserInput
                    console.log(chalk_1.yellow('IBM Discovery ---Delete AllDocument'));
                    console.log('Please enter the parameters...');
                    return [4 /*yield*/, readUserInput('url? ')];
                case 1:
                    url = _b.sent();
                    return [4 /*yield*/, readUserInput('apikey? ')];
                case 2:
                    apikey = _b.sent();
                    return [4 /*yield*/, readUserInput('environmentId? ')];
                case 3:
                    environmentid = _b.sent();
                    return [4 /*yield*/, readUserInput('collectionId? ')];
                case 4:
                    collectionid = _b.sent();
                    //UserInput Check
                    if (!(url && apikey && environmentid && collectionid)) {
                        console.log(chalk_1.red('Missing required parameters'));
                        process.exit();
                    }
                    return [4 /*yield*/, discovery_1.queryCollection(url, apikey, environmentid, collectionid)
                        //Discovery query error Check
                    ];
                case 5:
                    resquery = _b.sent();
                    //Discovery query error Check
                    if (resquery.status !== 200) {
                        //Error
                        console.log('Query a collection', chalk_1.red("ERROR: " + resquery.status + ": " + resquery.statusText));
                        console.log("message: " + resquery.message);
                        process.exit();
                    }
                    console.log('Query a collection ', chalk_1.blue('OK'));
                    matching_results = resquery.result.matching_results;
                    //const count = matching_results / 10000 | 0 + (matching_results % 10000 === 0 ? 0 : 1)
                    //console.log('実行回数:', count)
                    console.log("matching_results: " + matching_results);
                    //no document to delete
                    if (matching_results === 0) {
                        console.log(chalk_1.yellow('There is no document to delete.'));
                        process.exit();
                    }
                    results = resquery.result.results;
                    deleteId = [];
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        key = results_1[_i];
                        deleteId.push(key.id);
                    }
                    return [4 /*yield*/, discovery_1.deleteDocuments(url, apikey, environmentid, collectionid, deleteId)];
                case 6:
                    resdelete = _b.sent();
                    ok_count = 0;
                    errdocumentId = [];
                    for (_a = 0, resdelete_1 = resdelete; _a < resdelete_1.length; _a++) {
                        key = resdelete_1[_a];
                        if (key.status === 200) {
                            ok_count++;
                        }
                        else {
                            errdocumentId.push(key.result.document_id);
                        }
                    }
                    //Delete documents Error check
                    if (errdocumentId.length !== 0) {
                        //Error
                        fs_1.default.writeFileSync('./err.txt', 'Error documentIds\n');
                        errdocumentId.map(function (id) {
                            fs_1.default.appendFileSync('./err.txt', id);
                        });
                        console.log(chalk_1.red('Result: '), "delete: " + ok_count + ",", chalk_1.yellow("error: " + errdocumentId.length));
                    }
                    else {
                        if (fs_1.default.existsSync('./err.txt')) {
                            fs_1.default.unlinkSync('./err.txt');
                        }
                        console.log(chalk_1.green('Result: '), "delete: " + ok_count + ",", "error: " + errdocumentId.length);
                    }
                    return [2 /*return*/];
            }
        });
    });
})();
