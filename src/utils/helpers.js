// {k, v} -> [k]
export const keys = obj => Object.keys(obj);

// Object -> String -> Object
export const querySelector = element =>
  selector => element.querySelector(selector);

// a -> b
export const $ = querySelector(document);
