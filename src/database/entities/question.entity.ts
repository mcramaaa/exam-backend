import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExamPackage } from './exam-package.entity';

@Entity()
export class Questions extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  options: string;

  @Column()
  answer: string;

  @Column()
  onTrue: number;

  @Column()
  onEmpty: number;

  @Column()
  onFalse: number;

  @Column()
  img: string;

  @Column()
  type: string;

  @ManyToOne(() => ExamPackage, (examPackage) => examPackage.id, {
    nullable: true,
  })
  exam_Package: ExamPackage;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
