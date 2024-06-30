import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { NamingStrategyNotFoundError } from 'typeorm';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(
  NamingStrategyNotFoundError,
) {
  constructor() {
    super();
  }

  public validate(payload: unknown, request: unknown): unknown {
    return request;
  }
}
