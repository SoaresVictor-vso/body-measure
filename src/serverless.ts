import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import serverlessExpress from "@vendia/serverless-express";
import { Callback, Context, Handler } from "aws-lambda";
import { ValidationPipe } from '@nestjs/common';

let server: Handler;

async function bootstrap() {
    console.log('boostrap called');
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback
) => {
    console.log('handler called');
    console.log(`has previous server: ${!!server} ${typeof server}`)

    server = server ?? (await bootstrap());
    console.log(`setted server: ${!!server} ${typeof server}`);

    console.log("event:")
    console.log(event)
    console.log("context:")
    console.log(context)
    console.log("callback:")
    console.log(callback)

    return server(event, context, callback);
};