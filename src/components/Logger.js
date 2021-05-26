// import React from "react"
// import { Hub, Logger } from "aws-amplify"

// function Logger({ setUserGroup }){

//     const logger = new Logger('My-Logger');

//     const listener = (data) => {
//         switch (data.payload.event) {
//             case 'signIn':
//                 logger.info('user signed in');
//                 console.log("sin")
//                 getUserGroup()
//                 const group = localStorage.getItem("userGroup")
//                 setUserGroup(group)
    
//                 break;
//             case 'signUp':
//                 logger.info('user signed up');
//                 break;
//             case 'signOut':
//                 logger.info('user signed out');
//                 console.log("sout")
//                 localStorage.removeItem("userGroup")
//                 setUserGroup(null)
    
//                 break;
//             case 'signIn_failure':
//                 logger.error('user sign in failed');
//                 break;
//             case 'tokenRefresh':
//                 logger.info('token refresh succeeded');
//                 break;
//             case 'tokenRefresh_failure':
//                 logger.error('token refresh failed');
//                 break;
//             case 'configured':
//                 logger.info('the Auth module is configured');
//                 break;
//             default:
//               logger.info("unknown call")
//         }
//     }
    
//     Hub.listen('auth', listener);
    
// }

// export default Logger