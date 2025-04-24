const express = require('express');
const cors = require('cors');
const { BedrockAgentRuntimeClient, InvokeAgentCommand } = require("@aws-sdk/client-bedrock-agent-runtime");
const {Agent} = require("https");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const {KickoutFileClassifier} = require("./ApiController/KickOutClassifer");
const multer = require('multer');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS Bedrock Agent client
const bedrockAgentClient = new BedrockAgentRuntimeClient({
    region: process.env.AWS_REGION,
    requestHandler: new NodeHttpHandler({
        httpsAgent: new Agent({rejectUnauthorized: false})
    })
});

const multerConfig = multer({ storage: multer.memoryStorage() });

app.post('/api/UploadKickOutFile', multerConfig.single('file'), KickoutFileClassifier);


app.get('/api/getAllKickouts', async(req, res) => {
    try {
        const response = await fetch('https://ceefde25v6-vpce-00885819822df6078.execute-api.us-east-1.amazonaws.com/api/kickout/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Ko Records:', result);
        return res.json(result);
    } catch (error) {
        console.error('Failed to insert data:', error);
        throw error;
    }
});



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        details: err.message
    });
});


let APIHandler = serverless(app, {
    binary: ['application/zip']
});

const lambdaHandler = async (event, context) => {
    return APIHandler(event, context);
};

module.exports={lambdaHandler,app}