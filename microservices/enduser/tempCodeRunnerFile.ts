function maskEmail(s: string) {
  const [username, domains] = s.split("@");
  const domainsAsArray = domains.split(".");
  const domain = domainsAsArray.pop();
  return `${mask(username)}@${mask(domainsAsArray.join("."))}}.${domain}`;
}

function mask(s: string) {
  if (s.length >= 3) {
    const asArr = s.split("");
    const first = s.at(0);
    const last = s.at(-1);
    return `${first}**${last}`;
  }
  return s;
}

console.log("theodor@cultofcoders.ro");