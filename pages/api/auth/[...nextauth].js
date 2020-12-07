import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {getAccessTokenFromSession} from 'lib/sessionUtil'


const allowedUser = (userId) => [
  //Shelob0
  1994311,
  '1994311'
].includes(userId);
const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scopes: ['user:email','repo']
    }),
  ],
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile 
     * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
     *                           Return `false` to deny access
     */
    signIn: async (user, account, profile) => {
      const isAllowedToSignIn = allowedUser(account.id);
      
      if (isAllowedToSignIn  ) {
        return Promise.resolve(true)
      } else {
        
        // Return false to display a default error message
        return Promise.resolve(false)
        // You can also Reject this callback with an Error or with a URL:
        // return Promise.reject(new Error('error message')) // Redirect to error page
        // return Promise.reject('/path/to/redirect')        // Redirect to a URL
      }
    },
    session: async (session, user, sessionToken) => {
      
      if (sessionToken && sessionToken.hasOwnProperty('accessToken')) {
        session.accessToken = sessionToken.accessToken;
      }
      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = (user) ? true : false
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      if (account) {
        token.accessToken = account.accessToken;
      }
      return Promise.resolve(token)
    }
  },
  session: { jwt: true },
  events: {
    session: async ({ session, jwt }) => { 
      let accessToken = getAccessTokenFromSession(jwt);
      if (accessToken) {
        session.accessToken = accessToken;
      }
      return Promise.resolve(session)
     },
   
  }
  

  
}

export default (req, res) => NextAuth(req, res, options)