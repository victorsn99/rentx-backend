import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class cars1607467949138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [{
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'rental_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'brand',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'daily_value',
                    type: 'float',
                    isNullable: false,
                },
                {
                    name: 'category',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'fuel',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'engine',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'horsepower',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'transmission',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'color',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'image',
                    type: 'varchar',
                    isNullable: true,
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
        );

        await queryRunner.createForeignKey('cars', new TableForeignKey({
            name: 'rentalCars',
            columnNames: ['rental_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }

}
