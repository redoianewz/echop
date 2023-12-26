// import { auth,currentUser,clerkClient } from '@clerk/nextjs';

 
// export default async function Page() {
//     const { userId } = auth();
 
//     if (userId) {
//         console.log('User is signed in', userId);
//     } 
//     const user = await currentUser();
//     console.log('User is signed in', user)
   


// return (
// <div>
// <h1>Sign in</h1>
// <p>
//     userId : {userId}
// </p>
// <p>
//     user : {user.primaryEmailAddressId}   
// </p>
// <p>
//     user : {user.firstName}
// </p>
// <p>
//     user : {user.lastName}
// </p>
// <p>
//     user : {user.username}
// </p>
// <p>
//     user : {user.id}
// </p>

// <p>
//     user : {user._EmailAddress.emailAddress}
// </p>
// </div>
// );
// }
"use client";
import { useAuth ,useUser} from "@clerk/nextjs";
 
export default function Example() {
  
  const { isSignedIn, user, isLoaded } = useUser();

console.log(user)
  if (!isLoaded) {
    return null;
  }
 
  
//  {pathRoot, id, externalId, username, emailAddresses, phoneNumbers, web3Wallets, externalAccounts, samlAccounts, organizationMemberships, passwordEnabled, firstName, lastName, fullName, primaryEmailAddressId, primaryEmailAddress, primaryPhoneNumberId, primaryPhoneNumber, primaryWeb3WalletId, primaryWeb3Wallet, imageUrl, hasImage, twoFactorEnabled, totpEnabled, backupCodeEnabled, publicMetadata, unsafeMetadata, createOrganizationEnabled, deleteSelfEnabled, lastSignInAt, updatedAt, createdAt, cachedSessionsWithActivities, isPrimaryIdentification, createEmailAddress, createPhoneNumber, createWeb3Wallet, createExternalAccount, createTOTP, verifyTOTP, disableTOTP, createBackupCode, update, updatePassword, removePassword, delete, getSessions, setProfileImage, getOrganizationInvitations, getOrganizationSuggestions, getOrganizationMemberships, leaveOrganization}

  return (
    <div>
          <p>{user.id}</p>
          <p>hello {user.fullName}</p>
         <div>
      <p>Hello {user.firstName}!</p>

      <p>Email Addresses:</p>
      <ul>
        {user.emailAddresses.map((emailAddress) => (
          <li key={emailAddress.id}>{emailAddress.emailAddress}</li>
        ))}
      </ul>
      <img src={user.imageUrl} width={200} height={200} />
    </div>

    </div>
  );
}