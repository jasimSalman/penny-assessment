import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Auth {
  @Prop()
  username: string;

  @Prop()
  passwordDigest: string;

  @Prop()
  email: string;

  @Prop()
  otp: string;

  @Prop()
  otpExpiration: number;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
