import {ForbiddenException, HttpException,HttpStatus,Injectable,InternalServerErrorException,NotFoundException,UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, DeleteUsserByIdInput, UpdateUserInput } from './dto/create-user.input';
import { Users } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdatedUser, UserPayload } from './dto/userPayload.dto';

@Injectable()
export class UsersService {
constructor(@InjectRepository(Users)
private userRepository: Repository<Users>,
private jwtService: JwtService,
) {}

async signUp(createUserInput: CreateUserInput): Promise<Users> {
try{
const { name, email, password } = createUserInput;
const userInDb = await this.userRepository.findOne({ where: { email:email.toLowerCase() } });
if (userInDb) {
  throw  new ForbiddenException({
    status: HttpStatus.FORBIDDEN,
    error: 'User already exists with this email',
  });
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = this.userRepository.create({
  name,
  email:email.toLowerCase(),
  password: hashedPassword,
});
const savedUser =  await this.userRepository.save(newUser);
return savedUser;
}
catch(error){
throw new InternalServerErrorException(error)
}
}

async signIn(createUserInput: CreateUserInput,): Promise<UserPayload> {
try{
const { email, password } = createUserInput;
const user = await this.findUser(email);
if (!user) {
  throw new HttpException('User not found ', HttpStatus.UNAUTHORIZED);
}
const matchedPassword = await bcrypt.compare(password, user.password);
if (user && matchedPassword) {
  const payload = { email };
  const accessToken = this.jwtService.sign(payload);
  return  { accessToken,
    response: { status :200, message: 'User logged Successfully'}
  } ;
} else {
  throw new UnauthorizedException('Login failed');
}
}catch(error){
throw new InternalServerErrorException({
  "statusCode": 500,
  "message": error
})
}
}
async verify(token: string) {
const secret = await this.jwtService.verify(token);
const usermail= secret.email;
const userinfo = await this.userRepository.findOne({email: usermail})
return userinfo  
}

async findUser(email: string) {
return await this.userRepository.findOne({email:email.toLocaleLowerCase()});
}
async findUserById(id: number){
return await this.userRepository.findOne(id);
}

async findAll(): Promise<Users[]> {
return await this.userRepository.find();
}

async deleteUserById(deleteUserByIdInput: DeleteUsserByIdInput) : Promise <void> {
try {
  const result = await this.userRepository.delete({
    id: deleteUserByIdInput.id
  })
  return    
} catch (error) {
  throw new InternalServerErrorException(error)
  
}
}


async updateUser (updateUserInput:UpdateUserInput) : Promise <UpdatedUser>{
try {
  const { email , password , updatedName , updatedPassword } = updateUserInput;
  const userInDb = await this.userRepository.findOne({email:email.toLowerCase()})
  if(!userInDb){
    throw new NotFoundException({
      status:HttpStatus.NOT_FOUND,
      error: 'User not found'
    })
  }
  const matchPassword = await bcrypt.compare(password , userInDb.password)
  const salt = await bcrypt.genSalt(10)
  const newHashPassword = await bcrypt.hash(updatedPassword , salt)
  if(matchPassword){
    const updatedUser = await this.userRepository.save({
      id: userInDb.id,
      name: updatedName,
      email:email.toLowerCase(),
      password:newHashPassword
    })
    return updatedUser
  }
  else{
    throw new NotFoundException({
      status:HttpStatus.NOT_FOUND,
      error: 'User not found'
    })
  }
} catch (error) {
  throw new InternalServerErrorException({
    "statusCode": 500,
    "message": error
  })
}
}


}
