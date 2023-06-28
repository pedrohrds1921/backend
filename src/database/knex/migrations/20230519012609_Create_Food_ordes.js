
export const up= knex=>knex.schema.createTable('Food_orders',table=>{
    table.increments("id").primary();
    table.text("Name")
    table.integer("Quantity")
    table.timestamp('created_at').defaultTo(knex.raw("(strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))"));
})


export const down=knex=>knex.schema.dropTable("Food_orders")

