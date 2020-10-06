import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { DatabaseType } from 'typeorm';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  public constructor() {
    const config = dotenv.config().parsed;
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      DB_TYPE: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRE_TIME: Joi.number().default(3600),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  public get port(): number {
    return +this.envConfig.PORT;
  }

  public get dbHost(): string {
    return this.envConfig.DB_HOST;
  }

  public get dbPort(): number {
    return +this.envConfig.DB_PORT;
  }

  public get dbUsername(): string {
    return this.envConfig.DB_USERNAME;
  }

  public get dbPassword(): string {
    return this.envConfig.DB_PASSWORD;
  }

  public get dbName(): string {
    return this.envConfig.DB_DATABASE_NAME;
  }

  public get dbType(): DatabaseType {
    return this.envConfig.DB_TYPE as DatabaseType;
  }

  public get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  public get jwtExpireTime(): number {
    return +this.envConfig.JWT_EXPIRE_TIME;
  }
}
