import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user-repository';


@Injectable()
export class AuthService {
    constructor(private UserRepository: UserRepository, private jwtService: JwtService) {}

    async signup(data: SignUpDTO) {

        const userExists = await this.UserRepository.findByEmail(data.email)

        if(userExists) {
            throw new UnauthorizedException("Email já cadastrado!")
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.UserRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    async signin(data: SignInDTO) {

        const user = await this.UserRepository.findByEmail(data.email)
        if(!user) throw new UnauthorizedException("Credencias Inválidas!")

        const passwordMatch = await bcrypt.compare(data.password, user.password)
        if(!passwordMatch) throw new UnauthorizedException("Credencias Inválidas!")

        //cria o token jwt
        const accessToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email
        })
        

        return {accessToken};
    }

    async delete(userId: number) {
        const userExists = await this.UserRepository.findById(userId)
        if(!userExists) throw new UnauthorizedException("Usuário não encontrado!")
        
        const deletedUser = await this.UserRepository.delete(userId)
        return deletedUser
    }
}
