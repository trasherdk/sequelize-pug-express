module.exports = (sequelize, Sequelize) => {
  return sequelize.define('blog', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    author: Sequelize.STRING,
    title: Sequelize.TEXT,
    text: Sequelize.TEXT,
    textFull: Sequelize.TEXT,
    active: { type: Sequelize.BOOLEAN, defaultValue: true }
  })
}
