// Fixture : un vrai appelant de AddressesService.update et un homonyme (other.update) qui ne doit pas ressortir.
const AddressesService = require('../services/addresses.service');

class AddressesController {
  static async save(req, res) {
    const result = await AddressesService.update(req.params.id, req.body);
    res.json(result);
  }

  static async rename(req, res) {
    const other = { update: (x) => x };
    res.json(other.update(req.body));
  }
}

module.exports = AddressesController;
