/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto'
import { HydratedDocument } from 'mongoose';


export type AssestDocument = HydratedDocument<Asset>;

@Schema({timestamps:true})
export class Asset {
 @Prop({default: () => crypto.randomUUID()})
  _id: string;

  @Prop()
  name:string;

  @Prop({unique:true, index:true})
  symbo: string;

  @Prop()
  image:string;

  @Prop()
  price:string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;

}

export const AsserSchema = SchemaFactory.createForClass(Asset)