import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class insurance1609802764001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'insurance',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'value',
                    type: 'float',
                    isNullable: false,
                }
            ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('insurance');
    }

}
