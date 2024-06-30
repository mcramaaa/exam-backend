import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Participants } from './participants.entity';

@Entity()
export class ExamAnswers extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  value: number;

  @Column()
  log: number;

  @ManyToOne(() => Participants, (participants) => participants.id)
  @JoinColumn()
  participant: Participants[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
