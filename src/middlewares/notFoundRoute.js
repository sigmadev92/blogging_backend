export default function notFoundRoute(req, res, next) {
  return res.status(404).json({ success: false, message: "Route Not found" });
}
