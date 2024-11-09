import twilio from "twilio";
import UserModel from "../models/User";
export const sendOtp = async (req, res) => {
  try {
    const accountSid = "";
    const authToken = "";
    const user = await UserModel.findOne({ email: req.body.email });
    id = user._id;
    if (user) {
      const client = new twilio(accountSid, authToken);
      const otp = Math.floor(1000 + Math.random() * 9000);
      client.messages.create({
        body: `${user.name} this is your OTP:${otp}`,
        from:"++13342465258",
        to:user.phoneno,
      }).then((message)=>{
        console.log("Message Sent:",message.accountSid)
      }).catch((error)=>{})
    }
  } catch {}            
};
