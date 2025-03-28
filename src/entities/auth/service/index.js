import UserModel from "../../user/model";

const AuthService = () => ({
  async signIn(token) {
    const errorMessage = {
    status: 401,
    error: "The username or password are not correct",
    };
    const credentials = decodeBase64Token(token);
    if (!credentials || !credentials.username || !credentials.password) {
      return {
        status: 401,
        error: "Username or Password not provided"
      }
    }

    const { username, password } = credentials;

    const users = await UserModel.get({ username, password });
    console.log("Usuarios consultados: ",users)
    if (users.length === 0) {
      return errorMessage;
    }
    return { status: 200, message: "Authentication successful", user: users[0] };
  },

  deleteUser(userProviderId) {
    return ManagementClient.deleteUser({ id: userProviderId });
  },
});

export const decodeBase64Token = (token) => {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");
    return { username, password };
  } catch (err) {
    return null;
  }
};

export default AuthService;