import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/createAddress.dto';
import { Address } from './entities/address.entity';
import { UsersService } from './users.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) { }

  async createAddress(
    createAddressDto: CreateAddressDto, userId: number,): Promise<Address> {
try {
  const { street, city, country } = createAddressDto;
  const user = await this.usersService.findUserById(userId);
  console.log(user)
  const address = this.addressRepository.create({
    street,
    city,
    country,
  });
  address.user = user;
  const savedAddress = await this.addressRepository.save(address);
  return savedAddress;
  
} catch (error) {
  throw new InternalServerErrorException(error)
}
  }
}
