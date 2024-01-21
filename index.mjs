const getReader = (name, index) => (target, parts) =>
  (target[name] = parts[index]);

const createPathReader = (path) => {
  const parts = path.split("/");
  const readers = [];
  parts.forEach((part, index) => {
    if (part.startsWith("{")) {
      const name = part.slice(1, -1).trim();
      readers.push(getReader(name, index));
    }
    if (part.startsWith(":")) {
      const name = part.slice(1).trim();
      readers.push(getReader(name, index));
    }
  });
  return (input, output = {}) => {
    readers.map((r) => r(output, input.split("/")));
    return output;
  };
};

const createPathMatcher = (path) => {
  const parts = path.split("/");
  const matchers = parts.map((part) => {
    if (part.startsWith("{") || part.startsWith(":")) {
      return ".+?";
    }
    return part;
  });
  const m = new RegExp("^" + matchers.join("\\/") + "$");
  return (s) => m.test(s);
};

/**
 * @param {Object} routes
 * @param {Function} notFound
 */
export default (routes, notFound) => {
  const matchers = Object.entries(routes).map(([route, handler]) => {
    const [method, path] = route.split(" ", 2);
    const r = createPathReader(path);
    const m = createPathMatcher(path);

    return {
      test: (requestMethod, requestUrl) =>
        requestMethod === method && m(requestUrl),
      read: (requestUrl) => r(requestUrl),
      handle: handler,
    };
  });

  return (request, response) => {
    const { method, url } = request;
    const { pathname, searchParams } = new URL(url, "http://localhost");
    const matcher = matchers.find((m) => m.test(method, pathname));

    if (matcher) {
      return matcher.handle(request, response, matcher.read(url), searchParams);
    }

    if (notFound) {
      return notFound(request, response);
    }

    response.writeHead(404).end("Not found");
  };
};
