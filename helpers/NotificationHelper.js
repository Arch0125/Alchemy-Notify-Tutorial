const PushAPI = require('@pushprotocol/restapi');
const {ethers} = require('ethers');

async function sendNotification(res){
    const pk = "0x" + process.env.PRIVATE_KEY;
    const signer = new ethers.Wallet(pk);
    const event = res.event;
    const network = event.network;
    const activity = event.activity[0];
    const toaddr = activity.toAddress;
    const fromaddr = activity.fromAddress;
    const value = activity.value;
    const asset = activity.asset;

    const sentmsg = `${value} ${asset} to ${(toaddr).slice(0,5)} on ${network}`;
    const receivedmsg = `${value} ${asset} from ${(fromaddr).slice(0,5)} on ${network}`;

    try {
        const sentapiResponse = await PushAPI.payloads.sendNotification({
            signer: signer,
            type: 3, 
            identityType: 2, 
            notification: {
              title: sentmsg,
              body: sentmsg
            },
            payload: {
              title: sentmsg,
              body: sentmsg,
              cta: '',
              img: ''
            },
            recipients: `eip155:5:${fromaddr}`,
            channel: 'eip155:5:0x28a292f4dC182492F7E23CFda4354bff688f6ea8', 
            env: 'staging'
          });

        const receivedapiResponse = await PushAPI.payloads.sendNotification({
            signer: signer,
            type: 3,
            identityType: 2,
            notification: {
                title: receivedmsg,
                body: receivedmsg
            },
            payload: {
                title: receivedmsg,
                body: receivedmsg,
                cta: '',
                img: ''
            },
            recipients: `eip155:5:${toaddr}`,
            channel: 'eip155:5:0x28a292f4dC182492F7E23CFda4354bff688f6ea8',
            env: 'staging'
        });



      } catch (err) {
        console.error('Error: ', err);
      }    
}

module.exports=sendNotification;