import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user-entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user1',
      password: 'changeme',
      database: 'ECommerce',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
