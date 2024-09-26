import { AuthUserModule } from 'src/auth/user/auth-user.module';
import { ExamAnswerModule } from './exam-answer/exam-answer.module';
import { ExamPackModule } from './exam-pack/exam-pack.module';
import { QuestionsModule } from './questions/questions.module';

export const UserModules = [
  AuthUserModule,
  ExamAnswerModule,
  ExamPackModule,
  QuestionsModule,
];
