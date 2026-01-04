import { Prop, Schema } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({timestamps: true})
export class Student{
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    age: number;

    @Prop({required: true})
    email?: string;
}