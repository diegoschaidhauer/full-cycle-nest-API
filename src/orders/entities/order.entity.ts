/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto'
import mongoose, { HydratedDocument } from 'mongoose';
import { AssetsDocument, Asset } from 'src/assets/entities/asset.entity';
import { Wallet, WalletDocument } from 'src/wallets/entities/wallet.entity';


export type OrderDocument = HydratedDocument<Order>;

export enum OrderType{
    BUY = 'BUY',
    SELL = 'SELL'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    FAILED = 'FAILED'
}


@Schema({timestamps:true})
export class Order {
  @Prop({default: () => crypto.randomUUID()})
  _id: string;
  
  @Prop({type: mongoose.Schema.Types.Int32})
  share: number;
  
  @Prop({type: mongoose.Schema.Types.Int32})
  partial: number;
  
  @Prop()
  price: number;

  @Prop({type: String, ref: Wallet.name})
  wallet: WalletDocument | string;
  
  @Prop({type:String, ref: Asset.name})
  asset: AssetsDocument | string;

  @Prop()
  type: OrderType;

  @Prop()
  status: OrderStatus;
  
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;

}

export const OrderSchema = SchemaFactory.createForClass(Order)

OrderSchema.index({Wallet:1, asset:1}, {unique:true})