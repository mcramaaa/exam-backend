import { Test, TestingModule } from '@nestjs/testing';
import { ExamAnswerService } from './exam-answer.service';

describe('ExamAnswerService', () => {
  let service: ExamAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamAnswerService],
    }).compile();

    service = module.get<ExamAnswerService>(ExamAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
