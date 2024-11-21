import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ReceiveOtpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
}


export class ValidatOptDto {
  @IsNotEmpty()
  @IsString()
  readonly otps: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;
}

export class UpdatePassordDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}

