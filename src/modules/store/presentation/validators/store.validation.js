function validateStoreId(id) {
  if (!id || isNaN(id)) {
    const err = {
      message: "Invalid store ID",
      type: "ValidationError",
    };
    throw err;
  }
}

export { validateStoreId };
