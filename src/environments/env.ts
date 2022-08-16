import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environment {
  db_options: { username: string; password: string; host: string; db: string };
  img_base_url: string;
  jwt_secret: string;
  jwt_expires_in: string;
  imageUploadPath: string;
  mailer_options: {};
  base_url: string;
}

export function getEnvironmentVariables() {
  if (process.env.NODE_ENV === "production") return ProdEnvironment;
  return DevEnvironment;
}
