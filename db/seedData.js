const {
  createUser,
  createProduct,
  createCategory,
  createCart,
  createOrderItem,
  createHistory,
} = require("./");
const { client } = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS "orderHistory";
    DROP TABLE IF EXISTS "orderItems";
    DROP TABLE IF EXISTS "orderItem";
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS product;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS categorie;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false
  );
  CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
  );
  CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR UNIQUE NOT NULL,
    price INTEGER,
    "categoryId" INTEGER REFERENCES categories(id),
    image_url TEXT,
    "inStock" BOOLEAN DEFAULT true
  );
  CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "isPurchased" BOOLEAN DEFAULT false
  );
  CREATE TABLE "orderItems" (
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES carts(id),
    "productId" INTEGER REFERENCES products(id),
    quantity INTEGER DEFAULT 1,
    price INTEGER,
    UNIQUE ("cartId", "productId")
  );
  CREATE TABLE "orderHistory" (
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES carts(id),
    "datePurchased" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `);
    console.log("Finished creating tables!");
  } catch (error) {
    console.error("Error creating tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users");
  try {
    const usersToCreate = [
      {
        email: "albert@gmail.com",
        password: "bertie99",
        fullname: "albert bertie",
      },
      {
        email: "sandra@gmail.com",
        password: "sandra123",
        fullname: "sandra diaz",
      },
      {
        email: "glamgal@gmail.com",
        password: "glamgal123",
        fullname: "glam gal",
        isAdmin: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users");
    throw error;
  }
}

async function createCategories() {
  try {
    console.log("Starting to create categories...");

    const categoriesToCreate = [
      {
        name: "Plant Noobs",
      },
      {
        name: "Green Thumbs",
      },
      {
        name: "Divas",
      },
      {
        name: "Pots",
      },
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createCategory)
    );

    console.log("categories created:");
    console.log(categories);

    console.log("Finished creating categories!");
  } catch (error) {
    console.error("Error creating categories!");
    throw error;
  }
}

async function createProducts() {
  try {
    console.log("Starting to create products...");

    const productsToCreate = [
      {
        name: "Pothos",
        description:
          "The Pothos (botanical name: Epipremnum aureum) can be described in one word: chill. It's a perfect plant for a newbie home gardener because it can bounce back from a lot. So if you forget to water your plants (even, um, a lot), this hearty vine will stick around. And you'll know if you're getting it right, because when it gets enough sunlight and water, it grows… fast! Just keep in mind that Pothos plants are toxic to pets. ",
        price: 25,
        categoryId: 1,
        image_url: "/images/pothos.jpeg",
      },
      {
        name: "ZZ Plant",
        description:
          "ZZ Plants (botanical name: Zamioculcas zamiifolia) get their name from their native home of Zanzibar, East Africa. But lucky for us, these plants can thrive far from home, and they look so good people sometimes mistake them for fakes! ZZs love bright, indirect light and grow slowly, so you don't need to worry about repotting any time soon. But keep in mind, they're toxic to human and pets if ingested. ",
        price: 65,
        categoryId: 1,
        image_url: "/images/zz.jpeg",
      },
      {
        name: "Snake Plant",
        description:
          "If you're looking for a spiky showstopper, a Snake plant (botanical name: Dracaena trifasciata), should be on your radar. Not only can it be grown nearly anywhere, from a bright windowsill to a dim corner, but snake plants only need to be watered every few weeks. So chances are, it'll withstand even the most forgetful owner! But keep in mind, Snake plants are toxic to pets.",
        price: 75,
        categoryId: 1,
        image_url: "/images/snake.jpeg",
      },
      {
        name: "Monstera",
        description:
          "If you've been on Instagram lately, you've probably seen the platform's favorite plant: the Monstera (botanical name: Monstera deliciosa). And there's a reason… they look amazing! These stylish climbing evergreens usually grow about one or two feet a year — just make sure you choose a deep pot with good drainage. But keep in mind, Monsteras are toxic to pets.",
        price: 150,
        categoryId: 2,
        image_url: "/images/monstera.jpeg",
      },
      {
        name: "Elephant Ears",
        description:
          "If there's a plant that looks exactly like its name, it's the big, floppy leaves of an Elephant ear (botanical name: Colocasia esculenta). This lovely tropical plant does well when it's watered frequently, and prefers a bit of shade to direct sunlight. It's an easy, impressive plant to add to any collection — just don't name it Dumbo!",
        price: 125,
        categoryId: 2,
        image_url: "/images/elephant.jpeg",
      },
      {
        name: "Hoya",
        description:
          "Despite the fact that The Spruce named the Hoya (botanical name: Asclepiadaceae hoya) 'the worst houseplant', we think this low-maintenance beauty is pretty great. And taking care of one is a great way to develop a green thumb. The Hoya prefers bright light, regular watering, and an occasional misting… just a little tending will have this gorgeous plant showing off!",
        price: 40,
        categoryId: 2,
        image_url: "/images/hoya.jpeg",
      },
      {
        name: "Fiddle Leaf Fig",
        description:
          "The Fiddle Leaf Fig (botanical name: Ficus lyrata) is an indoor tree that oozes style. Its large, violin-shaped leaves are a favorite of interior designers and plant enthusiasts alike! Fiddle Leaf Figs grow quickly (up to ten-feet tall!) and love very warm, wet conditions. But keep in mind, Fiddle Leaf Figs are toxic to pets.",
        price: 400,
        categoryId: 3,
        image_url: "/images/fiddle.jpeg",
      },
      {
        name: "Rubber Tree",
        description:
          "The Rubber Tree (botanical name: Ficus elastica) starts with pink or coral-colored leaves that then darken into a deep emerald green as it grows. With a bit of care, this gorgeous plant will be the crown jewel of room in your home! They like regular watering, moderate-to-warm temperatures, and long walks on the beach (kidding!). But keep in mind, Rubber Trees are toxic to pets.",
        price: 100,
        categoryId: 3,
        image_url: "/images/rubber.jpeg",
      },
      {
        name: "Chinese Money Plant",
        description:
          "The Chinese Money Plant (botanical name: Pilea peperomioides) is sometimes called the UFO plant because of its hovering, coin-shaped leaves. We think the Chinese Money plant's unique foliage is its best quality, making it a great addition to your bookshelf, your coffee table, or even the top of your radiator. A good amount of light and regular watering will help this plant thrive!",
        price: 40,
        categoryId: 3,
        image_url: "/images/peppero.jpeg",
      },
      {
        name: "Small Pot",
        description:
          "A small clay pot for your small plant friend! Dimensions: 6'x6'x5.5",
        price: 10,
        categoryId: 4,
        image_url: "/images/smallpot.jpeg",
      },
      {
        name: "Medium Pot",
        description:
          "A medium clay pot for your medium plant friend! Dimensions: 12.5'x12.5'x11'",
        price: 20,
        categoryId: 4,
        image_url: "/images/medpot.jpeg",
      },
      {
        name: "Large Pot",
        description:
          "A large clay pot for your large plant friend! Dimensions: 17'x17'x14.25'",
        price: 30,
        categoryId: 4,
        image_url: "/images/largepot.jpeg",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("products created:");
    console.log(products);

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
}

async function createCarts() {
  try {
    console.log("Starting to create cart...");

    const cartToCreate = [
      {
        userId: 2,
        isPurchased: true,
      },
      {
        userId: 2,
        isPurchased: true,
      },
      {
        userId: 3,
      },
    ];
    const cart = await Promise.all(cartToCreate.map(createCart));

    console.log("cart created:");
    console.log(cart);

    console.log("Finished creating cart!");
  } catch (error) {
    console.error("Error creating cart!");
    throw error;
  }
}

async function createOrderItems() {
  try {
    console.log("Starting to create orderItem...");

    const orderItemToCreate = [
      {
        cartId: 1,
        productId: 1,
        quantity: 2,
        price: 25,
      },
      {
        cartId: 1,
        productId: 3,
        quantity: 1,
        price: 25,
      },
      {
        cartId: 1,
        productId: 4,
        quantity: 1,
        price: 25,
      },
      {
        cartId: 1,
        productId: 5,
        quantity: 1,
        price: 25,
      },
      {
        cartId: 3,
        productId: 7,
        quantity: 1,
        price: 25,
      },
      {
        cartId: 2,
        productId: 6,
      },
    ];
    const orderItem = await Promise.all(orderItemToCreate.map(createOrderItem));

    console.log("orderItem created!");
    console.log(orderItem);

    console.log("Finished creating orderItem!");
  } catch (error) {
    console.error("Error creating orderItem!");
    throw error;
  }
}

async function createOrderHistories() {
  try {
    console.log("Starting to create orderHistory...");

    const orderHistoryToCreate = [
      {
        cartId: 1,
      },
      {
        cartId: 2,
      },
    ];
    console.log(orderHistoryToCreate, "this is order history to create");
    const orderHistory = await Promise.all(
      orderHistoryToCreate.map(createHistory)
    );
    console.log("orderHistory created!");
    console.log(orderHistory);

    console.log("Finished creating orderHistory!");
  } catch (error) {
    console.error("Error creating orderHistory!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createCategories();
    await createProducts();
    await createCarts();
    await createOrderItems();
    await createOrderHistories();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
