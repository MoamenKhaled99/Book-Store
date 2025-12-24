function validateInventoryUpload(file) {
  if (!file) {
    const err = {
      message: "CSV file is required",
      type: "ValidationError",
    };
    throw err;
  }

  if (file.mimetype !== 'text/csv') {
    const err = {
      message: "File must be a CSV",
      type: "ValidationError",
    };
    throw err;
  }

  if (file.size === 0) {
    const err = {
      message: "CSV file is empty",
      type: "ValidationError",
    };
    throw err;
  }
}

export { validateInventoryUpload };
