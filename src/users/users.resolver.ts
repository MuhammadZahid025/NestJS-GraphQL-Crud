
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { AddressService } from './address.service.';
import { CreateUserInput, CreatUserPayload, DeleteUserPayload, DeleteUsserByIdInput, UpdateUserInput } from './dto/create-user.input';
import { CreateAddressDto } from './dto/createAddress.dto';
import { UpdatedUser, UserPayload } from './dto/userPayload.dto';
import { Address } from './entities/address.entity';
import { JwtAuthGuard } from './jwt.guard';
import { CurrentUser } from './user.decorator';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private userService: UsersService , 
              private addressService: AddressService
    ) { }

  @Mutation((returns) => CreatUserPayload)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput): Promise<CreatUserPayload> {
    return {
      user: await this.userService.signUp(createUserInput),
      response: { status: 200, message: 'User created successfully' }
    }
  }

  @Mutation((returns) => UserPayload)
  async signIn(@Args('user') user: CreateUserInput,): Promise<UserPayload> {
    return await this.userService.signIn(user)
  }

  @Mutation((returns) => DeleteUserPayload, { nullable: true })
  async deleteUserById(@Args('deleteUserById') deleteUsserByIdInput: DeleteUsserByIdInput) {
    await this.userService.deleteUserById(deleteUsserByIdInput)
    return { response: { status: 200, message: `User against id: ${deleteUsserByIdInput.id} deleted successfully` } }
  }

  @Mutation((returns) => UpdatedUser)
  async updateUser(@Args('updateUser') updateUserInput: UpdateUserInput): Promise<UpdatedUser> {
    return await this.userService.updateUser(updateUserInput)
  }

  @Query(()=>[Users])
  async getAllUserComp (): Promise<Users[]>{
    return await this.userService.getAllUserComp()
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Address)
  createAddress(@Args('createAddress') createAddressDto: CreateAddressDto, @CurrentUser() user: Users): Promise<Address> {
    return this.addressService.createAddress(createAddressDto, user.id);
  }

}
