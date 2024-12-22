import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/company/companies.module';
import { AuthModule } from './modules/auth/auth.module';
import { JobTitleModule } from './modules/job-title/job-title.module';
import { MembersModule } from './modules/members/members.module';
import { SprintsModule } from './modules/sprints/sprints.module';

@Module({
    imports: [
        UsersModule,
        CompaniesModule,
        AuthModule,
        JobTitleModule,
        MembersModule,
        SprintsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}