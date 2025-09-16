import crypto from "crypto";

export function genSystemId() {
  return `pay_${crypto.randomBytes(8).toString("hex")}`;
}

export function genPublicId() {
  return `pub_${crypto.randomBytes(12).toString("hex")}`;
}
