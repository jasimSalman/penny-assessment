import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UpdatePassordDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}


export class ReceiveOtpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
}


export class ValidatOptDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly otps: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;
}
