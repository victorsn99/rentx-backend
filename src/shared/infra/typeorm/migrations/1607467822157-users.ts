import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class users1607467822157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [{
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'adress_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'cpf_cnpj',
              type: 'varchar',
              isNullable: true,
            },  
            {
              name: 'avatar',
              type: 'varchar',
              isNullable: true,
            },  
            {
              name: 'email',
              type: 'varchar',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'password',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'is_rental',
              type: 'boolean',
              isNullable: false,
            }
          ]
          })
        );

        await queryRunner.createForeignKey('users', new TableForeignKey({
            name: 'userAdress',
            columnNames: ['adress_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'adress',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }));
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
      }
}
