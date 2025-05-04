"use strict";
exports.__esModule = true;
exports.routes = void 0;
var home_component_1 = require("./home/home.component");
var member_list_component_1 = require("./members/member-list/member-list.component");
var lists_component_1 = require("./lists/lists.component");
var messages_component_1 = require("./messages/messages.component");
var auth_guard_guard_1 = require("./_guards/auth-guard.guard");
var member_details_component_1 = require("./members/member-details/member-details.component");
var member_edit_component_1 = require("./members/member-edit/member-edit.component");
var prevent_unsaved_changes_guard_1 = require("./_guards/prevent-unsaved-changes.guard");
exports.routes = [
    { path: '', component: home_component_1.HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [auth_guard_guard_1.authGuardGuard],
        children: [
            { path: 'members', component: member_list_component_1.MemberListComponent },
            { path: 'members/:username', component: member_details_component_1.MemberDetailsComponent },
            { path: 'member/edit', component: member_edit_component_1.MemberEditComponent, canDeactivate: [prevent_unsaved_changes_guard_1.preventUnsavedChangesGuard] },
            { path: 'lists', component: lists_component_1.ListsComponent },
            { path: 'messages', component: messages_component_1.MessagesComponent },
        ]
    },
    { path: 'error', loadComponent: function () { return Promise.resolve().then(function () { return require('./error/test-error/test-error.component'); }).then(function (c) { return c.TestErrorComponent; }); } },
    { path: 'not-found', loadComponent: function () { return Promise.resolve().then(function () { return require('./error/not-fount/not-fount.component'); }).then(function (c) { return c.NotFountComponent; }); } },
    { path: 'server-error', loadComponent: function () { return Promise.resolve().then(function () { return require('./error/server-error/server-error.component'); }).then(function (c) { return c.ServerErrorComponent; }); } },
    { path: '**', component: home_component_1.HomeComponent, pathMatch: 'full' },
];
