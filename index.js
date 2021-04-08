const FmClient = require('./src/fm-client/FmClient')
const ProductMaintenance = require('./src/fm-client/abilities/external-interface/ProductMaintenance')
const Points = require('./src/fm-client/abilities/for-shop/customers/Points')
const Promotion = require('./src/fm-client/abilities/for-shop/customers/Promotion')
const Schedule = require('./src/fm-client/abilities/inventory/issuance/Schedule')
const Supplier = require('./src/fm-client/abilities/master/Supplier')
const MovementExport = require('./src/fm-client/abilities/movement/MovementExport')
const InventoryAsBatch = require('./src/fm-client/abilities/external-interface/InventoryAsBatch')
const Between = require('./src/fm-client/components/Between')
const GoodsImage = require('./src/fm-client/abilities/master/goods-image/')

const echoTest = () => {
  console.log("Hello, World!")
};

module.exports = {
  echoTest,
  FmClient,
  ProductMaintenance,
  Points,
  Promotion,
  Schedule,
  Supplier,
  MovementExport,
  InventoryAsBatch,
  Between,
  GoodsImage
};