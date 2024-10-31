import { IsNotEmpty, IsString } from "class-validator"


export class UpdatePassordDto{


  @IsNotEmpty()
  @IsString()
  readonly username: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}