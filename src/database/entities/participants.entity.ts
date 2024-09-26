import { Exclude } from 'class-transformer';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { make } from 'src/shared/utils/hash';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ExamAnswers } from './exam-answer.entity';

@Entity()
export class Participants extends EntityHelper {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @Column('simple-array', { nullable: true })
  exam_package: string[];

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

  @OneToMany(() => ExamAnswers, (examAnswers) => examAnswers.id)
  examAnswers: ExamAnswers[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
