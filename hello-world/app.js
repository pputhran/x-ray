// const axios = require('axios') 
const url = 'http://checkip.amazonaws.com/';

const XRay = require('aws-xray-sdk-core')
const AWS = XRay.captureHTTPsGlobal(require('request-promise'))

const rp = require('request-promise');


exports.lambdaHandler = async (event) => {

        const random = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        console.log(`random - ${random}`)

        if (random == 3)
        {
            throw new Error("random errors from here")
        }

        const segment = XRay.getSegment();
        // const ret = await axios(url);
        const subsegment = segment.addNewSubsegment('## HTTP');
        const ret = await rp(url);
        subsegment.close()
        console.log(ret)


        let response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
        return response
};
