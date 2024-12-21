export function renderErrorStatusCode(statusCode: number | undefined): string {
    if (!statusCode) {
        return "An unknown error occurred. Please try again.";
    }

    switch (statusCode) {
        case 400:
            return "Bad Request: The server couldn't process your request. Please check your input.";
        case 401:
            return "Unauthorized: You need to log in to perform this action.";
        case 403:
            return "Forbidden: You don't have permission to access this resource.";
        case 404:
            return "Not Found: The requested resource was not found.";
        case 409:
            return "Conflict: There was a conflict with your request. Perhaps a duplicate?";
        case 500:
            return "Internal Server Error: Something went wrong on our end. Please try again later.";
        case 503:
            return "Service Unavailable: The server is currently unavailable. Please try again later.";
        default:
            return `Unexpected Error: An error occurred with status code ${statusCode}. Please try again.`;
    }
}
