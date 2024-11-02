import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signIn.dto';
import { UpdatePassordDto } from './dto/updatePassord.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: mongoose.Model<Auth>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async sigIn(signInDto: SignInDto): Promise<{ token: string }> {
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

    return { token };
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

  async updatePassowrd(
    updatePassowrdDto: UpdatePassordDto
  ): Promise<{ token: string }> {
    const { username, password } = updatePassowrdDto;
    const user = await this.authModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const SALT_ROUNDS = parseInt(
      this.configService.get<string>('SALT_ROUNDS'),
      10
    );

    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await this.authModel.updateOne(
      { username: username },
      { passwordDigest: hashedPassword }
    );

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
