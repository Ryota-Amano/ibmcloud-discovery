"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocuments = exports.queryCollection = void 0;
var v1_1 = __importDefault(require("ibm-watson/discovery/v1"));
var auth_1 = require("ibm-watson/auth");
exports.queryCollection = function (url, apikey, environment, collection) {
    var discovery = new v1_1.default({
        version: '2019-04-30',
        authenticator: new auth_1.IamAuthenticator({
            apikey: apikey,
        }),
        serviceUrl: url,
    });
    var queryParams = {
        environmentId: environment,
        collectionId: collection,
        _return: 'id',
        count: 10000,
    };
    return discovery.query(queryParams).then(function (res) { return res; }).catch(function (err) { return err; });
};
exports.deleteDocuments = function (url, apikey, environment, collection, ids) {
    var discovery = new v1_1.default({
        version: '2019-04-30',
        authenticator: new auth_1.IamAuthenticator({
            apikey: apikey,
        }),
        serviceUrl: url,
    });
    var promises = [];
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var id = ids_1[_i];
        var deleteDocumentParams = {
            environmentId: environment,
            collectionId: collection,
            documentId: id,
        };
        promises.push(discovery.deleteDocument(deleteDocumentParams));
    }
    return Promise.all(promises).then(function (res) { return res; }).catch(function (err) { return err; });
};
