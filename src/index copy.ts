import { Library } from 'zotero-ts-api';

// Utilisation de la classe Library
const apiKey = process.env.ZOTERO_API_KEY;
const id = process.env.ZOTERO_GROUP_ID;
const type = 'groups';

(async () => {
  const library = new Library(apiKey, id, type);
  await library.connect();

  console.log(`Connected to library: ${library.name}`);

  const collections = await library.getCollections();
  console.log(`Found ${collections.length} collections`);

  const items = await library.getAllItems();
  console.log(`Found ${items.length} items`);

  items.forEach(item => {
    console.log(`Item Key: ${item.key}`);
    console.log(`Title: ${item.title}`);
    console.log(`Item Type: ${item.itemType}`);
  });
})();
