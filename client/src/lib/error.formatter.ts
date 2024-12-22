export function renderErrorStatusCode(statusCode: number | undefined): string {
    if (!statusCode) {
        return "An unknown error occurred. Please try again.";
    }

    if (statusCode === 400) {
        return "Bad Request: The server couldn't process your request. Please check your input.";
    } else if (statusCode === 401) {
        return "Unauthorized: You need to log in to perform this action.";
    } else if (statusCode === 403) {
        return "Forbidden: You don't have permission to access this resource.";
    } else if (statusCode === 404) {
        return "Not Found: The requested resource was not found.";
    } else if (statusCode === 409) {
        return "Conflict: There was a conflict with your request. Perhaps a duplicate?";
    } else if (statusCode === 500) {
        return "Internal Server Error: Something went wrong on our end. Please try again later.";
    } else if (statusCode === 503) {
        return "Service Unavailable: The server is currently unavailable. Please try again later.";
    } else {
        return `Unexpected Error: An error occurred with status code ${statusCode}. Please try again.`;
    }
}
