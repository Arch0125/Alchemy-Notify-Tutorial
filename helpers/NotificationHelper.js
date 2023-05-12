const PushAPI = require('@pushprotocol/restapi');
const {ethers} = require('ethers');

async function NotificationHelper(res){
    const pk = process.env.PRIVATE_KEY;
    const Pkey = `0x${pk}`;
    const signer = new ethers.Wallet(Pkey);
    const event = res.event;
    const network = event.network;
    const activity = event.activity[0];
    const toaddr = activity.toAddress;
    const fromaddr = activity.fromAddress;
    const value = activity.value;
    const asset = activity.asset;

    const networkname = {
        'ETH_GOERLI': 'Goerli',
        'ETH_MAINNET': 'Ethereum',
        'MATIC_MAINNET': 'Polygon',
        'MATIC_MUMBAI': 'Mumbai'
    };

    const sentmsg = `${value} ${asset} sent to ${(toaddr).slice(0,5)+'...'+toaddr.slice(47)} on ${networkname[network]}`;
    const receivedmsg = `${value} ${asset} received from ${(fromaddr).slice(0,5)+'...'+fromaddr.slice(47)} on ${networkname[network]}`;

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

module.exports=NotificationHelper;