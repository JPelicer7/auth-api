import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService)  {}

    //POST auth/signin
    @Post('signin')
    async signin(@Body() body: SignInDTO) {

        //await this.AuthService.signin(body);
        return this.AuthService.signin(body);
    }

    //POST auth/signup
    @Post('signup')
    async signup(@Body() body: SignUpDTO) {
        
      
        console.log('Dados recebidos:', body);
        //await this.AuthService.signup(body)
        return this.AuthService.signup(body)
        
    }

    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() request) {
        return request.user;
    }
}
