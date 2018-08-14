module.exports = (sequelize, type) => {
  return sequelize.define('blog', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: type.STRING,
    title: type.STRING,
    text: type.TEXT,
    textFull: type.TEXT,
    active: { type: type.BOOLEAN, defaultValue: true }
  })
}
