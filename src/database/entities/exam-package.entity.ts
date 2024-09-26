import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { ExamAnswers } from './exam-answer.entity';
import { Questions } from './question.entity';

@Entity()
export class ExamPackage extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Exam, (exam) => exam.id)
  exam: Exam;

  @OneToMany(() => ExamAnswers, (answer) => answer.id)
  exam_answer: ExamAnswers[];

  @OneToMany(() => Questions, (question) => question.id)
  questions: Questions[];

  // @OneToMany(() => Participants, (participant) => participant.id)
  // participant: Participants[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
