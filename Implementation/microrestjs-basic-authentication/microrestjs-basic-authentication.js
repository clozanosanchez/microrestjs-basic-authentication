'use strict';

/**
 * Service to provide basic authentication for services.
 *
 * @author Carlos Lozano Sánchez
 * @license MIT
 * @copyright 2015 Carlos Lozano Sánchez
 */

var checkTypes = require('check-types');

/**
 * Initializes the authentication service.
 *
 * @override
 */
module.exports.onCreateService = function onCreateService() {
    this.users = {};
};

/**
 * Destroys the authentication service.
 * 
 * @override
 */
module.exports.onDestroyService = function onDestroyService() {
    this.users = null;
};

/**
 * Authenticates the user that executes a service.
 *
 * NOTE: Service Operation
 */
module.exports.authenticate = function authenticate(request, response, sendResponse) {
    var requestBody = request.getBody();

    if (checkTypes.not.object(requestBody) || checkTypes.emptyObject(requestBody)) {
        response.setStatus(400);
        sendResponse();
        return;
    }

    var credentials = requestBody.credentials;
    if (checkTypes.not.object(credentials) || checkTypes.emptyObject(credentials) ||
        checkTypes.not.string(credentials.username) || checkTypes.not.string(credentials.password)) {
        response.setStatus(400);
        sendResponse();
        return;
    }

    if (checkTypes.not.unemptyString(credentials.username) || checkTypes.not.unemptyString(credentials.password)) {
        response.setStatus(401);
        sendResponse();
        return;
    }

    var userId = _checkCredentials(credentials.username, credentials.password, this.users);
    if (checkTypes.not.string(userId) || checkTypes.not.unemptyString(userId)) {
        response.setStatus(401);
        sendResponse();
        return;
    }

    var responseBody = {
        userId: userId
    };

    response.setStatus(201).setBody(responseBody);
    sendResponse();
};

/**
 * Checks if the user that executes the service is authentic.
 *
 * @private
 * @function
 * @param {String} username - Username to be authenticated.
 * @param {String} password - Password to be authenticated.
 * @param {Object} users - List of authentic users.
 * @returns {String|null} - The userId, if the user is authentic; null, otherwise.
 */
function _checkCredentials(username, password, users) {
    return null;
}
