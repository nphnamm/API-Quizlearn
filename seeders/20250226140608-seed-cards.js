'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cards', [
      // Biology 101 (Set 1)
      { term: 'Cell', definition: 'Basic unit of life', setId: 1, position: 1, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'DNA', definition: 'Genetic material', setId: 1, position: 2, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Mitochondria', definition: 'Powerhouse of the cell', setId: 1, position: 3, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Photosynthesis', definition: 'Process plants use to make food', setId: 1, position: 4, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Enzyme', definition: 'Biological catalyst', setId: 1, position: 5, statusId: 1, createdAt: new Date(), updatedAt: new Date() },

      // Algebra Basics (Set 2)
      { term: 'Variable', definition: 'A symbol representing a number', setId: 2, position: 1, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Equation', definition: 'A statement that two expressions are equal', setId: 2, position: 2, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Slope', definition: 'Measure of steepness of a line', setId: 2, position: 3, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Intercept', definition: 'Point where a line crosses an axis', setId: 2, position: 4, statusId: 1, createdAt: new Date(), updatedAt: new Date() },

      // World War II (Set 3)
      { term: 'D-Day', definition: 'Allied invasion of Normandy, 1944', setId: 3, position: 1, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Axis Powers', definition: 'Germany, Italy, Japan', setId: 3, position: 2, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Allied Powers', definition: 'USA, UK, USSR, etc.', setId: 3, position: 3, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Holocaust', definition: 'Genocide of Jews by Nazis', setId: 3, position: 4, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Pearl Harbor', definition: 'Japanese attack on US, 1941', setId: 3, position: 5, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
      { term: 'Hiroshima', definition: 'First atomic bomb drop, 1945', setId: 3, position: 6, statusId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
