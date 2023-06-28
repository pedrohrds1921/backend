export const up =knex=>knex.schema.createTable("Foods",table=>{
    table.increments("id").primary();
    table.text("Name");
    table.decimal("Price",10,2);
    table.text("Food_Image");
    table.text("Category");
    table.text("Description");
    table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE");
    table.timestamp('created_at').defaultTo(knex.raw("(strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))"));
    table.timestamp('updated_at').defaultTo(knex.raw("(strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))"))
    

})


export const down=knex=>knex.schema.dropTable("Foods")
