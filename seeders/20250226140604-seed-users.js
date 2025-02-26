"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: 'john_doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          password: 'hashedpassword123', // Use a real hash in production
          avatar: 'https://example.com/avatar/john_doe.png',
          statusId: 1, // Assuming statusId 1 is for "active"
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'jane_smith',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phoneNumber: '0987654321',
          password: 'hashedpassword456', // Use a real hash in production
          avatar: 'https://example.com/avatar/jane_smith.png',
          statusId: 1, // Assuming statusId 1 is for "active"
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ,
        {
          username: "alice_wong",
          firstName: "Alice",
          lastName: "Wong",
          email: "alice.wong@example.com",
          phoneNumber: "1122334455",
          password: "hashedpass3",
          avatar: null,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "bob_jones",
          firstName: "Bob",
          lastName: "Jones",
          email: "bob.jones@example.com",
          phoneNumber: "5566778899",
          password: "hashedpass4",
          avatar: "avatar4.jpg",
          statusId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "emma_brown",
          firstName: "Emma",
          lastName: "Brown",
          email: "emma.brown@example.com",
          phoneNumber: "6677889900",
          password: "hashedpass5",
          avatar: null,
          statusId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "david_lee",
          firstName: "David",
          lastName: "Lee",
          email: "david.lee@example.com",
          phoneNumber: "7788990011",
          password: "hashedpass6",
          avatar: "avatar6.jpg",
          statusId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
