import { HttpStatus } from "../config";

export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message)          
        this.statusCode = statusCode
        // no need to do this.message = message because its done inside super(message)
    }
    
    static normalizeError = (e: unknown) => {
        return (e instanceof CustomError) ? e : CustomError.convertToCustomError(e)
    }

    private static convertToCustomError = (e : unknown) => {
        const message = (e instanceof Error) ? e.message : "Unknown Error occurred"
        return new CustomError(message, HttpStatus.INTERNAL_SERVER_ERROR)
    }     
}
