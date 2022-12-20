const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('race', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, //allowNull en false nos hace obligatorio nuestro campo.
      // validate: {
      //   notNull: {
      //      msg: 'el campo no debe ser nulo'
      //   },
      //   len: {
      //     args: [3,255],
      //     msg: 'el nombre tiene que ser entre 3 y 255 caracteres'
      //   }
        
      // }
    },
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isInt: {
      //     args: true,
      //     msg: 'heightMin debe de ser numeros'
      //   } 
      // }
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isInt: {
      //     args: true,
      //     msg: 'heightMin debe de ser numeros'
      //   } 
      // }
    },
    weightMin: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isInt: {
      //     args: true,
      //     msg: 'weightMin debe de ser numeros'
      //   } 
      // }

    },
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isInt: {
      //     args: true,
      //     msg: 'weightMax debe de ser numeros'
      //   } 
      // }
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   isInt: {
      //     args: true,
      //     msg: 'life_span debe de ser numeros'
      //   } 
      // }
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }


  });
};
