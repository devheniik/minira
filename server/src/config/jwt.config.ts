import {appConfig} from './app.config';

export const jwtConfig = () => ({
    secret: appConfig().appSecret,
    signOptions: { expiresIn: '7d' },
})