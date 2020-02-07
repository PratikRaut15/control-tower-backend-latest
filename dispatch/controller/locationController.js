const url = require("url");
const { base64encode, base64decode } = require("nodejs-base64");
const HmacSha1 = require("hmac_sha1");
const crypto = require("crypto");
const axios = require("axios");

function decodeBase64UrlSafe(value) {
  //return typeof value;
  let strValue = value.replace("-", "+");
  strValue = strValue.replace("_", "/");
  return base64decode(strValue);
}

function encodeBase64UrlSafe(value) {
  //   return typeof value;
  let strValue = value.replace("+", "-");
  return base64encode(strValue.replace("/", "_"));
}

module.exports.signLocationUrl = (link, key) => {
  const uri = url.parse(link);
  const urlPartToSign = uri.path + "?" + uri.query;
  const decodedKey = decodeBase64UrlSafe(key);
  //   create HashMac
  const hmac = crypto.createHmac("sha1", decodedKey);

  const signature = hmac.update(urlPartToSign).digest("hex");

  const encodedSignature = encodeBase64UrlSafe(signature);
  return link + "&signature=" + encodedSignature;
};

module.exports.getLocationfromGoogle = async function getLocationfromGoogle(
  address
) {
  try {
    return new Promise(async (resolve, reject) => {
      await axios.get(address).then(res => {
        let arrcount = res.data.results.length;
        //resolve(res.data.results[arrcount - 3].formatted_address);
        resolve(res.data.results[0].formatted_address);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.getLocationbyLatLong = (lat, long) => {
  return `http://maps.google.com/maps/api/geocode/json?latlng=${lat.trim()},${long.trim()}&sensor=false&client=gme-elixiatechsolutions&signature=sGfZRt2t-IAS3f212o9pMTr8ORE=`;
};
