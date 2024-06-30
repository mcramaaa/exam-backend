import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';

@Entity()
export class Degree extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => Exam, (exam) => exam.degree)
  // exam: Exam[];

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
