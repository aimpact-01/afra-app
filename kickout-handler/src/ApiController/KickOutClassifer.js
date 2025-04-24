const { BedrockAgentRuntimeClient, InvokeAgentCommand } = require("@aws-sdk/client-bedrock-agent-runtime");
const {Agent} = require("https");
const { NodeHttpHandler } = require("@aws-sdk/node-http-handler");
const { insertKickoutData } = require('../Utils/db.js');
const {classification_result} = require("../Utils/mockData");
const {S3Client}=require("@aws-sdk/client-s3")
const {Upload}=require("@aws-sdk/lib-storage")


// Configure AWS Bedrock Agent client
const bedrockAgentClient = new BedrockAgentRuntimeClient({
    region: process.env.AWS_REGION,
    requestHandler: new NodeHttpHandler({
        httpsAgent: new Agent({rejectUnauthorized: false})
    })
});



const KickoutFileClassifier = async (request, response, next) => {
        try {
            // fetch file from response form data
            const file = request.file;
            const s3Configuration= [{region: process.env.AWS_REGION}];
            s3Configuration.requestHandler = {httpsAgent: new Agent({rejectUnauthorized: false})}

            const s3Client = new S3Client(s3Configuration);

            // Generate a unique file key using timestamp and original filename
            const timestamp = new Date().getTime();
            const uniqueKey = `${timestamp}-${file.originalname}`;

            const uploadParams = {
                Bucket: 'aimpact-us-east-1-kickout',
                Key: uniqueKey,
                Body: file.buffer,
                ContentType: file.mimetype,
                ServerSideEncryption: "AES256"
            };

            const upload = new Upload({
                client: s3Client,
                params: uploadParams
            });

            await upload.done();

            /*
             * Pass S3 path to KickoutClassifer Agent to identify KO errors
             * Classifer Agent intelligently uses knowledgebase and prase csv file with action group and extracts data effected in json format
             * If Identified KO errors requires FTB setup, need to invoke FTB Agent to validate and setup FTB data.
             * IF others, need to invoke other Agents to validate and setup data.
             */

            const s3_file_path = `s3://${uploadParams.Bucket}/${uploadParams.Key}`;

            const params = {
                agentId: 'WHTKZN6GVD',
                agentAliasId: 'SMFQD6JCGN',
                sessionId: request.body.sessionId || Date.now().toString(),
                inputText: s3_file_path
            };

            const command = new InvokeAgentCommand(params);
            let classifierAgentResponse = await bedrockAgentClient.send(command); //response stream

            // mock the classifierAgentResponse

            classifierAgentResponse = classification_result;

            //Insert consolidated Kickout data received from agent into DB

            const { kickout_id } = await insertKickoutData();


            const responseData = {
                kickout_id,
                type: "FTB_Setup"
            };

            /*
            if(classification_result.kickout_type === "FTB Type"){

                // Invoke FTB Agent to validate KO DATA.
                const ftbAgentResponse = await bedrockAgentClient.send(new InvokeAgentCommand({
                    agentId: 'XXXXXXXXXX',
                    agentAliasId: 'XXXXXXXXXX',
                    actionGroup: 'FTBDataExtraction',
                    input: {
                        "kickoutData": classification_result['data'],
                        "action": "extractFTBDetails"
                    }
                }));

                // Process and send the response
               // response.json(ftbAgentResponse);
            }
             */

            // Process and send the response
            response.json(responseData);

        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({
                error: 'Failed to process request',
                details: error.message
            });
        }
};


module.exports = {
    KickoutFileClassifier
};

