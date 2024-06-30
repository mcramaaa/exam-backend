import { Test, TestingModule } from '@nestjs/testing';
import { ExamAnswerController } from './exam-answer.controller';
import { ExamAnswerService } from './exam-answer.service';

describe('ExamAnswerController', () => {
  let controller: ExamAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamAnswerController],
      providers: [ExamAnswerService],
    }).compile();

    controller = module.get<ExamAnswerController>(ExamAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
