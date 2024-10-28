export default function ({ app }, inject) {
  // Helper function to push events
  const pushEvents = (baseEvents, additionalEvents) => {
    window.criteo_q = window.criteo_q || [];
    window.criteo_q.push(...baseEvents, ...additionalEvents);
  };

  // Inject Criteo tracking function into the app
  inject("criteo", {
    // Load Criteo OneTag and trigger a loader event
    loadCriteoTag: () => {
      window.criteo_q = window.criteo_q || [];
      window.criteo_q.push({
        event: "setAccount",
        account: "<%= options.id %>",
      });
    },

    // Visit Tag (generic page visit)
    visitTag: ({
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
    }) => {
      const baseEvents = [
        { event: "setAccount", account: "<%= options.id %>" },
        { event: "viewPage" },
      ];
      const additionalEvents = [];

      if (email && hashMethod) {
        additionalEvents.push({
          event: "setEmail",
          email,
          hash_method: hashMethod,
        });
      }
      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },

    // Homepage Tag
    homepageTag: ({
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
    }) => {
      const baseEvents = [
        { event: "setAccount", account: "<%= options.id %>" },
        { event: "viewHome" },
      ];
      const additionalEvents = [];

      if (email && hashMethod) {
        additionalEvents.push({
          event: "setEmail",
          email,
          hash_method: hashMethod,
        });
      }
      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },

    // Category / Keyword Search / Listing Tag
    categoryTag: ({
      category,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      productIds,
    }) => {
      const baseEvents = [
        { event: "setAccount", account: "<%= options.id %>" },
        { event: "viewList", item: productIds, category },
      ];
      const additionalEvents = [];

      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },

    // Product Tag (specific product view)
    productTag: ({
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      productId,
      price,
      availability,
    }) => {
      const baseEvents = [
        { event: "viewItem", item: productId, price, availability },
        { event: "setAccount", account: "<%= options.id %>" },
      ];
      const additionalEvents = [];

      if (email && hashMethod) {
        additionalEvents.push({
          event: "setEmail",
          email,
          hash_method: hashMethod,
        });
      }
      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },

    // Add to Cart Tag (item added to the cart)
    addToCartTag: ({
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      item,
    }) => {
      const baseEvents = [
        { event: "addToCart", item: [item] },
        { event: "setAccount", account: "<%= options.id %>" },
      ];
      const additionalEvents = [];

      if (email && hashMethod) {
        additionalEvents.push({
          event: "setEmail",
          email,
          hash_method: hashMethod,
        });
      }
      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },

    // Basket / Cart Tag (viewing the cart)
    basketTag: ({
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      cartItems,
    }) => {
      const items = cartItems.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      const baseEvents = [
        { event: "viewBasket", item: items },
        { event: "setAccount", account: "<%= options.id %>" },
      ];
      const additionalEvents = [];

      if (email && hashMethod) {
        additionalEvents.push({
          event: "setEmail",
          email,
          hash_method: hashMethod,
        });
      }
      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },

    // Sales Tag (checkout completion)
    salesTag: ({
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      orderId,
      cartItems,
      transactionValue,
    }) => {
      const items = cartItems.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      const baseEvents = [
        {
          event: "trackTransaction",
          id: orderId,
          item: items,
          deduplication: 1,
          value: transactionValue,
        },
        { event: "setAccount", account: "<%= options.id %>" },
      ];
      const additionalEvents = [];

      if (email && hashMethod) {
        additionalEvents.push({
          event: "setEmail",
          email,
          hash_method: hashMethod,
        });
      }
      if (customerId) {
        additionalEvents.push({ event: "setCustomerId", id: customerId });
      }
      if (visitorId) {
        additionalEvents.push({ event: "setRetailerVisitorId", id: visitorId });
      }
      if (zipcode) {
        additionalEvents.push({ event: "setZipcode", zipcode });
      }
      if (deviceType) {
        additionalEvents.push({ event: "setSiteType", type: deviceType });
      }

      pushEvents(baseEvents, additionalEvents);
    },
  });
}
