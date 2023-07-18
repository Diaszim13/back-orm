import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTablePhoto1689547290548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
