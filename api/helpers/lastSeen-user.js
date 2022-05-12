const lastSeen = (user, collection_name, collection_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const index = user.lastSeen[collection_name].findIndex((data) => {
        return data.uid.toString() === collection_id.toString();
      });

      if (index === -1) {
        user.lastSeen[collection_name].push({
          uid: collection_id,
          fecha: Date.now(),
        });
      } else user.lastSeen[collection_name].fecha = Date.now();

      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  lastSeen,
};
