import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_Services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_Models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  standalone: true,
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);

  member?: Member;
  //images: GalleryItem[] = [];

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username')!;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        //this.images = this.getImages(member.photos);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
