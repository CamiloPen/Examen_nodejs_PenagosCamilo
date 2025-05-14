import { client, main } from "./helpers/db.js";
import { Warehouse, Article, Inventory } from "./collections/index.js";

const db = await main();
const session = db.client.startSession();

try {
  const config = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  }

  const warehouse = new Warehouse(db)
  const article = new Article(db)
  const inventory = new Inventory(db)

  await session.withTransaction(async () => {
    await warehouse.generateCollection()
    await article.generateCollection()
    await inventory.generateCollection()
    console.log("Colecciones e Indices creados correctamente")
  }, config);
}
catch (error) {
  console.log(error.message);
}
finally {
  if (session.transaction.isActive) await session.abortTransaction();
  await session.endSession();
  await client.close();
}