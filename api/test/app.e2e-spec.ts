import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';
import {PrismaClient} from '@prisma/client';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // todo: ここで接続するデータベースを切り替える必要がある
        const prisma = new PrismaClient()
        await prisma.post.deleteMany()
        await prisma.user.deleteMany()

        await prisma.user.create({
            data: {email: 'hoge@example.com', name: 'Bob'}
        })
    });

    it('/user POST ', () => {
        return request(app.getHttpServer())
            .post('/user')
            .send({email: 'user@example.com'})
            .expect(201)
    });

    it('/post POST', () => {

        return request(app.getHttpServer())
            .post('/post').send({
                title: '自己紹介',
                content: "",
                authorEmail: 'hoge@example.com'
            })
            .expect(201)
    });
});
