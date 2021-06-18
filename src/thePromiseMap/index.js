// Sometimes we also want to asyncronously run a map function on each promise resolution

if (Promise.map === undefined) {
  Promise.map = (promises, cb) => {
    return Promise.all(
      promises.map((pr) => {
        return new Promise((resolve) => {
          return cb(pr, resolve);
        });
      })
    );
  };
}

// Just side effect is require
