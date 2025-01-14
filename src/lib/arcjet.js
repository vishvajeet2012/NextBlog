import arcjet, { protectSignup } from "@arcjet/next";
const aj = arcjet({
  key: "ajkey_01jhhyt396ekk9q2npjy4tzv3d",
  rules: [
    protectSignup({
      email:{
        mode:"LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode:'LIVE',
        allow:[],

      },
      rateLimit: {
        mode: "LIVE",
        interval: "1m",
        max: 50,
      },
    })
  ],
});


export default aj;
 