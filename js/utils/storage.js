/**
 * storage.js · Acceso a localStorage protegido con try/catch.
 * En modo privado, con cookies bloqueadas o en vistas previas, el acceso
 * puede lanzar errores; el sitio debe seguir funcionando igual.
 */

export function readStorage(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
