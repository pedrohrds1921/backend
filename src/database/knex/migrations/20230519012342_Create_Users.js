export const up = knex=>knex.schema.createTable('Users',table=>{
    table.increments("id").primary();
    table.text("Name");
    table.text("Email");
    table.text("Password");
    table.text("Avatar")
    table.boolean('Admin').notNullable().defaultTo(true)
    table.timestamp('created_at').defaultTo(knex.raw("(strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))"));
    table.timestamp('updated_at').defaultTo(knex.raw("(strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))"))

})

export const down=knex=>knex.schema.dropTable("Users")
