export default function ({ app }, inject) {
  // Helper function to push events
  const pushEvents = (baseEvents, additionalEvents) => {
    window.criteo_q = window.criteo_q || [];
    window.criteo_q.push(...baseEvents, ...additionalEvents);
  };

  const injectCriteoScript = (id) => {
    if (!document.querySelector(`script[src="https://dynamic.criteo.com/js/ld/ld.js?a=${id}"]`)) {
      const script = document.createElement("script");
      script.src = `https://dynamic.criteo.com/js/ld/ld.js?a=${id}`;
      script.async = true;
      document.head.appendChild(script);
    }
  };

  // Inject Criteo tracking function into the app
  inject("criteo", {
    // Load Criteo OneTag and trigger a loader event
    loadCriteoTag: (id) => {
      injectCriteoScript(id);
      window.criteo_q = window.criteo_q || [];
      window.criteo_q.push({
        event: "setAccount",
        account: id,
      });
    },

    // Visit Tag (generic page visit)
    visitTag: ({
      id,
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
    }) => {
      injectCriteoScript(id);
      const baseEvents = [
        { event: "setAccount", account: id },
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
      id,
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
    }) => {
      injectCriteoScript(id);
      const baseEvents = [
        { event: "setAccount", account: id },
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
      id,
      category,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      productIds,
    }) => {
      injectCriteoScript(id);
      const baseEvents = [
        { event: "setAccount", account: id },
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
      id,
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
      injectCriteoScript(id);
      const baseEvents = [
        { event: "viewItem", item: productId, price, availability },
        { event: "setAccount", account: id },
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
      id,
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      item,
    }) => {
      injectCriteoScript(id);
      const baseEvents = [
        { event: "addToCart", item: [item] },
        { event: "setAccount", account: id },
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
      id,
      email,
      hashMethod,
      customerId,
      visitorId,
      zipcode,
      deviceType,
      cartItems,
    }) => {
      injectCriteoScript(id);
      const items = cartItems.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      const baseEvents = [
        { event: "viewBasket", item: items },
        { event: "setAccount", account: id },
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
      id,
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
      injectCriteoScript(id);
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
        { event: "setAccount", account: id },
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
