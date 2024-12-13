import { Request, Response } from "express";

import { responseCode } from "../common/helpers/response.helper";
import { catchError } from "../common/helpers/error.helper";

const supportController = {
  readme: (req: Request, res: Response) => {
    try {
      responseCode.success(
        res,
        {
          dbPort: 3307,
          backendPort: 8080,
          optional: "drop table db_pinterest if there is no data there",
          first: "yarn prisma db push",
          second: "yarn prisma generate",
          third: "yarn prisma db seed",
          fourth: "LOGIN First",
        },
        "Hi, Mentor! Please follow the following instructions."
      );
    } catch (err) {
      catchError(err, req, res);
    }
  },
};

export default supportController;
