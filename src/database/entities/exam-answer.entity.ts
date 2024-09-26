import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Participants } from './participants.entity';
import { ExamPackage } from './exam-package.entity';

@Entity()
export class ExamAnswers extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  value: number;

  @Column('text')
  log: string;

  @ManyToOne(() => Participants, (participant) => participant.id)
  participant: Participants;

  @ManyToOne(() => ExamPackage, (examPackage) => examPackage.id)
  exam_package: ExamPackage;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
