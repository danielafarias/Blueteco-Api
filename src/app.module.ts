import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { TableModule } from './table/table.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, AuthModule, MenuModule, TableModule, CategoryModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
