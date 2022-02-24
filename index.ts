import * as aws from "@pulumi/aws";
import 'dotenv/config';

console.log(process.env.REGION)
//dotenv.config({ path: __dirname+'/.env' });

const example = new aws.iot.Thing("example", {
    attributes: {
        First: "examplevalue",
    },
});

const policy = new aws.iot.Policy("policy_myesp32", {policy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
        Action: ["iot:Connect"],
        Effect: "Allow",
        Resource: [ `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:client/PubSubTestThing` ]
    },{
        Action: ["iot:Publish"],
        Effect: "Allow",
        Resource: [ `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:topic/test/dc/pubtopic`,
        `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:topic/test/dc/subtopic` ]
    },{
        Action: ["iot:Subscribe"],
        Effect: "Allow",
        Resource: [ `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:topicfilter/test/dc/subtopic`,
        `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:topicfilter/test/dc/pubtopic` ]
    },{
        Action: ["iot:Receive"],
        Effect: "Allow",
        Resource: [ `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:topic/test/dc/subtopic`,
        `arn:aws:iot:${process.env.REGION}:${process.env.ACCOUNTID}:topic/test/dc/pubtopic` ]
    }],
})});

const cert = new aws.iot.Certificate("cert", {
    active: true,
});

// console.log(cert)
// console.log(pulumi.interpolate`${cert.arn.toString()}`)
// console.log(pulumi.interpolate`${cert.active.toString()}`)
// console.log(pulumi.interpolate`${cert.csr.toString()}`)
// console.log(pulumi.interpolate`${cert.arn.toString()}`)
// console.log(pulumi.interpolate`${cert.certificatePem.toString()}`)
// console.log(pulumi.interpolate`${cert.privateKey.toString()}`)
// console.log(pulumi.interpolate`${cert.publicKey.toString()}`)

export const certArn = cert.arn
export const certActive = cert.active
export const certCSR = cert.csr
export const certCertificatePEM = cert.certificatePem
export const certPrivateKey = cert.privateKey
export const certPublicKey = cert.publicKey

const att = new aws.iot.PolicyAttachment("att", {
    policy: policy.name,
    target: cert.arn,
});

const att2 = new aws.iot.ThingPrincipalAttachment("att", {
    principal: cert.arn,
    thing: example.name,
});