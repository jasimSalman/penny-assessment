import { Body, Controller, Post, Req , Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signIn.dto';
import { UpdatePassordDto } from './dto/updatePassord.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService){}
  
  @Post('/sign-in')
  signIn(@Body() signInDto:SignInDto ): Promise<{token:string}> {
    return this.authService.sigIn(signInDto)
  }

  @Post('/new')
  registration(@Body() registerDto:RegisterDto ):Promise<{token:string}> {
      return this.authService.registration(registerDto)
  }

  @Post('/forget-password')
  async updatePassowrd(@Body() updatePasswordDto:UpdatePassordDto): Promise<{token:string}>{

    return this.authService.updatePassowrd(updatePasswordDto)
  }

}
