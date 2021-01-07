import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class rentals1609803154953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'rentals',
            columns: [{
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'user_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'rental_id',
              type: 'uuid',
              isNullable: false,
            },
            {
                name: 'car_id',
                type: 'uuid',
                isNullable: false,
            },
            {
                name: 'insurance_id',
                type: 'uuid',
                isNullable: true,
            },
            {
              name: 'start_date',
              type: 'timestamp with time zone',
              isNullable: false,
            },
            
            {
                name: 'end_date',
                type: 'timestamp with time zone',
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
          ]}));

          await queryRunner.createForeignKey('rentals', new TableForeignKey({
            name: 'rentalsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }));

          await queryRunner.createForeignKey('rentals', new TableForeignKey({
            name: 'rentalsRental',
            columnNames: ['rental_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }));

          await queryRunner.createForeignKey('rentals', new TableForeignKey({
            name: 'rentalsCar',
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }));

          await queryRunner.createForeignKey('rentals', new TableForeignKey({
            name: 'rentalsInsurance',
            columnNames: ['insurance_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'insurance',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }));
      }
  
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rentals');
      }

}
