export class HttpService {
  private static _instance: HttpService;
  private baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string): HttpService {
    if (!HttpService._instance) {
      HttpService._instance = new HttpService(baseUrl);
    }
    return HttpService._instance;
  }

  private async request(method: string, endpoint: string, body?: unknown): Promise<Response> {
    console.log("request base", method, endpoint, body);
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data from request", data);
      return { ...data, ok: true};

    } catch (error) {
      //console.error("Request failed:", error);
      throw error; // Re-throw to handle errors in calling code
    }
  }

  public async get<T>(endpoint: string): Promise<Response> {
    return this.request("GET", endpoint);
  }

  public async post(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("POST", endpoint, body);
  }

  public async put<T>(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("PUT", endpoint, body);
  }

  public async patch<T>(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("PATCH", endpoint, body);
  }


  public async delete<T>(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("DELETE", endpoint, body);
  }

}
