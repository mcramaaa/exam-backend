import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExamPackage } from './exam-package.entity';

@Entity()
export class Exam extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rule: string;

  @Column()
  isActive: boolean;

  @Column()
  isOneTime: boolean;

  @Column()
  isPackage: boolean;

  @Column()
  degree: string;

  @Column()
  time: string;

  @Column()
  start: string;

  @Column()
  end: string;

  @OneToMany(() => ExamPackage, (examPackage) => examPackage.id)
  exam: Exam[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
