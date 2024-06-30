import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { AuditTrail, EntityHelper } from 'src/shared/utils/entity-helper';
import { make } from 'src/shared/utils/hash';
import { AdminRole } from './admin-role.entity';

@Entity()
export class Admins extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      this.password = make(this.password);
    }
  }

  @ManyToOne(() => AdminRole, (role) => role.admins, {
    nullable: true,
  })
  @JoinColumn()
  role: AdminRole;

  @Column(() => AuditTrail, { prefix: false })
  audit_trail: AuditTrail;
}
