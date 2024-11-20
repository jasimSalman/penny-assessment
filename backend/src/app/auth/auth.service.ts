import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signIn.dto';
import { ReceiveOtpDto, UpdatePassordDto, ValidatOptDto } from './dto/updatePassord.dto';
import nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async sigIn(signInDto: SignInDto): Promise<{ token: string; user: any }> {
    const { username, password } = signInDto;
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid Username');
    }

    const passowredCheck = await bcrypt.compare(password, user.passwordDigest);

    if (!passowredCheck) {
      throw new UnauthorizedException('Password is Invalid');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { user, token };
  }

  async registration(registerDto: RegisterDto): Promise<{ user: object }> {
    const { username, email, password } = registerDto;

    let existingUser = await this.authModel.findOne({ username });

    if (existingUser) {
      throw new Error('Username already exists!');
    }

    const SALT_ROUNDS = parseInt(
      this.configService.get<string>('SALT_ROUNDS'),
      10
    );

    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await this.authModel.create({
      username,
      email,
      passwordDigest: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { user };
  }

  async sentOtp(receiveOtpDto:ReceiveOtpDto){
    const {username} = receiveOtpDto

    let existingUser = await this.authModel.findOne({ username });
    if (!existingUser) {
      throw new Error('Username does not exists!');
    }

    const createdOtp = Math.floor(100000 + Math.random() * 900000).toString()

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: existingUser.email,
      subject: 'Reset Password OTP',
      text: `Your OTP is ${createdOtp}.`,
    });
  
    const expirationTime = Date.now() + 2 * 60 * 1000;
    
    await this.authModel.updateOne(
      { username },
      { otp:createdOtp, otpExpiration: expirationTime },
    );
    return { message: 'OTP sent to your email.'};
  }

  async optVerification(validatOptDto:ValidatOptDto){
    const {username , otps } = validatOptDto

    const existingUser = await this.authModel.findOne({username})

    if(!existingUser){
      throw new Error("User does not exist")
    }

    const {otp: otp ,otpExpiration: otpExpiration } = existingUser

  const currentTime = Date.now()

  if (otps !== otp) {
    throw new Error('Invalid OTP. Please try again.');
  }

  if (currentTime > otpExpiration) {
    throw new Error('OTP has expired. Please request a new OTP.');
  }

  await this.authModel.updateOne(
    { username },
    { $unset: { otp: "", otpExpiration: "" } }
  );

  return { message: 'OTP verified successfully!' };
  }


  async updatePassowrd(
    updatePassowrdDto: UpdatePassordDto
  ): Promise<{ token: string }> {

    const { username, password } = updatePassowrdDto;
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    let hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

    await this.authModel.updateOne(
      { username: username },
      { passwordDigest: hashedPassword }
    );

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
