import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719715884276 implements MigrationInterface {
  name = 'Migrations1719715884276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`exam\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`is_one_time\` tinyint NOT NULL, \`is_package\` tinyint NOT NULL, \`degree\` varchar(255) NOT NULL, \`time\` varchar(255) NOT NULL, \`start\` varchar(255) NOT NULL, \`end\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`exam_package\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`exam_id\` int NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`question\` varchar(255) NOT NULL, \`options\` varchar(255) NOT NULL, \`answer\` varchar(255) NOT NULL, \`on_true\` int NOT NULL, \`on_empty\` int NOT NULL, \`on_false\` int NOT NULL, \`img\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`exam_package_id\` int NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`participants\` (\`number\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`birth\` varchar(255) NOT NULL, \`exam\` text NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_b77ad0832a0f8ec526c1f40a84\` (\`email\`), PRIMARY KEY (\`number\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`exam_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`answer\` varchar(255) NOT NULL, \`value\` int NOT NULL, \`log\` int NOT NULL, \`participant_number\` int NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admin_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` int NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`degree\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exam_package\` ADD CONSTRAINT \`FK_ac32b83a3d6c40831e662fca90e\` FOREIGN KEY (\`exam_id\`) REFERENCES \`exam\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_6eb8caa1e8d36d067d834e26145\` FOREIGN KEY (\`exam_package_id\`) REFERENCES \`exam_package\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exam_answers\` ADD CONSTRAINT \`FK_aeb5be1df2fb764de4857bfac1c\` FOREIGN KEY (\`participant_number\`) REFERENCES \`participants\`(\`number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_5733c73cd81c566a90cc4802f96\` FOREIGN KEY (\`role_id\`) REFERENCES \`admin_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_5733c73cd81c566a90cc4802f96\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exam_answers\` DROP FOREIGN KEY \`FK_aeb5be1df2fb764de4857bfac1c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_6eb8caa1e8d36d067d834e26145\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exam_package\` DROP FOREIGN KEY \`FK_ac32b83a3d6c40831e662fca90e\``,
    );
    await queryRunner.query(`DROP TABLE \`degree\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``,
    );
    await queryRunner.query(`DROP TABLE \`admins\``);
    await queryRunner.query(`DROP TABLE \`admin_role\``);
    await queryRunner.query(`DROP TABLE \`exam_answers\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b77ad0832a0f8ec526c1f40a84\` ON \`participants\``,
    );
    await queryRunner.query(`DROP TABLE \`participants\``);
    await queryRunner.query(`DROP TABLE \`questions\``);
    await queryRunner.query(`DROP TABLE \`exam_package\``);
    await queryRunner.query(`DROP TABLE \`exam\``);
  }
}
