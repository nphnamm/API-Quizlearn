"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Cards", [
      // Basic English - Vietnamese Words
      {
        id: uuidv4(),
        term: "Hello",
        definition: "Xin chào",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a", // Replace with a valid Set UUID
        position: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Goodbye",
        definition: "Tạm biệt",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 2,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Thank you",
        definition: "Cảm ơn",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Sorry",
        definition: "Xin lỗi",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 4,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Yes",
        definition: "Vâng / Dạ",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "No",
        definition: "Không",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 6,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Common Phrases
      {
        id: uuidv4(),
        term: "How are you?",
        definition: "Bạn khỏe không?",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "What is your name?",
        definition: "Tên bạn là gì?",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 2,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "My name is...",
        definition: "Tên tôi là...",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Where are you from?",
        definition: "Bạn đến từ đâu?",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 4,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "I am from...",
        definition: "Tôi đến từ...",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Food & Drinks
      {
        id: uuidv4(),
        term: "Water",
        definition: "Nước",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Rice",
        definition: "Cơm / Gạo",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 2,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Noodles",
        definition: "Mì",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Chicken",
        definition: "Thịt gà",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 4,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Fish",
        definition: "Cá",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Colors
      {
        id: uuidv4(),
        term: "Red",
        definition: "Màu đỏ",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Blue",
        definition: "Màu xanh dương",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 2,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Green",
        definition: "Màu xanh lá",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Yellow",
        definition: "Màu vàng",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 4,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Black",
        definition: "Màu đen",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Numbers
      {
        id: uuidv4(),
        term: "One",
        definition: "Một",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 1,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Two",
        definition: "Hai",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 2,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        term: "Three",
        definition: "Ba",
        setId: "4e4ca51c-3c3c-45a2-9e98-676e4a30c62a",
        position: 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cards", null, {});
  },
};
