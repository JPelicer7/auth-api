import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private PrismaService: PrismaService, private jwtService: JwtService) {}

    async signup(data: SignUpDTO) {

        const userExists = await this.PrismaService.user.findUnique({
            where: {email: data.email}
        })

        if(userExists) {
            throw new UnauthorizedException("Email já cadastrado!")
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = await this.PrismaService.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    async signin(data: SignInDTO) {

        const user = await this.PrismaService.user.findFirst({where: {email: data.email}})
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
}
