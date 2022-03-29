import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { CurrentUser } from 'src/users/user.decorator';
import { Users } from 'src/users/users.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput, @CurrentUser() user: Users): Promise<Product> {
    return this.productsService.createProduct(createProductInput, user.id);
  }

}
