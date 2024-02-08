class ResourceNotFound extends Error {
  constructor(message = "Resource not found") {
    super(message);
  }
}
export default ResourceNotFound;
