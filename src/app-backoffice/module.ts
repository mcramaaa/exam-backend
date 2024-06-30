import { AuthAdminModule } from 'src/auth/admin/auth-admin.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoleModule } from './admin-role/admin-role.module';
import { ParticipantsModule } from './participants/participants.module';
import { ExamModule } from './exam/exam.module';
import { ExamPackageModule } from './exam-package/exam-package.module';
import { QuestionsModule } from './questions/questions.module';

export const BackofficeModules = [
  AuthAdminModule,
  AdminModule,
  AdminRoleModule,
  ParticipantsModule,
  // DegreeModule,
  ExamModule,
  ExamPackageModule,
  QuestionsModule,
];
