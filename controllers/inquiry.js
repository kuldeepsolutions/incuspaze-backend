const transporter = require("../Mail/sendMail");


exports.sendMailToUser = async (req, res) => {
    try {
        const {name,email,phone,moveIn,noOfSeats,Notes} =req.body;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your request has been received",
            text: `Hi ${name},\n\nThank you for your interest in our services. We will get back to you shortly.\n\nRegards,\nTeam SpaceX`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        }
        );

        res.status(200).send({message:"Mail sent to "+email});


    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};