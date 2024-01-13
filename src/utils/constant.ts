export default {
  SERVER_ERROR_MESSAGE: 'Something went wrong.',
  INVALID_LOGIN_DETAILS: 'Invalid email or password.',
  USER_NOTFOUND_ERROR: 'User not found with provided details',
};

export class CommonMessages {
  public static readonly API_RATE_LIMIT_ERROR = 'Exceeded api request limit.';
  public static readonly ERROR = "Oop's somthing went worng please try again.";
  public static readonly WELCOME = 'Welcome to backend server!';
  public static readonly ADMIN_WELCOME = 'Welcome to admin panel server!';
}

export class UserMessages {
  public static readonly ACCESS_DENIED = 'Access denied.';
  public static readonly REGISTER_SUCCESS = 'Your registration has been completed successfully.';
  public static readonly INVALID_ID = 'Invalid id.';
  public static readonly USER_ID_REQUIRED = 'User id is required.';
  public static readonly USER_UPDATE_SUCCESS = 'User data updated successfully.';
  public static readonly USER_FOUND_SUCCESS = 'User data found.';
  public static readonly UNAUTHORIZED = 'token incorrect.';

  public static readonly NOT_REGISTERED = 'User not registered.';
  public static readonly ALREADY_EXISTS = 'User already exists.';
  public static readonly NOT_FOUND = 'Data not found.';
  public static readonly FOUND_SUCCESS = 'Data found.';
  public static readonly FETCH_SUCCESS = 'Fetched successfully.';
  public static readonly LOGIN_ERROR = 'Invalid credentials.';
  public static readonly LOGIN_SUCCESS = 'Login success.';
  static Unauthorized: any;
  public static readonly PASSWORD_CHANGED_SUCCESS: 'Password change success';
}

export class HttpStatusCode {
  public static readonly SUCCESSFUL = 200;
  public static readonly BAD_REQUEST = 400;
  public static readonly UN_AUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly NOT_FOUND = 404;
  public static readonly INTERNAL_SERVER_ERROR = 500;
  public static readonly ALREADY_EXISTS = 409;
  public static readonly RATE_LIMIT = 429;
}
