import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Photo } from '../../_models/photo';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);

  member?: Member;
  images: GalleryItem[] = [];

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        this.images = this.getImages(member.photos);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getImages(photos: Photo[]): GalleryItem[] {
    const imageItems: GalleryItem[] = [];
    for (const photo of photos) {
      imageItems.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
    return imageItems;
  }
}
