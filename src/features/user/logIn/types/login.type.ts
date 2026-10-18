type loginUserServicesResponse =
  | {
      status: "invalid-identifier";
      message: "نام کاربری یا رمز عبور نادرست است.";
      user?: undefined;
    }
  | {
      status: "invalid-password";
      message: "نام کاربری یا رمز عبور نادرست است.";
      user?: undefined;
    }
  | {
      status: string;
      message: string;
      user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userName: string;
      };
    };
