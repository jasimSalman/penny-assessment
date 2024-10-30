import { Body, Controller, Post, Req , Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signIn.dto';

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
  async updatePassowrd(@Req() req , @Res() res){
    try{
      const user = await this.authService.sigIn(req)
      return res.status(201).send()
    }catch(err){
      console.error(err)
      return res.status(500).send(err)
    }
  }

}
