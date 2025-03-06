import { HttpService } from "./Http.service";


console.log(process.env.NEXT_PUBLIC_API_URL);
const http = HttpService.getInstance(process.env.NEXT_PUBLIC_API_URL || "");
export { http };
