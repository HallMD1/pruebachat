import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
