import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { SignInDTO, SignUpDTO, updateUserDTO } from './dtos/auth';
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

    //GET auth/me
    @UseGuards(AuthGuard)
    @Get('me')
    async me(@Request() request) {
        return request.user;
    }

    //PUT auth/update/:id
    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(@Param('id') id: string, @Body() body: updateUserDTO ) {
        await this.AuthService.update(+id, body)
        return {
            message: 'Usuário atualizado com sucesso!'
        };
    }

    @UseGuards(AuthGuard)
    //DELETE /auth/delete/:id
    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        await this.AuthService.delete(+id)
        return {
            message: 'Usuário removido com sucesso!'
        };
    }
}
