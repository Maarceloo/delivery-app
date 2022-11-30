module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('users', [
        {
          name: "Delivery App Admin",
          email: "adm@deliveryapp.com",
          password: "a4c86edecc5aee06eff8fdeda69e0d04",
          role: "administrator",
        },
        {
          name: "Fulana Pereira",
          email: "fulana@deliveryapp.com",
          password: "3c28d2b0881bf46457a853e0b07531c6",
          role: "seller",
        },
        {
          name: "Cliente Zé Birita",
          email: "zebirita@email.com",
          password: "1c37466c159755ce1fa181bd247cb925",
          role: "customer",
        },
      ],
      {}
    );
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
  