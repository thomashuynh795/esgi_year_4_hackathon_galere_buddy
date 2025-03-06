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
    try {
      const response :Response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204) {
        return { ...(await response.json()), ok:true};
      }

      const data = await response.json();
      return data as Response;

    } catch (error) {
      console.error("Request failed:", error);
      throw error; // Re-throw to handle errors in calling code
    }
  }

  public async get(endpoint: string): Promise<Response> {
    return this.request("GET", endpoint);
  }

  public async post(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("POST", endpoint, body);
  }

  public async put(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("PUT", endpoint, body);
  }

  public async patch(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("PATCH", endpoint, body);
  }


  public async delete(endpoint: string, body?: unknown): Promise<Response> {
    return this.request("DELETE", endpoint, body);
  }
}
