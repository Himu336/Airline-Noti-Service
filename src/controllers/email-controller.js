const { EmailService} = require('../services');

async function create(req,res){
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail,
        });
        return res.status(201).json({
            success: true,
            message: "Ticket created successfully",
            data: response
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {
    create
};