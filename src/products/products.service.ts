import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
constructor(
  @InjectRepository(Product)
  private productsRepository: Repository<Product>,
  private usersService: UsersService
){}

 async createProduct(createProductInput: CreateProductInput , userId:number): Promise<Product> {
     try {
      const { name , productCode} = createProductInput
      const user = await this.usersService.findUserById(userId) 
        const newProduct = this.productsRepository.create({name , productCode})
        newProduct.user = [user]
        const saveProduct = await this.productsRepository.save(newProduct)
        console.log(saveProduct , "product")
        return saveProduct; 
       
     } catch (error) {
       throw new InternalServerErrorException(error)
       
     }
  }

}
