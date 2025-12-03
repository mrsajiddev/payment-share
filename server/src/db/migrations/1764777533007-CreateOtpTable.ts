import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOtpTable1764777533007 implements MigrationInterface {
    name = 'CreateOtpTable1764777533007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`otps\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`otp_hash\` varchar(255) NOT NULL,
                \`expires_at\` timestamp NOT NULL,
                \`attempts\` int NOT NULL DEFAULT '0',
                \`used\` tinyint NOT NULL DEFAULT 0,
                \`channel\` enum ('email', 'sms') NOT NULL DEFAULT 'email',
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`user_id\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`otps\`
            ADD CONSTRAINT \`FK_3938bb24b38ad395af30230bded\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`otps\` DROP FOREIGN KEY \`FK_3938bb24b38ad395af30230bded\`
        `);
        await queryRunner.query(`
            DROP TABLE \`otps\`
        `);
    }

}
