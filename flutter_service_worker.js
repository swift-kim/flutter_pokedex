'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "main.dart.js": "9255acb7d1b8f80b4fba274ca06c667e",
"assets/NOTICES": "0ce20f847092a8f13ddc131e7cfeb08c",
"assets/FontManifest.json": "c7dc4ce2a91a8bc568a79ff5796076ed",
"assets/assets/items.json": "89c9e1df088fe6acd0ab312d73718f6d",
"assets/assets/fonts/CircularStd-Black.ttf": "c885948f6112a185e0e6c79963826882",
"assets/assets/fonts/CircularStd-Medium.ttf": "46d551dfd0caa61f1332d7c477f584c2",
"assets/assets/fonts/CircularStd-Bold.ttf": "ce2a6c4154de87815e8971d21a987403",
"assets/assets/fonts/CircularStd-Book.ttf": "c43e9feb9ca817ae86afb47fd0ee4f94",
"assets/assets/images/sobble.png": "a69fe5e826e4f1f55d646309652059fe",
"assets/assets/images/froakie.png": "29a694a77d40aea385ac6b13853bbd9e",
"assets/assets/images/popplio.png": "ded71e4bc5da9895e21cc277b9cf8fab",
"assets/assets/images/fennekin.png": "133b5ed4027acd4212cc2fe0420b8437",
"assets/assets/images/tepig.png": "4545ee68aae24951d950e1e1f0616961",
"assets/assets/images/turtwig.png": "b57da6dd177ce5aa09332d870db56e91",
"assets/assets/images/grookey.png": "b728df3cdcc39efa7028d484710b858a",
"assets/assets/images/scorbunny.png": "6911d3835e5904ce8bb2715ac02466e3",
"assets/assets/images/snivy.png": "f5a7baee06228c142930f5a14ed71f95",
"assets/assets/images/chimchar.png": "06baa7a85cd67fcb0165fbd3dd44eb09",
"assets/assets/images/male.png": "9c8bd6b69058f082eacc2757a3483372",
"assets/assets/images/thumbnail.png": "80ed74a8e28180549f8651c5ac5e56b2",
"assets/assets/images/female.png": "f7685daa2a4c4f10aace03041c6116b1",
"assets/assets/images/oshawott.png": "5a26e74016618db58f61e5e8eba22d45",
"assets/assets/images/litten.png": "e573b2e16b02de65b33531ecc02da06e",
"assets/assets/images/torchic.png": "2de8b1e6fb9ecdf3fddbb799207e9255",
"assets/assets/images/dotted.png": "daf6fd87311f674b126afc8ed3387535",
"assets/assets/images/chespin.png": "0df5dd7f4851503e5ba72212a4694e4b",
"assets/assets/images/charmander.png": "014a68068a56dd7bd6750ef8308d41c2",
"assets/assets/images/mudkip.png": "90a6160eebabd2fd2249775ff062be17",
"assets/assets/images/rowlet.png": "5686054cc0951262c9ce72d829926c39",
"assets/assets/images/chikorita.png": "22ee4dd4b07ea494eb11f38bba7a3cd2",
"assets/assets/images/treecko.png": "7c641425ed0c54a398481afcf53f3132",
"assets/assets/images/totodile.png": "69383db7b9387d8e6204f6a6b5ec0a05",
"assets/assets/images/bulbasaur.png": "b95ef137175c5aa8d9385d37af226f78",
"assets/assets/images/cyndaquil.png": "493ab676b8e5bf02ef94aa964427252c",
"assets/assets/images/pokeball.png": "28f300531c149d310f310330f17cf410",
"assets/assets/images/pika_loader.gif": "b97cb38d55aa7f3cead1826d0485d048",
"assets/assets/images/squirtle.png": "2f8feba324c18cd8c17fd90660936025",
"assets/assets/images/piplup.png": "15499e0a9d2b933f0be0ce505479a286",
"assets/assets/pokemons.json": "be038100e2eefaa6c841b75d365e2982",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/AssetManifest.json": "c42b9e7d5d34b752b634de1784c058f3",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c15593d991568a9f4d77595e4ccff0fd",
"/": "c15593d991568a9f4d77595e4ccff0fd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"manifest.json": "57fc52a178bccccdfea30c51c8b6686c",
"version.json": "1b632a76ec40f6adffc40f51a5231ee3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
