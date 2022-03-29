import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigrations1648211855026 implements MigrationInterface {
    name = 'newMigrations1648211855026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "productCode" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "addressId" integer, CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_user_users" ("productId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_7c192899002c9fd9d8f10c3addc" PRIMARY KEY ("productId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c7fd4432129fc20b8e7dda16c" ON "product_user_users" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c39bc4fc95fc67a5430597bd38" ON "product_user_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_user_users" ADD CONSTRAINT "FK_6c7fd4432129fc20b8e7dda16c4" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_user_users" ADD CONSTRAINT "FK_c39bc4fc95fc67a5430597bd389" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_user_users" DROP CONSTRAINT "FK_c39bc4fc95fc67a5430597bd389"`);
        await queryRunner.query(`ALTER TABLE "product_user_users" DROP CONSTRAINT "FK_6c7fd4432129fc20b8e7dda16c4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c39bc4fc95fc67a5430597bd38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c7fd4432129fc20b8e7dda16c"`);
        await queryRunner.query(`DROP TABLE "product_user_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
