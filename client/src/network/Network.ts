import type { GameMetadata } from "../core/model/GameMetadata";
import type { MapMetadata } from "../core/model/map/MapMetadata";

/**
 * A generic networking utility
 */
export class Network {
  private static instance: Network;
  private baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static init(baseUrl: string) {
    if (!Network.instance) {
      Network.instance = new Network(baseUrl);
    }
    return Network.instance;
  }

  static getInstance() {
    if (!Network.instance) {
      throw new Error(
        "Network not initialized. Call Network.init(baseUrl) first.",
      );
    }
    return Network.instance;
  }

  /**
   * Generic method to make a request to the server.
   *
   * @param endpoint the API endpoint for the request.
   * @param options extra HTTP options such as header and method.
   */
  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(this.baseUrl + endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) throw new Error(`HTTP error: ${res.status} ${res.statusText}`);

    const body = (await res.json()) as {
      success: boolean;
      reason?: string;
      data?: T;
    };

    if (!body.success) {
      throw new Error(body.reason ?? "Unknown API error");
    }

    return body.data as Promise<T>;
  }

  /**
   * Request essential game information.
   */
  async getGameMetadata() {
    return this.request<GameMetadata>(`/metadata`, {
      method: "GET",
    });
  }

  /**
   * Request map to server. The server should decide which map to send.
   * This depends on the player's account making the request. By default, it will respond with the main city map.
   *
   * In the future, when account and session is implemented, the request should pass account ID as header for identification.
   */
  async getMapMetadata() {
    return this.request<MapMetadata>(`/maps`, {
      method: "GET",
    });
  }
}
