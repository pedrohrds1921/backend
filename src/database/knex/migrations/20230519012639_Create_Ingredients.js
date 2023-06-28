

export const up= knex=>knex.schema.createTable('Ingredients',table=>{
    table.increments("id").primary();
    table.text("Name")
    table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE");
    table.integer("food_id").references("id").inTable("Foods").onDelete("CASCADE");
})

export function down(knex) {
  
}
