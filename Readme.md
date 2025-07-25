# Criteo Tracking Plugin for Nuxt.js

This plugin integrates Criteo's tracking events into a Nuxt.js application, allowing you to easily track user interactions such as page visits, product views, cart actions, and transactions.

⚠️ Important: This plugin automatically loads the Criteo script the first time you call any tag method (e.g., homepageTag, visitTag, etc.).
You do not need to manually call loadCriteoTag() unless you want to preload the script before using any tracking calls.

#### If you use Consent Management Platforms (like Cookiebot or Google Consent Mode), make sure to load Criteo or call any method only after user consent is granted.

## Installation

Install the plugin using npm:

```bash
npm install @hevelop/nuxt-criteo-onetag
```

## Usage

1. Add the plugin to your `nuxt.config.js` file.

   ```javascript
   export default {
     modules: [
       // Add the Criteo plugin to your modules
       'nuxt-criteo-tracking',
     ],
     criteoOnetag: {
       enabled: true,
     },
   };
   ```

2. Use the `$criteo` functions to trigger various tracking events in your app.

## Available Methods

The plugin provides multiple methods for different tracking events:

### `loadCriteoTag()`

Loads the Criteo OneTag and triggers a loader event.

All tag methods (like homepageTag, visitTag, etc.) automatically load the script if it hasn’t been loaded yet.

**Example:**

```javascript
this.$criteo.loadCriteoTag({ id: 'YOUR_CRITEO_ACCOUNT_ID' });
```

### `visitTag({ email, hashMethod, customerId, visitorId, zipcode, deviceType })`

Tracks a generic page visit.

**Parameters:**
- `id`: Your Criteo account ID.
- `email` (optional): User's email.
- `hashMethod` (optional): Hashing method for the email (e.g., `sha256`).
- `customerId` (optional): Customer ID.
- `visitorId` (optional): Retailer visitor ID.
- `zipcode` (optional): User's zipcode.
- `deviceType` (optional): Device type (`d`, `m`, or `t` for desktop, mobile, or tablet).

**Example:**

```javascript
this.$criteo.visitTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID',
  email: 'user@example.com',
  hashMethod: 'sha256',
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

### `homepageTag({ email, hashMethod, customerId, visitorId, zipcode, deviceType })`

Tracks a homepage visit.

**Parameters:** Same as `visitTag`.

**Example:**

```javascript
this.$criteo.homepageTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID',
  email: 'user@example.com',
  hashMethod: 'sha256',
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

### `categoryTag({ category, customerId, visitorId, zipcode, deviceType, productIds })`

Tracks a category or listing page view.

**Parameters:**

- `category`: The category name.
- `productIds`: Array of product IDs viewed.
- Other parameters are the same as `visitTag`.

**Example:**

```javascript
this.$criteo.categoryTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID', 
  category: 'Electronics',
  productIds: ['prod123', 'prod456'],
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

### `productTag({ email, hashMethod, customerId, visitorId, zipcode, deviceType, productId, price, availability })`

Tracks a specific product view.

**Parameters:**

- `productId`: The product ID.
- `price`: Product price.
- `availability`: Availability status (`InStock`, `OutOfStock`).
- Other parameters are the same as `visitTag`.

**Example:**

```javascript
this.$criteo.productTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID', 
  productId: 'prod123',
  price: 99.99,
  availability: 'InStock',
  email: 'user@example.com',
  hashMethod: 'sha256',
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

### `addToCartTag({ email, hashMethod, customerId, visitorId, zipcode, deviceType, item })`

Tracks adding an item to the cart.

**Parameters:**

- `item`: An object with the product details (e.g., `{ id: 'prod123', price: 99.99, quantity: 1 }`).
- Other parameters are the same as `visitTag`.

**Example:**

```javascript
this.$criteo.addToCartTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID', 
  item: { id: 'prod123', price: 99.99, quantity: 1 },
  email: 'user@example.com',
  hashMethod: 'sha256',
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

### `basketTag({ email, hashMethod, customerId, visitorId, zipcode, deviceType, cartItems })`

Tracks a view of the cart.

**Parameters:**

- `cartItems`: An array of items in the cart, each containing `productId`, `quantity`, and `price`.
- Other parameters are the same as `visitTag`.

**Example:**

```javascript
this.$criteo.basketTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID', 
  cartItems: [
    { productId: 'prod123', quantity: 2, price: 49.99 },
    { productId: 'prod456', quantity: 1, price: 149.99 },
  ],
  email: 'user@example.com',
  hashMethod: 'sha256',
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

### `salesTag({ email, hashMethod, customerId, visitorId, zipcode, deviceType, orderId, cartItems, transactionValue })`

Tracks a completed transaction.

**Parameters:**

- `orderId`: The order ID.
- `cartItems`: An array of items purchased.
- `transactionValue`: Total value of the transaction.
- Other parameters are the same as `visitTag`.

**Example:**

```javascript
this.$criteo.salesTag({
  id: 'YOUR_CRITEO_ACCOUNT_ID', 
  orderId: 'order123',
  cartItems: [
    { productId: 'prod123', quantity: 2, price: 49.99 },
    { productId: 'prod456', quantity: 1, price: 149.99 },
  ],
  transactionValue: 249.97,
  email: 'user@example.com',
  hashMethod: 'sha256',
  customerId: '12345',
  visitorId: 'visitor123',
  zipcode: '12345',
  deviceType: 'd',
});
```

## Configuration

All methods require the `id` parameter, which is your Criteo account ID.

## License

MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit issues and pull requests for any improvements.
