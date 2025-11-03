export default function notFoundRoute(req, res, next) {
  console.log("route not found");
  return res.status(404).json({ success: false, message: "Route Not found" });
}
