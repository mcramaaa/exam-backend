import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720278547043 implements MigrationInterface {
    name = 'Migrations1720278547043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exam\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD \`rule\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_answers\` DROP FOREIGN KEY \`FK_3cd68b92ce1b9e54865a7dd1aaf\``);
        await queryRunner.query(`ALTER TABLE \`exam_answers\` CHANGE \`participant_id\` \`participant_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_answers\` ADD CONSTRAINT \`FK_3cd68b92ce1b9e54865a7dd1aaf\` FOREIGN KEY (\`participant_id\`) REFERENCES \`participants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exam_answers\` DROP FOREIGN KEY \`FK_3cd68b92ce1b9e54865a7dd1aaf\``);
        await queryRunner.query(`ALTER TABLE \`exam_answers\` CHANGE \`participant_id\` \`participant_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_answers\` ADD CONSTRAINT \`FK_3cd68b92ce1b9e54865a7dd1aaf\` FOREIGN KEY (\`participant_id\`) REFERENCES \`participants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP COLUMN \`rule\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP COLUMN \`description\``);
    }

}
