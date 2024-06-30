import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exam } from './exam.entity';

@Entity()
export class ExamPackage extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Exam, (exam) => exam.id, { nullable: true })
  exam: Exam;

  // @OneToMany(() => Questions, (question) => question.id)
  // questions: Questions[];

  // @OneToMany(() => Participants, (participant) => participant.id)
  // participant: Participants[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
