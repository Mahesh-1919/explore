import * as emailjs from "emailjs-com";

emailjs.init("2hUV1GLHX6hixJRJS");
export const sendEmail = async ({ email, otp }: any) => {
  await emailjs
    .send("service_l0f690e", "template_w2gy3fl", {
      email: email,
      otp: otp,
    })
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error.text;
      }
    );
};
