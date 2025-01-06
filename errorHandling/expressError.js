//errorHandling/expressError.js

class ExpressError extends Error {
    contructor (msg, status) {
        super();
        this.msg = msg;
        this,status = status;
        console.error(this.stack);
    }
}

module.exports = ExpressError