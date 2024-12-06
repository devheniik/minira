import {PrismaClient} from '@prisma/client';
import {appConfig} from "../src/config/app.config";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const roundsOfHashing = appConfig().roundsOfHashing;

    // Create companies
    const company1 = await prisma.company.create({
        data: {
            name: "TechCorp",
        },
    });

    const company2 = await prisma.company.create({
        data: {
            name: "InnoTech",
        },
    });

    // Create job titles
    const developerTitle = await prisma.jobTitle.create({
        data: {
            name: "Developer",
            description: "Responsible for software development",
            companyId: company1.id,
        },
    });

    const managerTitle = await prisma.jobTitle.create({
        data: {
            name: "Manager",
            description: "Oversees team operations",
            companyId: company1.id,
        },
    });

    // Create members
    const member1 = await prisma.member.create({
        data: {
            fullName: "John Doe",
            jobTitleId: developerTitle.id,
            companyId: company1.id,
        },
    });
    await prisma.member.create({
        data: {
            fullName: "Jane Smith",
            jobTitleId: managerTitle.id,
            companyId: company1.id,
        },
    });

    const user1Password = await bcrypt.hash("root", roundsOfHashing);
    await prisma.user.create({
        data: {
            fullName: "Admin User",
            email: "root@root.com",
            password: user1Password,
            companyId: company1.id,
        },
    });
    const user2Password = await bcrypt.hash("securepassword", roundsOfHashing);
    await prisma.user.create({
        data: {
            fullName: "Regular User",
            email: "user@innotech.com",
            password: user2Password,
            companyId: company2.id,
        },
    });

    const sprint1 = await prisma.sprint.create({
        data: {
            name: "Sprint 1",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-01-14"),
            companyId: company1.id,
        },
    });

    const issue1 = await prisma.issue.create({
        data: {
            name: "Fix bug #123",
            description: "Resolve critical bug in production",
            originalEstimate: 5,
            remainingTime: 5,
            spentTime: 0,
            status: "Open",
            type: "Bug",
            memberId: member1.id,
        },
    });

    await prisma.sprintTask.create({
        data: {
            sprintId: sprint1.id,
            issueId: issue1.id,
        },
    });

    console.log("Seed data successfully created!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
