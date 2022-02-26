import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb://localhost:27017/nest_svelte"), ProductModule],
})
export class AppModule { }
