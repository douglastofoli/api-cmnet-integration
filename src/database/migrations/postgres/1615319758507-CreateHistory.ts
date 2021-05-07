import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHistory1615319758507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'histories',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'history',
            type: 'varchar'
          },
          {
            name: 'user_id',
            type: 'integer'
          },
          {
            name: 'created_at',
            type: 'date'
          },
          {
            name: 'updated_at',
            type: 'date'
          }
        ],
        foreignKeys: [
          {
            name: 'HistoryUser',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('histories');
  }
}
