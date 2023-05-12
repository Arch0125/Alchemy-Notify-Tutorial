import * as PushAPI from "@pushprotocol/restapi";
const {ethers} = require('ethers');

async function sendNotification(res){
    const pk = "0x" + process.env.PRIVATE_KEY;
    const signer = new ethers.Wallet(pk);
    const event = res.event;
    const network = event.network;
    const activity = event.activity[0];
    const toaddr = activity.toAddress;
    const value = activity.value;
    const asset = activity.asset;
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
          signer: signer,
          type: 1, 
          identityType: 2,
          notification: {
            title: `[SDK-TEST] notification TITLE:`,
            body: `[sdk-test] notification BODY`
          },
          payload: {
            title: `[sdk-test] payload title`,
            body: `sample msg body`,
            cta: '',
            img: ''
          },
          channel: 'eip155:5:0x28a292f4dC182492F7E23CFda4354bff688f6ea8', // your channel address
          env: 'staging'
        });
      } catch (err) {
        console.error('Error: ', err);
      }    
}