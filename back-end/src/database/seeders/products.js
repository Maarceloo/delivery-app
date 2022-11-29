module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Skol Lata 250ml",
          price: 2.2,
          url_image: "http://localhost:3001/images/skol_lata_350ml.jpg",
        },
        {
          name: "Heineken 600ml",
          price: 7.5,
          url_image: "http://localhost:3001/images/heineken_600ml.jpg",
        },
        {
          name: "Antarctica Pilsen 300ml",
          price: 2.49,
          url_image: "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
        },
      ],
      {}
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};