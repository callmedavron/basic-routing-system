const mHttp = require('./modified-http');

class Server {

    constructor() {
        
        // array with all routes
        this.routes = {};
    }

    /** `listen` method to start our server  **/ 
    listen({  port = 3000 } = {}) {
        
        // Initialize our server
        mHttp.createServer((req, res) => {

            // We ignore request for `favicon`
            if (req.url === '/favicon.ico') {
                return res.onlyHeader({
                    status     : 200,
                    contentType: 'image/x-icon'
                });
            }
            
            // Here we searching for route
            return this.getRoute({path: req.url, method: req.method})
                  .then(handler => handler(req, res))
                  .catch(err => res.notFound(err));

        }).listen(port);
    }

    /** `getRoute` method to search route  **/ 
    getRoute({ path,  method }) {
        return new Promise((resolve, reject) => {

            // Is current `method` is registered in our routes
            let methodRegistered = this.routes[method];

            // If `method` is registered
            if (!methodRegistered)
                return reject('Invalid url');
            
            let pathIndex = methodRegistered.findIndex(item => Object.keys(item)[0] === path);
            
            // If path is not exist in `method`
            if (pathIndex === -1)
                return reject('Invalid url');

            return resolve(methodRegistered[pathIndex][path]);
        });
    }

    /** `setRoute` to set new route **/
    setRoute(pattern, method, handler) {

        // If `method` not exist in our routes
        if (!this.routes[method]) {
            this.routes[method] = [];
        }

        // Put our pattern(path) to array
        this.routes[method].push({
            [pattern]: handler
        });
    }

     /** `get()` to set new route for `GET` request **/
    get(pattern, handler) {
        this.setRoute(pattern, 'GET', handler);
    }

    /** `put()` to set new route for `PUT` request **/
    put(pattern, handler) {
        this.setRoute(pattern, 'PUT', handler);
    }

    /** `post()` to set new route for `POST` request **/
    post(pattern, handler) {
        this.setRoute(pattern, 'POST', handler);
    }

    /** `patch()` to set new route for `PATCH` request **/
    patch(pattern, handler) {
        this.setRoute(pattern, 'PATCH', handler);
    }

    /** `delete()` to set new route for `DELETE` request **/
    delete(pattern, handler) {
        this.setRoute(pattern, 'DELETE', handler);
    }
}

module.exports = Server;