import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { YoutubeResponse } from "../models/youtube.models";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  private url = "https://www.googleapis.com/youtube/v3";
  private apiKey = "AIzaSyAGvBw_ZRdu2dpAboaKFIUOGtOC6SU4WcQ";
  private playlist = "PLCKuOXG0bPi1ERFyUj99yDWYO_Et_Vyl9";
  private nextPageToken = "";

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.url}/playlistItems`;
    const params = new HttpParams()
      .set("part", "snippet")
      .set("maxResults", "10")
      .set("playlistId", this.playlist)
      .set("key", this.apiKey)
      .set("pageToken", this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, { params }).pipe(
      map((resp: YoutubeResponse) => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }), 
      map((items) => items.map((i) => i.snippet)) 
    );
  }
}
