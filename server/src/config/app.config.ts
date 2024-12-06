import * as dotenv from 'dotenv';

dotenv.config();

export function appConfig () {
    return {
        appSecret: process.env.JWT_SECRET,
        roundsOfHashing: 10,
    }
}