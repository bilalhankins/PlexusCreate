import { Field, ObjectType } from 'type-graphql';
import {  Column, Entity,  } from 'typeorm';
import { Base } from './Base';
// import {Tag} from './Tag';

@ObjectType()
@Entity()
export class Post extends Base {
  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => String)
  @Column()
  type!: string;

  // @OneToMany(() => Tag, (tag) => tag.name)
  // tags: Tag[];
}
