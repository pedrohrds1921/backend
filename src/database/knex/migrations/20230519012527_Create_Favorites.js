
export const up= knex=>knex.schema.createTable('Favorites',table=>{
    table.increments("id").primary();
    table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE");
    table.integer("food_id").references("id").inTable("Foods").onDelete("CASCADE");
})


export const down=knex=>knex.schema.dropTable("Favorites")
