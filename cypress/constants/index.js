// export const baseUrl = "http://localhost:3000";
export const baseUrl = "https://phoenix-ecommerce.netlify.app/";

/*
 *loginFakeResponse and lookupFakeResponse are using to
 * verify signing in with valid credentials (stubbing the response)
 */
export const loginFakeResponse = {
  kind: "00000000",
  localId: "111111111111",
  email: "anyemail@gmail.ccom",
  displayName: "",
  idToken: "22222222222",
  registered: true,
  refreshToken: "33333333",
  expiresIn: "3600",
};
export const lookupFakeResponse = {
  kind: "000000000000",
  users: [
    {
      localId: "111111111111111",
      email: "anyemail@gmail.ccom",
      passwordHash: "2222222222",
      emailVerified: false,
      passwordUpdatedAt: 1695748262644,
      providerUserInfo: [
        {
          providerId: "password",
          federatedId: "anyemail@gmail.ccom",
          email: "anyemail@gmail.ccom",
          rawId: "anyemail@gmail.ccom",
        },
      ],
      validSince: "1695748262",
      lastLoginAt: "1697050331939",
      createdAt: "1695748262644",
      lastRefreshAt: "2023-10-11T18:52:11.939Z",
    },
  ],
};
