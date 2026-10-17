export type CreateCommentActionResult =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "validation-error";
      message: string;
      errors: {
        field: string;
        message: string;
      }[];
    }
  | {
      status: "unauthorized";
      message: string;
    }
  | {
      status: "error";
      message: string;
    };
