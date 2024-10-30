import { Schema ,Prop, SchemaFactory } from "@nestjs/mongoose";



@Schema ({
  timestamps: true
})

export class Auth {
  
  @Prop()
  username: string

  @Prop()
  passwordDigest: string

  @Prop()
  email: string

}


export const AuthSchema = SchemaFactory.createForClass(Auth)