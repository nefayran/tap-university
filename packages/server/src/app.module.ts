import { Module } from '@nestjs/common';
import { SubjectModule } from './modules/subject.module';
import { DivisionModule } from './modules/division.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConditionModule } from './modules/condition.module';
import { ExamineModule } from './modules/examine.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    SubjectModule,
    DivisionModule,
    ConditionModule,
    ExamineModule,
  ],
})
export class AppModule {}
