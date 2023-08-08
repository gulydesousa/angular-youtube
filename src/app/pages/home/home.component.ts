import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "../../services/youtube.service";
import { Video } from "src/app/models/youtube.models";
import Swall from "sweetalert2";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  loaded: boolean = false;

  constructor(private youtubeSvc: YoutubeService) {}

  ngOnInit(): void {
    this.loaded=false;
    this.loadMore();
  }

  public loadMore() {
    this.youtubeSvc.getVideos().subscribe((data) => {
      this.videos.push(...data);
      this.loaded=true;
    });
  }

  public showVideo(video: Video) {
    Swall.fire({
      html: `
          <h4>${video.title}</h4>
          <hr>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/${video.resourceId.videoId}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    });
  }
}
