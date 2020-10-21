// Handle HTTP Status Codes

// Codes to be handled
type Codes = 200 | 400 | 403 | 404 | 405 | 429 | 500;

interface StatusCode {
    json: {
        statusCode: Codes;
        statusMessage: string;
        message: string;
    };
}

type StatusCodes = {
    [S in Codes]: StatusCode;
}

export const statusCodes: StatusCodes = {
    200: {
        json: {
            statusCode: 200,
            statusMessage: "OK",
            message: "Success status response code"
        }
    },
    400: {
        json: {
            statusCode: 400,
            statusMessage: "400 Bad Request",
            message: "Server cannot or will not process the request."
        }
    },
    403: {
        json: {
            statusCode: 403,
            statusMessage: "403 Forbidden",
            message: "Invalid credentials sent."
        }
    },
    404: {
        json: {
            statusCode: 404,
            statusMessage: "404 Not Found",
            message: "Server can't find the requested resource."
        }
    },
    405: {
        json: {
            statusCode: 405,
            statusMessage: "405 Method Not Allowed",
            message: "The method specified in the Request-Line is not allowed for the resource identified by the Request-URI"
        }
    },
    429: {
        json: {
            statusCode: 429,
            statusMessage: "429 Too Many Request",
            message: "Too many requests!"
        }
    },
    500: {
        json: {
            statusCode: 500,
            statusMessage: "500 Internal Server Error",
            message: "The server encountered an internal error or misconfiguration and was unable to complete your request."
        }
    }
}