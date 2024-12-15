import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MessageHelper } from 'src/helpers/messages.helpers';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        console.log(exception, Object.keys(exception).join('\n-'));
        let catchedError = false;

        let message = 'An unexpected database error occurred';
        if (exception.message.includes('duplicate key value')) {
            const detail = exception['detail'] || null;
            const match = detail.match(/\((.*?)\)=\((.*?)\)/); // Expressão regular para extrair campo e valor
            const field = match ? match[1] : 'unknown field';
            const value = match ? match[2] : 'unknown value';
            message = MessageHelper.UNIQUENESS(field);
            catchedError = true;
        }

        if(!catchedError)
            throw exception;
        
        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}