/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto'
import mongoose, { HydratedDocument } from 'mongoose';
import { Wallet, WalletDocument } from './wallet.entity';
import { AssetsDocument, Asset } from 'src/assets/entities/asset.entity';


export type WalletAssetDocument = HydratedDocument<WalletAsset>;

@Schema({timestamps:true})
export class WalletAsset {
  @Prop({default: () => crypto.randomUUID()})
  _id: string;
  
  @Prop({type: mongoose.Schema.Types.Int32})
  share: number;
  
  @Prop({type: String, ref: Wallet.name})
  wallet: WalletDocument | string;
  
  @Prop({type:String, ref: Asset.name})
  asset: AssetsDocument | string;
  
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;

}

export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset)

WalletAssetSchema.index({Wallet:1, asset:1}, {unique:true})