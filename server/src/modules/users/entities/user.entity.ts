import {User} from '@prisma/client';
import {Exclude} from 'class-transformer';
import {SelfAssigned} from "../../../utils/selfAssigned";

export class UserEntity extends SelfAssigned<UserEntity> implements User {
    id: number;

    createdAt: Date;

    updatedAt: Date;

    fullName: string;

    email: string;

    @Exclude()
        password: string;

    @Exclude()
        companyId: number;
}
