import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamPackage } from './exam-package.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Questions extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ nullable: true })
  options: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  answer: string;

  @Column()
  onTrue: number;

  @Column()
  onEmpty: number;

  @Column()
  onFalse: number;

  @Column({ nullable: true })
  img: string;

  @Column()
  type: string;

  @ManyToOne(() => ExamPackage, (examPackage) => examPackage.id)
  exam_Package: ExamPackage;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
