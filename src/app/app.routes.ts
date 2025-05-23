import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuardGuard } from './_guards/auth-guard.guard';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuardGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'members/:username', component: MemberDetailsComponent},
            {path: 'member/edit', component: MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard]},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    {path: 'error', loadComponent: () => import('./error/test-error/test-error.component').then(c => c.TestErrorComponent)},
    {path: 'not-found', loadComponent: () => import('./error/not-fount/not-fount.component').then(c => c.NotFountComponent)},
    {path: 'server-error', loadComponent: () => import('./error/server-error/server-error.component').then(c => c.ServerErrorComponent)},
    {path: '**', component: HomeComponent, pathMatch: 'full'},
];
