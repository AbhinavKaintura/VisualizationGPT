import nodemailer from 'nodemailer';

export async function sendEmail(to: string, otp: number) {
    let transporter = nodemailer.createTransport({
        service: 'hotmail', // Use 'hotmail' for Microsoft accounts
        auth: {
            user: 'akash.maurya@involead.com', // Your Microsoft account email
            pass: '#Aq.09.08.bq.pq', // Your email account password
        },
    });

    let mailOptions = {
        from: "akash.maurya@involead.com",
        to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
