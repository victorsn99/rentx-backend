import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class adress1607467774033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'adress',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'street',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'number',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'neighborhood',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'state',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'country',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'zip_code',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('adress');
    }

}
