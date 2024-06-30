import { Exclude } from 'class-transformer';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { make } from 'src/shared/utils/hash';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Participants extends EntityHelper {
  @PrimaryGeneratedColumn()
  number: number;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @Column('simple-array', { nullable: true })
  exam: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password && this.password !== this.previousPassword) {
      this.password = make(this.password);
    }
  }

  // @OneToMany(() => ExamPackage, (examPackage) => examPackage.id, {
  //   nullable: true,
  // })
  // exam_Package: ExamPackage;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
