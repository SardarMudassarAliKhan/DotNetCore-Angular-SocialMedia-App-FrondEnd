import { Component, OnInit, inject } from '@angular/core';
import { MemberCardComponent } from "../member-card/member-card.component";
import { MembersService } from '../../_services/member.service';
import { Member } from '../../_models/member';

@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css',
    imports: [MemberCardComponent]
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers();
  }
}