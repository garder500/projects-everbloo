// Fixture : un service qui utilise le modèle via models.Addresses (jamais par chemin d'import).
const { models } = require('../db');

class AddressesService {
  static async update(profilId, addresses) {
    await models.Addresses.destroy({ where: { id_user: profilId } });
    return models.Addresses.bulkCreate(addresses);
  }
}

module.exports = AddressesService;
