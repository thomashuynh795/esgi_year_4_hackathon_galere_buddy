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

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    auth?: boolean
  ): Promise<T> {
    try {

      let token: string | null;

      if(auth) {
        token = localStorage.getItem("token");
      }


      const getHeader = () => {
        let header  = {
          "Content-Type": "application/json",
        };

        if(token) {
          return {...header, "Authorization" : `Bearer ${token}`};
        } 

        return header;
      }

      console.log(getHeader());

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: getHeader(),
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data as T;
      
    } catch (error) {
      console.error("Request failed:", error);
      throw error; // Re-throw to handle errors in calling code
    }
  }

  public async get<T>(endpoint: string): Promise<T> {
    return this.request<T>("GET", endpoint);
  }

  public async post<T>(endpoint: string, body?: unknown, auth?: boolean): Promise<T> {
    return this.request<T>("POST", endpoint, body, auth);
  }

  public async put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("PUT", endpoint, body);
  }

  public async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("PATCH", endpoint, body);
  }

  public async delete<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>("DELETE", endpoint, body);
  }
}
