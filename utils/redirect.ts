const redirectKey = "redirect-after-login";

export function setLaterRedirect(url: string) {
  localStorage.setItem(redirectKey, url);
}

export function getRedirectUrl() {
  const url = localStorage.getItem(redirectKey);
  localStorage.setItem(redirectKey, "");
  if (url && url !== "") {
    return url;
  }
  return null;
}
